const axios = require('axios');
const NodeCache = require('node-cache');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
const SavedArticle = require('../models/SavedArticle');

// Initialize cache with 1 hour TTL (3600 seconds)
const newsCache = new NodeCache({ stdTTL: 3600 });




/**
 * @desc    Get personalized news feed based on user preferences
 * @route   GET /api/news/feed
 * @access  Private
 */
const getNewsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.preferences || user.preferences.length === 0) {
      return res.status(400).json({ message: 'User preferences not found' });
    }

    const topics = user.preferences;
    const page = parseInt(req.query.page) || 1;
    let feed = [];

    const articlesPerTopic = Math.max(1, Math.floor(6 / topics.length));

    for (const topic of topics) {
      const cacheKey = `news_${topic.label}_page_${page}`;
      let articles = newsCache.get(cacheKey);

      if (articles && articles.length > 0) {
        console.log(`Cache hit for topic: ${topic.label}`);
        feed = [...feed, ...articles];
        continue;
      }

      // Fetch from NewsAPI
      const newsResponse = await axios.get(
        `https://eventregistry.org/api/v1/article/getArticles`, {
        params: {
          action: 'getArticles',
          keyword: topic.label,
          articlesCount: articlesPerTopic,
          articlePage: page,
          apiKey: process.env.NEWS_API_KEY,
          resultType: 'articles'
        }
      }
      );

      const rawArticles = newsResponse.data.articles?.results || [];
      articles = [];

      for (const art of rawArticles) {
        // Delay before each Groq call
        await new Promise(resolve => setTimeout(resolve, 3000));

        const aiSummary = await getAISummary(art.title);

        articles.push({
          title: art.title,
          url: art.url,
          source: art.source?.title || 'Unknown Source',
          urlToImage: art.image,
          publishedAt: art.dateTime || art.date,
          topic: topic.label,
          aiSummary
        });
      }

      // Save to cache
      newsCache.set(cacheKey, articles);
      feed = [...feed, ...articles];
    }

    // Sort by date descending
    feed.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    res.status(200).json(feed);

  } catch (error) {
    console.error('getNewsFeed error:', error);
    if (error.response) {
      return res.status(error.response.status).json({
        message: `Upstream API Error: ${error.response.data?.message || error.message}`,
        details: error.response.data
      });
    }
    res.status(500).json({ message: error.message });
  }
};

// Separate reusable AI summary function
const getAISummary = async (title) => {
  try {
    const prompt = `3 bullet points about: "${title.slice(0, 120)}"`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 80
      },
      { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
    );

    const text = response.data.choices[0].message.content;
    const bullets = text
      .split(/\n|•|\*|-/)
      .map(b => b.trim())
      .filter(b => b.length > 8)
      .slice(0, 3);

    return bullets.length === 3
      ? bullets
      : ["Key insight from this article.", "Read more for full context.", "Click to view full story."];

  } catch (e) {
    console.error("AI summary error:", e?.response?.data?.error?.message);
    return ["Summary unavailable.", "Read full article for details.", "Click to view full story."];
  }
};

/**
 * @desc    Save an article for the user
 * @route   POST /api/news/save
 * @access  Private
 */
const saveArticle = async (req, res) => {
  const { title, url, source, urlToImage, aiSummary } = req.body;

  try {
    const alreadySaved = await SavedArticle.findOne({ userId: req.user._id, url });
    if (alreadySaved) {
      return res.status(400).json({ message: 'Article already saved' });
    }

    const savedArticle = await SavedArticle.create({
      userId: req.user._id,
      title,
      url,
      source,
      urlToImage,
      aiSummary,
    });

    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all saved articles for the user
 * @route   GET /api/news/saved
 * @access  Private
 */
const getSavedArticles = async (req, res) => {
  try {
    const saved = await SavedArticle.find({ userId: req.user._id }).sort({ savedAt: -1 });
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete a saved article
 * @route   DELETE /api/news/saved/:id
 * @access  Private
 */
const deleteSavedArticle = async (req, res) => {
  try {
    const article = await SavedArticle.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check ownership
    if (article.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await article.deleteOne();
    res.json({ message: 'Article removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNewsFeed,
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
};

const express = require('express');
const router = express.Router();
const {
  getNewsFeed,
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/feed', protect, getNewsFeed);
router.post('/save', protect, saveArticle);
router.get('/saved', protect, getSavedArticles);
router.delete('/saved/:id', protect, deleteSavedArticle);

module.exports = router;

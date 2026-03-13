# 🗞️ DailyNews — AI-Powered Personalized News Digest

<div align="center">

![DailyNews Banner](https://img.shields.io/badge/DailyNews-AI%20Powered-6366f1?style=for-the-badge&logo=newspaper&logoColor=white)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Groq AI](https://img.shields.io/badge/Groq-Llama%203.1-FF6B35?style=flat-square)](https://groq.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

**A full-stack MERN application that delivers your daily news — personalized, summarized, and powered by AI.**

[🚀 Live Demo](https://your-demo-link.vercel.app) · [🐛 Report Bug](https://github.com/yourusername/daily-news/issues) · [✨ Request Feature](https://github.com/yourusername/daily-news/issues)

</div>

---

## 📌 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)
- [Contact](#contact)

---

## 🎯 About The Project

**DailyNews** solves a real problem — information overload. Instead of scrolling through hundreds of headlines, users get a clean, personalized digest of news articles tailored to their interests, with each article summarized into **3 concise AI-generated bullet points**.

> _"I built this to solve my own problem — I was spending 30+ minutes daily consuming news. DailyNews cuts that to under 5 minutes."_

### The Problem

- News websites are cluttered with ads and irrelevant content
- Generic news apps don't understand personal interests
- Reading full articles takes too much time

### The Solution

- Users select specific topics and subcategories they care about
- AI filters and fetches only relevant articles
- Each article is summarized in 3 bullet points using Groq's Llama 3.1 model
- Everything is served in a clean, distraction-free interface

---

## ✨ Key Features

| Feature                       | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| 🔐 **JWT Authentication**     | Secure register/login with bcrypt password hashing                     |
| 🎯 **2-Step Personalization** | Select main topics + specific subcategories for precise results        |
| 🤖 **AI Summarization**       | Each article summarized into 3 bullet points via Groq (Llama 3.1)      |
| 📰 **Smart News Fetching**    | Keyword-optimized queries using EventRegistry API for relevant results |
| 🔖 **Save Articles**          | Bookmark articles to read later, stored in MongoDB                     |
| ⚡ **Server-Side Caching**    | News cached per topic to minimize API calls and improve speed          |
| 📱 **Fully Responsive**       | Works seamlessly on mobile, tablet, and desktop                        |
| 🌙 **Dark UI**                | Clean dark theme designed for comfortable daily reading                |

---

## 🛠️ Tech Stack

### Frontend

- **React.js** — Component-based UI
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP client for API calls
- **React Router v6** — Client-side routing
- **Context API** — Global auth state management

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — RESTful API framework
- **MongoDB Atlas** — Cloud database
- **Mongoose** — MongoDB ODM
- **JWT** — Stateless authentication
- **bcryptjs** — Password hashing
- **node-cache** — In-memory server-side caching

### External APIs

- **EventRegistry API** — Real-time news data from 80,000+ sources
- **Groq API (Llama 3.1-8b-instant)** — Ultra-fast AI text summarization

### Deployment

- **Vercel** — Frontend hosting
- **Render** — Backend hosting
- **MongoDB Atlas** — Database hosting

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (React)                      │
│   Login → Topic Selection → Dashboard → Saved Articles   │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP Requests (Axios + JWT)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   SERVER (Express.js)                    │
│                                                          │
│  Auth Routes    News Routes      User Routes             │
│  /api/auth      /api/news        /api/user               │
│                      │                                   │
│              ┌───────┴────────┐                          │
│              │   Cache Layer  │ ← node-cache (1hr TTL)  │
│              └───────┬────────┘                          │
└──────────────────────┼──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────────┐  ┌──────────┐
  │ MongoDB  │  │EventRegistry │  │ Groq AI  │
  │  Atlas   │  │   News API   │  │ Llama3.1 │
  └──────────┘  └──────────────┘  └──────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)
- EventRegistry API key (free at eventregistry.org)
- Groq API key (free at console.groq.com)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/yourusername/daily-news.git
cd daily-news
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

**4. Set up environment variables**

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret_key
NEWS_API_KEY=your_eventregistry_api_key
GROQ_API_KEY=your_groq_api_key
```

Create a `.env` file in the `/frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

**5. Run the development servers**

Backend:

```bash
cd backend
npm run dev
```

Frontend (in a new terminal):

```bash
cd frontend
npm run dev
```

**6. Open your browser**

```
http://localhost:5173
```

---

## 🔑 Environment Variables

| Variable       | Description                | Where to Get                                   |
| -------------- | -------------------------- | ---------------------------------------------- |
| `MONGO_URI`    | MongoDB connection string  | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| `JWT_SECRET`   | Secret key for JWT signing | Any random strong string                       |
| `NEWS_API_KEY` | EventRegistry API key      | [eventregistry.org](https://eventregistry.org) |
| `GROQ_API_KEY` | Groq AI API key            | [console.groq.com](https://console.groq.com)   |

---

## 📡 API Documentation

### Authentication

| Method | Endpoint             | Description             | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/api/auth/register` | Register new user       | ❌            |
| POST   | `/api/auth/login`    | Login user, returns JWT | ❌            |
| GET    | `/api/auth/me`       | Get current user        | ✅            |

### News

| Method | Endpoint              | Description                | Auth Required |
| ------ | --------------------- | -------------------------- | ------------- |
| GET    | `/api/news/feed`      | Get personalized news feed | ✅            |
| POST   | `/api/news/save`      | Save an article            | ✅            |
| GET    | `/api/news/saved`     | Get all saved articles     | ✅            |
| DELETE | `/api/news/saved/:id` | Remove saved article       | ✅            |

### User

| Method | Endpoint                | Description              | Auth Required |
| ------ | ----------------------- | ------------------------ | ------------- |
| PUT    | `/api/user/preferences` | Update topic preferences | ✅            |
| PUT    | `/api/user/profile`     | Update name/password     | ✅            |

### Example Request

```bash
# Get personalized news feed
GET /api/news/feed
Authorization: Bearer <your_jwt_token>

# Response
[
  {
    "title": "OpenAI Releases New Model...",
    "url": "https://techcrunch.com/...",
    "source": "TechCrunch",
    "urlToImage": "https://image.jpg",
    "publishedAt": "2026-03-13T10:00:00Z",
    "topic": "AI & Machine Learning",
    "aiSummary": [
      "OpenAI released a new model with 10x faster inference speed",
      "The model focuses on coding and reasoning tasks",
      "Available via API starting today with free tier access"
    ]
  }
]
```

---

## 📁 Project Structure

```
daily-news/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── NewsCard.jsx
│       │   └── TopicChip.jsx
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── TopicSelect.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Saved.jsx
│       │   └── Settings.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── data/
│       │   └── topics.js
│       └── App.jsx
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── newsController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js
│   │   └── SavedArticle.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── news.js
│   │   └── user.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   └── server.js
│
└── README.md
```

---

## 💡 How It Works

### News Feed Generation

```
1. User opens Dashboard
         ↓
2. Frontend calls GET /api/news/feed with JWT token
         ↓
3. Backend checks server-side cache (node-cache)
   → Cache HIT  → Return cached articles instantly ⚡
   → Cache MISS → Continue to step 4
         ↓
4. Fetch user's saved topic preferences from MongoDB
         ↓
5. For each topic → call EventRegistry API with
   smart keyword queries (e.g. "AI" OR "machine learning" OR "LLM")
         ↓
6. For each article → send title to Groq AI:
   Prompt: "3 bullet points about: {title}"
   Model: llama-3.1-8b-instant (fastest free model)
         ↓
7. Store results in cache with 1-hour TTL
         ↓
8. Return sorted feed to frontend
```

### Smart Caching Strategy

To stay within free API limits, the app uses a two-level optimization:

- **Cache Key:** `news_{topic}_{page}` — unique per topic and page
- **TTL:** 1 hour — fresh enough for news, conservative on API calls
- **Result:** Groq API is only called **once per hour per topic**, not on every request

---

---

## 🧩 Challenges & Solutions

### Challenge 1: AI Rate Limiting

**Problem:** Groq's free tier has a 6,000 TPM (tokens per minute) limit. Sending 15 articles simultaneously hit the limit instantly.

**Solution:**

- Limited to 2 articles per topic (6 total for 3 topics)
- Added 3-second delay between each Groq API call
- Shortened prompts to title-only (saved ~70% tokens)
- Reduced max_tokens from 150 to 80 per response
- Aggressive server-side caching avoids repeat calls

### Challenge 2: Irrelevant News Results

**Problem:** Searching `q=technology` returned random, irrelevant articles.

**Solution:** Built a keyword mapping system where each subcategory maps to optimized OR queries:

```js
'ai-ml': '"artificial intelligence" OR "machine learning" OR "LLM" OR "ChatGPT"'
```

This increased result relevance significantly without any additional API calls.

### Challenge 3: Slow Initial Load

**Problem:** Fetching news + AI summarization took 15-20 seconds on first load.

**Solution:** Implemented server-side caching with node-cache. After the first request, subsequent requests return instantly from cache. A loading skeleton UI was added to improve perceived performance.

---

## 🔮 Future Improvements

- [ ] **Push Notifications** — Daily digest delivered via browser notifications
- [ ] **Search Functionality** — Search across saved and recent articles
- [ ] **Read Later Queue** — Priority reading list separate from saved
- [ ] **Article Sentiment Analysis** — Tag articles as positive/negative/neutral
- [ ] **Email Digest** — Weekly email summary of top articles
- [ ] **Redis Caching** — Replace node-cache with Redis for production scale
- [ ] **PWA Support** — Installable as a mobile app

---

## 👨‍💻 Contact

**Your Name** — MERN Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/yourusername)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail)](mailto:your@email.com)

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

_Built with ❤️ using MERN Stack + AI_

</div>

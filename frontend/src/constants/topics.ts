export interface Subcategory {
  id: string;
  label: string;
  query: string;
}

export interface Topic {
  id: string;
  label: string;
  emoji: string;
  subcategories: Subcategory[];
}

export const TOPICS: Topic[] = [
  {
    id: 'technology',
    label: 'Technology',
    emoji: '💻',
    subcategories: [
      { id: 'ai-ml', label: 'AI & Machine Learning', query: '"AI" OR "machine learning" OR "LLM"' },
      { id: 'web-dev', label: 'Web Development', query: '"web development" OR "React" OR "Node.js" OR "JavaScript"' },
      { id: 'cybersecurity', label: 'Cybersecurity', query: '"cybersecurity" OR "data breach" OR "hacking"' },
      { id: 'gadgets', label: 'Gadgets', query: '"gadgets" OR "smartphone" OR "laptop" OR "Apple" OR "Samsung"' },
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    emoji: '💰',
    subcategories: [
      { id: 'crypto', label: 'Crypto', query: '"bitcoin" OR "ethereum" OR "crypto" OR "blockchain"' },
      { id: 'stocks', label: 'Stock Market', query: '"stock market" OR "NYSE" OR "NASDAQ" OR "shares"' },
      { id: 'startups', label: 'Startups', query: '"startup funding" OR "venture capital" OR "Y Combinator"' },
      { id: 'economy', label: 'Economy', query: '"global economy" OR "inflation" OR "interest rates"' },
    ]
  },
  {
    id: 'science',
    label: 'Science',
    emoji: '🔬',
    subcategories: [
      { id: 'space', label: 'Space', query: '"space exploration" OR "NASA" OR "SpaceX" OR "astronomy"' },
      { id: 'physics', label: 'Physics', query: '"quantum physics" OR "particle physics"' },
      { id: 'biology', label: 'Biology', query: '"biotechnology" OR "genetics" OR "medical research"' },
    ]
  },
  {
    id: 'health',
    label: 'Health',
    emoji: '🏥',
    subcategories: [
      { id: 'mental-health', label: 'Mental Health', query: '"mental health" OR "psychology" OR "mindfulness"' },
      { id: 'wellness', label: 'Wellness', query: '"wellness" OR "nutrition" OR "healthy lifestyle"' },
      { id: 'fitness', label: 'Fitness', query: '"fitness" OR "workout" OR "bodybuilding"' },
    ]
  },
  {
    id: 'sports',
    label: 'Sports',
    emoji: '⚽',
    subcategories: [
      { id: 'football', label: 'Football', query: '"football" OR "soccer" OR "Premier League" OR "Champions League"' },
      { id: 'basketball', label: 'Basketball', query: '"NBA" OR "basketball"' },
      { id: 'cricket', label: 'Cricket', query: '"cricket" OR "IPL" OR "ICC"' },
      { id: 'f1', label: 'F1', query: '"Formula 1" OR "Grand Prix"' },
    ]
  },
  {
    id: 'gaming',
    label: 'Gaming',
    emoji: '🎮',
    subcategories: [
      { id: 'pc-gaming', label: 'PC Gaming', query: '"PC gaming" OR "Steam" OR "NVIDIA"' },
      { id: 'consoles', label: 'Consoles', query: '"PlayStation" OR "Xbox" OR "Nintendo"' },
      { id: 'esports', label: 'eSports', query: '"eSports" OR "competitive gaming"' },
    ]
  },
  {
    id: 'world',
    label: 'World',
    emoji: '🌍',
    subcategories: [
      { id: 'geopolitics', label: 'Geopolitics', query: '"geopolitics" OR "international relations" OR "foreign policy"' },
      { id: 'environment', label: 'Environment', query: '"climate change" OR "renewable energy" OR "sustainability"' },
      { id: 'human-rights', label: 'Human Rights', query: '"human rights" OR "activism"' },
    ]
  }
];

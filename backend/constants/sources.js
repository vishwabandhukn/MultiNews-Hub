// RSS Feed Sources Configuration
const RSS_SOURCES = {
  english: [
    {
      id: 'the-hindu',
      label: 'The Hindu',
      feedUrl: 'https://www.thehindu.com/feeder/default.rss',
      language: 'english',
      type: 'rss' // normal RSS feed
    },
    {
      id: 'indian-express',
      label: 'The Indian Express',
      feedUrl: 'https://indianexpress.com/feed/',
      language: 'english',
      type: 'rss'
    },
    {
      id: 'hindustan-times',
      label: 'Hindustan Times',
      feedUrl: 'https://www.hindustantimes.com',
      language: 'english',
      type: 'rss'
    }
  ],

  kannada: [
    {
      id: 'prajavani',
      label: 'Prajavani',
      feedUrl: null, // No RSS feed, use scraper
      language: 'kannada',
      type: 'scraper'
    },
    {
      id: 'kannada-prabha',
      label: 'Kannada Prabha',
      feedUrl: 'https://www.kannadaprabha.com/topic/rss', // HTML feed, needs scraper
      language: 'kannada',
      type: 'scraper'
    }
  ],

  hindi: [
    {
      id: 'news18-hindi',
      label: 'News18 Hindi',
      feedUrl: 'https://hindi.news18.com',
      language: 'hindi',
      type: 'rss'
    },
    {
      id: 'live-hindustan',
      label: 'Live Hindustan',
      feedUrl: 'https://www.livehindustan.com',
      language: 'hindi',
      type: 'rss'
    },
    {
      id: 'aaj-tak',
      label: 'Aaj Tak',
      feedUrl: 'https://aajtak.in/rssfeeds/?id=home',
      language: 'hindi',
      type: 'rss'
    }
  ]
};

const LANGUAGES = [
  { id: 'english', label: 'English', flag: '🇬🇧' },
  { id: 'kannada', label: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { id: 'hindi', label: 'हिन्दी', flag: '🇮🇳' }
];

export {
  RSS_SOURCES,
  LANGUAGES
};
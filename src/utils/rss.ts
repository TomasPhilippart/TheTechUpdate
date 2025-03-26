import Parser from 'rss-parser';

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  // Optional fields that may not be available in all feeds
  summary?: string;
  content?: string;
  categories?: string[];
  author?: string;
  imageUrl?: string;
};

type CachedData = {
  timestamp: number;
  items: FeedItem[];
};

// Create a custom parser with flexible type
const parser = new Parser({
  customFields: {
    item: [
      'content:encoded',
      'description',
      'content',
      'summary',
      'media:content',
      'enclosure',
      'dc:creator',
      'author'
    ]
  }
});

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Cache object to store fetched data
let cachedFeeds: CachedData | null = null;

// Define types for RSS category formats
type CategoryObject = {
  $?: {
    term?: string;
  };
  term?: string;
};

type RSSCategory = string | CategoryObject;

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  'content:encoded'?: string;
  description?: string;
  summary?: string;
  categories?: Array<RSSCategory> | string;
  author?: string;
  'dc:creator'?: string;
  'media:content'?: {
    $?: {
      url?: string;
    };
  };
  enclosure?: {
    url?: string;
  };
  [key: string]: unknown;
}

/**
 * Extract the most suitable summary text from a feed item
 */
function extractSummary(item: RSSItem): string | undefined {
  // Try different fields that might contain summaries
  return (
    item['content:encoded'] || 
    item.content || 
    item.summary || 
    item.description || 
    undefined
  );
}

/**
 * Clean summary text by removing HTML tags and images, and decode HTML entities
 */
function cleanSummary(text: string | undefined): string | undefined {
  if (!text) return undefined;
  
  // First remove any img tags completely (including their content)
  let cleaned = text.replace(/<img[^>]*>/g, '');
  
  // Then remove all other HTML tags
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');
  
  // Decode HTML entities
  cleaned = decodeHTMLEntities(cleaned);
  
  // Remove excessive whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

/**
 * Decode HTML entities like &#160; and &#8217; to their corresponding characters
 */
function decodeHTMLEntities(text: string): string {
  // Common HTML entities mapping
  const entities: Record<string, string> = {
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&#39;': "'",
    '&#160;': ' ',
    '&#8216;': '\'',
    '&#8217;': '\'',
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '…'
  };
  
  // Replace numeric entities
  let decoded = text.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(dec);
  });
  
  // Replace named entities
  for (const [entity, char] of Object.entries(entities)) {
    const regex = new RegExp(entity, 'g');
    decoded = decoded.replace(regex, char);
  }
  
  return decoded;
}

/**
 * Extract article image URL if available
 */
function extractImageUrl(item: RSSItem): string | undefined {
  if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
    return item['media:content']['$'].url;
  }
  
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }
  
  // Try to extract first image from content if available
  const content = item['content:encoded'] || item.content || item.description;
  if (content) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }
  
  return undefined;
}

/**
 * Extract author information
 */
function extractAuthor(item: RSSItem): string | undefined {
  return item['dc:creator'] || item.author || undefined;
}

export async function fetchFeeds(feeds: { 
  name: string; 
  url: string; 
  options?: { 
    showSummary?: boolean 
  }
}[]) {
  // Check if we have cached data that's still fresh
  if (cachedFeeds && Date.now() - cachedFeeds.timestamp < CACHE_DURATION) {
    console.log('Using cached feeds data');
    return cachedFeeds.items;
  }

  console.log('Fetching fresh feeds data');
  const feedItems: FeedItem[] = [];

  for (const feed of feeds) {
    try {
      const parsedFeed = await parser.parseURL(feed.url);
      
      const items = parsedFeed.items.map(item => {
        // Type assertion to make TypeScript understand this is compatible with RSSItem
        const rssItem = item as unknown as RSSItem;
        
        // Extract summary with intelligent fallbacks, respecting the showSummary option
        const showSummary = feed.options?.showSummary !== false;
        const rawSummary = showSummary ? extractSummary(rssItem) : undefined;
        const summary = cleanSummary(rawSummary);
        
        // Extract categories (could be in different formats)
        let categories: string[] | undefined;
        if (item.categories) {
          if (Array.isArray(item.categories)) {
            // If it's an array, check what type of values it contains
            if (item.categories.length > 0) {
              if (typeof item.categories[0] === 'string') {
                // Simple string array
                categories = item.categories as string[];
              } else if (typeof item.categories[0] === 'object') {
                // The Verge style - array of objects with term attribute in $
                const extractedCategories = item.categories
                  .map((cat: RSSCategory) => {
                    if (typeof cat === 'string') {
                      return cat;
                    }
                    // Check if it has a $ property with a term
                    if (cat && typeof cat === 'object') {
                      const catObj = cat as CategoryObject;
                      if (catObj.$ && catObj.$.term) {
                        return catObj.$.term;
                      }
                      // Check if it has a term property directly
                      if (catObj.term) {
                        return catObj.term;
                      }
                    }
                    // If it's an object but doesn't match expected formats, try to stringify
                    return typeof cat === 'object' ? JSON.stringify(cat) : String(cat);
                  })
                  .filter(Boolean); // Remove any empty/null values
                
                if (extractedCategories.length > 0) {
                  categories = extractedCategories;
                }
              }
            }
          } else if (typeof item.categories === 'string') {
            // Single string category
            categories = [item.categories];
          }
        }
        
        // Extract image URL if available
        const imageUrl = extractImageUrl(rssItem);
        
        // Extract author information
        const author = extractAuthor(rssItem);
        
        return {
          title: item.title || '',
          link: item.link || '',
          pubDate: item.pubDate || item.isoDate || '',
          source: feed.name,
          summary: summary,
          categories: categories,
          author: author,
          imageUrl: imageUrl
        };
      });
      
      feedItems.push(...items);
    } catch (error) {
      console.error(`Error fetching ${feed.name}:`, error);
    }
  }

  const sortedItems = feedItems.sort((a, b) => 
    new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  // Update cache with fresh data
  cachedFeeds = {
    timestamp: Date.now(),
    items: sortedItems
  };

  return sortedItems;
} 
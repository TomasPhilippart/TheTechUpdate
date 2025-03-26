'use client';

import { useState, useEffect } from 'react';
import SourceFilter from './SourceFilter';

type NewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  summary?: string;
  categories?: string[];
  author?: string;
};

type SortField = 'date' | 'source' | 'title';

type NewsItemsProps = {
  items: NewsItem[];
};

// Initial number of items to show
const INITIAL_ITEMS_TO_SHOW = 10;
const ITEMS_PER_LOAD = 10;

export default function NewsItems({ items }: NewsItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [displayedItems, setDisplayedItems] = useState<NewsItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_TO_SHOW);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortAscending, setSortAscending] = useState(false);
  
  // Get unique sources
  const sources = Array.from(new Set(items.map(item => item.source)));
  
  // Apply filters and sorting when inputs change
  useEffect(() => {
    // First, apply filters
    let result = items;
    
    if (selectedSources.length > 0 && selectedSources.length < sources.length) {
      result = result.filter(item => selectedSources.includes(item.source));
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        (item.summary && item.summary.toLowerCase().includes(query)) ||
        (item.author && item.author.toLowerCase().includes(query)) ||
        (item.categories && item.categories.some(cat => 
          cat.toLowerCase().includes(query)
        ))
      );
    }
    
    // Then, apply sorting based on field and direction
    result = [...result].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
          break;
        case 'source':
          comparison = a.source.localeCompare(b.source);
          // Secondary sort by date for same source
          if (comparison === 0) {
            comparison = new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
          }
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      // Flip the comparison if we want descending order
      return sortAscending ? comparison : -comparison;
    });
    
    setFilteredItems(result);
    setVisibleCount(INITIAL_ITEMS_TO_SHOW);
  }, [items, searchQuery, selectedSources, sources.length, sortField, sortAscending]);

  // Update displayed items when filters change or more items are loaded
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, visibleCount));
  }, [filteredItems, visibleCount]);
  
  const handleSourceFilterChange = (sources: string[]) => {
    setSelectedSources(sources);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearchReset = () => {
    setSearchQuery('');
  };
  
  const handleSortFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value as SortField);
  };
  
  const toggleSortDirection = () => {
    setSortAscending(prev => !prev);
  };
  
  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };
  
  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="text-sm mb-2 font-bold">SEARCH:</div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search titles, content, authors..."
                className="w-full border-2 border-black dark:border-white bg-transparent p-2 font-mono focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              {searchQuery && (
                <button 
                  onClick={handleSearchReset}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs border px-1.5 py-0.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-sm mb-2 font-bold">SORT BY:</div>
            <div className="flex">
              <select
                value={sortField}
                onChange={handleSortFieldChange}
                className="border-y-2 border-l-2 border-black dark:border-white bg-transparent p-2 font-mono focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              >
                <option value="date">Date</option>
                <option value="source">Source</option>
                <option value="title">Title</option>
              </select>
              <button 
                onClick={toggleSortDirection}
                className="border-2 border-black dark:border-white bg-transparent px-3 font-mono hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                aria-label={sortAscending ? "Sort descending" : "Sort ascending"}
              >
                {sortAscending ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
        
        <SourceFilter sources={sources} onFilterChange={handleSourceFilterChange} />
      </div>
      
      <div className="grid gap-6">
        {displayedItems.length === 0 ? (
          <div className="text-center py-12 border-2 border-black dark:border-white p-8">
            <div className="text-xl font-bold mb-2">NO MATCHING ARTICLES</div>
            <div className="text-sm opacity-70">
              {searchQuery ? 'Try a different search term or ' : ''}
              Adjust your filters to see more results
            </div>
          </div>
        ) : (
          <>
            {displayedItems.map((item, index) => (
              <article 
                key={item.link + index}
                className="group relative"
              >
                <div className="absolute -left-4 top-0 h-full w-1 bg-black dark:bg-white transform scale-y-0 group-hover:scale-y-100 transition-transform"></div>
                <div className="border-2 border-black dark:border-white p-4 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold hover:underline"
                      >
                        {item.title}
                      </a>
                      
                      {item.summary && (
                        <div className="mt-2 text-sm line-clamp-2 opacity-80">
                          {item.summary}
                        </div>
                      )}
                      
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        {item.author && (
                          <span className="opacity-70">By {item.author}</span>
                        )}
                        
                        {item.categories && item.categories.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {item.categories.slice(0, 3).map((category, idx) => (
                              <span key={idx} className="border border-current px-1">
                                {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className="text-sm border border-current px-2">
                        {item.source}
                      </span>
                      <time className="text-xs mt-2 font-light">
                        {new Date(item.pubDate).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            
            {displayedItems.length < filteredItems.length && (
              <div className="mt-4 mb-8 text-center">
                <button 
                  onClick={loadMore}
                  className="px-6 py-3 border-4 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold"
                >
                  LOAD MORE ({filteredItems.length - displayedItems.length} REMAINING)
                </button>
              </div>
            )}
            
            <div className="text-center text-sm">
              Showing {displayedItems.length} of {filteredItems.length} articles
              {filteredItems.length < items.length && ` (filtered from ${items.length} total)`}
            </div>
          </>
        )}
      </div>
    </>
  );
} 
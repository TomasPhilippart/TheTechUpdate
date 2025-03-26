'use client';

import { useState, useEffect } from 'react';

type SourceFilterProps = {
  sources: string[];
  onFilterChange: (selectedSources: string[]) => void;
};

export default function SourceFilter({ sources, onFilterChange }: SourceFilterProps) {
  // Track if we're in filtered mode or "show all" mode
  const [isFiltering, setIsFiltering] = useState(false);
  // Start with all sources enabled
  const [selectedSources, setSelectedSources] = useState<string[]>(sources);

  useEffect(() => {
    // When sources change (like on initial load), reset selection
    setSelectedSources(isFiltering ? selectedSources : sources);
  }, [sources, isFiltering, selectedSources]);

  const toggleSource = (sourceName: string) => {
    // If not filtering yet, switch to filtering mode showing only this source
    if (!isFiltering) {
      setIsFiltering(true);
      const newSelection = [sourceName];
      setSelectedSources(newSelection);
      onFilterChange(newSelection);
      return;
    }
    
    // If already in filtering mode
    if (selectedSources.includes(sourceName)) {
      // If this is the last selected source, turn off filtering mode
      if (selectedSources.length === 1) {
        setIsFiltering(false);
        setSelectedSources([]);
        onFilterChange([]);
      } else {
        // Otherwise just remove this source from the filter
        const newSources = selectedSources.filter(src => src !== sourceName);
        setSelectedSources(newSources);
        onFilterChange(newSources);
      }
    } else {
      // Add this source to the selection
      const newSources = [...selectedSources, sourceName];
      setSelectedSources(newSources);
      onFilterChange(newSources);
    }
  };

  // Reset filter and show all sources
  const resetFilter = () => {
    setIsFiltering(false);
    setSelectedSources([]);
    onFilterChange([]);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-bold">FILTER BY SOURCE:</div>
        {isFiltering && (
          <button 
            onClick={resetFilter}
            className="text-xs underline hover:no-underline"
          >
            Reset (Show All)
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map(source => (
          <button
            key={source}
            onClick={() => toggleSource(source)}
            className={`text-xs px-2 py-1 border-2 transition-colors ${
              !isFiltering || selectedSources.includes(source)
                ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                : 'border-black text-black dark:border-white dark:text-white opacity-50'
            }`}
            aria-pressed={isFiltering ? selectedSources.includes(source) : true}
          >
            {source}
          </button>
        ))}
      </div>
    </div>
  );
} 
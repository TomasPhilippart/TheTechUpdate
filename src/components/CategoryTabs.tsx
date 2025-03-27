"use client";

import { useState, useEffect } from "react";
import NewsItems from "./NewsItems";

interface CategoryTabsProps {
  categorizedNews: Record<string, any[]>;
  isLoading?: boolean;
}

export default function CategoryTabs({ categorizedNews, isLoading = false }: CategoryTabsProps) {
  const categories = Object.keys(categorizedNews);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");
  const [itemCounts, setItemCounts] = useState<Record<string, number>>({});

  // Calculate item counts for each category
  useEffect(() => {
    const counts: Record<string, number> = {};
    for (const category in categorizedNews) {
      counts[category] = categorizedNews[category].length;
    }
    setItemCounts(counts);
  }, [categorizedNews]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Optionally save to localStorage for persistence
    localStorage.setItem("preferredCategory", category);
  };

  // Try to load preferred category from localStorage on mount
  useEffect(() => {
    const savedCategory = localStorage.getItem("preferredCategory");
    if (savedCategory && categories.includes(savedCategory)) {
      setActiveCategory(savedCategory);
    }
  }, [categories]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 pb-1 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 font-medium transition-colors duration-200 whitespace-nowrap ${
              activeCategory === category
                ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
            disabled={isLoading}
          >
            {category} 
            <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800">
              {itemCounts[category] || 0}
            </span>
          </button>
        ))}
      </div>

      <div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading feeds...</p>
          </div>
        ) : activeCategory ? (
          <div>
            <h2 className="text-3xl font-bold mb-6 pb-2">
              {activeCategory}
            </h2>
            {categorizedNews[activeCategory]?.length > 0 ? (
              <NewsItems items={categorizedNews[activeCategory] || []} />
            ) : (
              <div className="text-center p-8 text-gray-600 dark:text-gray-400">
                No items found in this category.
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
} 
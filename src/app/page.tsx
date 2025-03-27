import { feedCategories } from "@/config/feeds";
import { fetchFeedsByCategory } from "@/utils/rss";
import ClientTime from "@/components/ClientTime";
import CategoryTabs from "@/components/CategoryTabs";
import { Suspense } from "react";

export const revalidate = 600; // Revalidate every 10 minutes

// Loading component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-12">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-black dark:border-white mb-3 sm:mb-4 shadow-lg"></div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 animate-pulse">Loading feeds...</p>
    </div>
  );
}

async function NewsContent() {
  const categorizedNews = await fetchFeedsByCategory(feedCategories);
  const lastUpdated = new Date().toLocaleString();

  // Create a combined "ALL" category with all items from all categories
  const allItems = Object.values(categorizedNews).flatMap(items => items);
  const withAllCategory = {
    ALL: allItems,
    ...categorizedNews
  };

  return (
    <>
      <main>
        <CategoryTabs categorizedNews={withAllCategory} />
      </main>

      <footer className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-black dark:border-white text-sm text-center">
        <div className="flex flex-col gap-3 sm:gap-5 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="animate-pulse bg-gray-100 dark:bg-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              ⚡ Auto-refreshes every 5 minutes ⚡
            </div>
            <div className="text-xs opacity-70">
              Last refreshed: {lastUpdated}
            </div>
          </div>
          
          <div className="border-t border-gray-300 dark:border-gray-700 w-16 sm:w-24 my-1 sm:my-2"></div>
          
          <div className="flex flex-col gap-1 sm:gap-2">
            <div className="font-medium text-xs sm:text-sm">Curated by Tomás Philippart</div>
            <div className="flex justify-center gap-3 sm:gap-4">
              <a 
                href="https://github.com/tomasphilippart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm hover:underline hover:opacity-80 transition-opacity hover:text-gray-600 dark:hover:text-gray-300"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/tomasphilippart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs sm:text-sm hover:underline hover:opacity-80 transition-opacity hover:text-gray-600 dark:hover:text-gray-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono p-2 sm:p-4 max-w-[1200px] mx-auto">
      <header className="border-4 border-black dark:border-white p-4 sm:p-6 mb-4 sm:mb-8 relative shadow-md dark:shadow-white/10 rounded-sm">
        <ClientTime />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">THE TECH UPDATE</h1>
      </header>
      
      <Suspense fallback={<LoadingState />}>
        <NewsContent />
      </Suspense>
    </div>
  );
}

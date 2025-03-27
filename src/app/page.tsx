import { feedCategories } from "@/config/feeds";
import { fetchFeedsByCategory } from "@/utils/rss";
import ClientTime from "@/components/ClientTime";
import CategoryTabs from "@/components/CategoryTabs";
import { Suspense } from "react";

export const revalidate = 600; // Revalidate every 10 minutes

// Loading component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black dark:border-white mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Loading feeds...</p>
    </div>
  );
}

async function NewsContent() {
  const categorizedNews = await fetchFeedsByCategory(feedCategories);
  const lastUpdated = new Date().toLocaleString();

  return (
    <>
      <main>
        <CategoryTabs categorizedNews={categorizedNews} />
      </main>

      <footer className="mt-12 pt-4 border-t-2 border-black dark:border-white text-sm text-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="animate-pulse">
            ⚡ Auto-refreshes every 5 minutes ⚡
          </div>
          <div className="text-xs opacity-70">
            Last refreshed: {lastUpdated}
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono p-4 max-w-[1200px] mx-auto">
      <header className="border-4 border-black dark:border-white p-6 mb-8 relative">
        <ClientTime />
        <h1 className="text-5xl font-bold tracking-tight">THE TECH UPDATE</h1>
      </header>
      
      <Suspense fallback={<LoadingState />}>
        <NewsContent />
      </Suspense>
    </div>
  );
}

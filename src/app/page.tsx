import { feeds } from "@/config/feeds";
import { fetchFeeds } from "@/utils/rss";
import ClientTime from "@/components/ClientTime";
import NewsItems from "@/components/NewsItems";

export const revalidate = 600; // Revalidate every 10 minutes

export default async function Home() {
  const newsItems = await fetchFeeds(feeds);
  const lastUpdated = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-mono p-4 max-w-[1200px] mx-auto">
      <header className="border-4 border-black dark:border-white p-6 mb-8 relative">
        <ClientTime />
        <h1 className="text-5xl font-bold tracking-tight">THE TECH UPDATE</h1>
      </header>

      <main>
        <NewsItems items={newsItems} />
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
    </div>
  );
}

/** @type {import('next').NextConfig} */
  const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages needs to know the base path if you're not using a custom domain
  // If your repo name is "tech-news" you would use:
  // basePath: '/tech-news',
  // If you're using a custom domain, you can remove this
};

module.exports = nextConfig; 
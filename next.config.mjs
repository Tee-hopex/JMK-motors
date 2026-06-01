/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // DISABLE optimization to reduce memory usage on Render
    unoptimized: process.env.NODE_ENV === "production",
    // Cache images longer
    minimumCacheTTL: 31536000, // 1 year
  },
  // Enable SWR caching for API routes
  onDemandEntries: {
    maxInactiveAge: 15 * 1000,
    pagesBufferLength: 2,
  },
  // Optimize for production
  swcMinify: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Optimize image processing to reduce memory usage
    formats: ["image/avif", "image/webp"],
  },
  // Enable SWR caching for API routes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // Reduce idle time
    pagesBufferLength: 2, // Keep fewer pages in memory
  },
  // Optimize for production
  swcMinify: true,
  productionBrowserSourceMaps: false,
  // Reduce memory during build
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal config for development testing
  experimental: {
    optimizeServerReact: true,
  },

  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // PoweredByHeader
  poweredByHeader: false,
};

export default nextConfig;
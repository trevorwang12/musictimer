import type { NextConfig } from "next";
import { SECURITY_HEADERS, CSP_POLICY } from './src/lib/constants';

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment (production only)
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    outputFileTracingRoot: __dirname,
  }),
  
  // Enable experimental features for better performance
  experimental: {
    optimizeServerReact: true,
  },

  // Suppress hydration warnings for browser extensions
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Compression settings (production only)
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
  }),

  // Headers - only in production or when explicitly enabled
  ...(process.env.ENABLE_HEADERS === 'true' && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=(), payment=()',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; media-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
            },
          ],
        },
        // MIME types for static assets
        {
          source: '/_next/static/(.*\\.js)$',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/javascript; charset=utf-8',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/static/(.*\\.css)$',
          headers: [
            {
              key: 'Content-Type',
              value: 'text/css; charset=utf-8',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/_next/static/media/(.*\\.woff2?)$',
          headers: [
            {
              key: 'Content-Type',
              value: 'font/woff2',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/sw.js',
          headers: [
            {
              key: 'Content-Type',
              value: 'application/javascript; charset=utf-8',
            },
            {
              key: 'Cache-Control',
              value: 'public, max-age=0, must-revalidate',
            },
          ],
        },
        {
          source: '/_next/static/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
        {
          source: '/audio/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
            {
              key: 'Accept-Ranges',
              value: 'bytes',
            },
          ],
        },
        {
          source: '/(icon-.*|favicon.*|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  }),


  // PoweredByHeader
  poweredByHeader: false,
};

export default nextConfig;

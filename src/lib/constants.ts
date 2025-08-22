// Application constants and configuration

// Get the base URL from environment or use production default
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://timerwithmusics.com';

// Ensure HTTPS for all external references
export const SITE_URL = BASE_URL.startsWith('http') ? BASE_URL : `https://${BASE_URL}`;

// API URL for OG images and other API endpoints
export const API_URL = `${SITE_URL}/api`;

// Structured data organization info
export const ORGANIZATION = {
  name: 'Timer with Music',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512x512.png`,
  sameAs: [],
} as const;

// Default metadata
export const SITE_METADATA = {
  title: 'Timer with Music – Free Online Countdown Timer',
  description: 'Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions. Works offline as a PWA.',
  keywords: ['timer', 'countdown', 'music', 'productivity', 'focus', 'study', 'pomodoro'],
  author: 'Timer with Music Team',
} as const;

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
} as const;

// Content Security Policy
export const CSP_POLICY = [
  "default-src 'self' https:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "media-src 'self' data: https:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join('; ');
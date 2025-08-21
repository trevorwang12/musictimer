import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Timer with Music - Free Online Countdown Timer',
    short_name: 'Timer with Music',
    description: 'Free online countdown timer with relaxing background music. Perfect for study, work, meditation, and focus sessions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['productivity', 'utilities', 'lifestyle'],
    
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    
    // screenshots: [],  // Temporarily disabled until actual screenshots are available
    
    shortcuts: [
      {
        name: '5 Minute Timer',
        short_name: '5min',
        description: 'Quick 5-minute focus timer',
        url: '/timer/5-minutes-music',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
      {
        name: '25 Minute Timer',
        short_name: '25min',
        description: 'Pomodoro 25-minute work session',
        url: '/timer/25-minutes-music',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Pomodoro Timer',
        short_name: 'Pomodoro',
        description: 'Full Pomodoro technique timer',
        url: '/pomodoro',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Custom Timer',
        short_name: 'Custom',
        description: 'Create your own timer duration',
        url: '/timer/custom',
        icons: [
          {
            src: '/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
    ],
    
    related_applications: [],
    prefer_related_applications: false,
    
    // Protocol handlers for timer links
    protocol_handlers: [
      {
        protocol: 'web+timer',
        url: '/timer/%s-minutes-music',
      },
    ],
  };
}
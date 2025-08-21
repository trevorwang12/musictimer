// Timer with Music - Service Worker
// Version 1.0.0

const CACHE_NAME = 'timer-with-music-v1';
const STATIC_CACHE_NAME = 'timer-static-v1';
const AUDIO_CACHE_NAME = 'timer-audio-v1';

// Files to cache immediately (app shell)
const STATIC_FILES = [
  '/',
  '/timer/5-minutes-music',
  '/timer/10-minutes-music', 
  '/timer/15-minutes-music',
  '/timer/20-minutes-music',
  '/timer/25-minutes-music',
  '/timer/30-minutes-music',
  '/pomodoro',
  '/timer/custom',
  '/offline',
  '/manifest.json',
];

// Audio files to cache lazily
const AUDIO_FILES = [
  '/audio/rain.mp3',
  '/audio/ocean.mp3', 
  '/audio/cafe.mp3',
  '/audio/white.mp3',
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== CACHE_NAME && 
                cacheName !== AUDIO_CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - handle requests with caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (isStaticFile(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isAudioFile(request)) {
    event.respondWith(cacheFirst(request, AUDIO_CACHE_NAME));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request));
  } else if (isTimerPage(request)) {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

// Caching strategies

// Cache First - good for static assets
async function cacheFirst(request, cacheName = CACHE_NAME) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      console.log('[SW] Cache hit:', request.url);
      return cached;
    }
    
    console.log('[SW] Cache miss, fetching:', request.url);
    const response = await fetch(request);
    
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Cache first failed:', error);
    return getOfflineResponse(request);
  }
}

// Network First - good for dynamic content
async function networkFirst(request, cacheName = CACHE_NAME) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    return cached || getOfflineResponse(request);
  }
}

// Stale While Revalidate - good for content that changes occasionally
async function staleWhileRevalidate(request, cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Always try to fetch in the background
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available, otherwise wait for fetch
  return cached || await fetchPromise || getOfflineResponse(request);
}

// Helper functions to categorize requests

function isStaticFile(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/);
}

function isAudioFile(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/audio/') && url.pathname.match(/\.(mp3|wav|ogg)$/);
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

function isTimerPage(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/timer/') || 
         url.pathname === '/pomodoro' || 
         url.pathname === '/';
}

// Offline fallback responses
function getOfflineResponse(request) {
  if (isTimerPage(request)) {
    return caches.match('/offline');
  }
  
  if (request.destination === 'image') {
    return new Response(
      '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><rect width=\"200\" height=\"200\" fill=\"#f3f4f6\"/><text x=\"50%\" y=\"50%\" text-anchor=\"middle\" dy=\"0.3em\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#6b7280\">Image offline</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Offline', { 
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Background sync for analytics (if needed)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'analytics') {
    event.waitUntil(sendAnalytics());
  }
});

async function sendAnalytics() {
  // Implement analytics syncing if needed
  console.log('[SW] Syncing analytics data');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'Timer notification',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Timer',
        icon: '/icon-96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Timer with Music', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(clients.openWindow('/'));
  }
});

// Message handler for cache updates
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'CACHE_AUDIO') {
    event.waitUntil(
      caches.open(AUDIO_CACHE_NAME).then((cache) => {
        return Promise.all(
          AUDIO_FILES.map(url => 
            cache.add(url).catch(err => console.log('Failed to cache audio:', url, err))
          )
        );
      })
    );
  }
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Loading pages (and turbolinks requests), checks the network first
registerRoute(
  ({request}) => request.destination === "document" || (
    request.destination === "" &&
    request.mode === "cors" &&
    request.headers.get('Turbolinks-Referrer') !== null
  ),
  new NetworkFirst({
    cacheName: 'documents',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// For CSS & JS, we check the cache first
registerRoute(
  ({request}) => request.destination === "script" ||
  request.destination === "style",
  new CacheFirst({
    cacheName: 'assets-styles-and-scripts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// For Images, we check the cache first
registerRoute(
  ({request}) => request.destination === "image",
  new CacheFirst({
    cacheName: 'assets-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 5,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

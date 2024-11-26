const CACHE_NAME = "EasyCoach-booking-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/home.html",
  "/styles/home.css",
  "/scripts/home.js",
  "/styles/index.css",
  "/scripts/index.js",
  "/history.html",
  "/styles/history.html",
  "/scripts/history.js",
  "/images/icon.png",
  "/images/logo.png",
  "/icons/icon-192×192.png",
  "/icons/android-launchericon-512×512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Optional: Update the cache with the new network response
        if (event.request.url.includes(".html")) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse);
          });
        }
        return networkResponse;
      });
    })
  );
});


self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});


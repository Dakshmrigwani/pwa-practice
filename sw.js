const staticCacheName = "static-cache-v1";
const assets = ["/index.html", "/app.css", "/app.js"];

self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed", evt);
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets); // Added "return" statement
    })
  );
});

self.addEventListener("activate", (evt) => {
  console.log("Service worker has been activated", evt);
});

self.addEventListener("fetch", (evt) => {
  console.log('Fetch event', evt);
  evt.respondWith(
    caches.open(staticCacheName).then((cache) => { // Removed "const" before cache declaration
      return cache.match(evt.request).then((cachedResponse) => { // Added "return" statement
        if (cachedResponse !== undefined) {
          // Cache hit, let's send the cached resource.
          return cachedResponse;
        } else {
          // Nothing in cache, let's go to the network.
          return fetch(evt.request); // Fetch from the network
        }
      });
    })
  );
});

const staticCacheName = "static-cache-v6.48";
const dynamicCacheName = "site-dynamic-v1.96";
// we are storing the some data we can save that we have saved in assets variable
const assets = [
  "/index.html",
  "/app.css",
  "/app.js",
  "/fallback.html",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css",
  "https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg",
  "https://fonts.googleapis.com/css?family=Poppins",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js",
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (evt) => {
  console.log("Service worker has been installed", evt);
  self.skipWaiting();
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets);
      // we are adding all the cache in the localstorage for improving the user experience
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker has been activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter(
            (key) =>
              key !== staticCacheName &&
              key !== dynamicCacheName /*do not remove this cache as well*/
          )
          .map((key) => caches.delete(key))
      );
    })
  );
});
// we are doing theat if the key is not equal then to staticCachedName which we have
// changed and if not equal then it should be deleted and show the latest one

self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 5);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});


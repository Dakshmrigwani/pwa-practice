const staticCacheName = "static-cache-v1";

const assets = ["/", "/index.html", "/app.css", "/app.js"];

self.addEventListener("install", (evt) => {
  console.log("service worker has been installed", evt);
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       cache.addAll(assets); // it stores all the data we want to store for our app
//     })
//   );
});

self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated", evt);
});
//respondwith do top pause the fetch event and respond with the custom event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
//   evt.respondwith(
//     caches.match(evt.request).then((cacheRes) => {
//       return cacheRes || fetch(evt.request);
      // it helps to compare the event like if the item is not there then take from the server
//     })
//   );
});

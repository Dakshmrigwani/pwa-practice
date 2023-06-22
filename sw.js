const staticCacheName = "static-cache-v1"

const assets = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
]

self.addEventListener('install' , evt => { 
	console.log("service worker has been installed" , evt)
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
        cache.addAll(assets) // it stores all the data we want to store for our app
        }))
})

self.addEventListener('activate' , evt => {
    console.log("service worker has been activated" , evt)
})
self.addEventListener('fetch' , evt => {
    console.log("service worker has been fetched" , evt)
})
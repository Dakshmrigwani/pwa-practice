self.addEventListener('install' , evt => { 
	console.log("service worker has been installed" , evt)
})

self.addEventListener('activate' , evt => {
    console.log("service worker has been activated" , evt)
})
self.addEventListener('fetch' , evt => {
    console.log("service worker has been fetched" , evt)
})
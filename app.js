if('serviceWorker' in navigator){
	navigator.serviceWorker.register('./sw.js')
	.then((res) => console.log("service worker register" , res))
	.catch((err) => console.log("service worker not register" , err))
}
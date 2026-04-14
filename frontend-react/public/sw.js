// const CACHE_NAME = 'dev-video-cache-v1';
// const VIDEO_EXTENSIONS = ['.mp4', '.webm'];

// const isVideoRequest = (request) => {
// 	const url = new URL(request.url);
// 	return VIDEO_EXTENSIONS.some((ext) => url.pathname.endsWith(ext));
// };

// self.addEventListener('install', (event) => {
// 	console.log('[SW] Install event');
// 	event.waitUntil(
// 		caches.open(CACHE_NAME).then((cache) => {
// 			console.log('[SW] Cache opened');
// 			return cache.addAll([]);
// 		})
// 	);
// });

// self.addEventListener('fetch', (event) => {
// 	if (!isVideoRequest(event.request)) return;

// 	console.log('[SW] Fetching video:', event.request.url);
// 	event.respondWith(
// 		caches.match(event.request).then((cachedResponse) => {
// 			if (cachedResponse) console.log('FROM CACHE');
// 			return (
// 				cachedResponse ||
// 				fetch(event.request).then((response) => {
// 					const responseToCache = response.clone();
// 					caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
// 					return response;
// 				})
// 			);
// 		})
// 	);
// });

// self.addEventListener('activate', (event) => {
// 	console.log('[SW] Activate event');
// 	event.waitUntil(
// 		caches.keys().then((cacheNames) => {
// 			return Promise.all(
// 				cacheNames.map((cacheName) => {
// 					if (cacheName !== CACHE_NAME) {
// 						return caches.delete(cacheName);
// 					}
// 				})
// 			);
// 		})
// 	);
// });

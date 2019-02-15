var staticCacheName = 'MWS-Restaurant';
var staticPrefix = "MWS";

self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                'restaurant.html',
                'css/styles.css',
                'js/dbhelper.js',
                'js/main.js',
                'js/register.js',
                'js/restaurant_info.js',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith(staticPrefix) && cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(async function () {
        const cache = await caches.open(staticCacheName);

        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) return cachedResponse;

        const networkResponse = await fetch(event.request);

        event.waitUntil(
            cache.put(event.request, networkResponse.clone())
        );

        return networkResponse;
    }());
});
const CACHE_VERSION = "gym-app-pwa-v1";
const STATIC_CACHE = `${ CACHE_VERSION }-static`;
const OFFLINE_URL = "/offline";
const STATIC_URLS = [
  OFFLINE_URL,
  "/app-icon.svg",
  "/logo.png",
  "/apple-icon",
];

self.addEventListener( "install", ( event ) => {
  event.waitUntil(
    caches.open( STATIC_CACHE )
      .then( ( cache ) => cache.addAll( STATIC_URLS ) )
      .then( () => self.skipWaiting() )
  );
} );

self.addEventListener( "activate", ( event ) => {
  event.waitUntil(
    caches.keys()
      .then(
        ( cacheNames ) => Promise.all(
          cacheNames.map( ( cacheName ) => {
            if (cacheName !== STATIC_CACHE) {
              return caches.delete( cacheName );
            }

            return Promise.resolve( false );
          } )
        )
      )
      .then( () => self.clients.claim() )
  );
} );

self.addEventListener( "fetch", ( event ) => {
  const { request } = event;
  const url = new URL( request.url );

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch( request ).catch( async () => {
        const cache = await caches.open( STATIC_CACHE );

        return cache.match( OFFLINE_URL );
      } )
    );

    return;
  }

  if (url.pathname.startsWith( "/api/" )) {
    return;
  }

  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker" ||
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname.startsWith( "/_next/static/" )
  ) {
    event.respondWith(
      caches.match( request ).then( async ( cachedResponse ) => {
        const networkResponsePromise = fetch( request )
          .then( async ( response ) => {
            if (response.ok) {
              const cache = await caches.open( STATIC_CACHE );

              await cache.put( request, response.clone() );
            }

            return response;
          } )
          .catch( () => cachedResponse );

        return cachedResponse ?? networkResponsePromise;
      } )
    );
  }
} );

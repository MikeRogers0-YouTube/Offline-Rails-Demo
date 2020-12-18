if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js', { scope: "/" })
      .then(function(registration) {
        console.log('[ServiceWorker Client]', 'registration successful with scope: ', registration.scope);

        registration.addEventListener('updatefound', function() {
          console.log('[ServiceWorker Client]', 'updatefound')

          caches.open('documents').then(function(cache) {
            let links = document.querySelectorAll('a[href^="/"]:not([rel="nofollow"])');
            cache.addAll( Array.from(links).map(elem => elem.getAttribute("href")) );
            cache.addAll( [document.location.pathname] );
          });

          caches.open('assets-styles-and-scripts').then(function(cache) {
            let stylesheetLinks = document.querySelectorAll('link[rel="stylesheet"][href^="/"]');
            cache.addAll( Array.from(stylesheetLinks).map(elem => elem.getAttribute("href")) );

            let scriptLinks = document.querySelectorAll('script[src^="/"]');
            cache.addAll( Array.from(scriptLinks).map(elem => elem.getAttribute("src")) );
          });
        });

      }, function(err) {
        console.log('[ServiceWorker Client]','registration failed: ', err);
      });
  });
}

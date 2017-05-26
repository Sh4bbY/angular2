'use strict';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/precache-service-worker.js')
            .then(function (reg) {
                reg.onupdatefound = function () { // updatefound is fired if service-worker script changes.
                    
                    var installingWorker = reg.installing;
                    
                    installingWorker.onstatechange = function () {
                        switch (installingWorker.state) {
                            case 'installed':
                                if (navigator.serviceWorker.controller) {
                                    console.log('New or updated content is available.');
                                } else {
                                    console.log('Content is now available offline!');
                                }
                                break;
                            
                            case 'redundant':
                                console.error('The installing service worker became redundant.');
                                break;
                        }
                    };
                };
            })
            .catch(function (err) {
                console.log('Service Worker registration failed: ', err);
            });
    });
}

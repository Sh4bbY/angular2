'use strict';

importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

toolbox.router.get('/assets/img/dummy.jpg', toolbox.cacheFirst);

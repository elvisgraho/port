"use strict";var precacheConfig=[["/27bd77b9162d388cb8d4c4217c7c5e2a.woff","27bd77b9162d388cb8d4c4217c7c5e2a"],["/5b1b8b856d7a8cb1cb0bae6d0573f2e9.ttf","5b1b8b856d7a8cb1cb0bae6d0573f2e9"],["/6d4e78225df0cfd5fe1bf3e8547fefe4.ttf","6d4e78225df0cfd5fe1bf3e8547fefe4"],["/assets/content/general.json","cdf15d7f5323d33c19cc647aa9e78978"],["/assets/content/hobbies.json","9e17f7d2436dcf5f077253dc945a8a86"],["/assets/content/random.json","4df52e54cf76eb47154e8cd8b8a46f93"],["/assets/content/skills.json","a5ca63dbf82c74c8d345c923260d9b1e"],["/assets/content/stage.json","659da875315018a346defb7b21d280ec"],["/assets/favicon.ico","a8466acadfaa71ed6b45e43ca843577e"],["/assets/fonts/Lato-Bold.ttf","5b1b8b856d7a8cb1cb0bae6d0573f2e9"],["/assets/fonts/Lato-Bold.woff","d878b6c29b10beca227e9eef4246111b"],["/assets/fonts/Lato-Bold.woff2","cccb897485813c7c256901dbca54ecf2"],["/assets/fonts/Lato-Regular.ttf","6d4e78225df0cfd5fe1bf3e8547fefe4"],["/assets/fonts/Lato-Regular.woff","27bd77b9162d388cb8d4c4217c7c5e2a"],["/assets/fonts/Lato-Regular.woff2","bd03a2cc277bbbc338d464e679fe9942"],["/assets/icons/android-chrome-192x192.png","59e221032ab061cad83b6ce2bcddbde8"],["/assets/icons/android-chrome-512x512.png","cf3fdf7af60a294d6d3f48cb7ad82488"],["/assets/icons/apple-touch-icon.png","a0e46feb3cc577478b127936e739dd08"],["/assets/icons/favicon-16x16.png","d712b605ed58419c7e6d4ab885d147b7"],["/assets/icons/favicon-32x32.png","2f7ce797cf8f198dedb9a9f38b7ef13b"],["/assets/icons/mstile-150x150.png","ba817517b2c4e1ba1ce802c4d4fafdb4"],["/bd03a2cc277bbbc338d464e679fe9942.woff2","bd03a2cc277bbbc338d464e679fe9942"],["/bundle.20353.js","cae87a893eaa400bea1c8eb7ecfcef32"],["/cccb897485813c7c256901dbca54ecf2.woff2","cccb897485813c7c256901dbca54ecf2"],["/d878b6c29b10beca227e9eef4246111b.woff","d878b6c29b10beca227e9eef4246111b"],["/favicon.ico","a8466acadfaa71ed6b45e43ca843577e"],["/index.html","90c5dd3032551114313f1a8b0ed72847"],["/manifest.json","e7aaab32fc7201acc7ae22bb2cd9c3cc"],["/route-hobbies.chunk.90a41.js","3b48b6dbefa91f1f1aef95dc6116cea0"],["/route-random.chunk.dc0ad.js","83a7261c0482a5a5f480010154b0a80a"],["/route-skills.chunk.bf614.js","07fc2b7bb902da335a768f5d9d671b1c"],["/style.5e9e0.css","3eab033f1bfeca7c05d4d25d40ea3691"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],c=new URL(t,self.location),n=createCacheKey(c,hashParamName,a,!1);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var c=new Request(a,{credentials:"same-origin"});return fetch(c).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});
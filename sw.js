/* Ari'nin AGS Rehberi — çevrimdışı çalışma
   İnternet varsa her zaman en yeni dosyalar alınır; yoksa kayıtlı kopya açılır.
   Böylece dosyaları güncellediğinizde (yama) ekstra bir şey yapmanız gerekmez. */
var ONBELLEK = 'ari-ags-v1';
var DOSYALAR = ['./', 'index.html', 'stil.css', 'plan.js', 'veri.js', 'metinler.js', 'motor.js', 'uygulama.js',
  'manifest.webmanifest', 'ikon-180.png', 'ikon-192.png', 'ikon-512.png', 'takvim.ics'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(ONBELLEK).then(function (c) { return c.addAll(DOSYALAR); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      var kopya = r.clone();
      caches.open(ONBELLEK).then(function (c) { c.put(e.request, kopya); });
      return r;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('index.html'); });
    })
  );
});

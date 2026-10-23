/* Small network-first service worker for the PWA install flow.
   Do not cache lessons or scripts: updates should always load from the network. */
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", function () {
  // Browser network handling remains unchanged.
});

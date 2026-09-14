/* 古生物化石背诵 —— Service Worker
 * 策略：网络优先（network-first），请求失败时回退到缓存，实现离线可用。
 * 注意：修改应用代码后请同步升级 CACHE_NAME 版本号，避免用户拿到旧缓存。
 */
const CACHE_NAME = 'paleo-fossil-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // 成功时异步写入缓存（失败不影响响应）
        const copy = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, copy))
          .catch(() => {});
        return response;
      })
      .catch(() =>
        // 离线时回退缓存；SPA 内所有资源未命中时退回 index.html
        caches.match(event.request).then((hit) => hit || caches.match('index.html'))
      )
  );
});

const cacheName = '随意链接'
const contentToCache = ['/', '/favicon.svg', '/favicon.ico']

// Installing Service Worker
self.addEventListener('install', e => {
  console.log('[Service Worker] Install')
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)
      console.log('[Service Worker] Caching all: app shell and content')
      await cache.addAll(contentToCache)
    })(),
  )
})

// Network first: 短链的跳转目标随时会变，绝不能让缓存覆盖真实数据
self.addEventListener('fetch', e => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  const url = e.request.url
  if (!(url.startsWith('http:') || url.startsWith('https:'))) return
  // 只缓存 GET，POST/DELETE 等直接放行
  if (e.request.method !== 'GET') return

  e.respondWith(
    (async () => {
      try {
        const response = await fetch(e.request)
        // 只缓存正常响应，302/404 等不进缓存
        if (response.ok) {
          const cache = await caches.open(cacheName)
          cache.put(e.request, response.clone())
        }
        return response
      } catch (error) {
        // 网络失败才回退到缓存
        const cached = await caches.match(e.request)
        if (cached) return cached
        throw error
      }
    })(),
  )
})

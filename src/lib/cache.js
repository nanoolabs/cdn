export async function getCacheResponse(request) {
  // Construct a cache key that is stable but accounts for range requests
  // We use the original URL and the Range header as the key.
  const cacheKey = new Request(request.url, {
    headers: request.headers,
    method: 'GET', // Always cache as GET even if request is HEAD
  })
  return await caches.default.match(cacheKey)
}

export async function saveToCache(request, response, ctx) {
  // Cache the response if it's successful (200 or 206)
  if (!response.ok) return

  const cacheKey = new Request(request.url, {
    headers: request.headers,
    method: 'GET',
  })

  // We clone the response to store it in cache without consuming the original body
  // IMPORTANT: We must create a new Response object to modify headers.
  // Responses from fetch() have immutable headers. Simply cloning doesn't work.
  const cacheResponse = response.clone()
  const mutableResponse = new Response(cacheResponse.body, cacheResponse)

  // Respect Cache-Control already set by the caller (e.g immutable for
  // version asset); only supply a default edge TTL when none exists.
  // s-maxage tell CF how long to keep it at edge.
  if (!mutableResponse.headers.has('Cache-Control')) {
    mutableResponse.headers.set('Cache-Control', 'public, s-maxage=3600')
  }

  // Use ctx.waitUntil so the response is sent to the user immediately,
  // while the cache write happens in the background.
  ctx.waitUntil(caches.default.put(cacheKey, mutableResponse))
}

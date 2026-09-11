const UNSIGNABLE_HEADERS = new Set([
  // These headers appear in the request, but are never passed upstream
  'authorization',
  'x-forwarded-proto',
  'x-real-ip',
  // We can't include accept-encoding in the signature because Cloudflare
  // sets the incoming accept-encoding header to "gzip, br", then modifies
  // the outgoing request to set accept-encoding to "gzip".
  // Not cool, Cloudflare!
  'accept-encoding',
  // Conditional headers are not consistently passed upstream
  'if-match',
  'if-modified-since',
  'if-none-match',
  'if-range',
  'if-unmodified-since',
])

// Filter out cf-* and any other headers we don't want to include in the signature
export function filterHeaders(headers, env) {
  const allowed = env['ALLOWED_HEADERS']
  const result = new Headers()
  for (const [key, value] of headers) {
    if (UNSIGNABLE_HEADERS.has(key) || key.startsWith('cf-')) continue
    if (allowed && !allowed.includes(key)) continue
    result.append(key, value)
  }
  return result
}

export function createHeadResponse(response) {
  return new Response(null, {
    headers: response.headers,
    status: response.status,
    statusText: response.statusText,
  })
}

export function isListBucketRequest(env, path) {
  const pathSegments = path.split('/')

  return (
    (env['BUCKET_NAME'] === '$path' && pathSegments.length < 2) || // https://endpoint/bucket-name/
    (env['BUCKET_NAME'] !== '$path' && path.length === 0)
  ) // https://bucket-name.endpoint/ or https://endpoint/
}

export function sanitizePath(pathname) {
  // Remove leading slashes from path
  let path = pathname.replace(/^\/+/, '')
  // Remove trailing slashes
  path = path.replace(/\/+$/, '')
  return path
}

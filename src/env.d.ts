// Cloudflare worker type stubs
// Full types: @cloudflare/workers-types

interface CacheStorage {
  readonly default: Cache
}

declare const caches: CacheStorage

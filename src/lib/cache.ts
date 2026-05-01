/**
 * Simple in-memory cache with TTL (Time-To-Live)
 */

type CacheEntry<T> = {
    value: T;
    expiry: number;
};

class MemoryCache {
    private cache = new Map<string, CacheEntry<any>>();

    /**
     * Set a value in the cache
     * @param key Cache key
     * @param value Value to store
     * @param ttl TTL in seconds (default: 300s / 5m)
     */
    set<T>(key: string, value: T, ttl: number = 300): void {
        const expiry = Date.now() + ttl * 1000;
        this.cache.set(key, { value, expiry });
    }

    /**
     * Get a value from the cache
     * @param key Cache key
     * @returns The cached value or null if expired/not found
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }

        return entry.value as T;
    }

    /**
     * Delete a key from the cache
     */
    delete(key: string): void {
        this.cache.delete(key);
    }

    /**
     * Clear all expired entries
     */
    cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiry) {
                this.cache.delete(key);
            }
        }
    }
}

// Export a singleton instance
export const serverCache = new MemoryCache();

// Run cleanup every minute
if (typeof setInterval !== 'undefined') {
    setInterval(() => serverCache.cleanup(), 60000);
}

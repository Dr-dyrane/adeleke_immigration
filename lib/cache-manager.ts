'use client'

/**
 * Cache Management Utilities for PWA
 * Provides functions to clear caches and force updates
 */

interface CacheInfo {
  name: string
  size: number
  created?: number
  lastAccessed?: number
  age?: number
}

interface CacheEntry {
  url: string
  timestamp: number
}

export class CacheManager {
  static async clearAllCaches(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
        console.log('All caches cleared successfully')
      } catch (error) {
        console.error('Error clearing caches:', error)
      }
    }
  }

  static async clearSpecificCache(cacheName: string): Promise<void> {
    if ('caches' in window) {
      try {
        await caches.delete(cacheName)
        console.log(`Cache ${cacheName} cleared successfully`)
      } catch (error) {
        console.error(`Error clearing cache ${cacheName}:`, error)
      }
    }
  }

  static async getCacheInfo(): Promise<CacheInfo[]> {
    if (!('caches' in window)) return []

    try {
      const cacheNames = await caches.keys()
      const cacheInfo = await Promise.all(
        cacheNames.map(async (name) => {
          const cache = await caches.open(name)
          const keys = await cache.keys()

          // Get cache creation time and age
          const cacheMetadata = await this.getCacheMetadata(name)
          const now = Date.now()
          const age = cacheMetadata.created ? now - cacheMetadata.created : 0

          return {
            name,
            size: keys.length,
            created: cacheMetadata.created,
            lastAccessed: cacheMetadata.lastAccessed,
            age
          }
        })
      )
      return cacheInfo
    } catch (error) {
      console.error('Error getting cache info:', error)
      return []
    }
  }

  static async getCacheMetadata(cacheName: string): Promise<{ created?: number; lastAccessed?: number }> {
    try {
      const metadataKey = `cache_metadata_${cacheName}`
      const stored = localStorage.getItem(metadataKey)
      if (stored) {
        return JSON.parse(stored)
      }

      // If no metadata exists, create it
      const now = Date.now()
      const metadata = { created: now, lastAccessed: now }
      localStorage.setItem(metadataKey, JSON.stringify(metadata))
      return metadata
    } catch (error) {
      console.error('Error getting cache metadata:', error)
      return {}
    }
  }

  static async updateCacheAccess(cacheName: string): Promise<void> {
    try {
      const metadataKey = `cache_metadata_${cacheName}`
      const stored = localStorage.getItem(metadataKey)
      const metadata = stored ? JSON.parse(stored) : { created: Date.now() }
      metadata.lastAccessed = Date.now()
      localStorage.setItem(metadataKey, JSON.stringify(metadata))
    } catch (error) {
      console.error('Error updating cache access:', error)
    }
  }

  static async getOldCaches(maxAgeMs: number = 24 * 60 * 60 * 1000): Promise<string[]> {
    const cacheInfo = await this.getCacheInfo()
    const now = Date.now()

    return cacheInfo
      .filter(cache => cache.age && cache.age > maxAgeMs)
      .map(cache => cache.name)
  }

  static async clearOldCaches(maxAgeMs: number = 24 * 60 * 60 * 1000): Promise<string[]> {
    const oldCaches = await this.getOldCaches(maxAgeMs)

    if (oldCaches.length > 0) {
      console.log(`Clearing ${oldCaches.length} old caches:`, oldCaches)

      await Promise.all(
        oldCaches.map(async (cacheName) => {
          await this.clearSpecificCache(cacheName)
          // Clean up metadata
          const metadataKey = `cache_metadata_${cacheName}`
          localStorage.removeItem(metadataKey)
        })
      )
    }

    return oldCaches
  }

  static async forceUpdate(): Promise<void> {
    try {
      // Clear all caches
      await this.clearAllCaches()

      // Unregister service worker
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(
          registrations.map(registration => registration.unregister())
        )
      }

      // Force reload
      window.location.reload()
    } catch (error) {
      console.error('Error forcing update:', error)
      // Fallback: just reload
      window.location.reload()
    }
  }

  static async checkForUpdates(): Promise<boolean> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
          await registration.update()
          return registration.waiting !== null
        }
      } catch (error) {
        console.error('Error checking for updates:', error)
      }
    }
    return false
  }
}

// Development helper functions
export const devCacheUtils = {
  // Clear all caches (useful during development)
  clearAll: () => CacheManager.clearAllCaches(),

  // Force complete refresh
  forceRefresh: () => CacheManager.forceUpdate(),

  // Clear old caches
  clearOld: (maxAgeMs?: number) => CacheManager.clearOldCaches(maxAgeMs),

  // Get old caches
  getOld: (maxAgeMs?: number) => CacheManager.getOldCaches(maxAgeMs),

  // Log cache information
  logCacheInfo: async () => {
    const info = await CacheManager.getCacheInfo()
    console.table(info.map(cache => ({
      ...cache,
      ageHours: cache.age ? Math.round(cache.age / (1000 * 60 * 60) * 100) / 100 : 0,
      createdAt: cache.created ? new Date(cache.created).toLocaleString() : 'Unknown',
      lastAccessedAt: cache.lastAccessed ? new Date(cache.lastAccessed).toLocaleString() : 'Unknown'
    })))
  },

  // Add to window for easy access in dev tools
  addToWindow: () => {
    if (typeof window !== 'undefined') {
      (window as any).cacheUtils = devCacheUtils
      console.log('Cache utilities added to window.cacheUtils')
      console.log('Available methods: clearAll(), forceRefresh(), clearOld(), getOld(), logCacheInfo()')
    }
  }
}

// devCacheUtils is already exported above

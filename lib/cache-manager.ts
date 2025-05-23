'use client'

/**
 * Cache Management Utilities for PWA
 * Provides functions to clear caches and force updates
 */

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

  static async getCacheInfo(): Promise<{ name: string; size: number }[]> {
    if (!('caches' in window)) return []

    try {
      const cacheNames = await caches.keys()
      const cacheInfo = await Promise.all(
        cacheNames.map(async (name) => {
          const cache = await caches.open(name)
          const keys = await cache.keys()
          return { name, size: keys.length }
        })
      )
      return cacheInfo
    } catch (error) {
      console.error('Error getting cache info:', error)
      return []
    }
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
  
  // Log cache information
  logCacheInfo: async () => {
    const info = await CacheManager.getCacheInfo()
    console.table(info)
  },
  
  // Add to window for easy access in dev tools
  addToWindow: () => {
    if (typeof window !== 'undefined') {
      (window as any).cacheUtils = devCacheUtils
      console.log('Cache utilities added to window.cacheUtils')
    }
  }
}

// Auto-add to window in development
if (process.env.NODE_ENV === 'development') {
  devCacheUtils.addToWindow()
}

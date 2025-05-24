'use client'

/**
 * Development Cache Monitor
 * Automatically monitors and clears old caches in development environment
 */

import { CacheManager } from './cache-manager'
import { getCacheConfig, type CacheConfig } from './cache-config'

export class DevCacheMonitor {
  private static instance: DevCacheMonitor | null = null
  private intervalId: NodeJS.Timeout | null = null
  private config: CacheConfig
  private isMonitoring = false
  private lastCheck = 0
  private focusListener: (() => void) | null = null
  private visibilityListener: (() => void) | null = null

  private constructor() {
    this.config = getCacheConfig()
  }

  static getInstance(): DevCacheMonitor {
    if (!DevCacheMonitor.instance) {
      DevCacheMonitor.instance = new DevCacheMonitor()
    }
    return DevCacheMonitor.instance
  }

  async start(): Promise<void> {
    if (process.env.NODE_ENV !== 'development' || !this.config.enableAutoMonitoring) {
      console.log('Cache monitoring disabled (not in development or disabled in config)')
      return
    }

    if (this.isMonitoring) {
      console.log('Cache monitoring already running')
      return
    }

    console.log('Starting development cache monitor...')
    this.isMonitoring = true

    // Start periodic checking
    if (this.config.checkInterval > 0) {
      this.intervalId = setInterval(() => {
        this.checkAndClearOldCaches()
      }, this.config.checkInterval)
    }

    // Set up focus listener
    if (this.config.clearOnFocus) {
      this.focusListener = () => this.handleFocus()
      window.addEventListener('focus', this.focusListener)
    }

    // Set up visibility change listener
    if (this.config.clearOnVisibilityChange) {
      this.visibilityListener = () => this.handleVisibilityChange()
      document.addEventListener('visibilitychange', this.visibilityListener)
    }

    // Initial check
    await this.checkAndClearOldCaches()

    console.log('Cache monitor started with config:', this.config)
  }

  stop(): void {
    if (!this.isMonitoring) return

    console.log('Stopping development cache monitor...')
    this.isMonitoring = false

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }

    if (this.focusListener) {
      window.removeEventListener('focus', this.focusListener)
      this.focusListener = null
    }

    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener)
      this.visibilityListener = null
    }
  }

  async checkAndClearOldCaches(): Promise<void> {
    try {
      const now = Date.now()

      // Throttle checks to avoid excessive processing
      if (now - this.lastCheck < 30000) { // Minimum 30 seconds between checks
        return
      }

      this.lastCheck = now

      const oldCaches = await CacheManager.getOldCaches(this.config.maxCacheAge)

      if (oldCaches.length === 0) {
        return
      }

      // Filter out excluded caches
      const cachesToClear = oldCaches.filter(
        cacheName => !this.config.excludedCaches.includes(cacheName)
      )

      if (cachesToClear.length < this.config.minCachesForAutoClear) {
        console.log(`Found ${cachesToClear.length} old caches, but minimum is ${this.config.minCachesForAutoClear}`)
        return
      }

      console.log(`Found ${cachesToClear.length} old caches to clear:`, cachesToClear)

      if (this.config.autoClearOldCaches) {
        const clearedCaches = await this.clearCaches(cachesToClear)

        if (this.config.showNotifications && clearedCaches.length > 0) {
          this.showNotification(`Cleared ${clearedCaches.length} old cache(s)`)
        }

        if (this.config.forceReloadAfterClear && clearedCaches.length > 0) {
          console.log('Reloading page after cache clear...')
          window.location.reload()
        }
      } else {
        console.log('Auto-clear disabled, old caches found but not cleared:', cachesToClear)

        if (this.config.showNotifications) {
          this.showNotification(`${cachesToClear.length} old cache(s) detected`)
        }
      }
    } catch (error) {
      console.error('Error in cache monitor check:', error)
    }
  }

  private async clearCaches(cacheNames: string[]): Promise<string[]> {
    const cleared: string[] = []

    for (const cacheName of cacheNames) {
      try {
        await CacheManager.clearSpecificCache(cacheName)
        cleared.push(cacheName)
      } catch (error) {
        console.error(`Error clearing cache ${cacheName}:`, error)
      }
    }

    return cleared
  }

  private async handleFocus(): Promise<void> {
    console.log('Window focused, checking for old caches...')
    await this.checkAndClearOldCaches()
  }

  private async handleVisibilityChange(): Promise<void> {
    if (!document.hidden) {
      console.log('Page became visible, checking for old caches...')
      await this.checkAndClearOldCaches()
    }
  }

  private showNotification(message: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Cache Monitor', {
        body: message,
        icon: '/icons/icon-192.svg'
      })
    } else {
      // Fallback to console
      console.log(`🧹 Cache Monitor: ${message}`)
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<CacheConfig>): void {
    this.config = { ...this.config, ...newConfig }

    // Restart if monitoring to apply new config
    if (this.isMonitoring) {
      this.stop()
      this.start()
    }
  }

  // Get current status
  getStatus(): {
    isMonitoring: boolean
    config: CacheConfig
    lastCheck: number
    nextCheck?: number
  } {
    return {
      isMonitoring: this.isMonitoring,
      config: this.config,
      lastCheck: this.lastCheck,
      nextCheck: this.intervalId ? this.lastCheck + this.config.checkInterval : undefined
    }
  }

  // Manual trigger
  async triggerCheck(): Promise<void> {
    console.log('Manually triggering cache check...')
    this.lastCheck = 0 // Reset throttle
    await this.checkAndClearOldCaches()
  }
}

// Export for manual initialization

export default DevCacheMonitor

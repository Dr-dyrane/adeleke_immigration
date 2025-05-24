'use client'

import { useEffect } from 'react'

/**
 * Cache Initializer Component
 * Ensures cache management utilities are properly initialized on the client side
 */
export function CacheInitializer() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Initialize cache utilities with a delay to ensure everything is loaded
    const initializeCache = async () => {
      try {
        // Import and initialize cache manager
        const { devCacheUtils } = await import('@/lib/cache-manager')
        devCacheUtils.addToWindow()

        // Import and initialize cache monitor
        const DevCacheMonitor = (await import('@/lib/dev-cache-monitor')).default
        const monitor = DevCacheMonitor.getInstance()
        await monitor.start()
        
        // Add monitor to window
        ;(window as any).cacheMonitor = monitor

        // Import and add test utilities
        const { CacheTestUtils } = await import('@/lib/cache-test')
        ;(window as any).cacheTestUtils = CacheTestUtils

        console.log('🧹 Cache Management System Initialized')
        console.log('Available utilities:')
        console.log('- window.cacheUtils (cache operations)')
        console.log('- window.cacheMonitor (monitoring controls)')
        console.log('- window.cacheTestUtils (testing functions)')
        console.log('')
        console.log('Quick start: window.cacheTestUtils.runFullTest()')

      } catch (error) {
        console.error('Error initializing cache management:', error)
      }
    }

    // Initialize after a short delay
    const timeoutId = setTimeout(initializeCache, 1500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // This component doesn't render anything
  return null
}

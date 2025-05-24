/**
 * Cache Management System Test Utilities
 * Use these functions to test the cache management system
 */

import { CacheManager } from './cache-manager'
import DevCacheMonitor from './dev-cache-monitor'
import { getCacheConfig, saveCacheConfig, applyCacheConfigPreset } from './cache-config'

export class CacheTestUtils {
  /**
   * Run a comprehensive test of the cache management system
   */
  static async runFullTest(): Promise<void> {
    console.log('🧪 Starting Cache Management System Test...')

    try {
      // Test 1: Cache Info
      console.log('\n📊 Test 1: Cache Information')
      const cacheInfo = await CacheManager.getCacheInfo()
      console.log('Current caches:', cacheInfo)

      // Test 2: Create test cache
      console.log('\n🗃️ Test 2: Creating Test Cache')
      await this.createTestCache()

      // Test 3: Monitor status
      console.log('\n👁️ Test 3: Monitor Status')
      const monitor = DevCacheMonitor.getInstance()
      const status = monitor.getStatus()
      console.log('Monitor status:', status)

      // Test 4: Configuration
      console.log('\n⚙️ Test 4: Configuration Test')
      const config = getCacheConfig()
      console.log('Current config:', config)

      // Test 5: Old cache detection
      console.log('\n🕰️ Test 5: Old Cache Detection')
      const oldCaches = await CacheManager.getOldCaches(1000) // 1 second for testing
      console.log('Old caches (1s threshold):', oldCaches)

      // Test 6: Manual trigger
      console.log('\n🔄 Test 6: Manual Trigger')
      await monitor.triggerCheck()
      console.log('Manual check triggered')

      // Test 7: Preset application
      console.log('\n🎛️ Test 7: Preset Application')
      applyCacheConfigPreset('aggressive')
      console.log('Applied aggressive preset')

      console.log('\n✅ All tests completed successfully!')

    } catch (error) {
      console.error('❌ Test failed:', error)
    }
  }

  /**
   * Create a test cache for testing purposes
   */
  static async createTestCache(): Promise<void> {
    if (!('caches' in window)) {
      console.log('Cache API not available')
      return
    }

    try {
      const testCacheName = 'test-cache-' + Date.now()
      const cache = await caches.open(testCacheName)

      // Add a test response
      const testResponse = new Response('Test cache content', {
        headers: { 'Content-Type': 'text/plain' }
      })

      await cache.put('/test-url', testResponse)
      console.log(`Created test cache: ${testCacheName}`)

      // Update metadata
      await CacheManager.updateCacheAccess(testCacheName)

    } catch (error) {
      console.error('Error creating test cache:', error)
    }
  }

  /**
   * Test cache age detection
   */
  static async testCacheAging(): Promise<void> {
    console.log('🕐 Testing cache aging...')

    // Create a cache with old timestamp
    const testCacheName = 'old-test-cache'
    const oldTimestamp = Date.now() - (3 * 60 * 60 * 1000) // 3 hours ago

    // Manually set old metadata
    const metadataKey = `cache_metadata_${testCacheName}`
    localStorage.setItem(metadataKey, JSON.stringify({
      created: oldTimestamp,
      lastAccessed: oldTimestamp
    }))

    // Create the actual cache
    if ('caches' in window) {
      const cache = await caches.open(testCacheName)
      await cache.put('/old-test', new Response('Old test content'))
    }

    // Test detection
    const oldCaches = await CacheManager.getOldCaches(2 * 60 * 60 * 1000) // 2 hours
    console.log('Detected old caches:', oldCaches)

    // Clean up
    await CacheManager.clearSpecificCache(testCacheName)
    localStorage.removeItem(metadataKey)

    console.log('Cache aging test completed')
  }

  /**
   * Test configuration changes
   */
  static testConfiguration(): void {
    console.log('⚙️ Testing configuration...')

    const originalConfig = getCacheConfig()
    console.log('Original config:', originalConfig)

    // Test config override
    saveCacheConfig({
      maxCacheAge: 30 * 60 * 1000, // 30 minutes
      autoClearOldCaches: false
    })

    const updatedConfig = getCacheConfig()
    console.log('Updated config:', updatedConfig)

    // Test preset
    applyCacheConfigPreset('conservative')
    const presetConfig = getCacheConfig()
    console.log('Preset config:', presetConfig)

    console.log('Configuration test completed')
  }

  /**
   * Test monitor functionality
   */
  static async testMonitor(): Promise<void> {
    console.log('👁️ Testing monitor...')

    const monitor = DevCacheMonitor.getInstance()

    // Test status
    let status = monitor.getStatus()
    console.log('Initial status:', status)

    // Test start/stop
    await monitor.start()
    status = monitor.getStatus()
    console.log('After start:', status)

    // Test manual trigger
    await monitor.triggerCheck()
    console.log('Manual trigger completed')

    // Test config update
    monitor.updateConfig({ showNotifications: false })
    status = monitor.getStatus()
    console.log('After config update:', status)

    console.log('Monitor test completed')
  }

  /**
   * Performance test - measure cache operations
   */
  static async performanceTest(): Promise<void> {
    console.log('⚡ Running performance test...')

    const iterations = 10
    const results: { operation: string; time: number }[] = []

    // Test cache info retrieval
    const start1 = performance.now()
    for (let i = 0; i < iterations; i++) {
      await CacheManager.getCacheInfo()
    }
    const end1 = performance.now()
    results.push({ operation: 'getCacheInfo', time: (end1 - start1) / iterations })

    // Test old cache detection
    const start2 = performance.now()
    for (let i = 0; i < iterations; i++) {
      await CacheManager.getOldCaches()
    }
    const end2 = performance.now()
    results.push({ operation: 'getOldCaches', time: (end2 - start2) / iterations })

    console.log('Performance results (avg ms per operation):')
    console.table(results)
  }

  /**
   * Stress test - create many caches and test clearing
   */
  static async stressTest(): Promise<void> {
    console.log('💪 Running stress test...')

    if (!('caches' in window)) {
      console.log('Cache API not available for stress test')
      return
    }

    const cacheCount = 20
    const createdCaches: string[] = []

    try {
      // Create multiple test caches
      for (let i = 0; i < cacheCount; i++) {
        const cacheName = `stress-test-cache-${i}-${Date.now()}`
        const cache = await caches.open(cacheName)
        await cache.put(`/test-${i}`, new Response(`Test content ${i}`))
        createdCaches.push(cacheName)

        // Add metadata with varying ages
        const age = Math.random() * 4 * 60 * 60 * 1000 // 0-4 hours
        const timestamp = Date.now() - age
        const metadataKey = `cache_metadata_${cacheName}`
        localStorage.setItem(metadataKey, JSON.stringify({
          created: timestamp,
          lastAccessed: timestamp
        }))
      }

      console.log(`Created ${cacheCount} test caches`)

      // Test cache info with many caches
      const start = performance.now()
      const cacheInfo = await CacheManager.getCacheInfo()
      const end = performance.now()

      console.log(`Cache info retrieval took ${end - start}ms for ${cacheInfo.length} caches`)

      // Test old cache detection
      const oldCaches = await CacheManager.getOldCaches(2 * 60 * 60 * 1000) // 2 hours
      console.log(`Found ${oldCaches.length} old caches`)

      // Test bulk clearing
      const clearStart = performance.now()
      const clearedCaches = await CacheManager.clearOldCaches(2 * 60 * 60 * 1000)
      const clearEnd = performance.now()

      console.log(`Cleared ${clearedCaches.length} caches in ${clearEnd - clearStart}ms`)

    } finally {
      // Clean up remaining caches
      for (const cacheName of createdCaches) {
        try {
          await CacheManager.clearSpecificCache(cacheName)
          localStorage.removeItem(`cache_metadata_${cacheName}`)
        } catch (error) {
          console.warn(`Failed to clean up cache ${cacheName}:`, error)
        }
      }
      console.log('Stress test cleanup completed')
    }
  }
}

// CacheTestUtils is already exported above

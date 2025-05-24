/**
 * Cache Configuration for Development Auto-Invalidation
 * Configurable settings for automatic cache management
 */

export interface CacheConfig {
  // Enable automatic cache monitoring in development
  enableAutoMonitoring: boolean

  // Maximum age before cache is considered old (in milliseconds)
  maxCacheAge: number

  // How often to check for old caches (in milliseconds)
  checkInterval: number

  // Whether to automatically clear old caches
  autoClearOldCaches: boolean

  // Whether to show notifications when caches are cleared
  showNotifications: boolean

  // Whether to force reload after clearing caches
  forceReloadAfterClear: boolean

  // Minimum number of caches before auto-clearing kicks in
  minCachesForAutoClear: number

  // Cache names to exclude from auto-clearing
  excludedCaches: string[]

  // Whether to clear caches on page focus (when returning to tab)
  clearOnFocus: boolean

  // Whether to clear caches on visibility change
  clearOnVisibilityChange: boolean
}

// Default configuration for development
export const defaultDevCacheConfig: CacheConfig = {
  enableAutoMonitoring: true,
  maxCacheAge: 2 * 60 * 60 * 1000, // 2 hours in development
  checkInterval: 5 * 60 * 1000, // Check every 5 minutes
  autoClearOldCaches: true,
  showNotifications: true,
  forceReloadAfterClear: false, // Don't force reload by default
  minCachesForAutoClear: 1, // Clear even single old cache
  excludedCaches: [], // No exclusions by default
  clearOnFocus: true, // Clear when returning to tab
  clearOnVisibilityChange: false // Don't clear on every visibility change
}

// Production configuration (more conservative)
export const defaultProdCacheConfig: CacheConfig = {
  enableAutoMonitoring: false,
  maxCacheAge: 24 * 60 * 60 * 1000, // 24 hours in production
  checkInterval: 60 * 60 * 1000, // Check every hour
  autoClearOldCaches: false,
  showNotifications: false,
  forceReloadAfterClear: false,
  minCachesForAutoClear: 3,
  excludedCaches: ['adeleke-static-v2'], // Protect static cache
  clearOnFocus: false,
  clearOnVisibilityChange: false
}

// Alternative production configurations
export const prodCacheStrategies = {
  // Completely disabled (safest)
  disabled: {
    enableAutoMonitoring: false,
    autoClearOldCaches: false,
    clearOnFocus: false,
    clearOnVisibilityChange: false,
    showNotifications: false
  },

  // Manual tools only (recommended)
  manualOnly: {
    enableAutoMonitoring: false,
    autoClearOldCaches: false,
    clearOnFocus: false,
    clearOnVisibilityChange: false,
    showNotifications: false,
    // Manual utilities still available via console
  },

  // Conservative auto-management (advanced)
  conservative: {
    enableAutoMonitoring: true,
    maxCacheAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    checkInterval: 4 * 60 * 60 * 1000, // Check every 4 hours
    autoClearOldCaches: true,
    showNotifications: false, // Silent operation
    forceReloadAfterClear: false,
    minCachesForAutoClear: 5, // Only clear if many old caches
    excludedCaches: ['adeleke-static-v2', 'adeleke-dynamic-v2'],
    clearOnFocus: false,
    clearOnVisibilityChange: false
  },

  // User-controlled (let users decide)
  userControlled: {
    enableAutoMonitoring: false,
    autoClearOldCaches: false,
    clearOnFocus: false,
    clearOnVisibilityChange: false,
    showNotifications: true, // Notify about old caches
    // Users can manually clear via notifications
  }
}

// Get configuration based on environment
export function getCacheConfig(): CacheConfig {
  const isDev = process.env.NODE_ENV === 'development'
  const baseConfig = isDev ? defaultDevCacheConfig : defaultProdCacheConfig

  // Allow override via localStorage in development
  if (isDev && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('dev_cache_config')
      if (stored) {
        const override = JSON.parse(stored)
        return { ...baseConfig, ...override }
      }
    } catch (error) {
      console.warn('Error loading cache config override:', error)
    }
  }

  return baseConfig
}

// Save configuration override (development only)
export function saveCacheConfig(config: Partial<CacheConfig>): void {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    try {
      const current = getCacheConfig()
      const updated = { ...current, ...config }
      localStorage.setItem('dev_cache_config', JSON.stringify(updated))
      console.log('Cache config updated:', updated)
    } catch (error) {
      console.error('Error saving cache config:', error)
    }
  }
}

// Reset to default configuration
export function resetCacheConfig(): void {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    localStorage.removeItem('dev_cache_config')
    console.log('Cache config reset to defaults')
  }
}

// Utility functions for common configurations
export const cacheConfigPresets = {
  // Very aggressive clearing (for active development)
  aggressive: {
    maxCacheAge: 30 * 60 * 1000, // 30 minutes
    checkInterval: 2 * 60 * 1000, // Check every 2 minutes
    autoClearOldCaches: true,
    clearOnFocus: true,
    forceReloadAfterClear: true
  },

  // Moderate clearing (default development)
  moderate: defaultDevCacheConfig,

  // Conservative clearing (for testing)
  conservative: {
    maxCacheAge: 6 * 60 * 60 * 1000, // 6 hours
    checkInterval: 30 * 60 * 1000, // Check every 30 minutes
    autoClearOldCaches: true,
    clearOnFocus: false,
    forceReloadAfterClear: false
  },

  // Disabled (no automatic clearing)
  disabled: {
    enableAutoMonitoring: false,
    autoClearOldCaches: false,
    clearOnFocus: false,
    clearOnVisibilityChange: false
  }
}

// Apply a preset configuration
export function applyCacheConfigPreset(preset: keyof typeof cacheConfigPresets): void {
  const config = cacheConfigPresets[preset]
  saveCacheConfig(config)
}

/**
 * PWA Update Configuration
 * Manages different update strategies for development and production
 */

export type UpdateStrategy = 'prompt' | 'auto' | 'aggressive' | 'disabled'

export interface UpdateConfig {
  // Update strategy
  strategy: UpdateStrategy
  
  // How often to check for updates (in milliseconds)
  checkInterval: number
  
  // Auto-update delay (for 'auto' strategy)
  autoUpdateDelay: number
  
  // Whether to clear caches on update
  clearCachesOnUpdate: boolean
  
  // Whether to show update notifications
  showNotifications: boolean
  
  // Whether to check for updates on page focus
  checkOnFocus: boolean
  
  // Whether to check for updates on network reconnection
  checkOnReconnect: boolean
  
  // Maximum number of update prompts to show per session
  maxPromptsPerSession: number
  
  // Whether to force reload after update
  forceReloadAfterUpdate: boolean
}

// Development configuration (more aggressive)
export const defaultDevUpdateConfig: UpdateConfig = {
  strategy: 'prompt',
  checkInterval: 5 * 60 * 1000, // Check every 5 minutes
  autoUpdateDelay: 10 * 1000, // 10 seconds for auto-update
  clearCachesOnUpdate: true,
  showNotifications: true,
  checkOnFocus: true,
  checkOnReconnect: true,
  maxPromptsPerSession: 5,
  forceReloadAfterUpdate: true
}

// Production configuration (more conservative)
export const defaultProdUpdateConfig: UpdateConfig = {
  strategy: 'prompt',
  checkInterval: 30 * 60 * 1000, // Check every 30 minutes
  autoUpdateDelay: 30 * 1000, // 30 seconds for auto-update
  clearCachesOnUpdate: true,
  showNotifications: true,
  checkOnFocus: false, // Don't check on every focus in production
  checkOnReconnect: true,
  maxPromptsPerSession: 2, // Limit prompts in production
  forceReloadAfterUpdate: true
}

// Update strategy presets
export const updateStrategies = {
  // User controls all updates (recommended for most apps)
  prompt: {
    strategy: 'prompt' as UpdateStrategy,
    checkInterval: 30 * 60 * 1000, // 30 minutes
    autoUpdateDelay: 0, // No auto-update
    showNotifications: true,
    maxPromptsPerSession: 3
  },
  
  // Automatic updates with user notification
  auto: {
    strategy: 'auto' as UpdateStrategy,
    checkInterval: 15 * 60 * 1000, // 15 minutes
    autoUpdateDelay: 30 * 1000, // 30 seconds delay
    showNotifications: true,
    maxPromptsPerSession: 2
  },
  
  // Immediate updates (for critical apps)
  aggressive: {
    strategy: 'aggressive' as UpdateStrategy,
    checkInterval: 5 * 60 * 1000, // 5 minutes
    autoUpdateDelay: 1 * 1000, // 1 second delay
    showNotifications: true,
    maxPromptsPerSession: 1
  },
  
  // No automatic updates
  disabled: {
    strategy: 'disabled' as UpdateStrategy,
    checkInterval: 0, // No checking
    autoUpdateDelay: 0,
    showNotifications: false,
    maxPromptsPerSession: 0
  },
  
  // Conservative for production
  conservative: {
    strategy: 'prompt' as UpdateStrategy,
    checkInterval: 60 * 60 * 1000, // 1 hour
    autoUpdateDelay: 0,
    showNotifications: true,
    maxPromptsPerSession: 1,
    checkOnFocus: false
  }
}

// Get configuration based on environment
export function getUpdateConfig(): UpdateConfig {
  const isDev = process.env.NODE_ENV === 'development'
  const baseConfig = isDev ? defaultDevUpdateConfig : defaultProdUpdateConfig
  
  // Allow override via environment variable
  const strategyOverride = process.env.NEXT_PUBLIC_UPDATE_STRATEGY as UpdateStrategy
  if (strategyOverride && updateStrategies[strategyOverride]) {
    return {
      ...baseConfig,
      ...updateStrategies[strategyOverride]
    }
  }
  
  // Allow override via localStorage in development
  if (isDev && typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('dev_update_config')
      if (stored) {
        const override = JSON.parse(stored)
        return { ...baseConfig, ...override }
      }
    } catch (error) {
      console.warn('Error loading update config override:', error)
    }
  }
  
  return baseConfig
}

// Save configuration override (development only)
export function saveUpdateConfig(config: Partial<UpdateConfig>): void {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    try {
      const current = getUpdateConfig()
      const updated = { ...current, ...config }
      localStorage.setItem('dev_update_config', JSON.stringify(updated))
      console.log('Update config updated:', updated)
    } catch (error) {
      console.error('Error saving update config:', error)
    }
  }
}

// Apply a preset strategy
export function applyUpdateStrategy(strategy: keyof typeof updateStrategies): void {
  const config = updateStrategies[strategy]
  saveUpdateConfig(config)
}

// Reset to default configuration
export function resetUpdateConfig(): void {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    localStorage.removeItem('dev_update_config')
    console.log('Update config reset to defaults')
  }
}

// Utility functions for update management
export const updateUtils = {
  // Check if updates should be automatic
  isAutoUpdate: (config: UpdateConfig) => 
    config.strategy === 'auto' || config.strategy === 'aggressive',
  
  // Check if updates should be prompted
  shouldPrompt: (config: UpdateConfig) => 
    config.strategy === 'prompt' || config.strategy === 'auto',
  
  // Check if updates are disabled
  isDisabled: (config: UpdateConfig) => 
    config.strategy === 'disabled',
  
  // Get human-readable strategy name
  getStrategyName: (strategy: UpdateStrategy) => {
    switch (strategy) {
      case 'prompt': return 'User Controlled'
      case 'auto': return 'Automatic'
      case 'aggressive': return 'Immediate'
      case 'disabled': return 'Disabled'
      default: return 'Unknown'
    }
  },
  
  // Get strategy description
  getStrategyDescription: (strategy: UpdateStrategy) => {
    switch (strategy) {
      case 'prompt': return 'User decides when to update'
      case 'auto': return 'Updates automatically after delay'
      case 'aggressive': return 'Updates immediately when available'
      case 'disabled': return 'No automatic updates'
      default: return ''
    }
  }
}

// Production-specific recommendations
export const productionRecommendations = {
  // For most web apps
  standard: 'prompt',
  
  // For critical business apps
  business: 'auto',
  
  // For internal tools
  internal: 'aggressive',
  
  // For public-facing apps with high traffic
  public: 'conservative',
  
  // For apps with sensitive data
  secure: 'prompt'
}

// Development utilities
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  // Add to window for debugging
  (window as any).updateUtils = {
    ...updateUtils,
    getConfig: getUpdateConfig,
    saveConfig: saveUpdateConfig,
    applyStrategy: applyUpdateStrategy,
    resetConfig: resetUpdateConfig,
    strategies: updateStrategies
  }
}

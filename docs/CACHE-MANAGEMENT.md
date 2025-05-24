# Cache Management System

This document describes the automatic cache invalidation system for development environments.

## Overview

The cache management system automatically detects and clears old caches during development to ensure you're always working with fresh content. This prevents issues where cached content interferes with development workflow.

## Features

### Automatic Cache Monitoring
- **Background monitoring**: Continuously monitors cache age in development
- **Configurable thresholds**: Set custom age limits for cache invalidation
- **Smart triggers**: Automatically clears caches based on various triggers
- **Visual feedback**: Shows notifications when caches are cleared

### Development Tools
- **Cache Panel UI**: Visual interface for cache management
- **Browser Console Tools**: Command-line utilities for cache operations
- **Real-time Status**: Monitor cache status and configuration
- **Manual Controls**: Force cache clearing and updates

## Quick Start

### Automatic Setup
The cache monitoring system starts automatically in development mode. No additional setup required!

### Manual Control
Access cache utilities in browser dev tools:
```javascript
// View cache information
window.cacheUtils.logCacheInfo()

// Clear all caches
window.cacheUtils.clearAll()

// Clear old caches only
window.cacheUtils.clearOld()

// Force complete refresh
window.cacheUtils.forceRefresh()
```

### Cache Panel
Click the "Cache Panel" button in the bottom-right corner (development only) to access:
- Real-time cache status
- Manual cache clearing
- Configuration options
- Monitor controls

## Configuration

### Default Settings (Development)
- **Max Cache Age**: 2 hours
- **Check Interval**: 5 minutes
- **Auto Clear**: Enabled
- **Clear on Focus**: Enabled (when returning to browser tab)
- **Notifications**: Enabled

### Customization
Use the Cache Panel UI or modify settings programmatically:

```javascript
// Access cache monitor
const monitor = window.cacheMonitor

// Update configuration
monitor.updateConfig({
  maxCacheAge: 30 * 60 * 1000, // 30 minutes
  autoClearOldCaches: true,
  clearOnFocus: true
})

// Apply presets
window.cacheUtils.applyCacheConfigPreset('aggressive')
```

### Available Presets
- **aggressive**: 30min age, 2min checks, auto-clear + reload
- **moderate**: 2hr age, 5min checks, auto-clear (default)
- **conservative**: 6hr age, 30min checks, auto-clear only
- **disabled**: No automatic clearing

## Cache Types

The system manages these cache types:
- **Static Cache** (`adeleke-static-v2`): Core app files
- **Dynamic Cache** (`adeleke-dynamic-v2`): API responses and dynamic content
- **Browser Caches**: Various browser-managed caches

## Triggers

### Automatic Triggers
1. **Age-based**: Caches older than configured threshold
2. **Focus-based**: When returning to browser tab
3. **Periodic**: Regular interval checks
4. **Service Worker Updates**: When new SW version detected

### Manual Triggers
1. **Cache Panel**: UI controls for immediate clearing
2. **Console Commands**: Direct JavaScript API calls
3. **Keyboard Shortcuts**: (if configured)
4. **Development Scripts**: npm run commands

## Development Workflow

### Typical Usage
1. Start development server: `npm run dev`
2. Cache monitor starts automatically
3. Work normally - old caches cleared automatically
4. Use Cache Panel for manual control when needed

### When to Use Manual Clearing
- Testing cache-dependent features
- Debugging cache-related issues
- Before important testing sessions
- When switching between branches with different assets

### Troubleshooting Cache Issues
1. Open Cache Panel to check current status
2. Use `window.cacheUtils.logCacheInfo()` to inspect caches
3. Try `window.cacheUtils.clearAll()` for complete reset
4. Use `window.cacheUtils.forceRefresh()` for hard refresh

## API Reference

### CacheManager Class
```typescript
// Clear all caches
CacheManager.clearAllCaches(): Promise<void>

// Clear specific cache
CacheManager.clearSpecificCache(name: string): Promise<void>

// Get cache information
CacheManager.getCacheInfo(): Promise<CacheInfo[]>

// Clear old caches
CacheManager.clearOldCaches(maxAge?: number): Promise<string[]>

// Force complete update
CacheManager.forceUpdate(): Promise<void>
```

### DevCacheMonitor Class
```typescript
// Get monitor instance
DevCacheMonitor.getInstance(): DevCacheMonitor

// Start/stop monitoring
monitor.start(): Promise<void>
monitor.stop(): void

// Manual check
monitor.triggerCheck(): Promise<void>

// Update configuration
monitor.updateConfig(config: Partial<CacheConfig>): void

// Get status
monitor.getStatus(): MonitorStatus
```

### Configuration Options
```typescript
interface CacheConfig {
  enableAutoMonitoring: boolean      // Enable automatic monitoring
  maxCacheAge: number               // Max age in milliseconds
  checkInterval: number             // Check frequency in milliseconds
  autoClearOldCaches: boolean       // Auto-clear old caches
  showNotifications: boolean        // Show clear notifications
  forceReloadAfterClear: boolean    // Reload page after clearing
  minCachesForAutoClear: number     // Minimum caches before auto-clear
  excludedCaches: string[]          // Cache names to exclude
  clearOnFocus: boolean             // Clear when tab gains focus
  clearOnVisibilityChange: boolean  // Clear on visibility change
}
```

## Production Behavior

In production:
- Cache monitoring is **disabled** by default
- More conservative cache retention
- No automatic clearing
- No development UI components
- Manual clearing still available via console

## Best Practices

### Development
1. Use default settings for most development work
2. Switch to "aggressive" preset for active feature development
3. Use "conservative" preset when testing cache behavior
4. Monitor cache panel during debugging sessions

### Testing
1. Clear caches before important test runs
2. Test both with and without caches
3. Verify cache behavior in production-like settings
4. Use manual triggers for controlled testing

### Performance
1. Monitor cache sizes and growth
2. Exclude important caches from auto-clearing when needed
3. Adjust check intervals based on development needs
4. Use focus-based clearing to minimize interruptions

## Troubleshooting

### Common Issues
1. **Caches not clearing**: Check if monitoring is enabled
2. **Too frequent clearing**: Increase maxCacheAge or disable clearOnFocus
3. **Missing updates**: Try manual force refresh
4. **Performance impact**: Increase check interval

### Debug Commands
```javascript
// Check monitor status
window.cacheMonitor.getStatus()

// View detailed cache info
window.cacheUtils.logCacheInfo()

// Test configuration
window.cacheMonitor.updateConfig({ showNotifications: true })
window.cacheMonitor.triggerCheck()
```

### Reset to Defaults
```javascript
// Reset configuration
localStorage.removeItem('dev_cache_config')
location.reload()
```

## Integration

The cache management system integrates with:
- **Next.js**: Works with Next.js caching strategies
- **Service Workers**: Coordinates with PWA service worker
- **PWA**: Integrates with PWA update mechanisms
- **Development Tools**: Browser dev tools and console

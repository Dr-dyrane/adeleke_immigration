'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Trash2, RefreshCw, Settings, Monitor, Clock, Database } from 'lucide-react'
import { CacheManager } from '@/lib/cache-manager'
import DevCacheMonitor from '@/lib/dev-cache-monitor'
import { getCacheConfig, saveCacheConfig, cacheConfigPresets, applyCacheConfigPreset } from '@/lib/cache-config'
import type { CacheConfig } from '@/lib/cache-config'

interface CacheInfo {
  name: string
  size: number
  created?: number
  lastAccessed?: number
  age?: number
}

export function DevCachePanel() {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo[]>([])
  const [config, setConfig] = useState<CacheConfig>(getCacheConfig())
  const [monitorStatus, setMonitorStatus] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  useEffect(() => {
    loadCacheInfo()
    loadMonitorStatus()
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      loadCacheInfo()
      loadMonitorStatus()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const loadCacheInfo = async () => {
    try {
      const info = await CacheManager.getCacheInfo()
      setCacheInfo(info)
    } catch (error) {
      console.error('Error loading cache info:', error)
    }
  }

  const loadMonitorStatus = () => {
    try {
      const monitor = DevCacheMonitor.getInstance()
      setMonitorStatus(monitor.getStatus())
    } catch (error) {
      console.error('Error loading monitor status:', error)
    }
  }

  const handleClearAll = async () => {
    await CacheManager.clearAllCaches()
    await loadCacheInfo()
  }

  const handleClearOld = async () => {
    await CacheManager.clearOldCaches(config.maxCacheAge)
    await loadCacheInfo()
  }

  const handleClearSpecific = async (cacheName: string) => {
    await CacheManager.clearSpecificCache(cacheName)
    await loadCacheInfo()
  }

  const handleForceUpdate = async () => {
    await CacheManager.forceUpdate()
  }

  const handleConfigChange = (key: keyof CacheConfig, value: any) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    saveCacheConfig({ [key]: value })
    
    // Update monitor if it's running
    const monitor = DevCacheMonitor.getInstance()
    monitor.updateConfig({ [key]: value })
    loadMonitorStatus()
  }

  const handlePresetApply = (preset: keyof typeof cacheConfigPresets) => {
    applyCacheConfigPreset(preset)
    setConfig(getCacheConfig())
    loadMonitorStatus()
  }

  const handleTriggerCheck = async () => {
    const monitor = DevCacheMonitor.getInstance()
    await monitor.triggerCheck()
    await loadCacheInfo()
    loadMonitorStatus()
  }

  const formatAge = (age?: number) => {
    if (!age) return 'Unknown'
    const hours = Math.floor(age / (1000 * 60 * 60))
    const minutes = Math.floor((age % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown'
    return new Date(timestamp).toLocaleString()
  }

  const getAgeColor = (age?: number) => {
    if (!age) return 'secondary'
    if (age > config.maxCacheAge) return 'destructive'
    if (age > config.maxCacheAge * 0.7) return 'warning'
    return 'secondary'
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
        >
          <Database className="h-4 w-4 mr-2" />
          Cache Panel
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-[80vh] overflow-y-auto z-50">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm flex items-center gap-2">
                <Database className="h-4 w-4" />
                Dev Cache Panel
              </CardTitle>
              <CardDescription className="text-xs">
                Monitor and manage caches in development
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Monitor Status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span className="text-sm font-medium">Monitor Status</span>
              <Badge variant={monitorStatus?.isMonitoring ? 'default' : 'secondary'}>
                {monitorStatus?.isMonitoring ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            {monitorStatus?.nextCheck && (
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Next check: {formatDate(monitorStatus.nextCheck)}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleClearAll} size="sm" variant="outline">
                <Trash2 className="h-3 w-3 mr-1" />
                Clear All
              </Button>
              <Button onClick={handleClearOld} size="sm" variant="outline">
                <Trash2 className="h-3 w-3 mr-1" />
                Clear Old
              </Button>
              <Button onClick={handleForceUpdate} size="sm" variant="outline">
                <RefreshCw className="h-3 w-3 mr-1" />
                Force Update
              </Button>
              <Button onClick={handleTriggerCheck} size="sm" variant="outline">
                <Monitor className="h-3 w-3 mr-1" />
                Check Now
              </Button>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-3">
            <div className="text-sm font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configuration
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-monitoring" className="text-xs">Auto Monitoring</Label>
                <Switch
                  id="auto-monitoring"
                  checked={config.enableAutoMonitoring}
                  onCheckedChange={(checked) => handleConfigChange('enableAutoMonitoring', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-clear" className="text-xs">Auto Clear Old</Label>
                <Switch
                  id="auto-clear"
                  checked={config.autoClearOldCaches}
                  onCheckedChange={(checked) => handleConfigChange('autoClearOldCaches', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="clear-on-focus" className="text-xs">Clear on Focus</Label>
                <Switch
                  id="clear-on-focus"
                  checked={config.clearOnFocus}
                  onCheckedChange={(checked) => handleConfigChange('clearOnFocus', checked)}
                />
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <div className="text-xs font-medium">Presets</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.keys(cacheConfigPresets).map((preset) => (
                  <Button
                    key={preset}
                    onClick={() => handlePresetApply(preset as keyof typeof cacheConfigPresets)}
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Cache List */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Caches ({cacheInfo.length})</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cacheInfo.map((cache) => (
                <div key={cache.name} className="border rounded p-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium truncate">{cache.name}</span>
                    <Button
                      onClick={() => handleClearSpecific(cache.name)}
                      size="sm"
                      variant="ghost"
                      className="h-5 w-5 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{cache.size} items</span>
                    <Badge variant={getAgeColor(cache.age)} className="text-xs">
                      {formatAge(cache.age)}
                    </Badge>
                  </div>
                  {cache.created && (
                    <div className="text-xs text-muted-foreground">
                      Created: {formatDate(cache.created)}
                    </div>
                  )}
                </div>
              ))}
              
              {cacheInfo.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No caches found
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

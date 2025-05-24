'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, Trash2, Info, X } from 'lucide-react'
import { CacheManager } from '@/lib/cache-manager'

interface CacheInfo {
  name: string
  size: number
  created?: number
  lastAccessed?: number
  age?: number
}

export function ProdCacheManager() {
  const [cacheInfo, setCacheInfo] = useState<CacheInfo[]>([])
  const [showManager, setShowManager] = useState(false)
  const [oldCacheCount, setOldCacheCount] = useState(0)
  const [isClearing, setIsClearing] = useState(false)

  // Only show in production
  if (process.env.NODE_ENV === 'development') {
    return null
  }

  useEffect(() => {
    checkCacheStatus()
    
    // Check cache status periodically (every 30 minutes)
    const interval = setInterval(checkCacheStatus, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const checkCacheStatus = async () => {
    try {
      const info = await CacheManager.getCacheInfo()
      setCacheInfo(info)
      
      // Check for old caches (older than 7 days)
      const oldCaches = await CacheManager.getOldCaches(7 * 24 * 60 * 60 * 1000)
      setOldCacheCount(oldCaches.length)
    } catch (error) {
      console.error('Error checking cache status:', error)
    }
  }

  const handleClearOldCaches = async () => {
    setIsClearing(true)
    try {
      const clearedCaches = await CacheManager.clearOldCaches(7 * 24 * 60 * 60 * 1000)
      console.log(`Cleared ${clearedCaches.length} old caches`)
      await checkCacheStatus()
    } catch (error) {
      console.error('Error clearing old caches:', error)
    } finally {
      setIsClearing(false)
    }
  }

  const handleRefreshApp = async () => {
    try {
      await CacheManager.forceUpdate()
    } catch (error) {
      console.error('Error refreshing app:', error)
      // Fallback to simple reload
      window.location.reload()
    }
  }

  const formatAge = (age?: number) => {
    if (!age) return 'Unknown'
    const days = Math.floor(age / (1000 * 60 * 60 * 24))
    const hours = Math.floor((age % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  const getTotalCacheSize = () => {
    return cacheInfo.reduce((total, cache) => total + cache.size, 0)
  }

  // Show notification if there are many old caches
  const shouldShowNotification = oldCacheCount >= 3

  if (!showManager && !shouldShowNotification) {
    return null
  }

  return (
    <>
      {/* Notification for old caches */}
      {shouldShowNotification && !showManager && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm">
          <Alert className="bg-background/95 backdrop-blur-sm border shadow-lg">
            <Info className="h-4 w-4" />
            <AlertDescription className="pr-8">
              <div className="space-y-2">
                <p className="text-sm">
                  You have {oldCacheCount} old cached files that may be taking up space.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setShowManager(true)}
                    variant="outline"
                  >
                    Manage
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleClearOldCaches}
                    disabled={isClearing}
                  >
                    {isClearing ? 'Clearing...' : 'Clear Old'}
                  </Button>
                </div>
              </div>
            </AlertDescription>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setOldCacheCount(0)}
              className="absolute top-2 right-2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </Alert>
        </div>
      )}

      {/* Full cache manager */}
      {showManager && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Cache Manager</CardTitle>
                  <CardDescription>
                    Manage your app's cached data
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowManager(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Cache Summary */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{cacheInfo.length}</div>
                  <div className="text-xs text-muted-foreground">Total Caches</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{getTotalCacheSize()}</div>
                  <div className="text-xs text-muted-foreground">Total Items</div>
                </div>
              </div>

              {/* Old Cache Alert */}
              {oldCacheCount > 0 && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    {oldCacheCount} cache(s) are older than 7 days and can be safely cleared.
                  </AlertDescription>
                </Alert>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleClearOldCaches}
                  disabled={isClearing || oldCacheCount === 0}
                  className="w-full"
                  variant={oldCacheCount > 0 ? "default" : "outline"}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isClearing ? 'Clearing...' : `Clear Old Caches (${oldCacheCount})`}
                </Button>
                
                <Button
                  onClick={handleRefreshApp}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh App
                </Button>
              </div>

              {/* Cache List */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Cache Details</div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cacheInfo.map((cache) => (
                    <div key={cache.name} className="border rounded p-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium truncate">
                          {cache.name.replace('adeleke-', '')}
                        </span>
                        <Badge 
                          variant={cache.age && cache.age > 7 * 24 * 60 * 60 * 1000 ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {formatAge(cache.age)}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {cache.size} items
                      </div>
                    </div>
                  ))}
                  
                  {cacheInfo.length === 0 && (
                    <div className="text-xs text-muted-foreground text-center py-4">
                      No caches found
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Clearing old caches frees up storage space</p>
                <p>• Your app will re-download content as needed</p>
                <p>• This won't affect your personal data</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

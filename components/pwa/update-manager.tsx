'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, Download, X, Clock, Wifi, WifiOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UpdateManagerProps {
  strategy?: 'prompt' | 'auto' | 'aggressive'
}

export function UpdateManager({ strategy = 'prompt' }: UpdateManagerProps) {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateDismissed, setUpdateDismissed] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdateCheck, setLastUpdateCheck] = useState<Date | null>(null)
  const [autoUpdateTimer, setAutoUpdateTimer] = useState<number | null>(null)

  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    setIsOnline(navigator.onLine)

    // Initialize service worker
    initializeServiceWorker()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (autoUpdateTimer) {
        clearTimeout(autoUpdateTimer)
      }
    }
  }, [])

  const initializeServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) return

    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (!registration) return

      // Check for updates immediately
      await checkForUpdates(registration)

      // Set up periodic update checks
      const checkInterval = strategy === 'aggressive' ? 5 * 60 * 1000 : 30 * 60 * 1000 // 5min vs 30min
      setInterval(() => checkForUpdates(registration), checkInterval)

      // Listen for new service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              handleUpdateFound(newWorker)
            }
          })
        }
      })

    } catch (error) {
      console.error('Error initializing service worker:', error)
    }
  }

  const checkForUpdates = async (registration: ServiceWorkerRegistration) => {
    try {
      await registration.update()
      setLastUpdateCheck(new Date())
    } catch (error) {
      console.error('Error checking for updates:', error)
    }
  }

  const handleUpdateFound = (newWorker: ServiceWorker) => {
    setWaitingWorker(newWorker)
    setUpdateAvailable(true)
    setUpdateDismissed(false)

    // Handle different strategies
    switch (strategy) {
      case 'auto':
        // Auto-update after 30 seconds
        const timer = window.setTimeout(() => {
          applyUpdate()
        }, 30000)
        setAutoUpdateTimer(timer)
        break
      
      case 'aggressive':
        // Auto-update immediately
        setTimeout(() => applyUpdate(), 1000)
        break
      
      case 'prompt':
      default:
        // Show prompt to user
        break
    }
  }

  const applyUpdate = async () => {
    if (!waitingWorker) return

    setIsUpdating(true)
    
    try {
      // Clear any auto-update timer
      if (autoUpdateTimer) {
        clearTimeout(autoUpdateTimer)
        setAutoUpdateTimer(null)
      }

      // Tell the waiting service worker to skip waiting
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      
      // Clear caches to ensure fresh content
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      }

      // Reload the page
      window.location.reload()
    } catch (error) {
      console.error('Error applying update:', error)
      setIsUpdating(false)
      // Fallback: simple reload
      window.location.reload()
    }
  }

  const dismissUpdate = () => {
    setUpdateDismissed(true)
    if (autoUpdateTimer) {
      clearTimeout(autoUpdateTimer)
      setAutoUpdateTimer(null)
    }
  }

  const formatLastCheck = () => {
    if (!lastUpdateCheck) return 'Never'
    const now = new Date()
    const diff = now.getTime() - lastUpdateCheck.getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  // Don't show if dismissed or not available
  if (!updateAvailable || updateDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
      >
        <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Update Available</CardTitle>
                {strategy === 'auto' && autoUpdateTimer && (
                  <Badge variant="secondary" className="text-xs">
                    Auto-updating...
                  </Badge>
                )}
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={dismissUpdate}
                className="h-6 w-6 p-0"
                disabled={isUpdating}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3">
            <CardDescription className="text-xs">
              A new version of the app is available with the latest features and improvements.
            </CardDescription>

            {/* Connection Status */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {isOnline ? (
                <><Wifi className="h-3 w-3" /> Online</>
              ) : (
                <><WifiOff className="h-3 w-3" /> Offline</>
              )}
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>Last check: {formatLastCheck()}</span>
            </div>

            {/* Auto-update countdown */}
            {strategy === 'auto' && autoUpdateTimer && (
              <Alert>
                <RefreshCw className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Updating automatically in 30 seconds. Click "Update Now" to update immediately.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={applyUpdate}
                disabled={isUpdating || !isOnline}
                className="flex items-center gap-1 flex-1"
              >
                <RefreshCw className={`h-3 w-3 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? 'Updating...' : 'Update Now'}
              </Button>
              
              {strategy === 'prompt' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={dismissUpdate}
                  disabled={isUpdating}
                >
                  Later
                </Button>
              )}
            </div>

            {/* Offline Warning */}
            {!isOnline && (
              <Alert variant="destructive">
                <WifiOff className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  You're offline. Connect to the internet to update.
                </AlertDescription>
              </Alert>
            )}

            {/* Strategy Info */}
            <div className="text-xs text-muted-foreground">
              {strategy === 'auto' && 'Auto-update enabled'}
              {strategy === 'aggressive' && 'Immediate updates enabled'}
              {strategy === 'prompt' && 'Manual update control'}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

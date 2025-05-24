'use client'

import { useEffect } from 'react'
import { CacheManager } from '@/lib/cache-manager'
import { UpdateManager } from './update-manager'
import { getUpdateConfig } from '@/lib/update-config'

export function PWARegister() {
  const updateConfig = getUpdateConfig()

  useEffect(() => {
    // Register service worker with enhanced error handling
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope)

          // Update cache access tracking when service worker is active
          if (process.env.NODE_ENV === 'development') {
            registration.addEventListener('activate', () => {
              // Track cache access for the active service worker
              CacheManager.updateCacheAccess('adeleke-static-v2')
              CacheManager.updateCacheAccess('adeleke-dynamic-v2')
            })
          }
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    }
  }, [])

  return (
    <>
      {/* Use the new UpdateManager component */}
      <UpdateManager strategy={updateConfig.strategy} />
    </>
  )
}

// Extend window type for workbox
declare global {
  interface Window {
    workbox: any
  }
}

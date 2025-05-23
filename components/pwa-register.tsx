'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox
      
      // Add event listeners to handle PWA lifecycle
      wb.addEventListener('controlling', () => {
        window.location.reload()
      })

      wb.addEventListener('waiting', () => {
        // Show update available notification
        console.log('Update available')
      })

      wb.register()
    } else if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      // Fallback registration for service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope)
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}

// Extend window type for workbox
declare global {
  interface Window {
    workbox: any
  }
}

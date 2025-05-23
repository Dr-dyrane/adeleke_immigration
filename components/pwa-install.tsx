'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    // Set browser state
    setIsBrowser(true)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Hide for this session (only in browser)
    if (isBrowser) {
      sessionStorage.setItem('pwa-install-dismissed', 'true')
    }
  }

  // Don't show if already installed or dismissed this session
  if (isInstalled || (isBrowser && sessionStorage.getItem('pwa-install-dismissed'))) {
    return null
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
        >
          <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">Install App</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Install Adeleke Immigration Services for quick access and offline use.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleInstallClick}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-3 w-3" />
                    Install
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDismiss}
                  >
                    Later
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

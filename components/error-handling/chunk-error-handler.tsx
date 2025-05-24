'use client'

import { useEffect } from 'react'

export function ChunkErrorHandler() {
  useEffect(() => {
    // Global error handler for chunk load errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error || event.message

      // Check if it's a chunk load error
      if (
        error &&
        (error.name === 'ChunkLoadError' ||
          (typeof error === 'string' && error.includes('Loading chunk')) ||
          (error.message && error.message.includes('Loading chunk')))
      ) {
        console.log('Chunk load error detected, reloading page...')
        event.preventDefault()
        window.location.reload()
        return
      }
    }

    // Handle unhandled promise rejections (common with chunk errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason

      if (
        error &&
        (error.name === 'ChunkLoadError' ||
          (typeof error === 'string' && error.includes('Loading chunk')) ||
          (error.message && error.message.includes('Loading chunk')))
      ) {
        console.log('Chunk load error in promise rejection, reloading page...')
        event.preventDefault()
        window.location.reload()
        return
      }
    }

    // Add event listeners
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}

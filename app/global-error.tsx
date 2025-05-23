'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Check if it's a chunk load error and auto-reload
    if (
      error.name === 'ChunkLoadError' ||
      error.message.includes('Loading chunk') ||
      error.message.includes('ChunkLoadError')
    ) {
      console.log('Chunk load error in global error handler, reloading...')
      window.location.reload()
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
              <h2 className="text-xl font-semibold">Something went wrong</h2>
            </div>
            
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {error.message.includes('Loading chunk') 
                  ? 'The page is being updated. Please wait while we refresh...'
                  : 'An unexpected error occurred. Please try again.'
                }
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="secondary">
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

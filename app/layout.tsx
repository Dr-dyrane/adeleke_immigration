import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ErrorBoundary, ChunkErrorHandler } from "@/components/error-handling"
import { PWARegister, PWAInstall } from "@/components/pwa"
import { DevCachePanel, ProdCacheManager } from "@/components/cache"
import "./globals.css"
import { HEADER_MAX_HEIGHT_PX } from "@/components/layout/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // Enable advanced font features for more elegant typography
})

export const metadata: Metadata = {
  title: "Adeleke Immigration Services | Expert Immigration Advisory",
  description:
    "Professional immigration advisory and documentation support by Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience.",
  manifest: "/manifest.json",
  icons: [
    {
      url: "/icons/icon-192.svg",
      sizes: "192x192",
      type: "image/svg+xml",
    },
    {
      url: "/icons/icon-512.svg",
      sizes: "512x512",
      type: "image/svg+xml",
    },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Adeleke Immigration",
  },
  formatDetection: {
    telephone: false,
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <ErrorBoundary>
          <ChunkErrorHandler />
          <PWARegister />
          {/* <CacheInitializer /> */}
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-grow overflow-x-hidden"
                style={{ paddingTop: `${HEADER_MAX_HEIGHT_PX}px` }}
              >{children}</main>
              <Footer />
            </div>
            <PWAInstall />
            <DevCachePanel />
            <ProdCacheManager />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

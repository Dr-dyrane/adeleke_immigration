# Progressive Web App (PWA) Configuration

This document provides detailed information about the Progressive Web App (PWA) configuration in the Adeleke Immigration Services application.

## Overview

A Progressive Web App (PWA) is a web application that uses modern web capabilities to deliver an app-like experience to users. The Adeleke Immigration Services PWA provides:

- Installability on user devices
- Offline access to key content
- Fast loading times
- App-like navigation and experience

## PWA Components

### Web App Manifest

The Web App Manifest is a JSON file that provides information about the application. It's located at `/public/manifest.json`:

```json
{
  "name": "Adeleke Immigration Services",
  "short_name": "Adelekeimmigration",
  "description": "Professional immigration advisory and documentation support",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1F2937",
  "theme_color": "#3B82F6",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker

A service worker is a script that runs in the background and enables features like offline support and push notifications. In this project, we use Next.js built-in PWA support or a package like `next-pwa` to generate and manage the service worker.

### App Icons

PWA icons are stored in the `/public/icons/` directory:

- `icon-192x192.png` - 192x192 pixel icon
- `icon-512x512.png` - 512x512 pixel icon

These icons are used when the app is installed on a user's device.

## Implementation

### Next.js Configuration

The PWA configuration is set up in `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  // other Next.js config options
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
```

### Metadata Configuration

PWA metadata is configured in the root layout file (`app/layout.tsx`):

```typescript
export const metadata: Metadata = {
  title: "Adeleke Immigration Services | Expert Immigration Advisory",
  description:
    "Professional immigration advisory and documentation support by Peter E. Adeleke, a retired U.S. Immigration Services Officer with 27 years of experience.",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    title: "Adeleke Immigration",
    statusBarStyle: "default",
  },
}
```

## Offline Support

### Caching Strategies

The service worker implements various caching strategies:

- **Cache First:** Static assets like images, CSS, and JavaScript
- **Network First:** Dynamic content like API responses
- **Stale While Revalidate:** Content that changes occasionally but should be available offline

### Offline Page

An offline page is displayed when the user is offline and tries to access a page that isn't cached:

```typescript
// app/offline/page.tsx
export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">You're Offline</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Please check your internet connection and try again.
      </p>
      <p className="text-muted-foreground">
        Some features of Adeleke Immigration Services are available offline.
      </p>
    </div>
  );
}
```

## Testing PWA Features

### Lighthouse Audit

Use Google Chrome's Lighthouse tool to audit the PWA:

1. Open Chrome DevTools
2. Go to the Lighthouse tab
3. Select "Progressive Web App" category
4. Run the audit

### Manual Testing

Test the following PWA features manually:

1. **Installability:**
   - Visit the site in Chrome on desktop or mobile
   - Look for the install prompt or use the menu option to install

2. **Offline Support:**
   - Install the PWA
   - Enable offline mode in Chrome DevTools
   - Navigate through the app to test cached pages

3. **App-like Experience:**
   - Verify the app launches in standalone mode (without browser UI)
   - Check that the theme color is applied correctly
   - Test that navigation works as expected

## Best Practices

### Performance

- Minimize JavaScript bundle size
- Optimize images
- Implement code splitting
- Use efficient caching strategies

### User Experience

- Provide clear installation instructions
- Design for both mobile and desktop
- Ensure smooth transitions between pages
- Provide feedback when offline

### Security

- Serve the app over HTTPS
- Implement proper Content Security Policy (CSP)
- Validate user input
- Keep dependencies updated

## Future Enhancements

### Push Notifications

Implement push notifications for:

- Appointment reminders
- Status updates
- New resource notifications

### Background Sync

Implement background sync for:

- Form submissions when offline
- Data updates when connection is restored

### Improved Offline Experience

Enhance offline capabilities:

- Offline form submissions
- More comprehensive content caching
- Better offline UI indicators

## Resources

- [Next.js PWA Documentation](https://nextjs.org/docs)
- [Web App Manifest MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Google's PWA Checklist](https://web.dev/pwa-checklist/)

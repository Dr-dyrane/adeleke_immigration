/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Help prevent chunk load errors
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // In development, disable chunk splitting to reduce chunk load errors
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Create a single vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            enforce: true,
          },
        },
      }
    }
    return config
  },
  // Experimental features to help with chunk loading
  experimental: {
    // Enable modern bundling
    esmExternals: true,
  },
}

export default nextConfig

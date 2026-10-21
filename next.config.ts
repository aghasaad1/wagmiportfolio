import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // `images.domains` is deprecated in Next 16 — remotePatterns below covers
    // every host it used to allow, and is scoped to a path for safety.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // YouTube thumbnails for the HQ VSL slider
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      // Google Drive video thumbnails for the HQ work samples
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/d/**',
      },
    ],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
}

export default nextConfig

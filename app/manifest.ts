import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0c1814',
    theme_color: '#0c1814',
    icons: [
      { src: '/hq/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { src: '/hq/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}

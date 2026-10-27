import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EnovixTech - Digital Product Studio',
    short_name: 'EnovixTech',
    description:
      'EnovixTech builds high-performing web applications, mobile apps (iOS & Android), and digital products.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a6fc4',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/enovix_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

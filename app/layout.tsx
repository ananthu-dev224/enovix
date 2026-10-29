import type { Metadata, Viewport } from 'next';
import './globals.css';
import JsonLd from '@/components/JsonLd';

export const viewport: Viewport = {
  themeColor: '#1a6fc4',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://enovixtech.in'),
  title: {
    default: 'EnovixTech | Digital Product Studio - Web & Mobile App Development',
    template: '%s | EnovixTech',
  },
  description:
    'EnovixTech (Enovix Tech) is a premier digital product studio in Kerala, India. We build high-performance web applications, iOS & Android mobile apps, AI solutions, and custom software.',
  applicationName: 'EnovixTech',
  authors: [{ name: 'EnovixTech Team', url: 'https://enovixtech.in' }],
  generator: 'Next.js',
  keywords: [
    'EnovixTech',
    'Enovix Tech',
    'enovixtech',
    'enovixtech.in',
    'Enovix',
    'Enovix software',
    'Enovix technologies',
    'Enovix Kerala',
    'digital product studio Kerala',
    'web development company Kerala',
    'mobile app development Kerala',
    'iOS app development',
    'Android app development',
    'Flutter mobile development',
    'React Nextjs agency',
    'custom business software',
    'Medrec-Q Dictate',
    'Medrec-Q Mini',
    'DMS dictation platform',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'EnovixTech',
  publisher: 'EnovixTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://enovixtech.in',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://enovixtech.in',
    siteName: 'EnovixTech',
    title: 'EnovixTech | Digital Product Studio - Web & Mobile App Development',
    description:
      'EnovixTech crafts exceptional web and mobile experiences that transform ideas into powerful digital products. Explore our portfolio, services, and get in touch.',
    images: [
      {
        url: '/banner-1-latest.png',
        width: 1200,
        height: 630,
        alt: 'EnovixTech - Digital Product Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnovixTech | Digital Product Studio - Web & Mobile App Development',
    description:
      'EnovixTech crafts exceptional web and mobile experiences that transform ideas into powerful digital products.',
    images: ['/banner-1-latest.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/enovix_logo.png',
  },
  verification: {
    google: 'KcGQitELOapWVTtsBPl3aKcigVnk2XNNlCwKIuCWsO8',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}

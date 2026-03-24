import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Enovix',
  description: 'We craft exceptional web and mobile experiences that transform ideas into powerful digital products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
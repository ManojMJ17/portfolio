import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import JsonLd from '@/components/seo/json-ld';

const interRegular = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-inter-regular',
  display: 'swap',
});

const interMedium = Inter({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-inter-medium',
  display: 'swap',
});

const interLight = Inter({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-inter-light',
  display: 'swap',
});

const azeretMonoLight = localFont({
  src: '/fonts/AzeretMono-Light.ttf',
  variable: '--font-azeretMono-light',
});

const azeretMonoRegular = localFont({
  src: '/fonts/AzeretMono-Regular.ttf',
  variable: '--font-azeretMono-regular',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.manoj-kumar.me'),

  title: {
    default: 'Manoj Kumar Chilukoti | Software Engineer',
    template: '%s | Manoj Kumar Chilukoti',
  },

  description:
    'Manoj Kumar Chilukoti is a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',

  applicationName: 'Manoj Kumar Chilukoti Portfolio',

  authors: [
    {
      name: 'Manoj Kumar Chilukoti',
      url: 'https://www.manoj-kumar.me',
    },
  ],

  creator: 'Manoj Kumar Chilukoti',
  publisher: 'Manoj Kumar Chilukoti',

  alternates: {
    canonical: 'https://www.manoj-kumar.me',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.manoj-kumar.me',
    siteName: 'Manoj Kumar Chilukoti',
    title: 'Manoj Kumar Chilukoti | Software Engineer',
    description:
      'Portfolio of Manoj Kumar Chilukoti, a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Manoj Kumar Chilukoti | Software Engineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Kumar Chilukoti | Software Engineer',
    description:
      'Portfolio of Manoj Kumar Chilukoti, a Software Engineer specializing in Java, Spring Boot, React, Next.js, TypeScript, Microservices, and full-stack development.',
    images: ['/og-image.png'],
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
      {
        url: '/favicon-light.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-dark.ico',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-touch-icon.png',
  },

  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${interLight.variable} ${interMedium.variable} ${interRegular.variable} ${azeretMonoLight.variable} ${azeretMonoRegular.variable} antialiased`}
      >
        <JsonLd />

        <Toaster position='top-center' closeButton />
        {children}
      </body>
    </html>
  );
}

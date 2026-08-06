import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import JsonLd from '@/components/seo/json-ld';

const neueMontrealRegular = localFont({
  src: '/fonts/NeueMontreal-Regular.woff2',
  variable: '--font-montreal-regular',
  display: 'swap',
});

// Load Medium
const neueMontrealMedium = localFont({
  src: '/fonts/NeueMontreal-Medium.woff2',
  variable: '--font-montreal-medium',
  display: 'swap',
});

const neueMontrealLight = localFont({
  src: '/fonts/NeueMontreal-Light.woff2',
  variable: '--font-montreal-light',
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

const consola = localFont({
  src: '/fonts/CONSOLA.ttf',
  variable: '--font-consola',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.manoj-kumar.me'),

  manifest: '/manifest.webmanifest',

  title: {
    default: 'Manoj Kumar | Software Engineer',
    template: '%s | Manoj Kumar',
  },

  description:
    'Portfolio of Manoj Kumar, a Software Engineer specializing in Java, Spring Boot, React, Next.js, Microservices, and Full-Stack Development.',

  applicationName: 'Manoj Kumar Portfolio',

  keywords: [
    'Manoj Kumar',
    'Software Engineer',
    'Java Developer',
    'Spring Boot',
    'React',
    'Next.js',
    'TypeScript',
    'React Native',
    'Microservices',
    'Docker',
    'PostgreSQL',
    'MongoDB',
    'Full Stack Developer',
    'Portfolio',
  ],

  authors: [
    {
      name: 'Manoj Kumar',
      url: 'https://www.manoj-kumar.me',
    },
  ],

  creator: 'Manoj Kumar',
  publisher: 'Manoj Kumar',

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
    siteName: 'Manoj Kumar Portfolio',
    title: 'Manoj Kumar | Software Engineer',
    description:
      'Portfolio showcasing Java, Spring Boot, React, Next.js, Microservices, React Native, and Full-Stack Development projects.',
    images: [
      {
        url: '/og-image.png',
        width: 1729,
        height: 910,
        alt: 'Manoj Kumar Portfolio',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Manoj Kumar | Software Engineer',
    description:
      'Portfolio showcasing Java, Spring Boot, React, Next.js, Microservices, React Native, and Full-Stack Development projects.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${neueMontrealLight.variable} ${neueMontrealMedium.variable} ${neueMontrealRegular.variable} ${azeretMonoLight.variable} ${azeretMonoRegular.variable} ${consola.variable} antialiased`}
      >
        <JsonLd />

        <Toaster position='top-center' closeButton />
        {children}
      </body>
    </html>
  );
}

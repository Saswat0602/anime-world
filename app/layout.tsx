import { Providers } from './providers';
import Root from './Root';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import { AnimeCardSkeleton } from '@/components/loaders';
import { Viewport } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Otaku.Realm | Discover Anime Series, Movies & More',
  description: 'Discover and explore anime series from around the world. Find popular, trending, and upcoming anime with reviews, ratings, and detailed information.',
  keywords: 'anime, anime series, anime movies, otaku, manga, Japanese animation, watch anime',
  authors: [{ name: 'Otaku Realm Team' }],
  creator: 'Otaku Realm',
  publisher: 'Otaku Realm',
  metadataBase: new URL('https://otaku-realm.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Otaku.Realm | Discover Anime Series, Movies & More',
    description: 'Discover and explore anime series from around the world. Find popular, trending, and upcoming anime with reviews, ratings, and detailed information.',
    url: 'https://otaku-realm.com',
    siteName: 'Otaku.Realm',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Otaku.Realm - Anime Discovery Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otaku.Realm | Discover Anime Series, Movies & More',
    description: 'Discover and explore anime series from around the world. Find popular, trending, and upcoming anime with reviews, ratings, and detailed information.',
    images: ['/twitter-image.jpg'],
    creator: '@otakurealm',
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
    icon: '/zoro2.png',
    shortcut: '/zoro2.png',
 
  },
  manifest: ''
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>
          <Root>
            <Suspense fallback={<AnimeCardSkeleton count={15} />}>
              {children}
            </Suspense>
          </Root>
        </Providers>
        {/* LD+JSON for structured data */}
        <Script
          id="schema-org-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Otaku.Realm',
              url: 'https://otaku-realm.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://otaku-realm.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

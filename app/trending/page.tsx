import { Suspense } from 'react';
import { AnimeCardSkeleton } from '@/components/loaders';
import { Metadata, Viewport } from 'next';
import TrendingClient from '@/app/trending/trending-client';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Trending Anime | Otaku.Realm',
  description: 'Discover the most popular and trending anime series right now. Browse top-rated anime with reviews, ratings, and detailed information.',
  alternates: {
    canonical: '/trending',
  },
  openGraph: {
    title: 'Trending Anime | Otaku.Realm',
    description: 'Discover the most popular and trending anime series right now. Browse top-rated anime with reviews, ratings, and detailed information.',
    url: 'https://otaku-realm.com/trending',
  }
};

// Add viewport config
export const viewport: Viewport = {
  themeColor: '#1f2937'
};

// Server component that exports metadata
export default function Trending() {
  return (
    <Suspense fallback={<AnimeCardSkeleton count={24} />}>
      <TrendingClient />
    </Suspense>
  );
}
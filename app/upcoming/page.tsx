import { Suspense } from 'react';
import { AnimeCardSkeleton } from '@/components/loaders';
import { Metadata, Viewport } from 'next';
import UpcomingClient from '@/app/upcoming/upcoming-client';

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Upcoming Anime | Otaku.Realm',
  description: 'Discover upcoming anime releases and new series. Stay ahead with information about release dates, genres, and more.',
  alternates: {
    canonical: '/upcoming',
  },
  openGraph: {
    title: 'Upcoming Anime | Otaku.Realm',
    description: 'Discover upcoming anime releases and new series. Stay ahead with information about release dates, genres, and more.',
    url: 'https://otaku-realm.com/upcoming',
  }
};

// Add viewport config
export const viewport: Viewport = {
  themeColor: '#1f2937'
};

// Server component that exports metadata
export default function Upcoming() {
  return (
    <Suspense fallback={<AnimeCardSkeleton count={24} />}>
      <UpcomingClient />
    </Suspense>
  );
}
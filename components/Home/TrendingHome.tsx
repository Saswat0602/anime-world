'use client';

import { useTrendingAnimeQuery } from '@/redux/api/animeApi';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { AnimeCard } from '@/components/common/AnimeCard';
import { AnimeCardSkeleton } from '@/components/common/AnimeCardSkeleton';

interface TrendingAnimeSectionProps {
  displayCount?: number;
}

export const TrendingHome = ({ displayCount = 6 }: TrendingAnimeSectionProps) => {
  const router = useRouter();
  const { data: trendingAnimeData, isLoading: trendingLoading } = useTrendingAnimeQuery({ page: 1 });

  const trendingAnime = trendingAnimeData?.data?.slice(0, displayCount) || [];

  const handleViewAll = () => {
    router.push(ROUTES.ANIME.TRENDING);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
        <button
          onClick={handleViewAll}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 text-sm"
        >
          View All →
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {trendingLoading
          ? Array.from({ length: displayCount }).map((_, index) => (
              <AnimeCardSkeleton key={`trending-skeleton-${index}`} />
            ))
          : trendingAnime.map((anime, index) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={index} />
            ))}
      </div>
    </section>
  );
};

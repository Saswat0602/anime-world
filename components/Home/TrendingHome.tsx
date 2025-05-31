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


      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
          TRENDING ANIME
        </h2>
        <button
          onClick={handleViewAll}
          className="relative inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-blue-500 rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 self-center sm:self-auto"
        >
          View All
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
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

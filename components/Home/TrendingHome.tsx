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
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">TRENDING ANIME</h2>
        <button
          onClick={handleViewAll}
          className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 text-sm hover:scale-105 flex items-center gap-1"
        >
          View All
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

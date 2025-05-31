'use client';

import { useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { AnimeCard } from '@/components/common/AnimeCard';
import { AnimeCardSkeleton } from '@/components/common/AnimeCardSkeleton';

interface SeasonalAnimeSectionProps {
  displayCount?: number;
}

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

const getCurrentYear = () => new Date().getFullYear();

export const SeasonalHome = ({ displayCount = 6 }: SeasonalAnimeSectionProps) => {
  const router = useRouter();
  const currentSeason = getCurrentSeason();
  const currentYear = getCurrentYear();

  const { data: seasonalAnimeData, isLoading: seasonalLoading } = useSeasonalAnimeQuery({
    year: currentYear,
    season: currentSeason,
    page: 1,
  });

  const seasonalAnime = seasonalAnimeData?.data?.slice(0, displayCount) || [];

  const handleViewAll = () => {
    router.push(ROUTES.ANIME.SEASONAL);
  };


  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          POPULAR {currentSeason.toUpperCase()} {currentYear} ANIME
        </h2>
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
        {seasonalLoading
          ? Array.from({ length: displayCount }, (_, index) => (
            <AnimeCardSkeleton key={`seasonal-skeleton-${index}`} />
          ))
          : seasonalAnime.map((anime, index) => (
            <AnimeCard key={anime.mal_id} anime={anime} index={index} />
          ))}
      </div>
    </section>
  );
};

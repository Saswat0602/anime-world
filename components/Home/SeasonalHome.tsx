'use client';

import { useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { AnimeCard } from '@/components/common/AnimeCard';
import { AnimeCardSkeleton } from '@/components/common/AnimeCardSkeleton';
import { ChevronRight } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 dark:from-slate-300 dark:via-blue-400 dark:to-indigo-400 text-transparent bg-clip-text text-center sm:text-left">
          POPULAR {currentSeason.toUpperCase()} {currentYear} ANIME

        </h2>
        <button
          onClick={handleViewAll}
          className="relative inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-blue-500 rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 self-center sm:self-auto"
        >
          View All
           <ChevronRight />

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

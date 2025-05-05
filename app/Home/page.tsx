'use client';

import { useTrendingAnimeQuery, useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import { AnimeCard } from '@/components/Home/AnimeCard';
import { AnimeCardSkeleton } from '@/components/Home/AnimeCardSkeleton';
import { useEffect, useState } from 'react';

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

const getCurrentYear = () => new Date().getFullYear();

export default function HomePage() {
  const currentSeason = getCurrentSeason();
  const currentYear = getCurrentYear();
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());

  const { data: trendingAnimeData, isLoading: trendingLoading } = useTrendingAnimeQuery({ page: 1 });
  const { data: seasonalAnimeData, isLoading: seasonalLoading } = useSeasonalAnimeQuery({ year: currentYear, season: currentSeason, page: 1 });

  const trendingAnime = trendingAnimeData?.data?.slice(0, 6) || [];
  const seasonalAnime = seasonalAnimeData?.data?.slice(0, 6) || [];

  const handleAnimeLoaded = (animeId: number) => {
    setLoadedAnimeIds(prev => new Set(prev).add(animeId));
  };

  useEffect(() => {
    // Reset loaded anime IDs when data changes
    setLoadedAnimeIds(new Set());
  }, [trendingAnimeData, seasonalAnimeData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingAnime.map((anime, index) => (
            <div key={anime.mal_id} className="relative">
              <div className={loadedAnimeIds.has(anime.mal_id) ? "block" : "invisible"}>
                <AnimeCard
                  anime={anime}
                  index={index}
                  onLoad={() => handleAnimeLoaded(anime.mal_id)}
                />
              </div>
              {!loadedAnimeIds.has(anime.mal_id) && (
                <div className="absolute inset-0">
                  <AnimeCardSkeleton />
                </div>
              )}
            </div>
          ))}
          {trendingLoading && Array(6).fill(0).map((_, index) => (
            <AnimeCardSkeleton key={`trending-skeleton-${index}`} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Popular {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} {currentYear} Anime
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {seasonalAnime.map((anime, index) => (
            <div key={anime.mal_id} className="relative">
              <div className={loadedAnimeIds.has(anime.mal_id) ? "block" : "invisible"}>
                <AnimeCard
                  anime={anime}
                  index={index}
                  onLoad={() => handleAnimeLoaded(anime.mal_id)}
                />
              </div>
              {!loadedAnimeIds.has(anime.mal_id) && (
                <div className="absolute inset-0">
                  <AnimeCardSkeleton />
                </div>
              )}
            </div>
          ))}
          {seasonalLoading && Array(6).fill(0).map((_, index) => (
            <AnimeCardSkeleton key={`seasonal-skeleton-${index}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
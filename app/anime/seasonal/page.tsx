'use client';

import { useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import { usePaginatedAnime } from '@/hooks/usePaginatedAnime';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

const getCurrentYear = () => new Date().getFullYear();

export default function SeasonalPage() {
  const currentSeason = getCurrentSeason();
  const currentYear = getCurrentYear();
  const capitalizedSeason = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);
  
  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded
  } = usePaginatedAnime({
    queryFn: useSeasonalAnimeQuery,
    baseQueryParams: { 
      year: currentYear, 
      season: currentSeason
    }
  });
  
  const pendingItemsCount = isFetching || isLoading ? 6 : 0;
  
  return (
    <AnimeListLayout
      title={`Popular ${capitalizedSeason} ${currentYear} Anime`}
      allAnime={allAnime}
      loadedAnimeIds={loadedAnimeIds}
      handleAnimeLoaded={handleAnimeLoaded}
      pendingItemsCount={pendingItemsCount}
      loadMoreRef={loadMoreRef}
      hasMore={hasMore}
    />
  );
}
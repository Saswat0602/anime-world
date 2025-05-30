'use client';

import { useTrendingAnimeQuery } from '@/redux/api/animeApi';
import { usePaginatedAnime } from '@/hooks/usePaginatedAnime';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function TrendingPage() {
  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded,
  } = usePaginatedAnime({
    useQueryHook: useTrendingAnimeQuery,
    baseQueryParams: {},
  });
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const pendingItemsCount = 12;

  return (
    <AnimeListLayout
      title="Trending Anime"
      allAnime={allAnime}
      loadedAnimeIds={loadedAnimeIds}
      handleAnimeLoaded={handleAnimeLoaded}
      pendingItemsCount={pendingItemsCount}
      loadMoreRef={loadMoreRef}
      hasMore={hasMore}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
}

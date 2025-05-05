'use client';

import { useUpcomingAnimeQuery } from '@/redux/api/upcomingAnimeApi';
import { usePaginatedAnime } from '@/hooks/usePaginatedAnime';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';

type UpcomingQueryParams = {
  page: number;
};

export default function UpcomingPage() {
  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded
  } = usePaginatedAnime<UpcomingQueryParams>({
    useQueryHook: (params: UpcomingQueryParams) => useUpcomingAnimeQuery(params.page),
    baseQueryParams: {}
  });

  const pendingItemsCount = isFetching || isLoading ? 6 : 0;

  return (
    <AnimeListLayout
      title="Upcoming Anime"
      allAnime={allAnime}
      loadedAnimeIds={loadedAnimeIds}
      handleAnimeLoaded={handleAnimeLoaded}
      pendingItemsCount={pendingItemsCount}
      loadMoreRef={loadMoreRef}
      hasMore={hasMore}
    />
  );
}
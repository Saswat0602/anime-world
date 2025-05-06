'use client';

import { usePaginatedAnime } from '@/hooks/usePaginatedAnime';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';
import { useTop100AnimeQuery } from '@/redux/api';


const Top100Anime = () => {
  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded,
  } = usePaginatedAnime({
    useQueryHook: useTop100AnimeQuery,
    baseQueryParams: {},
  });

  const pendingItemsCount = isFetching || isLoading ? 6 : 0;

  return (
    <AnimeListLayout
      title="Top-100 Anime"
      allAnime={allAnime}
      loadedAnimeIds={loadedAnimeIds}
      handleAnimeLoaded={handleAnimeLoaded}
      pendingItemsCount={pendingItemsCount}
      loadMoreRef={loadMoreRef}
      hasMore={hasMore}
      showRank={true}
    />
  );
}

export default Top100Anime

'use client';

import { useSearchParams } from 'next/navigation';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';
import { useSearchPaginatedAnime } from '@/hooks/useSearchAnime';

export default function FilterPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded,
  } = useSearchPaginatedAnime({ search });

  const pendingItemsCount = isFetching || isLoading ? 6 : 0;

  return (
    <AnimeListLayout
      title={`Search results for "${search}"`}
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

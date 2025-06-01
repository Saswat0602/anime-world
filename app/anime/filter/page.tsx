'use client';

import { useSearchParams } from 'next/navigation';
import { AnimeListLayout } from '@/components/Layouts/AnimeListLayout';
import { useSearchPaginatedAnime } from '@/hooks/useSearchAnime';
import { useMemo } from 'react';

export default function FilterPage() {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const search = searchParams.get('search')?.trim() || undefined;
    const genres = searchParams.getAll('genres').filter(g => g.trim());
    const year = searchParams.get('year')?.trim() || undefined;
    const season = searchParams.get('season')?.trim()?.toUpperCase() || undefined;
    const format = searchParams.getAll('format').filter(f => f.trim());
    const airingStatus = searchParams.get('airingStatus')?.trim() || undefined;
    
    return {
      search,
      genres: genres.length > 0 ? genres : undefined,
      year,
      season,
      format: format.length > 0 ? format : undefined,
      airingStatus,
    };
  }, [
    searchParams.get('search'),
    searchParams.getAll('genres').join(','),
    searchParams.get('year'),
    searchParams.get('season'),
    searchParams.getAll('format').join(','),
    searchParams.get('airingStatus'),
  ]);

  const {
    allAnime,
    loadedAnimeIds,
    hasMore,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded,
  } = useSearchPaginatedAnime(filters);

  const pendingItemsCount = isFetching || isLoading ? 6 : 0;

  return (
    <AnimeListLayout
      title={
        filters.search
          ? `Search results for "${filters.search}"`
          : 'Filtered Anime Results'
      }
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
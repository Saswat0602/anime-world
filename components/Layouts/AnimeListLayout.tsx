'use client';

import { Anime } from '@/types/types';
import { AnimeCard } from '@/components/Home/AnimeCard';
import { AnimeCardSkeleton } from '@/components/Home/AnimeCardSkeleton';
import { RefObject } from 'react';
import { FilterBar } from '../common/FilterBar';
import EmptyScreen from '../common/EmptyScreen';

type AnimeListLayoutProps = {
  title: string;
  allAnime: Anime[];
  loadedAnimeIds: Set<number>;
  handleAnimeLoaded: (animeId: number) => void;
  pendingItemsCount: number;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  showRank?: boolean;
  isLoading?: boolean;
  isFetching?: boolean;
};

export function AnimeListLayout({
  title,
  allAnime,
  loadedAnimeIds,
  handleAnimeLoaded,
  pendingItemsCount,
  loadMoreRef,
  hasMore,
  showRank,
  isFetching,
}: AnimeListLayoutProps) {

  return (
    <div className="container mx-auto px-4 py-10">
      <FilterBar title={title} />

      {allAnime.length === 0 && pendingItemsCount === 0 && !isFetching && (
        <EmptyScreen />
      )}

      {/* Anime Grid */}
      {allAnime.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
          {allAnime.map((anime, index) => (
            <div key={anime.mal_id} className="relative">
              <div className={loadedAnimeIds.has(anime.mal_id) ? "block" : "invisible"}>
                <AnimeCard
                  anime={anime}
                  index={index}
                  onLoad={() => handleAnimeLoaded(anime.mal_id)}
                  showRank={showRank}
                />
              </div>

              {!loadedAnimeIds.has(anime.mal_id) && (
                <div className="absolute inset-0">
                  {isFetching ? <AnimeCardSkeleton /> : (
                    <div className="absolute inset-0 animate-pulse rounded-lg" style={{ backgroundColor: anime.color || '#2563eb' }} />
                  )}
                </div>
              )}
            </div>
          ))}

          {Array(pendingItemsCount).fill(0).map((_, index) => (
            <AnimeCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      <div ref={loadMoreRef} className="h-10 mt-8" />
      {!hasMore && allAnime.length > 0 && (
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          No more anime to load
        </div>
      )}
    </div>
  );
}
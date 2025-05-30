'use client';

import { Anime } from '@/types/types';
import { AnimeCard } from '@/components/Home/AnimeCard';
import { AnimeCardSkeleton } from '@/components/Home/AnimeCardSkeleton';
import { RefObject } from 'react';
import { FilterBar } from '../common/FilterBar';

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
  console.log(allAnime, "allAnime");

  return (
    <div className="container mx-auto px-4 py-10">
      <FilterBar title={title} />
      
      {/* Empty State */}
      {allAnime.length === 0 && pendingItemsCount === 0 && !isFetching && (
        <div className="flex flex-col items-center justify-center min-h-[500px] text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          {/* Icon with modern glassmorphism effect */}
          <div className="relative mb-8 group">
            <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg 
                className="w-16 h-16 text-gray-700 dark:text-gray-300 relative z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Modern Typography */}
          <div className="space-y-4 mb-8">
            <h3 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              No Anime Found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed font-medium">
              Looks like we couldn't find any anime matching your criteria. Let's try something different!
            </p>
          </div>
          
          {/* Modern Suggestion Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
            <div className="group p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Try Different Tags</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Explore new genres</p>
                </div>
              </div>
            </div>
            
            <div className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-800/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 text-sm">Clear Filters</h4>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Reset and browse all</p>
                </div>
              </div>
            </div>
            
            <div className="group p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border border-orange-200/50 dark:border-orange-800/30 hover:shadow-lg hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 text-sm">Check Back Soon</h4>
                  <p className="text-xs text-orange-700 dark:text-orange-300">New anime added daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
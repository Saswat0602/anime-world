'use client';

import { useTrendingAnimeQuery } from '@/redux/api/animeApi';
import { AnimeCard } from "@/components/Home/AnimeCard";
import { AnimeCardSkeleton } from "@/components/Home/AnimeCardSkeleton";
import { Anime } from "@/types/types";
import { useState, useEffect, useRef, useCallback } from 'react';

export default function TrendingPage() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const { data: trendingAnimeData, isLoading, isFetching, error } = useTrendingAnimeQuery(page);
  
  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds(prev => {
      const updated = new Set(prev);
      updated.add(animeId);
      return updated;
    });
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          !isFetching &&
          hasMore &&
          !error &&
          navigator.onLine
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
  
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
  
    return () => {
      observer.disconnect();
    };
  }, [isLoading, isFetching, hasMore, error]);
  
  
  const pendingItemsCount = isFetching || isLoading ? 6 : 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trending Anime</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
        {allAnime.map((anime: Anime, index: number) => (
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
        
        {Array(pendingItemsCount).fill(0).map((_, index) => (
          <AnimeCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10 mt-8" />
      {!hasMore && allAnime.length > 0 && (
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          No more anime to load
        </div>
      )}
    </div>
  );
}
'use client';

import { useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import { AnimeCard } from "@/components/Home/AnimeCard";
import { AnimeCardSkeleton } from "@/components/Home/AnimeCardSkeleton";
import { Anime } from "@/types/types";
import { useState, useEffect, useRef, useCallback } from 'react';

const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

const getCurrentYear = () => new Date().getFullYear();

export default function SeasonalPage() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const currentSeason = getCurrentSeason();
  const currentYear = getCurrentYear();
  
  const { data: seasonalAnimeData, isLoading, isFetching } = useSeasonalAnimeQuery({ 
    year: currentYear, 
    season: currentSeason, 
    page 
  });
  
  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds(prev => {
      const updated = new Set(prev);
      updated.add(animeId);
      return updated;
    });
  }, []);
  
  useEffect(() => {
    if (seasonalAnimeData?.data) {
      setAllAnime(prev => {
        const newAnime = seasonalAnimeData.data.filter(
          anime => !prev.some(existing => existing.mal_id === anime.mal_id)
        );
        return [...prev, ...newAnime];
      });
      
      setHasMore(seasonalAnimeData.pagination?.has_next_page || false);
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isFetching && hasMore) {
          setPage(prev => prev + 1);
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
  }, [seasonalAnimeData, isLoading, isFetching, hasMore]);
  
  const pendingItemsCount = isFetching || isLoading ? 6 : 0;
  
  const capitalizedSeason = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Popular {capitalizedSeason} {currentYear} Anime
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
        {/* Actual anime cards with individual loading state */}
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
'use client';

import { useTrendingAnimeQuery } from '@/redux/api/animeApi';
import { AnimeCard } from "@/components/Home/AnimeCard";
import { AnimeCardSkeleton } from "@/components/Home/AnimeCardSkeleton";
import { Anime } from "@/types/types";
import { useState, useEffect, useRef } from 'react';

export default function TrendingPage() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const { data: trendingAnimeData, isLoading, isFetching } = useTrendingAnimeQuery(page);
  
  // Update allAnime when new data is fetched
  useEffect(() => {
    if (trendingAnimeData?.data) {
      setAllAnime(prev => {
        // Avoid duplicates by checking if the anime already exists
        const newAnime = trendingAnimeData.data.filter(
          anime => !prev.some(existing => existing.mal_id === anime.mal_id)
        );
        return [...prev, ...newAnime];
      });
      
      // Update hasMore based on pagination info
      setHasMore(trendingAnimeData.pagination?.has_next_page || false);
    }
  }, [trendingAnimeData]);
  
  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (isLoading || isFetching || !hasMore) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, isFetching, hasMore]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trending Anime</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {allAnime.map((anime: Anime, index: number) => (
          <AnimeCard key={anime.mal_id} anime={anime} index={index} />
        ))}
        
        {/* Show skeleton loading for each card while fetching more data */}
        {isFetching && Array(12).fill(0).map((_, index) => (
          <AnimeCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
      
      {/* Invisible element for intersection observer */}
      <div ref={loadMoreRef} className="h-10 mt-8" />
      
      {/* Show message when no more data */}
      {!hasMore && allAnime.length > 0 && (
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400">
          No more anime to load
        </div>
      )}
    </div>
  );
} 
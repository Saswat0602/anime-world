'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useUpcomingAnimeQuery } from '@/redux/api/upComingAnimeApi';
import { AnimeCard } from '@/components/Home/AnimeCard';
import { AnimeCardSkeleton } from '@/components/Home/AnimeCardSkeleton';
import { Anime } from '@/types/types';

export default function UpcomingPage() {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: upcomingAnimeData, isLoading, isFetching } = useUpcomingAnimeQuery(page);

  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds(prev => {
      const updated = new Set(prev);
      updated.add(animeId);
      return updated;
    });
  }, []);

  useEffect(() => {
    if (upcomingAnimeData?.data) {
      setAllAnime(prev => {
        const newAnime = upcomingAnimeData.data.filter(
          anime => !prev.some(existing => existing.mal_id === anime.mal_id)
        );
        return [...prev, ...newAnime];
      });

      setHasMore(upcomingAnimeData.pagination?.has_next_page || false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isFetching && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [upcomingAnimeData, isLoading, isFetching, hasMore]);

  const pendingItemsCount = isFetching || isLoading ? 6 : 0;



  console.log(allAnime,"allAnime")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Anime</h1>

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

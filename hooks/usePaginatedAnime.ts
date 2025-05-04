'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Anime } from '@/types/types';

type UsePaginatedAnimeProps<T> = {
  queryFn: (arg: T) => { data?: any; isLoading: boolean; isFetching: boolean; error?: any };
  queryArg: T;
};

export function usePaginatedAnime<T>({ queryFn, queryArg }: UsePaginatedAnimeProps<T>) {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const queryResult = queryFn(queryArg);

  const { data, isLoading, isFetching, error } = queryResult;

  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds((prev) => {
      const updated = new Set(prev);
      updated.add(animeId);
      return updated;
    });
  }, []);

  useEffect(() => {
    if (data?.data) {
      setAllAnime((prev) => {
        const newAnime = data.data.filter(
          (anime: Anime) => !prev.some((existing) => existing.mal_id === anime.mal_id)
        );
        return [...prev, ...newAnime];
      });

      setHasMore(data.pagination?.has_next_page ?? false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          !isFetching &&
          hasMore &&
          navigator.onLine &&
          !error
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [data, isLoading, isFetching, hasMore, error]);

  return {
    page,
    setPage,
    allAnime,
    hasMore,
    loadedAnimeIds,
    loadMoreRef,
    isLoading,
    isFetching,
    handleAnimeLoaded,
  };
}

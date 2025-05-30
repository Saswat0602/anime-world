// hooks/useSearchPaginatedAnime.ts
import { useState, useRef, useEffect, useCallback } from 'react';
import { Anime, AnimeResponse } from '@/types/types';
import { useSearchAnimeQuery } from '@/redux/api';

type QueryResult = {
  data?: AnimeResponse | null;
  isLoading: boolean;
  isFetching: boolean;
  error?: unknown;
};

type UseSearchPaginatedAnimeProps = {
  search: string;
  initialPage?: number;
};

export function useSearchPaginatedAnime({
  search,
  initialPage = 1,
}: UseSearchPaginatedAnimeProps) {
  const [page, setPage] = useState(initialPage);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const [isSearching, setIsSearching] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Run the query with current page and search
  const { data, isLoading, isFetching, error } = useSearchAnimeQuery(
    { page, search },
    { skip: !search || isSearching }
  );

  // Reset when search changes
  useEffect(() => {
    setPage(initialPage);
    setAllAnime([]);
    setLoadedAnimeIds(new Set());
    setHasMore(true);
    setIsSearching(true);
  }, [search, initialPage]);

  // Append new data
  useEffect(() => {
    if (!data?.data) {
      setHasMore(false);
      setIsSearching(false);
      return;
    }

    setAllAnime((prev) => {
      const newAnimeMap = new Map(prev.map((anime) => [anime.mal_id, anime]));
      for (const anime of data.data) {
        if (!newAnimeMap.has(anime.mal_id)) {
          newAnimeMap.set(anime.mal_id, anime);
        }
      }
      return Array.from(newAnimeMap.values());
    });

    setHasMore(!!data.pagination?.has_next_page);
    setIsSearching(false);
  }, [data]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    if (!hasMore || !search || isSearching) {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const shouldLoadMore =
          entries[0].isIntersecting &&
          !isLoading &&
          !isFetching &&
          hasMore &&
          !error &&
          !isSearching;

        if (shouldLoadMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) observerRef.current.observe(currentElement);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading, isFetching, hasMore, error, search, isSearching]);

  // Utility for tracking loaded images or items
  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds((prev) => new Set(prev).add(animeId));
  }, []);

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
    isSearching,
  };
}

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Anime } from '@/types/types';
import { useSearchAnimeQuery } from '@/redux/api';

type SearchFilters = {
  search?: string;
  genres?: string[];
  year?: string;
  season?: string;
  format?: string[];
  airingStatus?: string;
};

export function useSearchPaginatedAnime(filters: SearchFilters) {
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentFiltersRef = useRef<string>('');

  const queryParams = useMemo(() => ({
    page,
    search: filters.search,
    genres: filters.genres,
    year: filters.year,
    season: filters.season,
    format: filters.format,
    airingStatus: filters.airingStatus,
  }), [page, filters]);

  const filterSignature = useMemo(() => JSON.stringify({
    search: filters.search || '',
    genres: filters.genres?.slice().sort() || [],
    year: filters.year || '',
    season: filters.season || '',
    format: filters.format?.slice().sort() || [],
    airingStatus: filters.airingStatus || '',
  }), [filters]);

  const shouldSkip = useMemo(() => (
    !filters.search &&
    (!filters.genres || filters.genres.length === 0) &&
    !filters.year &&
    !filters.season &&
    (!filters.format || filters.format.length === 0) &&
    !filters.airingStatus
  ), [filters]);

  const { data, isLoading, isFetching, error } = useSearchAnimeQuery(queryParams, {
    skip: shouldSkip,
  });

  // Reset state when filters change
  useEffect(() => {
    if (currentFiltersRef.current !== filterSignature) {
      currentFiltersRef.current = filterSignature;
      setPage(1);
      setAllAnime([]);
      setLoadedAnimeIds(new Set());
      setHasMore(true);
    }
  }, [filterSignature]);

  // Handle data updates
  useEffect(() => {
    if (!data) {
      setHasMore(false);
      return;
    }

    const { data: newAnime, pagination } = data;

    if (page === 1) {
      setAllAnime(newAnime || []);
    } else {
      setAllAnime((prev) => {
        if (!newAnime?.length) return prev;

        const existingIds = new Set(prev.map((anime) => anime.mal_id));
        const uniqueNewAnime = newAnime.filter((anime) => !existingIds.has(anime.mal_id));
        return uniqueNewAnime.length > 0 ? [...prev, ...uniqueNewAnime] : prev;
      });
    }

    setHasMore(!!pagination?.has_next_page);
  }, [data, page]);

  // Infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (shouldSkip || !hasMore || isLoading || isFetching || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isFetching && !error) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const currentElement = loadMoreRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [shouldSkip, hasMore, isLoading, isFetching, error]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds((prev) => {
      if (prev.has(animeId)) return prev;
      return new Set([...prev, animeId]);
    });
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
  };
}

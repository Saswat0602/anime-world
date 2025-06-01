
// hooks/useSearchPaginatedAnime.ts
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Anime, AnimeResponse } from '@/types/types';
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
  // State
  const [page, setPage] = useState(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  
  // Refs
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const currentFiltersRef = useRef<string>('');

  // Create stable query parameters
  const queryParams = useMemo(() => {
    return {
      page,
      search: filters.search,
      genres: filters.genres,
      year: filters.year,
      season: filters.season,
      format: filters.format,
      airingStatus: filters.airingStatus,
    };
  }, [page, filters.search, filters.genres, filters.year, filters.season, filters.format, filters.airingStatus]);

  // Create filter signature to detect changes
  const filterSignature = useMemo(() => {
    return JSON.stringify({
      search: filters.search || '',
      genres: filters.genres?.slice().sort() || [],
      year: filters.year || '',
      season: filters.season || '',
      format: filters.format?.slice().sort() || [],
      airingStatus: filters.airingStatus || '',
    });
  }, [filters]);

  // Determine if should skip query
  const shouldSkip = useMemo(() => {
    return !filters.search && 
           (!filters.genres || filters.genres.length === 0) && 
           !filters.year && 
           !filters.season && 
           (!filters.format || filters.format.length === 0) && 
           !filters.airingStatus;
  }, [filters]);

  // API Query with stable parameters
  const { data, isLoading, isFetching, error } = useSearchAnimeQuery(
    queryParams,
    { 
      skip: shouldSkip,
      // Add serializeQueryArgs to prevent unnecessary refetches
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...filters } = queryArgs;
        return JSON.stringify({ page, ...filters });
      },
    }
  );

  // Handle filter changes
  useEffect(() => {
    const hasFiltersChanged = currentFiltersRef.current !== filterSignature;
    
    if (hasFiltersChanged) {
      currentFiltersRef.current = filterSignature;
      
      // Reset state for new filters
      setPage(1);
      setAllAnime([]);
      setLoadedAnimeIds(new Set());
      setHasMore(true);
    }
  }, [filterSignature]);

  // Handle data updates
  useEffect(() => {
    if (!data) {
      if (data === null) {
        setHasMore(false);
      }
      return;
    }

    const { data: newAnime, pagination } = data;
    
    if (page === 1) {
      // First page or new search
      setAllAnime(newAnime || []);
    } else {
      // Subsequent pages - append data
      setAllAnime(prevAnime => {
        if (!newAnime?.length) return prevAnime;
        
        const existingIds = new Set(prevAnime.map(anime => anime.mal_id));
        const uniqueNewAnime = newAnime.filter(anime => !existingIds.has(anime.mal_id));
        
        return uniqueNewAnime.length > 0 ? [...prevAnime, ...uniqueNewAnime] : prevAnime;
      });
    }

    setHasMore(!!pagination?.has_next_page);
  }, [data, page]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't set up observer if conditions aren't met
    if (shouldSkip || !hasMore || isLoading || isFetching || error) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !isFetching && !error) {
          setPage(prevPage => prevPage + 1);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds(prev => {
      if (prev.has(animeId)) return prev;
      return new Set([...prev, animeId]);
    });
  }, []);

  // Debug log (remove in production)
  useEffect(() => {
    if (!shouldSkip) {
      console.log('API Call:', { page, filters, shouldSkip });
    }
  }, [page, filterSignature, shouldSkip]);

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

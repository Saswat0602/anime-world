import { useState, useRef, useCallback, useEffect } from 'react';
import { Anime } from '@/types/types';
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { AnimeResponse } from '@/types/types';

type QueryResult = {
  data?: AnimeResponse | null;
  isLoading: boolean;
  isFetching: boolean;
  error?: unknown;
};

type PaginationParams = {
  page: number;
  [key: string]: unknown;
};

type UsePaginatedAnimeProps<T extends PaginationParams> = {
  useQueryHook: (params: T) => QueryResult;
  baseQueryParams: Omit<T, 'page'>;
  initialPage?: number;
};

export function usePaginatedAnime<T extends PaginationParams>({
  useQueryHook,
  baseQueryParams,
  initialPage = 1,
}: UsePaginatedAnimeProps<T>) {
  const [page, setPage] = useState(initialPage);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadedAnimeIds, setLoadedAnimeIds] = useState<Set<number>>(new Set());
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);


  const queryParams = {
    ...baseQueryParams,
    page,
  } as T;

  const { data, isLoading, isFetching, error } = useQueryHook(queryParams);


  const handleAnimeLoaded = useCallback((animeId: number) => {
    setLoadedAnimeIds((prev) => new Set(prev).add(animeId));
  }, []);

  useEffect(() => {
    if (!data?.data) return;

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
  }, [data]);

  useEffect(() => {
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
          !error;

        if (shouldLoadMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const current = loadMoreRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isLoading, isFetching, hasMore, error]);

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

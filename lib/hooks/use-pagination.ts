import { useState, useEffect, DependencyList, useRef, useCallback } from 'react';
import { AnimeResponse } from '../types';

type FetchFunction = (page: number) => Promise<AnimeResponse | null>;

interface PaginationResult {
  data: AnimeResponse | null;
  isLoading: boolean;
  error: string | null;
}

export const usePagination = (
  fetchFn: FetchFunction, 
  page: number,
  deps: DependencyList = []
): PaginationResult => {
  const [data, setData] = useState<AnimeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const isFetchingRef = useRef(false);
  const lastDataRef = useRef<AnimeResponse | null>(null);
  
  const fetchData = useCallback(async () => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn(page);
      
      if (!result) {
        throw new Error('Failed to fetch data');
      }
      
      lastDataRef.current = result;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      if (lastDataRef.current) {
        setData(lastDataRef.current);
      }
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [fetchFn, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...deps]);

  return { data, isLoading, error };
}; 
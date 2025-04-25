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
  
  // Use a ref to track if we're already fetching
  const isFetchingRef = useRef(false);
  // Use a ref to store the last successful data
  const lastDataRef = useRef<AnimeResponse | null>(null);
  
  // Memoize the fetchData function to prevent infinite loops
  const fetchData = useCallback(async () => {
    // If we're already fetching, don't start another fetch
    if (isFetchingRef.current) return;
    
    // Set fetching flag to true
    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn(page);
      
      if (!result) {
        throw new Error('Failed to fetch data');
      }
      
      // Store last successful result
      lastDataRef.current = result;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      // If there's an error but we have previous data, keep showing it
      if (lastDataRef.current) {
        setData(lastDataRef.current);
      }
    } finally {
      setIsLoading(false);
      // Reset the fetching flag
      isFetchingRef.current = false;
    }
  }, [fetchFn, page]);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps]);

  return { data, isLoading, error };
}; 
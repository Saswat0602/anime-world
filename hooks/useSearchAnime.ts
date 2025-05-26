// hooks/useSearchAnime.ts
import { useSearchAnimeQuery } from '@/redux/api';
import { usePaginatedAnime } from './usePaginatedAnime';

export const useSearchAnime = (search: string) => {
  return usePaginatedAnime({
    useQueryHook: ({ page }: { page: number }) => useSearchAnimeQuery({ page, search }),
    baseQueryParams: {},
  });
};

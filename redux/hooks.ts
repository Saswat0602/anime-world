// Re-export all API hooks from a central location
import { useTrendingAnimeQuery, useSeasonalAnimeQuery } from './api/animeApi';
import { useAnimeDetailsQuery } from './api/detailsApi';
import { useSearchAnimeQuery } from './api/searchApi';
import { 
  useGetAllGenresQuery, 
  useGetAnimeByGenreQuery, 
  useGetAnimeByStudioQuery 
} from './api/genresApi';

import type { RootState, AppDispatch } from './store';

export {
  useTrendingAnimeQuery,
  useSeasonalAnimeQuery,
  
  useAnimeDetailsQuery,
  
  useSearchAnimeQuery,
  useGetAllGenresQuery,
  useGetAnimeByGenreQuery,
  useGetAnimeByStudioQuery,
  
  // Types
  RootState,
  AppDispatch
}; 
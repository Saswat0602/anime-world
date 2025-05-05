// Re-export all API hooks from a central location
import { useTrendingAnimeQuery, useSeasonalAnimeQuery } from './api/animeApi';
import { useAnimeDetailsQuery } from './api/detailsApi';
import { useSearchAnimeQuery } from './api/searchApi';
import { useUpcomingAnimeQuery } from './api/upcomingAnimeApi';
import { useTop100AnimeQuery } from './api/top100AnimeApi';
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
  useUpcomingAnimeQuery,
  useTop100AnimeQuery,
  
  // Types
  RootState,
  AppDispatch
}; 
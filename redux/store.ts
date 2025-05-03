import { searchApi } from './api/searchApi';
import { configureStore } from '@reduxjs/toolkit';

import { animeApi, detailsApi, genresApi, top100AnimeApi, upComingAnimeApi } from './api';

export const store = configureStore({
  reducer: {
    [animeApi.reducerPath]: animeApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [upComingAnimeApi.reducerPath]: upComingAnimeApi.reducer, 
    [top100AnimeApi.reducerPath]: top100AnimeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeApi.middleware,
      detailsApi.middleware,
      searchApi.middleware,
      genresApi.middleware,
      upComingAnimeApi.middleware,
      top100AnimeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

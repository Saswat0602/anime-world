import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/searchSlice';
import { animeApi, detailsApi, genresApi, searchAnimeApi, top100AnimeApi, upComingAnimeApi } from './api';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [animeApi.reducerPath]: animeApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
    [searchAnimeApi.reducerPath]: searchAnimeApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [upComingAnimeApi.reducerPath]: upComingAnimeApi.reducer, 
    [top100AnimeApi.reducerPath]: top100AnimeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeApi.middleware,
      detailsApi.middleware,
      searchAnimeApi.middleware,
      genresApi.middleware,
      upComingAnimeApi.middleware,
      top100AnimeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { animeApi } from './api/animeApi';
import { detailsApi } from './api/detailsApi';
import { searchApi } from './api/searchApi';
import { genresApi } from './api/genresApi';
import { upcomingAnimeApi } from './api/upcomingAnimeApi'; 

export const store = configureStore({
  reducer: {
    [animeApi.reducerPath]: animeApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [upcomingAnimeApi.reducerPath]: upcomingAnimeApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeApi.middleware,
      detailsApi.middleware,
      searchApi.middleware,
      genresApi.middleware,
      upcomingAnimeApi.middleware 
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

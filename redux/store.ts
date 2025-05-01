import { configureStore } from '@reduxjs/toolkit';
import { animeApi } from './api/animeApi';
import { detailsApi } from './api/detailsApi';
import { searchApi } from './api/searchApi';
import { genresApi } from './api/genresApi';
import { upComingAnimeApi } from './api/upComingAnimeApi'; 

export const store = configureStore({
  reducer: {
    [animeApi.reducerPath]: animeApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [upComingAnimeApi.reducerPath]: upComingAnimeApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animeApi.middleware,
      detailsApi.middleware,
      searchApi.middleware,
      genresApi.middleware,
      upComingAnimeApi.middleware 
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

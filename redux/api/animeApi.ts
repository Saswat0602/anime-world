import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { getTrendingAnime, getSeasonalAnime } from '@/lib/anilist';
import type { AnimeResponse } from '@/lib/types';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fakeBaseQuery<unknown>(),
  endpoints: (builder) => ({
    trendingAnime: builder.query<AnimeResponse | null, number>({
      async queryFn(page = 1) {
        try {
          const data = await getTrendingAnime(page);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    seasonalAnime: builder.query<AnimeResponse | null, { year: number; season: 'winter' | 'spring' | 'summer' | 'fall'; page?: number }>({
      async queryFn({ year, season, page = 1 }) {
        try {
          const data = await getSeasonalAnime(year, season, page);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useTrendingAnimeQuery, useSeasonalAnimeQuery } = animeApi; 
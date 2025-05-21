import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { TRENDING_ANIME_QUERY, SEASONAL_ANIME_QUERY } from '@/lib/queries/fetchAnime';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/anilist', // using Next.js API route
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    trendingAnime: builder.query<AnimeResponse | null, { page: number }>({
      query: ({ page }) => ({
        url: '',
        method: 'POST',
        body: {
          query: TRENDING_ANIME_QUERY,
          variables: { page, perPage: 18 }
        }
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          const animeList = response.data.Page.media
            .filter(anime => !(anime.genres?.includes("Hentai")))
            .map(convertToAnime);

          return {
            data: animeList,
            pagination: convertPagination(response.data.Page.pageInfo)
          };
        }
        return null;
      },
    }),

    seasonalAnime: builder.query<
      AnimeResponse | null,
      { year: number; season: 'winter' | 'spring' | 'summer' | 'fall'; page?: number }
    >({
      query: ({ year, season, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEASONAL_ANIME_QUERY,
          variables: {
            page,
            perPage: 18,
            season: season.toUpperCase(),
            seasonYear: year
          }
        }
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          const animeList = response.data.Page.media
            .filter(anime => !(anime.genres?.includes("Hentai")))
            .map(convertToAnime);

          return {
            data: animeList,
            pagination: convertPagination(response.data.Page.pageInfo)
          };
        }
        return null;
      },
    }),

  }),
});

export const { useTrendingAnimeQuery, useSeasonalAnimeQuery } = animeApi;

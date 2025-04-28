import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { TRENDING_ANIME_QUERY, SEASONAL_ANIME_QUERY } from '@/lib/queries/fetchAnime';
import { convertPagination, convertToAnime } from '../utils/apiHelpers';





export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' }),
  endpoints: (builder) => ({
    trendingAnime: builder.query<AnimeResponse | null, number>({
      query: (page = 1) => ({
        url: '',
        method: 'POST',
        body: {
          query: TRENDING_ANIME_QUERY,
          variables: { page, perPage: 12 }
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          const animeList = response.data.Page.media.map(convertToAnime);
          return {
            data: animeList,
            pagination: convertPagination(response.data.Page.pageInfo)
          };
        }
        return null;
      },
    }),
    seasonalAnime: builder.query<AnimeResponse | null, { year: number; season: 'winter' | 'spring' | 'summer' | 'fall'; page?: number }>({
      query: ({ year, season, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEASONAL_ANIME_QUERY,
          variables: { 
            page, 
            perPage: 12,
            season: season.toUpperCase(),
            seasonYear: year
          }
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          console.log(response.data.Page.media, "response.data.Page.media");
          const animeList = response.data.Page.media.map(convertToAnime);
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
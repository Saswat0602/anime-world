import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { TRENDING_ANIME_QUERY, SEASONAL_ANIME_QUERY } from '@/lib/queries/fetchAnime';
import { convertPagination, convertToAnime } from '../utils/apiHelpers';

const token = process.env.NEXT_PUBLIC_TOKEN;

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphql.anilist.co',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    trendingAnime: builder.query<AnimeResponse | null, number>({
      query: (page = 1) => ({
        url: '',
        method: 'POST',
        body: {
          query: TRENDING_ANIME_QUERY,
          variables: { page, perPage: 12 }
        }
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          console.log(response.data,"response.data.Page");        
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

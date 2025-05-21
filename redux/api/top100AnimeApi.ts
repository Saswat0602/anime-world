import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { TOP100_ANIME_QUERY } from '@/lib/queries/top100Anime';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

const token = process.env.NEXT_PUBLIC_TOKEN;

export const top100AnimeApi = createApi({
  reducerPath: 'top100AnimeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://graphql.anilist.co',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    top100Anime: builder.query<AnimeResponse | null, { page: number }>({
      query: ({ page }) => ({
        url: '',
        method: 'POST',
        body: {
          query: TOP100_ANIME_QUERY,
          variables: { page, perPage: 25 }, 
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data?.Page) {
          const animeList = response.data.Page.media
            .filter(anime => !(anime.genres?.includes('Hentai')))
            .map(convertToAnime);
          return {
            data: animeList,
            pagination: convertPagination(response.data.Page.pageInfo),
          };
        }
        return null;
      },
    }),
  }),
});

export const { useTop100AnimeQuery } = top100AnimeApi;
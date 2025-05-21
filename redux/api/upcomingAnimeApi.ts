import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { UPCOMING_NEXT_SEASON_QUERY } from '@/lib/queries/upComingNextSeason';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

const token = process.env.NEXT_PUBLIC_TOKEN;

export const upComingAnimeApi = createApi({
  reducerPath: 'upComingAnimeApi',
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
    upcomingAnime: builder.query<AnimeResponse | null, number>({
      query: (page = 1) => ({
        url: '',
        method: 'POST',
        body: {
          query: UPCOMING_NEXT_SEASON_QUERY,
          variables: { page, perPage: 18 },
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        if (response.data && response.data.Page) {
          const animeList = response.data.Page.media
            .filter(anime => !(anime.genres?.includes("Hentai")))
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

export const { useUpcomingAnimeQuery } = upComingAnimeApi;
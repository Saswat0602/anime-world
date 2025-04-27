import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/lib/types';
import { SEARCH_ANIME_QUERY } from '@/lib/queries/searchQueries';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' }),
  endpoints: (builder) => ({
    searchAnime: builder.query<AnimeResponse | null, { query: string; page?: number }>({
      query: ({ query, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEARCH_ANIME_QUERY,
          variables: { 
            search: query,
            page, 
            perPage: 10 
          }
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
  }),
});

export const { useSearchAnimeQuery } = searchApi; 
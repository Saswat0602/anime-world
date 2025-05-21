import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeDetailsResponse } from '@/types/animeDetails';
import { ANIME_DETAILS_QUERY } from '@/lib/queries/detailsQueries';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/anilist',
  }),
  endpoints: (builder) => ({
    animeDetails: builder.query<AnimeDetailsResponse['data']['Media'], string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_DETAILS_QUERY,
          variables: { id: parseInt(id, 10) },
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AnimeDetailsResponse) => response.data.Media,
    }),
  }),
});

export const { useAnimeDetailsQuery } = detailsApi;

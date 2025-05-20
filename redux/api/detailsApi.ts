import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AniListDetailsResponse } from '@/types/types'; // Keep this type general if you want to type-check
import { ANIME_DETAILS_QUERY } from '@/lib/queries/detailsQueries';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' }),
  endpoints: (builder) => ({
    animeDetails: builder.query<AniListDetailsResponse, string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_DETAILS_QUERY,
          variables: { id: parseInt(id) },
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      // Just return raw response
      transformResponse: (response: AniListDetailsResponse) => response,
    }),
  }),
});

export const { useAnimeDetailsQuery } = detailsApi;

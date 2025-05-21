import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { TOP100_ANIME_QUERY } from '@/lib/queries/top100Anime';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

export const top100AnimeApi = createApi({
  reducerPath: 'top100AnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/anilist' }),
  endpoints: (builder) => ({
    top100Anime: builder.query<AnimeResponse | null, { page: number }>({
      query: ({ page }) => ({
        url: '',
        method: 'POST',
        body: {
          query: TOP100_ANIME_QUERY,
          variables: { page, perPage: 25 }
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        const animeList = response.data?.Page?.media
          .filter(anime => !anime.genres?.includes('Hentai'))
          .map(convertToAnime) ?? [];
        const pagination = convertPagination(response.data?.Page?.pageInfo);
        return animeList.length ? { data: animeList, pagination } : null;
      },
    }),
  }),
});

export const { useTop100AnimeQuery } = top100AnimeApi;

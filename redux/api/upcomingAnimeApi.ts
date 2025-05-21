import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { UPCOMING_NEXT_SEASON_QUERY } from '@/lib/queries/upComingNextSeason';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

export const upComingAnimeApi = createApi({
  reducerPath: 'upComingAnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/anilist' }),
  endpoints: (builder) => ({
    upcomingAnime: builder.query<AnimeResponse | null, number>({
      query: (page = 1) => ({
        url: '',
        method: 'POST',
        body: {
          query: UPCOMING_NEXT_SEASON_QUERY,
          variables: { page, perPage: 18 },
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

export const { useUpcomingAnimeQuery } = upComingAnimeApi;

// redux/api/searchAnimeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AniListAnimeResponse, AnimeResponse } from '@/types/types';
import { convertToAnime, convertPagination } from '@/utils/apiHelpers';
import { SEARCH_ANIME_QUERY } from '@/lib/queries/searchQueries';

export const searchAnimeApi = createApi({
  reducerPath: 'searchAnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/anilist' }),
  endpoints: (builder) => ({
    searchAnime: builder.query<AnimeResponse | null, { page: number; search: string }>({
      query: ({ page, search }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEARCH_ANIME_QUERY,
          variables: { page, perPage: 24, search },
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        const animeList = response.data?.Page?.media
          .filter((anime) => !anime.genres?.includes('Hentai'))
          .map(convertToAnime) ?? [];
        const pagination = convertPagination(response.data?.Page?.pageInfo);
        return animeList.length ? { data: animeList, pagination } : null;
      },
    }),
  }),
});

export const { useSearchAnimeQuery } = searchAnimeApi;

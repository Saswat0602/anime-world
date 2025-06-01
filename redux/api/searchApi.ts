import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AniListAnimeResponse, AnimeResponse } from '@/types/types';
import { convertToAnime, convertPagination } from '@/utils/apiHelpers';
import { SEARCH_ANIME_QUERY } from '@/lib/queries/searchQueries';

export const searchAnimeApi = createApi({
  reducerPath: 'searchAnimeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/anilist' }),
  tagTypes: ['SearchAnime'],
  endpoints: (builder) => ({
    searchAnime: builder.query<
      AnimeResponse | null,
      {
        page: number;
        search?: string;
        genres?: string[];
        year?: string;
        season?: string;
        format?: string[];
        airingStatus?: string;
      }
    >({
      query: ({ page, search, genres, year, season, format, airingStatus }) => ({
        url: '',
        method: 'POST',
        body: {
          query: SEARCH_ANIME_QUERY,
          variables: {
            page,
            perPage: 24,
            search: search || undefined,
            genres: genres?.length ? genres : undefined,
            seasonYear: year ? parseInt(year) : undefined,
            season: season || undefined,
            format: format?.length ? format : undefined,
            status: airingStatus || undefined,
          },
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        const animeList =
          response.data?.Page?.media
            ?.filter((anime) => !anime.genres?.includes('Hentai'))
            .map(convertToAnime) ?? [];
        const pagination = convertPagination(response.data?.Page?.pageInfo);
        return animeList.length ? { data: animeList, pagination } : null;
      },
      serializeQueryArgs: ({ queryArgs }: { queryArgs: any }) => {
        const normalized = {
          page: queryArgs.page,
          search: queryArgs.search || '',
          genres: queryArgs.genres?.slice().sort().join(',') || '',
          year: queryArgs.year || '',
          season: queryArgs.season || '',
          format: queryArgs.format?.slice().sort().join(',') || '',
          airingStatus: queryArgs.airingStatus || '',
        };
        return JSON.stringify(normalized);
      },
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useSearchAnimeQuery } = searchAnimeApi;

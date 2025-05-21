import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { GENRES_QUERY, ANIME_BY_GENRE_QUERY, ANIME_BY_STUDIO_QUERY } from '@/lib/queries/genreQueries';
import { convertPagination, convertToAnime } from '@/utils/apiHelpers';

export const genresApi = createApi({
  reducerPath: 'genresApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/anilist' }),
  endpoints: (builder) => ({
    getAllGenres: builder.query<{ data: Array<{ mal_id: number; name: string; type: string; url: string }> }, void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: { query: GENRES_QUERY },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: { data: { GenreCollection: string[] } }) => {
        const genres = response.data?.GenreCollection?.map(genre => ({
          mal_id: 0,
          type: 'anime',
          name: genre,
          url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
        })) ?? [];
        return { data: genres };
      },
    }),

    getAnimeByGenre: builder.query<AnimeResponse | null, { genreId: string; page?: number }>({
      query: ({ genreId, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_BY_GENRE_QUERY,
          variables: { genre: genreId, page, perPage: 18 }
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        const animeList = response.data?.Page?.media.map(convertToAnime) ?? [];
        const pagination = convertPagination(response.data?.Page?.pageInfo);
        return animeList.length ? { data: animeList, pagination } : null;
      },
    }),

    getAnimeByStudio: builder.query<AnimeResponse | null, { studioId: number; page?: number }>({
      query: ({ studioId, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_BY_STUDIO_QUERY,
          variables: { studioId, page, perPage: 18 }
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
      transformResponse: (response: AniListAnimeResponse) => {
        const animeList = response.data?.Page?.media.map(convertToAnime) ?? [];
        const pagination = convertPagination(response.data?.Page?.pageInfo);
        return animeList.length ? { data: animeList, pagination } : null;
      },
    }),
  }),
});

export const { useGetAllGenresQuery, useGetAnimeByGenreQuery, useGetAnimeByStudioQuery } = genresApi;

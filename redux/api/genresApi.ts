import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeResponse, AniListAnimeResponse } from '@/types/types';
import { GENRES_QUERY, ANIME_BY_GENRE_QUERY, ANIME_BY_STUDIO_QUERY } from '@/lib/queries/genreQueries';
import { convertPagination, convertToAnime } from '../utils/apiHelpers';

export const genresApi = createApi({
  reducerPath: 'genresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' }),
  endpoints: (builder) => ({
    getAllGenres: builder.query<{ data: Array<{ mal_id: number, name: string, type: string, url: string }> }, void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: GENRES_QUERY
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
      transformResponse: (response: { data: { GenreCollection: string[] } }) => {
        if (response.data && response.data.GenreCollection) {
          const genres = response.data.GenreCollection.map(genre => ({
            mal_id: 0, // AniList doesn't have IDs for genres
            type: 'anime',
            name: genre,
            url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
          }));
          
          return { data: genres };
        }
        return { data: [] };
      },
    }),
    
    getAnimeByGenre: builder.query<AnimeResponse | null, { genreId: string; page?: number }>({
      query: ({ genreId, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_BY_GENRE_QUERY,
          variables: { 
            genre: genreId,
            page, 
            perPage: 18 
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
    
    getAnimeByStudio: builder.query<AnimeResponse | null, { studioId: number; page?: number }>({
      query: ({ studioId, page = 1 }) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_BY_STUDIO_QUERY,
          variables: { 
            studioId,
            page, 
            perPage: 18 
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

export const { 
  useGetAllGenresQuery, 
  useGetAnimeByGenreQuery, 
  useGetAnimeByStudioQuery 
} = genresApi; 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AnimeDetailsResponse, AniListDetailsResponse } from '@/types/types';
import { ANIME_DETAILS_QUERY } from '@/lib/queries/detailsQueries';
import { convertPagination, convertToAnime } from '../utils/apiHelpers';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://graphql.anilist.co' }),
  endpoints: (builder) => ({
    animeDetails: builder.query<AnimeDetailsResponse | null, string>({
      query: (id) => ({
        url: '',
        method: 'POST',
        body: {
          query: ANIME_DETAILS_QUERY,
          variables: { id: parseInt(id) }
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }),
      transformResponse: (response: AniListDetailsResponse) => {
        if (response.data && response.data.Media) {
          const media = response.data.Media;
          const animeDetails = convertToAnime(media);

          // Add additional details for the detailed view
          return {
            data: {
              ...animeDetails,
              genres: media.genres?.map((genre: string) => ({
                mal_id: 0,
                type: 'anime',
                name: genre,
                url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
              })),
              studios: media.studios?.edges.map((edge) => ({
                mal_id: 0,
                type: 'anime',
                name: edge.node.name,
                url: `https://anilist.co/studio/${edge.node.id}`
              })) || [],
              relations: media.relations?.edges.map((edge) => ({
                relation: edge.relationType,
                entry: [
                  {
                    mal_id: edge.node.id,
                    type: edge.node.type.toLowerCase(),
                    name: edge.node.title.userPreferred,
                    url: `https://anilist.co/${edge.node.type.toLowerCase()}/${edge.node.id}`
                  }
                ]
              })) || [],
              streaming: media.streamingEpisodes?.map((episode) => ({
                name: episode.site,
                url: episode.url
              })) || [],
              trailer: media.trailer ? {
                youtube_id: media.trailer.id,
                url: `https://www.youtube.com/watch?v=${media.trailer.id}`,
                embed_url: `https://www.youtube.com/embed/${media.trailer.id}`
              } : undefined
            }
          };
        }
        return null;
      },
    }),
  }),
});

export const { useAnimeDetailsQuery } = detailsApi; 
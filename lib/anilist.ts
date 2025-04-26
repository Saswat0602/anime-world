import axios from 'axios';
import { 
  AnimeResponse, 
  AnimeDetailsResponse, 
  Anime, 
  AniListAnimeResponse,
  AniListMedia,
  AniListDetailsResponse
} from './types';
import { ANIME_BY_GENRE_QUERY, ANIME_BY_STUDIO_QUERY, ANIME_DETAILS_QUERY, GENRES_QUERY, MOST_FAVORITED_QUERY, NEW_RELEASES_QUERY, POPULAR_ANIME_QUERY, SEARCH_ANIME_QUERY, SEASONAL_ANIME_QUERY, TRENDING_ANIME_QUERY, UPCOMING_ANIME_QUERY, YEARLY_ANIME_QUERY } from './graphQlQuerry';


const BASE_URL = 'https://graphql.anilist.co';

// Helper function to convert AniList media to our app's Anime format
const convertToAnime = (media: AniListMedia): Anime => {
  return {
    mal_id: media.id, // Using AniList ID instead of MAL ID
    url: `https://anilist.co/anime/${media.id}`,
    title: media.title.userPreferred || media.title.english || media.title.romaji || '',
    title_english: media.title.english || undefined,
    title_japanese: media.title.native || undefined,
    title_synonyms: media.synonyms || [],
    type: media.format || 'Unknown',
    source: media.source || 'Unknown',
    episodes: media.episodes || undefined,
    status: media.status || 'Unknown',
    airing: media.status === 'RELEASING',
    aired: {
      from: media.startDate ? `${media.startDate.year}-${media.startDate.month}-${media.startDate.day}` : '',
      to: media.endDate && media.endDate.year ? `${media.endDate.year}-${media.endDate.month}-${media.endDate.day}` : undefined,
      string: formatAiredString(media.startDate, media.endDate)
    },
    duration: media.duration ? `${media.duration} min per ep` : 'Unknown',
    rating: media.isAdult ? 'R+ - Mild Nudity' : 'PG-13 - Teens 13 or older',
    score: media.averageScore ? media.averageScore / 10 : undefined, // AniList scores are 0-100
    scored_by: media.popularity || undefined,
    rank: media.rankings?.find((r: { type: string }) => r.type === 'RATED')?.rank || undefined,
    popularity: media.popularity || undefined,
    members: media.popularity || undefined,
    favorites: media.favourites || undefined,
    synopsis: media.description || undefined,
    background: media.description || undefined,
    season: media.season ? media.season.toLowerCase() : undefined,
    year: media.seasonYear || undefined,
    images: {
      jpg: {
        image_url: media.coverImage.medium || '',
        small_image_url: media.coverImage.medium || undefined,
        large_image_url: media.coverImage.large || undefined
      }
    }
  };
};

// Helper to format aired string similar to Jikan
const formatAiredString = (
  startDate: { year: number | null; month: number | null; day: number | null } | null | undefined,
  endDate: { year: number | null; month: number | null; day: number | null } | null | undefined
): string => {
  if (!startDate || !startDate.year) return 'Not available';
  
  // Convert null values to undefined for compatibility
  const start = `${startDate.year}-${String(startDate.month || 1).padStart(2, '0')}-${String(startDate.day || 1).padStart(2, '0')}`;
  
  if (!endDate || !endDate.year) {
    return `${start} to ?`;
  }
  
  const end = `${endDate.year}-${String(endDate.month || 1).padStart(2, '0')}-${String(endDate.day || 1).padStart(2, '0')}`;
  return `${start} to ${end}`;
};

// Define a type for pageInfo
type PageInfo = {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
};

// Update executeGraphQLQuery to use a generic type for variables
async function executeGraphQLQuery<T, V extends Record<string, unknown>>(query: string, variables: V): Promise<T> {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        query,
        variables
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error executing GraphQL query:', error);
    throw error;
  }
}

// Update convertPagination to use PageInfo type
const convertPagination = (pageInfo: PageInfo) => {
  return {
    last_visible_page: pageInfo.lastPage,
    has_next_page: pageInfo.hasNextPage,
    current_page: pageInfo.currentPage,
    items: {
      count: pageInfo.perPage,
      total: pageInfo.total,
      per_page: pageInfo.perPage
    }
  };
};

// Define a type for the anime details object
type AnimeDetailsWithExtras = Anime & {
  genres?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  studios?: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  relations?: Array<{
    relation: string;
    entry: Array<{
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }>;
  }>;
  streaming?: Array<{
    name: string;
    url: string;
  }>;
  trailer?: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
};

export const getNewReleases = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number }>(
      NEW_RELEASES_QUERY,
      { page, perPage }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return null;
  }
};

export const getTrendingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number }>(
      TRENDING_ANIME_QUERY,
      { page, perPage }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return null;
  }
};

export const getUpcomingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number }>(
      UPCOMING_ANIME_QUERY,
      { page, perPage }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    return null;
  }
};

export const getAnimeDetails = async (id: string): Promise<AnimeDetailsResponse | null> => {
  try {
    const response = await executeGraphQLQuery<AniListDetailsResponse, { id: number }>(
      ANIME_DETAILS_QUERY,
      { id: parseInt(id) }
    );

    if (response.data && response.data.Media) {
      const media = response.data.Media;
      const animeDetails = convertToAnime(media) as AnimeDetailsWithExtras;
      
      // Add additional fields that are only in details
      animeDetails.genres = media.genres?.map((genre: string) => ({
        mal_id: 0, // AniList doesn't have IDs for genres
        type: 'anime',
        name: genre,
        url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
      }));
      
      animeDetails.studios = media.studios?.nodes.map((studio: { id: number; name: string }) => ({
        mal_id: studio.id,
        type: 'anime',
        name: studio.name,
        url: `https://anilist.co/studio/${studio.id}`
      }));
      
      animeDetails.relations = media.relations?.edges.map((edge: { relationType: string; node: { id: number; title: { userPreferred: string }; type: string } }) => ({
        relation: edge.relationType,
        entry: [
          {
            mal_id: edge.node.id,
            type: edge.node.type.toLowerCase(),
            name: edge.node.title.userPreferred,
            url: `https://anilist.co/${edge.node.type.toLowerCase()}/${edge.node.id}`
          }
        ]
      }));
      
      animeDetails.streaming = media.streamingEpisodes?.map((episode: { site: string; url: string }) => ({
        name: episode.site,
        url: episode.url
      }));
      
      animeDetails.trailer = media.trailer ? {
        youtube_id: media.trailer.id,
        url: media.trailer.site === 'youtube' ? `https://www.youtube.com/watch?v=${media.trailer.id}` : `https://www.${media.trailer.site}.com/watch?v=${media.trailer.id}`,
        embed_url: media.trailer.site === 'youtube' ? `https://www.youtube.com/embed/${media.trailer.id}` : `https://www.${media.trailer.site}.com/embed/${media.trailer.id}`
      } : undefined;
      
      return {
        data: animeDetails
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

export const searchAnime = async (query: string, page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number; search: string }>(
      SEARCH_ANIME_QUERY,
      { page, perPage, search: query }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
};

export const getMostFavoritedAnime = async (): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number }>(
      MOST_FAVORITED_QUERY,
      { page: 1, perPage }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching most favorited anime:', error);
    return null;
  }
};

export const getSeasonalAnime = async (
  year: number,
  season: 'winter' | 'spring' | 'summer' | 'fall',
  page = 1
): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const anilistSeason = season.toUpperCase();
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number; season: string; year: number }>(
      SEASONAL_ANIME_QUERY,
      { page, perPage, season: anilistSeason, year }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching anime for ${season} ${year}:`, error);
    return null;
  }
};

export const getYearlyAnime = async (year: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number; year: number }>(
      YEARLY_ANIME_QUERY,
      { page, perPage, year }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching anime for year ${year}:`, error);
    return null;
  }
};

export const getAllGenres = async (): Promise<{ data: Array<{mal_id: number, name: string, type: string, url: string}> } | null> => {
  try {
    type GenresResponse = {
      data: {
        GenreCollection: string[];
      };
    };

    const response = await executeGraphQLQuery<GenresResponse, Record<string, never>>(
      GENRES_QUERY,
      {}
    );

    if (response.data && response.data.GenreCollection) {
      // Convert to the same format as Jikan API
      const genres = response.data.GenreCollection.map((genre, index) => ({
        mal_id: index + 1, // Use sequential IDs as AniList doesn't have specific IDs for genres
        name: genre,
        type: 'anime',
        url: `https://anilist.co/search/anime?genres=${encodeURIComponent(genre)}`
      }));
      
      return { data: genres };
    }

    return null;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return null;
  }
};

export const getAnimeByGenre = async (genreId: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    // First get all genres to find the name by ID
    const allGenres = await getAllGenres();
    if (!allGenres || !allGenres.data || allGenres.data.length === 0) {
      throw new Error('Could not fetch genres');
    }
    
    const genre = allGenres.data.find(g => g.mal_id === genreId);
    if (!genre) {
      throw new Error(`Genre with ID ${genreId} not found`);
    }
    
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number; genre: string }>(
      ANIME_BY_GENRE_QUERY,
      { page, perPage, genre: genre.name }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching anime for genre ID ${genreId}:`, error);
    return null;
  }
};

export const getMostPopularAnime = async (): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number }>(
      POPULAR_ANIME_QUERY,
      { page: 1, perPage }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching most popular anime:', error);
    return null;
  }
};

export const getAnimeStudios = async (animeId: string): Promise<number[]> => {
  try {
    type AnimeStudiosResponse = {
      data: {
        Media: {
          studios: {
            nodes: Array<{ id: number }>;
          };
        };
      };
    };

    const response = await executeGraphQLQuery<AnimeStudiosResponse, { id: number }>(
      ANIME_DETAILS_QUERY,
      { id: parseInt(animeId) }
    );

    if (response.data?.Media?.studios?.nodes) {
      return response.data.Media.studios.nodes.map(studio => studio.id);
    }

    return [];
  } catch (error) {
    console.error('Error fetching anime studios:', error);
    return [];
  }
};

export const getAnimeByStudio = async (studioId: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    const perPage = 10;
    const response = await executeGraphQLQuery<AniListAnimeResponse, { page: number; perPage: number; studioId: number }>(
      ANIME_BY_STUDIO_QUERY,
      { page, perPage, studioId }
    );

    if (response.data && response.data.Page) {
      const animeList = response.data.Page.media.map(convertToAnime);
      
      return {
        data: animeList,
        pagination: convertPagination(response.data.Page.pageInfo)
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching anime for studio ID:', error);
    return null;
  }
}; 
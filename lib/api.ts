import { getNewReleases, getTrendingAnime, getUpcomingAnime, getAnimeDetails, searchAnime } from './jikan';
import { AnimeResponse, AnimeDetailsResponse } from './types';

export const fetchAnime = async (page: number = 1, query: string = ''): Promise<AnimeResponse | null> => {
  if (query) {
    return searchAnime(query, page);
  }
  return getNewReleases(page);
};

export const fetchPopularAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  return getTrendingAnime(page);
};

export const fetchTrendingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  return getTrendingAnime(page);
};

export const fetchUpcomingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  return getUpcomingAnime(page);
};

export const fetchAnimeDetails = async (id: string): Promise<AnimeDetailsResponse | null> => {
  return getAnimeDetails(id);
}; 
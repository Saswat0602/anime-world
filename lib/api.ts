import {
  getNewReleases,
  getTrendingAnime,
  getUpcomingAnime,
  getAnimeDetails,
  searchAnime,
  getMostFavoritedAnime,
  getSeasonalAnime,
  getYearlyAnime,
  getAllGenres,
  getAnimeByGenre,
  getMostPopularAnime,
  getAnimeByStudio,
  getAnimeStudios
} from './jikan';

export const fetchAnime = async (page: number = 1, query: string = '') => {
  return query ? searchAnime(query, page) : getNewReleases(page);
};

export const fetchPopularAnime = async (page: number = 1) => {
  return getTrendingAnime(page);
};

export const fetchTrendingAnime = async (page: number = 1) => {
  return getTrendingAnime(page);
};

export const fetchUpcomingAnime = async (page: number = 1) => {
  return getUpcomingAnime(page);
};

export const fetchAnimeDetails = async (id: string) => {
  return getAnimeDetails(id);
};

export const fetchMostFavoritedAnime = async () => {
  return getMostFavoritedAnime();
};

export const fetchSeasonalAnime = async (year: number, season: 'winter' | 'spring' | 'summer' | 'fall', page = 1) => {
  return getSeasonalAnime(year, season, page);
};

export const fetchYearlyAnime = async (year: number, page = 1) => {
  return getYearlyAnime(year, page);
};

export const fetchAllGenres = async () => {
  return getAllGenres();
};

export const fetchAnimeByGenre = async (genreId: number, page = 1) => {
  return getAnimeByGenre(genreId, page);
};

export const fetchMostPopularAnime = async () => {
  return getMostPopularAnime();
};

export const fetchAnimeByStudio = async (studioId: number, page = 1) => {
  return getAnimeByStudio(studioId, page);
};

export const fetchAnimeStudios = async (animeId: string) => {
  return getAnimeStudios(animeId);
};

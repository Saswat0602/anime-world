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
} from './anilist';

export const fetchAnimeAniList = async (page: number = 1, query: string = '') => {
  return query ? searchAnime(query, page) : getNewReleases(page);
};

export const fetchPopularAnimeAniList = async (page: number = 1) => {
  return getTrendingAnime(page);
};

export const fetchTrendingAnimeAniList = async (page: number = 1) => {
  return getTrendingAnime(page);
};

export const fetchUpcomingAnimeAniList = async (page: number = 1) => {
  return getUpcomingAnime(page);
};

export const fetchAnimeDetailsAniList = async (id: string) => {
  return getAnimeDetails(id);
};

export const fetchMostFavoritedAnimeAniList = async () => {
  return getMostFavoritedAnime();
};

export const fetchSeasonalAnimeAniList = async (year: number, season: 'winter' | 'spring' | 'summer' | 'fall', page = 1) => {
  return getSeasonalAnime(year, season, page);
};

export const fetchYearlyAnimeAniList = async (year: number, page = 1) => {
  return getYearlyAnime(year, page);
};

export const fetchAllGenresAniList = async () => {
  return getAllGenres();
};

export const fetchAnimeByGenreAniList = async (genreId: number, page = 1) => {
  return getAnimeByGenre(genreId, page);
};

export const fetchMostPopularAnimeAniList = async () => {
  return getMostPopularAnime();
};

export const fetchAnimeByStudioAniList = async (studioId: number, page = 1) => {
  return getAnimeByStudio(studioId, page);
};

export const fetchAnimeStudiosAniList = async (animeId: string) => {
  return getAnimeStudios(animeId);
}; 
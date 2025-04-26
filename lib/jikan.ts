import axios from 'axios';
import { AnimeResponse, AnimeDetailsResponse, Anime } from './types';

const BASE_URL = 'https://api.jikan.moe/v4';

const MAX_RETRIES = 3;
const DEFAULT_COOLDOWN = 1000;

const requestQueue: Array<() => Promise<unknown>> = [];
let isProcessingQueue = false;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function processQueue() {
  if (isProcessingQueue || requestQueue.length === 0) return;

  isProcessingQueue = true;

  while (requestQueue.length > 0) {
    const request = requestQueue.shift();
    if (request) {
      try {
        await request();
      } catch (error) {
        console.error('Error processing queued request:', error);
      }
      await delay(DEFAULT_COOLDOWN);
    }
  }

  isProcessingQueue = false;
}

function queueRequest<T>(requestFn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    requestQueue.push(async () => {
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });

    processQueue();
  });
}

async function fetchWithRetry<T>(url: string, retries = MAX_RETRIES): Promise<T> {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);

      if (response.status === 429) {
        const retryAfter = response.headers['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 0;

        console.log(`Rate limited. Retrying ${waitTime > 0 ? `in ${waitTime / 1000} seconds` : 'immediately'}...`);
        if (waitTime > 0) await delay(waitTime);
        continue;
      }

      return response.data as T;
    } catch (error) {
      lastError = error;

      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 0;

        console.log(`Rate limited. Retrying ${waitTime > 0 ? `in ${waitTime / 1000} seconds` : 'immediately'}...`);
        if (waitTime > 0) await delay(waitTime);
        continue;
      }

      if (attempt < retries) {
        console.log(`Request failed. Retrying in ${DEFAULT_COOLDOWN / 1000} seconds...`);
        await delay(DEFAULT_COOLDOWN);
      } else {
        throw error;
      }
    }
  }

  throw lastError || new Error('Maximum retries reached');
}


const filterDuplicates = (animeList: Anime[]): Anime[] => {
  const seen = new Set<number>();
  return animeList.filter(anime => {
    if (seen.has(anime.mal_id)) {
      return false;
    }
    seen.add(anime.mal_id);
    return true;
  });
};


export const getNewReleases = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    console.log(`Fetching new releases for page ${page}`);

    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/anime?order_by=start_date&sort=desc&page=${page}`)
    );

    // Filter out duplicates before returning
    if (response.data) {
      response.data = filterDuplicates(response.data);
    }

    return response;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return null;
  }
};

export const getTrendingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/top/anime?filter=airing&page=${page}`)
    );

    // Filter out duplicates before returning
    if (response.data) {
      response.data = filterDuplicates(response.data);
    }

    return response;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return null;
  }
};

export const getUpcomingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/anime?order_by=start_date&sort=asc&status=upcoming&page=${page}`)
    );

    // Filter out duplicates before returning
    if (response.data) {
      response.data = filterDuplicates(response.data);
    }

    return response;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    return null;
  }
};

export const getAnimeDetails = async (id: string): Promise<AnimeDetailsResponse | null> => {
  try {
    const response = await queueRequest<AnimeDetailsResponse>(() =>
      fetchWithRetry<AnimeDetailsResponse>(`${BASE_URL}/anime/${id}/full`)
    );

    return response;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

export const searchAnime = async (query: string, page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`)
    );

    if (response.data) {
      response.data = filterDuplicates(response.data);
    }

    return response;
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
};

export const getMostFavoritedAnime = async (): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/top/anime?order_by=favorites&sort=desc&limit=10`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error('Error fetching most favorited anime:', error);
    return null;
  }
};

export const getSeasonalAnime = async (year: number, season: 'winter' | 'spring' | 'summer' | 'fall', page = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/seasons/${year}/${season}?page=${page}`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error(`Error fetching anime for ${season} ${year}:`, error);
    return null;
  }
};

export const getYearlyAnime = async (year: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/seasons/${year}?page=${page}`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error(`Error fetching anime for year ${year}:`, error);
    return null;
  }
};

export const getAllGenres = async (): Promise<{ data: Array<{mal_id: number, name: string, type: string, url: string}> } | null> => {
  try {
    const response = await queueRequest<{data: Array<{mal_id: number, name: string, type: string, url: string}>}>(() =>
      fetchWithRetry<{data: Array<{mal_id: number, name: string, type: string, url: string}>}>(`${BASE_URL}/genres/anime`)
    );
    return response;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return null;
  }
};

export const getAnimeByGenre = async (genreId: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/anime?genres=${genreId}&page=${page}`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error(`Error fetching anime for genre ${genreId}:`, error);
    return null;
  }
};

export const getMostPopularAnime = async (): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/top/anime?filter=bypopularity&limit=10`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error('Error fetching most popular anime:', error);
    return null;
  }
};

export const getAnimeStudios = async (animeId: string): Promise<number[]> => {
  try {
    const data = await getAnimeDetails(animeId);
    const studios = data?.data?.studios || [];
    return studios.map((studio: { mal_id: number }) => studio.mal_id);
  } catch (error) {
    console.error('Error fetching studios:', error);
    return [];
  }
};

export const getAnimeByStudio = async (studioId: number, page = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await queueRequest<AnimeResponse>(() =>
      fetchWithRetry<AnimeResponse>(`${BASE_URL}/anime?producers=${studioId}&page=${page}`)
    );

    if (response.data) response.data = filterDuplicates(response.data);
    return response;
  } catch (error) {
    console.error(`Error fetching anime for studio ${studioId}:`, error);
    return null;
  }
};

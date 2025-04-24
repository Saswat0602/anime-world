import axios from 'axios';
import { AnimeResponse, AnimeDetailsResponse, Anime } from './types';

const BASE_URL = 'https://api.jikan.moe/v4';

const MAX_RETRIES = 3;
const BASE_DELAY = 1000; 
const MAX_DELAY = 10000; 
const DEFAULT_COOLDOWN = 1000; 

const requestQueue: Array<() => Promise<unknown>> = [];
let isProcessingQueue = false;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const calculateBackoff = (attempt: number) => {
  const exponentialDelay = Math.min(MAX_DELAY, BASE_DELAY * Math.pow(2, attempt));
  return Math.floor(Math.random() * exponentialDelay);
};

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

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<unknown> {
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url);
      
      if (response.status === 429) {
        const retryAfter = response.headers['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : calculateBackoff(attempt);
        
        console.log(`Rate limited. Retrying in ${waitTime/1000} seconds...`);
        await delay(waitTime);
        continue;
      }
      return response.data;
    } catch (error) {
      lastError = error;
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : calculateBackoff(attempt);
        
        console.log(`Rate limited. Retrying in ${waitTime/1000} seconds...`);
        await delay(waitTime);
        continue;
      }
      
      if (attempt < retries) {
        const waitTime = calculateBackoff(attempt);
        console.log(`Request failed. Retrying in ${waitTime/1000} seconds...`);
        await delay(waitTime);
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
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await queueRequest<any>(() => 
      fetchWithRetry(`${BASE_URL}/anime?order_by=start_date&sort=desc&page=${page}`)
    ) as AnimeResponse;
    
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await queueRequest<any>(() => 
      fetchWithRetry(`${BASE_URL}/top/anime?filter=airing&page=${page}`)
    ) as AnimeResponse;
    
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await queueRequest<any>(() => 
      fetchWithRetry(`${BASE_URL}/anime?order_by=start_date&sort=asc&status=upcoming&page=${page}`)
    ) as AnimeResponse;
    
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await queueRequest<any>(() => 
      fetchWithRetry(`${BASE_URL}/anime/${id}/full`)
    ) as AnimeDetailsResponse;
    
    return response;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

export const searchAnime = async (query: string, page: number = 1): Promise<AnimeResponse | null> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await queueRequest<any>(() => 
      fetchWithRetry(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`)
    ) as AnimeResponse;
    
    if (response.data) {
      response.data = filterDuplicates(response.data);
    }
    
    return response;
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
};
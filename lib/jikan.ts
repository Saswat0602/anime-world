import axios from 'axios';
import { AnimeResponse, AnimeDetailsResponse, Anime } from './types';

const BASE_URL = 'https://api.jikan.moe/v4';

// Jikan API has a rate limit, delay between API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter duplicates by mal_id
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
    const response = await axios.get<AnimeResponse>(`${BASE_URL}/anime?order_by=start_date&sort=desc&page=${page}`);
    console.log('API Response structure:', Object.keys(response.data));
    console.log('Data array length:', response.data.data?.length);
    console.log('First item sample:', response.data.data?.[0]);
    
    // Filter out duplicates before returning
    if (response.data.data) {
      response.data.data = filterDuplicates(response.data.data);
    }
    
    await delay(1000); // Respect API rate limits
    return response.data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return null;
  }
};

export const getTrendingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await axios.get<AnimeResponse>(`${BASE_URL}/top/anime?filter=airing&page=${page}`);
    
    // Filter out duplicates before returning
    if (response.data.data) {
      response.data.data = filterDuplicates(response.data.data);
    }
    
    await delay(1000); // Respect API rate limits
    return response.data;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return null;
  }
};

export const getUpcomingAnime = async (page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await axios.get<AnimeResponse>(`${BASE_URL}/anime?order_by=start_date&sort=asc&status=upcoming&page=${page}`);
    
    // Filter out duplicates before returning
    if (response.data.data) {
      response.data.data = filterDuplicates(response.data.data);
    }
    
    await delay(1000); // Respect API rate limits
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    return null;
  }
};

export const getAnimeDetails = async (id: string): Promise<AnimeDetailsResponse | null> => {
  try {
    const response = await axios.get<AnimeDetailsResponse>(`${BASE_URL}/anime/${id}/full`);
    await delay(1000); // Respect API rate limits
    return response.data;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    return null;
  }
};

export const searchAnime = async (query: string, page: number = 1): Promise<AnimeResponse | null> => {
  try {
    const response = await axios.get<AnimeResponse>(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`);
    
    // Filter out duplicates before returning
    if (response.data.data) {
      response.data.data = filterDuplicates(response.data.data);
    }
    
    await delay(1000); // Respect API rate limits
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
};
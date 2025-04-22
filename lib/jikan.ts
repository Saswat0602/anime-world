import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

export const getNewReleases = async (page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/anime?order_by=start_date&sort=desc&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return null;
  }
};

export const getTrendingAnime = async (page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/top/anime?filter=airing&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending anime:', error);
      return null;
    }
  };

  export const getUpcomingAnime = async (page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/anime?order_by=start_date&sort=asc&status=upcoming&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming anime:', error);
      return null;
    }
  };

  export const getAnimeDetails = async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/anime/${id}/full`);
      return response.data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      return null;
    }
  };
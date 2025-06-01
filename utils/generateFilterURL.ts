export interface FilterState {
  searchQuery: string;
  genres: string[];
  year: string;
  season: string;
  format: string;
  airingStatus: string;
}

export const generateFilterURL = (filters: FilterState) => {
  const params = new URLSearchParams();

  filters.genres.forEach((genre) => {
    params.append('genres', genre);
  });

  if (filters.year) params.append('year', filters.year);
  if (filters.season) params.append('season', filters.season);
  if (filters.format) params.append('format', filters.format);
  if (filters.airingStatus) params.append('airing status', filters.airingStatus); // note the space
  if (filters.searchQuery) params.append('search', filters.searchQuery);

  return `/anime/filter?${params.toString()}`;
};

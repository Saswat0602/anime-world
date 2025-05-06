'use client';

import { FilterBarProps, FilterState } from '@/types/filterTypes';
import { useCallback, useMemo, useState } from 'react';
import { AiringStatusFilter, FormatFilter, GenreFilter, SearchInput, SeasonFilter, YearFilter } from '../FilterComponents';

const ViewToggle = () => {
  return (
    <button
      className="p-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 focus:outline-none"
      aria-label="Toggle view"
      type="button"
    >
      <svg
        className="w-5 h-5 text-gray-300"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export function FilterBar({ title, onFilterChange }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string[]>(['Any']);
  const [selectedYear, setSelectedYear] = useState<string>('Any');
  const [selectedSeason, setSelectedSeason] = useState<string>('Any');
  const [selectedFormat, setSelectedFormat] = useState<string[]>(['Any']);
  const [selectedStatus, setSelectedStatus] = useState<string>('Any');

  // Create handlers with useCallback to avoid unnecessary re-renders
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleGenreChange = useCallback((value: string | string[]) => {
    setSelectedGenre(Array.isArray(value) ? value : [value]);
  }, []);

  const handleYearChange = useCallback((value: string | string[]) => {
    setSelectedYear(typeof value === 'string' ? value : value[0]);
  }, []);

  const handleSeasonChange = useCallback((value: string | string[]) => {
    setSelectedSeason(typeof value === 'string' ? value : value[0]);
  }, []);

  const handleFormatChange = useCallback((value: string | string[]) => {
    setSelectedFormat(Array.isArray(value) ? value : [value]);
  }, []);

  const handleStatusChange = useCallback((value: string | string[]) => {
    setSelectedStatus(typeof value === 'string' ? value : value[0]);
  }, []);

  // Use useMemo to create filter state object only when dependencies change
  const filterState = useMemo<FilterState>(() => ({
    searchQuery,
    genre: selectedGenre,
    year: selectedYear,
    season: selectedSeason,
    format: selectedFormat,
    status: selectedStatus
  }), [searchQuery, selectedGenre, selectedYear, selectedSeason, selectedFormat, selectedStatus]);

  // Call onFilterChange only when filterState changes
  useMemo(() => {
    if (onFilterChange) {
      onFilterChange(filterState);
    }
  }, [filterState, onFilterChange]);

  // Render selected filter badges
  const renderSelectedFilters = () => {
    const filters = [];
    
    if (selectedGenre.length > 0 && selectedGenre[0] !== 'Any') {
      filters.push(
        <div key="genre" className="flex flex-wrap gap-1 mt-2">
          {selectedGenre.map(genre => (
            <span key={genre} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
              {genre}
            </span>
          ))}
        </div>
      );
    }
    
    if (selectedFormat.length > 0 && selectedFormat[0] !== 'Any') {
      filters.push(
        <div key="format" className="flex flex-wrap gap-1 mt-2">
          {selectedFormat.map(format => (
            <span key={format} className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
              {format}
            </span>
          ))}
        </div>
      );
    }
    
    return filters.length > 0 && (
      <div className="mt-4 space-y-2">
        {filters}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        <div className="lg:col-span-1">
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
        </div>

        <div className="lg:col-span-1">
          <GenreFilter value={selectedGenre} onChange={handleGenreChange} multiSelect={true} />
        </div>

        <div className="lg:col-span-1">
          <YearFilter value={selectedYear} onChange={handleYearChange} />
        </div>

        <div className="lg:col-span-1">
          <SeasonFilter value={selectedSeason} onChange={handleSeasonChange} />
        </div>

        <div className="lg:col-span-1">
          <FormatFilter value={selectedFormat} onChange={handleFormatChange} multiSelect={true} />
        </div>

        <div className="flex justify-between items-center lg:col-span-1">
          <div className="flex-1 mr-2">
            <AiringStatusFilter value={selectedStatus} onChange={handleStatusChange} />
          </div>
          <ViewToggle />
        </div>
      </div>
      
      {renderSelectedFilters()}
    </div>
  );
}
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

  const handleRemoveFilter = useCallback((type: string, value: string) => {
    switch (type) {
      case 'genre':
        setSelectedGenre(prev => {
          const filtered = prev.filter(item => item !== value);
          return filtered.length ? filtered : ['Any'];
        });
        break;
      case 'year':
        setSelectedYear('Any');
        break;
      case 'season':
        setSelectedSeason('Any');
        break;
      case 'format':
        setSelectedFormat(prev => {
          const filtered = prev.filter(item => item !== value);
          return filtered.length ? filtered : ['Any'];
        });
        break;
      case 'status':
        setSelectedStatus('Any');
        break;
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedGenre(['Any']);
    setSelectedYear('Any');
    setSelectedSeason('Any');
    setSelectedFormat(['Any']);
    setSelectedStatus('Any');
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

  // Get all active filter tags
  const activeFilterTags = useMemo(() => {
    const tags = [];

    // Add genres
    if (selectedGenre.length > 0 && selectedGenre[0] !== 'Any') {
      selectedGenre.forEach(genre => {
        tags.push({ type: 'genre', value: genre });
      });
    }

    // Add year
    if (selectedYear !== 'Any') {
      tags.push({ type: 'year', value: selectedYear });
    }

    // Add season
    if (selectedSeason !== 'Any') {
      tags.push({ type: 'season', value: selectedSeason });
    }

    // Add formats
    if (selectedFormat.length > 0 && selectedFormat[0] !== 'Any') {
      selectedFormat.forEach(format => {
        tags.push({ type: 'format', value: format });
      });
    }

    // Add status
    if (selectedStatus !== 'Any') {
      tags.push({ type: 'status', value: selectedStatus });
    }

    return tags;
  }, [selectedGenre, selectedYear, selectedSeason, selectedFormat, selectedStatus]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Search</div>
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
        </div>

        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Genres</div>
          <GenreFilter value={selectedGenre} onChange={handleGenreChange} multiSelect={true} />
        </div>

        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Year</div>
          <YearFilter value={selectedYear} onChange={handleYearChange} />
        </div>

        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Season</div>
          <SeasonFilter value={selectedSeason} onChange={handleSeasonChange} />
        </div>

        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Format</div>
          <FormatFilter value={selectedFormat} onChange={handleFormatChange} multiSelect={true} />
        </div>

        <div className="lg:col-span-1">
          <div className="mb-2 text-sm font-bold text-gray-300">Airing Status</div>
          <div className="flex justify-between items-center">
            <div className="flex-1 mr-2">
              <AiringStatusFilter value={selectedStatus} onChange={handleStatusChange} />
            </div>
            <ViewToggle />
          </div>
        </div>
      </div>

      {activeFilterTags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeFilterTags.map((tag, index) => (
            <div key={`${tag.type}-${tag.value}-${index}`} className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              {tag.value}
              <button
                onClick={() => handleRemoveFilter(tag.type, tag.value)}
                className="ml-2 text-white hover:text-gray-200"
                aria-label={`Remove ${tag.value}`}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleClearAll}
            className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-600"
          >
            Clear All ×
          </button>
        </div>
      )}
    </div>
  );
}
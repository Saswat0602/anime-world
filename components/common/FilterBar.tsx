'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AiringStatusFilter,
  FormatFilter,
  GenreFilter,
  SearchInput,
  SeasonFilter,
  YearFilter,
} from '../FilterComponents';
import { FilterBarProps, FilterState } from '@/types/filterTypes';
import { List, Tag } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setSearchQuery,
  setGenre,
  setYear,
  setSeason,
  setFormat,
  setStatus,
  clearAllFilters,
} from '@/redux/features/filterSlice';
import { useRouter } from 'next/navigation'; // Import useRouter

export function FilterBar({ title, onFilterChange }: FilterBarProps) {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router
  const filterState = useSelector((state: RootState) => state.filter);
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const toggleFiltersVisible = () => setMobileFiltersVisible((prev) => !prev);

  // Update handlers
  const handleSearchChange = (value: string) => dispatch(setSearchQuery(value));
  const handleGenreChange = (value: string | string[]) =>
    dispatch(setGenre(Array.isArray(value) ? value : [value]));
  const handleYearChange = (value: string | string[]) =>
    dispatch(setYear(typeof value === 'string' ? value : value[0]));
  const handleSeasonChange = (value: string | string[]) =>
    dispatch(setSeason(typeof value === 'string' ? value : value[0]));
  const handleFormatChange = (value: string | string[]) =>
    dispatch(setFormat(Array.isArray(value) ? value : [value]));
  const handleStatusChange = (value: string | string[]) =>
    dispatch(setStatus(typeof value === 'string' ? value : value[0]));

  const handleRemoveFilter = (type: string, value: string) => {
    switch (type) {
      case 'genre':
        dispatch(
          setGenre(
            filterState.genre.filter((item) => item !== value) || ['Any']
          )
        );
        break;
      case 'year':
        dispatch(setYear('Any'));
        break;
      case 'season':
        dispatch(setSeason('Any'));
        break;
      case 'format':
        dispatch(
          setFormat(
            filterState.format.filter((item) => item !== value) || ['Any']
          )
        );
        break;
      case 'status':
        dispatch(setStatus('Any'));
        break;
    }
  };

  const handleClearAll = () => dispatch(clearAllFilters());

  // Compose current filter state
  const currentFilterState: FilterState = useMemo(
    () => ({
      searchQuery,
      genre: filterState.genre,
      year: filterState.year,
      season: filterState.season,
      format: filterState.format,
      status: filterState.status,
    }),
    [searchQuery, filterState]
  );

  useEffect(() => {
    // Build query parameters
    const params = new URLSearchParams();

    if (searchQuery && searchQuery.trim() !== '') {
      params.set('search', searchQuery);
    }

    if (filterState.genre[0] !== 'Any') {
      filterState.genre.forEach((genre) => params.append('genres', genre));
    }

    if (filterState.year !== 'Any') {
      params.set('year', filterState.year);
    }

    if (filterState.season !== 'Any') {
      params.set('season', filterState.season.toUpperCase());
    }

    if (filterState.format[0] !== 'Any') {
      filterState.format.forEach((format) => params.append('format', format));
    }

    if (filterState.status !== 'Any') {
      params.set('airingStatus', filterState.status);
    }

    const queryString = params.toString();

    // If there are no active filters or search input, do not update URL
    if (!queryString) {
      return;
    }

    // Only update URL if there is an active filter or search input
    const newUrl = `/anime/filter?${queryString}`;
    router.replace(newUrl, { scroll: false });

    // Optionally, trigger your filter callback
    onFilterChange?.(currentFilterState);
  }, [searchQuery, filterState, onFilterChange, router]);


  const activeFilterTags = useMemo(() => {
    const tags = [];
    if (filterState.genre[0] !== 'Any') {
      filterState.genre.forEach((genre) => tags.push({ type: 'genre', value: genre }));
    }
    if (filterState.year !== 'Any') tags.push({ type: 'year', value: filterState.year });
    if (filterState.season !== 'Any') tags.push({ type: 'season', value: filterState.season });
    if (filterState.format[0] !== 'Any') {
      filterState.format.forEach((format) => tags.push({ type: 'format', value: format }));
    }
    if (filterState.status !== 'Any') tags.push({ type: 'status', value: filterState.status });
    return tags;
  }, [filterState]);

  return (
    <div className="mb-6">
      <h2 className="my-3 text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-500 via-blue-500 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
        {title}
      </h2>
      <div className="mb-4">
        <div className="flex items-end gap-2 mb-4 lg:hidden">
          <div className="flex-1">
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Search
            </div>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
          </div>
          <button
            onClick={toggleFiltersVisible}
            className={`flex-shrink-0 p-2 border rounded-md focus:outline-none transition-colors duration-200 ${mobileFiltersVisible
                ? 'bg-blue-500 border-blue-600 text-white'
                : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            aria-label="Toggle filters"
            aria-expanded={mobileFiltersVisible}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:grid grid-cols-6 gap-4">
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Search
            </div>
            <SearchInput value={searchQuery} onChange={handleSearchChange} />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Genres
            </div>
            <GenreFilter value={filterState.genre} onChange={handleGenreChange} multiSelect />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Year
            </div>
            <YearFilter value={filterState.year} onChange={handleYearChange} />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Season
            </div>
            <SeasonFilter value={filterState.season} onChange={handleSeasonChange} />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Format
            </div>
            <FormatFilter value={filterState.format} onChange={handleFormatChange} multiSelect />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
              Airing Status
            </div>
            <AiringStatusFilter value={filterState.status} onChange={handleStatusChange} />
          </div>
        </div>

        {/* Mobile Filters */}
        {mobileFiltersVisible && (
          <div className="lg:hidden flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            <div className="flex-shrink-0 min-w-[180px]">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Genres
              </div>
              <GenreFilter value={filterState.genre} onChange={handleGenreChange} multiSelect />
            </div>
            <div className="flex-shrink-0 min-w-[140px]">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Year
              </div>
              <YearFilter value={filterState.year} onChange={handleYearChange} />
            </div>
            <div className="flex-shrink-0 min-w-[140px]">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Season
              </div>
              <SeasonFilter value={filterState.season} onChange={handleSeasonChange} />
            </div>
            <div className="flex-shrink-0 min-w-[180px]">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Format
              </div>
              <FormatFilter value={filterState.format} onChange={handleFormatChange} multiSelect />
            </div>
            <div className="flex-shrink-0 min-w-[160px]">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Airing Status
              </div>
              <AiringStatusFilter value={filterState.status} onChange={handleStatusChange} />
            </div>
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {activeFilterTags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Tag className="w-4 h-4 mr-1" />
          </div>
          {activeFilterTags.map((tag, index) => (
            <div
              key={`${tag.type}-${tag.value}-${index}`}
              className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-600 dark:text-white px-3 py-1 rounded-md text-sm"
            >
              {tag.value}
              <button
                onClick={() => handleRemoveFilter(tag.type, tag.value)}
                className="ml-2 hover:text-gray-500 dark:hover:text-gray-200"
                aria-label={`Remove ${tag.value}`}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleClearAll}
            className="flex items-center bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-md text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Clear All ×
          </button>
        </div>
      )}
    </div>
  );
}

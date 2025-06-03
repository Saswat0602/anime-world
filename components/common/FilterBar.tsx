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
import { useDebouncedCallback } from 'use-debounce';

export function FilterBar({ title, onFilterChange }: FilterBarProps) {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router
  const filterState = useSelector((state: RootState) => state.filter);
  const reduxSearchQuery = useSelector((state: RootState) => state.filter.searchQuery);
  const [inputValue, setInputValue] = useState(reduxSearchQuery);

  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const toggleFiltersVisible = () => setMobileFiltersVisible((prev) => !prev);

  // Update handlers
  const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
    dispatch(setSearchQuery(value));
  }, 400); // 400ms debounce delay

  // Input change handler
  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };
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
      reduxSearchQuery,
      genre: filterState.genre,
      year: filterState.year,
      season: filterState.season,
      format: filterState.format,
      status: filterState.status,
    }),
    [reduxSearchQuery, filterState]
  );

  useEffect(() => {
    // Build query parameters
    const params = new URLSearchParams();

    if (reduxSearchQuery && reduxSearchQuery.trim() !== '') {
      params.set('search', reduxSearchQuery);
    }

    if (filterState.genre && filterState.genre.length > 0 && filterState.genre[0] !== 'Any') {
      filterState.genre.forEach((genre) => params.append('genres', genre));
    }

    if (filterState.year && filterState.year !== 'Any') {
      params.set('year', filterState.year);
    }

    if (filterState.season && filterState.season !== 'Any') {
      params.set('season', filterState.season.toUpperCase());
    }

    if (filterState.format && filterState.format.length > 0 && filterState.format[0] !== 'Any') {
      filterState.format.forEach((format) => params.append('format', format));
    }

    if (filterState.status && filterState.status !== 'Any') {
      params.set('airingStatus', filterState.status);
    }

    const queryString = params.toString();

    // Check if we're currently on the filter page
    const isOnFilterPage = window.location.pathname === '/anime/filter';

    // If there are no active filters or search input and we're on filter page, navigate back to anime/home
    if (!queryString && isOnFilterPage) {
      router.replace('/Home', { scroll: false });
      return;
    }

    // Only update URL if there is an active filter or search input
    if (queryString) {
      const newUrl = `/anime/filter?${queryString}`;
      router.replace(newUrl, { scroll: false });
    }

    // Optionally, trigger your filter callback
    onFilterChange?.(currentFilterState);
  }, [reduxSearchQuery, filterState, onFilterChange, router]);


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
    <div className="mb-8">
      {/* Title with refined gradient */}
      <h2 className="mb-6 text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 dark:from-slate-300 dark:via-blue-400 dark:to-indigo-400 text-transparent bg-clip-text text-center sm:text-left">
        {title}
      </h2>

      <div className="space-y-6">
        {/* Mobile Search and Filter Toggle */}
        <div className="flex items-end gap-3 lg:hidden">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Search
            </label>
            <SearchInput
              value={inputValue}
              onChange={handleSearchChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <button
            onClick={toggleFiltersVisible}
            className={`group flex-shrink-0 p-3 rounded-xl transition-all duration-200 ${mobileFiltersVisible
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            aria-label="Toggle filters"
            aria-expanded={mobileFiltersVisible}
          >
            <List className={`w-5 h-5 transition-transform duration-200 ${mobileFiltersVisible ? 'rotate-180' : 'group-hover:scale-110'}`} />
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:grid grid-cols-6 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Search
            </label>
            <SearchInput
              value={inputValue}
              onChange={handleSearchChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Genres
            </label>
            <GenreFilter
              value={filterState.genre}
              onChange={handleGenreChange}
              multiSelect
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Year
            </label>
            <YearFilter
              value={filterState.year}
              onChange={handleYearChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Season
            </label>
            <SeasonFilter
              value={filterState.season}
              onChange={handleSeasonChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Format
            </label>
            <FormatFilter
              value={filterState.format}
              onChange={handleFormatChange}
              multiSelect
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Airing Status
            </label>
            <AiringStatusFilter
              value={filterState.status}
              onChange={handleStatusChange}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Mobile Filters with smooth animation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${mobileFiltersVisible
          ? 'max-h-96 opacity-100'
          : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            <div className="flex-shrink-0 min-w-[200px] space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Genres
              </label>
              <GenreFilter
                value={filterState.genre}
                onChange={handleGenreChange}
                multiSelect
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex-shrink-0 min-w-[150px] space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Year
              </label>
              <YearFilter
                value={filterState.year}
                onChange={handleYearChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex-shrink-0 min-w-[150px] space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Season
              </label>
              <SeasonFilter
                value={filterState.season}
                onChange={handleSeasonChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex-shrink-0 min-w-[200px] space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Format
              </label>
              <FormatFilter
                value={filterState.format}
                onChange={handleFormatChange}
                multiSelect
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex-shrink-0 min-w-[180px] space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Airing Status
              </label>
              <AiringStatusFilter
                value={filterState.status}
                onChange={handleStatusChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Tags with enhanced styling */}
      {activeFilterTags.length > 0 && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center text-slate-600 dark:text-slate-400 mr-2">
              <Tag className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">Active filters:</span>
            </div>
            {activeFilterTags.map((tag, index) => (
              <div
                key={`${tag.type}-${tag.value}-${index}`}
                className="group flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:bg-blue-200 dark:hover:bg-blue-800/40"
              >
                <span>{tag.value}</span>
                <button
                  onClick={() => handleRemoveFilter(tag.type, tag.value)}
                  className="ml-2 text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors duration-200 group-hover:scale-110"
                  aria-label={`Remove ${tag.value}`}
                >
                  <span className="text-lg leading-none">×</span>
                </button>
              </div>
            ))}
            <button
              onClick={handleClearAll}
              className="flex items-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105"
            >
              <span>Clear All</span>
              <span className="ml-1 text-lg leading-none">×</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

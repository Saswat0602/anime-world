'use client';

import { useCallback, useMemo, useState } from 'react';
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
import { setSearchQuery } from '@/redux/features/searchSlice';

export function FilterBar({ title, onFilterChange }: FilterBarProps) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const [selectedGenre, setSelectedGenre] = useState<string[]>(['Any']);
  const [selectedYear, setSelectedYear] = useState('Any');
  const [selectedSeason, setSelectedSeason] = useState('Any');
  const [selectedFormat, setSelectedFormat] = useState<string[]>(['Any']);
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const toggleFiltersVisible = () => setMobileFiltersVisible((prev) => !prev);

  const handleSearchChange = (value: string) => dispatch(setSearchQuery(value));
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
        setSelectedGenre((prev) => {
          const filtered = prev.filter((item) => item !== value);
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
        setSelectedFormat((prev) => {
          const filtered = prev.filter((item) => item !== value);
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

  const filterState = useMemo<FilterState>(
    () => ({
      searchQuery,
      genre: selectedGenre,
      year: selectedYear,
      season: selectedSeason,
      format: selectedFormat,
      status: selectedStatus,
    }),
    [searchQuery, selectedGenre, selectedYear, selectedSeason, selectedFormat, selectedStatus]
  );
console.log(searchQuery,"searchQuery inisde the fiulyer")
  useMemo(() => {
    onFilterChange?.(filterState);
  }, [filterState, onFilterChange]);

  const activeFilterTags = useMemo(() => {
    const tags = [];
    if (selectedGenre[0] !== 'Any') {
      selectedGenre.forEach((genre) => tags.push({ type: 'genre', value: genre }));
    }
    if (selectedYear !== 'Any') tags.push({ type: 'year', value: selectedYear });
    if (selectedSeason !== 'Any') tags.push({ type: 'season', value: selectedSeason });
    if (selectedFormat[0] !== 'Any') {
      selectedFormat.forEach((format) => tags.push({ type: 'format', value: format }));
    }
    if (selectedStatus !== 'Any') tags.push({ type: 'status', value: selectedStatus });
    return tags;
  }, [selectedGenre, selectedYear, selectedSeason, selectedFormat, selectedStatus]);
  console.log(activeFilterTags,"=activeFilterTagss")

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>

        {/* Mobile Search + Filter Toggle */}
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

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">
                Search
              </div>
              <SearchInput value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Genres</div>
              <GenreFilter value={selectedGenre} onChange={handleGenreChange} multiSelect />
            </div>

            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Year</div>
              <YearFilter value={selectedYear} onChange={handleYearChange} />
            </div>

            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Season</div>
              <SeasonFilter value={selectedSeason} onChange={handleSeasonChange} />
            </div>

            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Format</div>
              <FormatFilter value={selectedFormat} onChange={handleFormatChange} multiSelect />
            </div>

            <div className="col-span-1">
              <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Airing Status</div>
              <AiringStatusFilter value={selectedStatus} onChange={handleStatusChange} />
            </div>
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {mobileFiltersVisible && (
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex-shrink-0 min-w-[180px]">
                <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Genres</div>
                <GenreFilter value={selectedGenre} onChange={handleGenreChange} multiSelect />
              </div>

              <div className="flex-shrink-0 min-w-[140px]">
                <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Year</div>
                <YearFilter value={selectedYear} onChange={handleYearChange} />
              </div>

              <div className="flex-shrink-0 min-w-[140px]">
                <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Season</div>
                <SeasonFilter value={selectedSeason} onChange={handleSeasonChange} />
              </div>

              <div className="flex-shrink-0 min-w-[180px]">
                <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Format</div>
                <FormatFilter value={selectedFormat} onChange={handleFormatChange} multiSelect />
              </div>

              <div className="flex-shrink-0 min-w-[160px]">
                <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-300">Airing Status</div>
                <AiringStatusFilter value={selectedStatus} onChange={handleStatusChange} />
              </div>
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
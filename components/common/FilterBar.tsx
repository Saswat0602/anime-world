'use client';

import { FilterBarProps } from '@/types/filterTypes';
import { useState, useEffect } from 'react';
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
  const [selectedGenre, setSelectedGenre] = useState<string>('Any');
  const [selectedYear, setSelectedYear] = useState<string>('Any');
  const [selectedSeason, setSelectedSeason] = useState<string>('Any');
  const [selectedFormat, setSelectedFormat] = useState<string>('Any');
  const [selectedStatus, setSelectedStatus] = useState<string>('Any');

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        genre: selectedGenre,
        year: selectedYear,
        season: selectedSeason,
        format: selectedFormat,
        status: selectedStatus
      });
    }
  }, [searchQuery, selectedGenre, selectedYear, selectedSeason, selectedFormat, selectedStatus, onFilterChange]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
        <div className="lg:col-span-1">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="lg:col-span-1">
          <GenreFilter value={selectedGenre} onChange={setSelectedGenre} />
        </div>

        <div className="lg:col-span-1">
          <YearFilter value={selectedYear} onChange={setSelectedYear} />
        </div>

        <div className="lg:col-span-1">
          <SeasonFilter value={selectedSeason} onChange={setSelectedSeason} />
        </div>

        <div className="lg:col-span-1">
          <FormatFilter value={selectedFormat} onChange={setSelectedFormat} />
        </div>

        <div className="flex justify-between items-center lg:col-span-1">
          <div className="flex-1 mr-2">
            <AiringStatusFilter value={selectedStatus} onChange={setSelectedStatus} />
          </div>
          <ViewToggle />
        </div>
      </div>
    </div>
  );
}
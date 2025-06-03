'use client'

import { FilterComponentProps } from "@/types/filterTypes";
import { ChangeEvent, useCallback } from "react";
import FilterDropdown from "./ui/FilterDropdown";
import { Search } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from 'next/navigation';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const SearchInput = ({ value, onChange, className = "" }: SearchInputProps) => {
    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
                type="search"
                className={`w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 
                border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 
                placeholder-slate-400 dark:placeholder-slate-500 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                transition-all duration-200 hover:border-slate-400 dark:hover:border-slate-500
                ${className}`}
                placeholder="Search anime..."
                value={value}
                onChange={handleChange}
                aria-label="Search anime"
            />
        </div>
    );
};

export const YearFilter = ({ value, onChange, className }: FilterComponentProps) => {
    const years: string[] = Array.from({ length: 2025 - 1940 + 1 }, (_, i) => String(2025 - i));

    const handleYearChange = useCallback(
        (newValue: string | string[]) => {
            if (typeof newValue === "string" && newValue === value) {
                onChange("Any");
            } else {
                onChange(newValue);
            }
        },
        [value, onChange]
    );

    return (
        <FilterDropdown
            label="Year"
            options={years}
            value={value}
            onChange={handleYearChange}
            className={className}
        />
    );
};

export const GenreFilter = ({ value, onChange, className }: FilterComponentProps) => {
    const genres: string[] = [
        "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror",
        "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance",
        "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"
    ];

    return (
        <FilterDropdown
            label="Genres"
            options={genres}
            value={value}
            onChange={onChange}
            multiSelect={true}
            className={className}
        />
    );
};

export const SeasonFilter = ({ value, onChange, className }: FilterComponentProps) => {
    const seasons: string[] = ["Winter", "Spring", "Summer", "Fall"];

    const handleSeasonChange = useCallback(
        (newValue: string | string[]) => {
            if (typeof newValue === "string" && newValue === value) {
                onChange("Any");
            } else {
                onChange(newValue);
            }
        },
        [value, onChange]
    );

    return (
        <FilterDropdown
            label="Season"
            options={seasons}
            value={value}
            onChange={handleSeasonChange}
            className={className}
        />
    );
};

export const FormatFilter = ({ value, onChange, className }: FilterComponentProps) => {
    const formats: string[] = [
        "TV Show", "Movie", "TV Short", "Special", "OVA", "ONA", "Music"
    ];

    return (
        <FilterDropdown
            label="Format"
            options={formats}
            value={value}
            onChange={onChange}
            multiSelect={true}
            className={className}
        />
    );
};

export const AiringStatusFilter = ({ value, onChange, className }: FilterComponentProps) => {
    const statuses: string[] = [
        "Airing", "Finished", "Not Yet Aired", "Cancelled"
    ];

    const handleStatusChange = useCallback(
        (newValue: string | string[]) => {
            if (typeof newValue === "string" && newValue === value) {
                onChange("Any");
            } else {
                onChange(newValue);
            }
        },
        [value, onChange]
    );

    return (
        <FilterDropdown
            label="Airing Status"
            options={statuses}
            value={value}
            onChange={handleStatusChange}
            className={className}
        />
    );
};
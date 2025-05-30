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
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
    const router = useRouter();

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    const debouncedNavigateToFilter = useDebouncedCallback((term: string) => {
        const trimmedTerm = term.trim();
        if (trimmedTerm) {
            router.push(`/anime/filter?search=${encodeURIComponent(trimmedTerm)}`);
        } else {
            router.back();
        }
    }, 300);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        handleChange(e);
        debouncedNavigateToFilter(term);
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-6" />
            </div>
            <input
                type="search"
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 text-gray-900 placeholder-gray-400 
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 rounded-md
          dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                placeholder="Search anime..."
                value={value}
                onChange={handleInputChange}
                aria-label="Search anime"
            />
        </div>
    );
};

export const YearFilter = ({ value, onChange }: FilterComponentProps) => {
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
        />
    );
};

export const GenreFilter = ({ value, onChange }: FilterComponentProps) => {
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
        />
    );
};

export const SeasonFilter = ({ value, onChange }: FilterComponentProps) => {
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
        />
    );
};

export const FormatFilter = ({ value, onChange }: FilterComponentProps) => {
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
        />
    );
};

export const AiringStatusFilter = ({ value, onChange }: FilterComponentProps) => {
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
        />
    );
};

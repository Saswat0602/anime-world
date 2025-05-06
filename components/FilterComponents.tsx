import { FilterComponentProps, SearchInputProps } from "@/types/filterTypes";
import { ChangeEvent } from "react";
import FilterDropdown from "./ui/FilterDropdown";



export const SearchInput = ({ value, onChange }: SearchInputProps) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
            <input
                type="search"
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-white"
                placeholder="Search anime..."
                value={value}
                onChange={handleChange}
                aria-label="Search anime"
            />
        </div>
    );
};

export const YearFilter = ({ value, onChange }: FilterComponentProps) => {
    const years: string[] = Array.from({ length: 2025 - 1940 + 1 }, (_, i) => String(2025 - i));

    return (
        <FilterDropdown
            label="Year"
            options={["Any", ...years]}
            value={value}
            onChange={onChange}
        />
    );
};

export const GenreFilter = ({ value, onChange }: FilterComponentProps) => {
    const genres: string[] = [
        "Any",
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Ecchi",
        "Fantasy",
        "Horror",
        "Mahou Shoujo",
        "Mecha",
        "Music",
        "Mystery",
        "Psychological",
        "Romance",
        "Sci-Fi",
        "Slice of Life",
        "Sports",
        "Supernatural",
        "Thriller"
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
    const seasons: string[] = ["Any", "Winter", "Spring", "Summer", "Fall"];

    return (
        <FilterDropdown
            label="Season"
            options={seasons}
            value={value}
            onChange={onChange}
        />
    );
};

export const FormatFilter = ({ value, onChange }: FilterComponentProps) => {
    const formats: string[] = [
        "Any",
        "TV Show",
        "Movie",
        "TV Short",
        "Special",
        "OVA",
        "ONA",
        "Music"
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
        "Any",
        "Airing",
        "Finished",
        "Not Yet Aired",
        "Cancelled"
    ];

    return (
        <FilterDropdown
            label="Airing Status"
            options={statuses}
            value={value}
            onChange={onChange}
        />
    );
};
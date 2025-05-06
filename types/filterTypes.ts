export type FilterDropdownProps = {
    label: string;
    options: string[];
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiSelect?: boolean;
};

export type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
};

export type FilterComponentProps = {
    value: string | string[];
    onChange: (value: string | string[]) => void;
    multiSelect?: boolean;
};


export type FilterBarProps = {
    title: string;
    onFilterChange?: (filters: FilterState) => void;
};

export type FilterState = {
    searchQuery: string;
    genre: string[];
    year: string;
    season: string;
    format: string[];
    status: string;
};
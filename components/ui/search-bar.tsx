import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchBar({ onSearch, initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 pl-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-600 
                  bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400
                  transition-colors"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center
                   text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
} 
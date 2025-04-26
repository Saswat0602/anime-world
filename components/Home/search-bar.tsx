
'use client'

import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
}

export function SearchBar({ 
  onSearch, 
  initialQuery = "", 
  placeholder = "Search anime..." 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-12 px-5 pr-16 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      <button 
        type="submit" 
        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-14 flex items-center justify-center bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}
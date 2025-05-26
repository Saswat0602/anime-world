'use client'

import { Search } from "lucide-react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSearchQuery } from "@/redux/features/searchSlice";

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({
  placeholder = "Search anime..."
}: SearchBarProps) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const triggerSearch = useCallback(() => {
    console.log("Trigger search with:", searchQuery);
    // Add your search logic here
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full h-12 px-5 pr-16 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      <button
        onClick={triggerSearch}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-14 flex items-center justify-center bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-6" />
      </button>
    </div>
  );
}

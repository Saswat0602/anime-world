'use client';

import { useState, useCallback } from "react";
import { AnimeCard } from "@/components/anime-card";
import { fetchAnime, fetchPopularAnime } from "@/lib/api";
import { usePagination } from "@/lib/hooks/use-pagination";
import { Pagination } from "@/components/pagination";
import { motion } from "framer-motion";
import { Anime } from "@/lib/types";
import Link from "next/link";
import { AnimeCardSkeleton } from "@/components/loaders";

// Improved Error Message
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="mb-4 text-red-500 dark:text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h3>
    <p className="text-slate-600 dark:text-slate-400 text-center mb-6">{message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="btn-primary"
    >
      Try Again
    </button>
  </div>
);

// Search input component
const SearchBar = ({ 
  onSearch 
}: { 
  onSearch: (query: string) => void 
}) => {
  const [query, setQuery] = useState('');

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
        aria-label="Search anime"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center
                   text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        aria-label="Submit search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

// Section header with title and optional view all link
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  viewAllLink?: string;
}

const SectionHeader = ({ title, icon, viewAllLink }: SectionHeaderProps) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="section-title">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h2>
    {viewAllLink && (
      <Link href={viewAllLink} className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">
        View All
      </Link>
    )}
  </div>
);

// Home page component - Now directly exported as the default
export default function HomePage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Memoize the fetch functions to prevent them from changing on every render
  const fetchLatestAnime = useCallback((p: number) => {
    return fetchAnime(p, searchQuery);
  }, [searchQuery]);
  
  const fetchPopular = useCallback((p: number) => {
    return fetchPopularAnime(p);
  }, []);
  
  // Fetch latest anime
  const { 
    data: latestData, 
    isLoading: latestLoading, 
    error: latestError 
  } = usePagination(fetchLatestAnime, page);
  
  // Fetch popular anime
  const { 
    data: popularData, 
    isLoading: popularLoading, 
    error: popularError 
  } = usePagination(fetchPopular, 1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return (
    <div className="container-custom py-8">
      {/* Hero section with search */}
      <section className="mb-16">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Discover Amazing Anime
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore thousands of anime titles, stay updated with the latest releases, 
            and find your next favorite series.
          </p>
        </motion.div>

        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Latest releases section */}
      <section className="mb-16">
        <SectionHeader 
          title={searchQuery ? `Search results for "${searchQuery}"` : "Latest Releases"} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          }
        />

        {latestLoading ? (
          <AnimeCardSkeleton count={10} />
        ) : latestError ? (
          <ErrorMessage message={latestError} />
        ) : (
          <>
            {!latestData?.data?.length && (
              <div className="py-20 text-center">
                <p className="text-xl text-slate-500 dark:text-slate-400">
                  {searchQuery ? `No results found for "${searchQuery}"` : "No anime data found"}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {latestData?.data?.map((anime: Anime, index: number) => (
                <AnimeCard 
                  key={anime.mal_id} 
                  anime={anime} 
                  index={index}
                />
              ))}
            </div>
            
            {latestData?.pagination && latestData.pagination.last_visible_page > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={latestData.pagination.last_visible_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </section>

      {/* Popular anime section (only show if not searching) */}
      {!searchQuery && (
        <section className="mb-16">
          <SectionHeader 
            title="Popular Anime" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
              </svg>
            }
            viewAllLink="/trending"
          />

          {popularLoading ? (
            <AnimeCardSkeleton count={10} />
          ) : popularError ? (
            <ErrorMessage message={popularError} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {popularData?.data?.slice(0, 10).map((anime: Anime, index: number) => (
                <AnimeCard 
                  key={anime.mal_id} 
                  anime={anime} 
                  index={index}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
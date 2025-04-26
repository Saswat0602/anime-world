'use client';

import { useState, useCallback } from "react";
import { fetchAnime, fetchPopularAnime } from "@/lib/api";
import { usePagination } from "@/lib/hooks/use-pagination";
import { HeroSection } from "@/components/Home/hero-section";
import { AnimeSection } from "@/components/Home/AnimeSection";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLatestAnime = useCallback((p: number) => fetchAnime(p, searchQuery), [searchQuery]);
  const fetchPopular = useCallback((p: number) => fetchPopularAnime(p), []);

  const {
    data: latestData,
    isLoading: latestLoading,
    error: latestError
  } = usePagination(fetchLatestAnime, page);

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

  const latestIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
  );

  const popularIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
    </svg>
  );

  return (
    <div className="container-custom py-8">
      <HeroSection onSearch={handleSearch} />
      
      <AnimeSection
        title={searchQuery ? `Search results for "${searchQuery}"` : "Latest Releases"}
        icon={latestIcon}
        data={latestData}
        isLoading={latestLoading}
        error={latestError}
        currentPage={page}
        onPageChange={handlePageChange}
        emptyMessage={searchQuery ? `No results found for "${searchQuery}"` : "No anime data found"}
      />

      {!searchQuery && (
        <AnimeSection
          title="Popular Anime"
          icon={popularIcon}
          data={popularData}
          isLoading={popularLoading}
          error={popularError}
          viewAllLink="/trending"
          sliceCount={10}
        />
      )}
    </div>
  );
}
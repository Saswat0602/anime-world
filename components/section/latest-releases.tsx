import React from "react";
import { AnimeResponse } from "@/lib/types";
import { SectionHeader } from "../ui/section-header";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ErrorMessage } from "../ui/error-message";
import { AnimeGrid } from "../Home/anime-grid";
import { Pagination } from "../pagination";

interface LatestReleasesProps {
  data: AnimeResponse | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
}

export function LatestReleases({ 
  data, 
  isLoading, 
  error, 
  searchQuery, 
  page, 
  onPageChange 
}: LatestReleasesProps) {
  return (
    <section className="mb-16">
      <SectionHeader 
        title={searchQuery ? `Search results for "${searchQuery}"` : "Latest Releases"} 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        }
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {!data?.data?.length && (
            <div className="py-20 text-center">
              <p className="text-xl text-slate-500 dark:text-slate-400">
                {searchQuery ? `No results found for "${searchQuery}"` : "No anime data found"}
              </p>
            </div>
          )}
          
          {data?.data && <AnimeGrid animeList={data.data} />}
          
          {data?.pagination && data.pagination.last_visible_page > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={page}
                totalPages={data.pagination.last_visible_page}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
} 
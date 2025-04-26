import React from "react";
import { AnimeResponse } from "@/lib/types";
import { SectionHeader } from "../ui/section-header";
import { LoadingSpinner } from "../ui/loading-spinner";
import { ErrorMessage } from "../ui/error-message";
import { AnimeGrid } from "../Home/anime-grid";

interface PopularAnimeProps {
  data: AnimeResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function PopularAnime({ data, isLoading, error }: PopularAnimeProps) {
  return (
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

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        data?.data && <AnimeGrid animeList={data.data.slice(0, 10)} />
      )}
    </section>
  );
} 
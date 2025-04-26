import React from "react";
import { Anime } from "@/lib/types";
import { Pagination } from "./pagination";
import { Loader } from "./loader";
import { AnimeGrid } from "./Home/anime-grid";

interface PageLayoutProps {
  title: string;
  description: string;
  loading: boolean;
  error: string | null;
  animeList: Anime[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageLayout({
  title,
  description,
  loading,
  error,
  animeList,
  currentPage,
  totalPages,
  onPageChange,
}: PageLayoutProps) {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader size="large" />
        </div>
      ) : error ? (
        <div className="mx-auto max-w-lg rounded-lg bg-red-100 p-4 text-center text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <p>{error}</p>
          <button
            onClick={() => onPageChange(currentPage)}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <AnimeGrid animeList={animeList} />

          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
} 
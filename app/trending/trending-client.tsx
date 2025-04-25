'use client';

import { getTrendingAnime } from '@/lib/jikan';
import { AnimeCard } from '@/components/anime-card';
import { Pagination } from '@/components/pagination';
import { Anime } from '@/lib/types';
import { useEffect, useState } from 'react';
import { AnimeCardSkeleton } from '@/components/loaders';

export default function TrendingClient() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTrendingAnime(page);
        if (data) {
          setTrendingAnime(data.data);
          setTotalPages(data.pagination.last_visible_page);
        } else {
          setError("Failed to fetch trending anime. Please try again later.");
        }
      } catch (err) {
        setError("An error occurred while fetching trending anime.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAnime();
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Trending Anime
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover what&apos;s popular right now
        </p>
      </header>

      {loading ? (
        <AnimeCardSkeleton count={24} />
      ) : error ? (
        <div className="mx-auto max-w-lg rounded-lg bg-red-100 p-4 text-center text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <p>{error}</p>
          <button
            onClick={() => setPage(page)}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {trendingAnime.map((anime, index) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={index} />
            ))}
          </div>

          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
} 
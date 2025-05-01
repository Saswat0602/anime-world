'use client';

import { useState, useEffect, useRef } from 'react';
import {
  useTrendingAnimeQuery,
  useSeasonalAnimeQuery,
  useUpcomingAnimeQuery
} from '@/redux/hooks';

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<'trending' | 'seasonal' | 'upcoming' | null>(null);
  const [page, setPage] = useState(1);
  const [seasonalParams] = useState({ year: 2025, season: 'summer' as const, page: 1 });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data: trendingData, isLoading: trendingLoading, isFetching: trendingFetching } = useTrendingAnimeQuery(page, { skip: selectedTest !== 'trending' });
  const { data: seasonalData, isLoading: seasonalLoading, isFetching: seasonalFetching } = useSeasonalAnimeQuery({ ...seasonalParams, page }, { skip: selectedTest !== 'seasonal' });
  const { data: upcomingData, isLoading: upcomingLoading, isFetching: upcomingFetching } = useUpcomingAnimeQuery(page, { skip: selectedTest !== 'upcoming' });

  const data =
    selectedTest === 'trending'
      ? trendingData
      : selectedTest === 'seasonal'
      ? seasonalData
      : upcomingData;

  const isLoading =
    selectedTest === 'trending'
      ? trendingLoading
      : selectedTest === 'seasonal'
      ? seasonalLoading
      : upcomingLoading;

  const isFetching =
    selectedTest === 'trending'
      ? trendingFetching
      : selectedTest === 'seasonal'
      ? seasonalFetching
      : upcomingFetching;

  const hasMore = data?.pagination?.has_next_page ?? false;

  // Reset page when test changes
  useEffect(() => {
    setPage(1);
  }, [selectedTest]);

  // Infinite scroll
  useEffect(() => {
    if (!selectedTest) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isFetching && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const node = loadMoreRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [isLoading, isFetching, hasMore, selectedTest]);

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">API Tests</h2>

        <div className="flex flex-col gap-4">
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${selectedTest === 'trending' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-800'}`}
            onClick={() => setSelectedTest('trending')}
          >
            Test Trending Anime
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${selectedTest === 'seasonal' ? 'bg-green-800' : 'bg-green-600 hover:bg-green-800'}`}
            onClick={() => setSelectedTest('seasonal')}
          >
            Test Seasonal Anime
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${selectedTest === 'upcoming' ? 'bg-purple-800' : 'bg-purple-600 hover:bg-purple-800'}`}
            onClick={() => setSelectedTest('upcoming')}
          >
            Test Upcoming Anime
          </button>
        </div>
      </div>

      <div className="w-4/5 p-6 overflow-y-auto">
        {!selectedTest && (
          <p className="text-gray-500 text-lg">Click a test button to start fetching API data.</p>
        )}

        {selectedTest && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {selectedTest === 'trending'
                ? 'Trending Anime'
                : selectedTest === 'seasonal'
                ? 'Seasonal Anime'
                : 'Upcoming Anime'} Result
            </h2>

            {isLoading && (
              <p className="text-gray-700 text-lg mb-4">Loading page {page}...</p>
            )}

            {data && (
              <div className="border rounded-md bg-black p-4 overflow-x-auto max-h-[500px]">
                <pre className="text-sm text-white whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}

            {!isLoading && !data && (
              <p className="text-red-600 text-lg">No data available.</p>
            )}

            {/* Load More trigger */}
            <div ref={loadMoreRef} className="h-10 mt-8" />
            {isFetching && (
              <p className="text-gray-500 text-center mt-4">Loading more...</p>
            )}
            {!hasMore && data && (
              <p className="text-gray-400 text-center mt-4">No more pages to load.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

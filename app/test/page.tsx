'use client';

import { useState } from 'react';
import {
  fetchAnimeAniList,
  fetchPopularAnimeAniList,
  fetchTrendingAnimeAniList,
  fetchUpcomingAnimeAniList,
  fetchAnimeDetailsAniList,
  fetchMostFavoritedAnimeAniList,
  fetchSeasonalAnimeAniList,
  fetchYearlyAnimeAniList,
  fetchAllGenresAniList,
  fetchAnimeByGenreAniList,
  fetchMostPopularAnimeAniList,
  fetchAnimeByStudioAniList,
  fetchAnimeStudiosAniList
} from '@/lib/api-anilist';

export default function TestPage() {
  const [testResults, setTestResults] = useState<{ name: string; success: boolean; error?: string }[]>([]);

  const runTest = async (name: string, testFn: () => Promise<unknown>) => {
    try {
      const result = await testFn();
      setTestResults(prev => [...prev, { name, success: true }]);
      console.log(`Test "${name}" passed:`, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTestResults(prev => [...prev, { name, success: false, error: errorMessage }]);
      console.error(`Test "${name}" failed:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Tests</h1>
      <div className="grid gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime', () => fetchAnimeAniList(1))}
        >
          Test Fetch Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Popular Anime', () => fetchPopularAnimeAniList(1))}
        >
          Test Fetch Popular Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Trending Anime', () => fetchTrendingAnimeAniList(1))}
        >
          Test Fetch Trending Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Upcoming Anime', () => fetchUpcomingAnimeAniList(1))}
        >
          Test Fetch Upcoming Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime Details', () => fetchAnimeDetailsAniList('1'))}
        >
          Test Fetch Anime Details
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Most Favorited Anime', () => fetchMostFavoritedAnimeAniList())}
        >
          Test Fetch Most Favorited Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Seasonal Anime', () => fetchSeasonalAnimeAniList(2023, 'winter', 1))}
        >
          Test Fetch Seasonal Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Yearly Anime', () => fetchYearlyAnimeAniList(2023, 1))}
        >
          Test Fetch Yearly Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch All Genres', () => fetchAllGenresAniList())}
        >
          Test Fetch All Genres
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime by Genre', () => fetchAnimeByGenreAniList(1, 1))}
        >
          Test Fetch Anime by Genre
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Most Popular Anime', () => fetchMostPopularAnimeAniList())}
        >
          Test Fetch Most Popular Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime by Studio', () => fetchAnimeByStudioAniList(1, 1))}
        >
          Test Fetch Anime by Studio
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime Studios', () => fetchAnimeStudiosAniList('1'))}
        >
          Test Fetch Anime Studios
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Test Results</h2>
        <div className="space-y-2">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded ${
                result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <p className="font-bold">{result.name}: {result.success ? 'Passed' : 'Failed'}</p>
              {result.error && <p className="mt-2">{result.error}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

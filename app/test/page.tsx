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
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTest, setActiveTest] = useState('');

  const runTest = async (testName: string, testFunction: () => Promise<any>, params?: any) => {
    setLoading(true);
    setActiveTest(testName);
    try {
      const data = await testFunction();
      setResult(data);
      console.log(`${testName} result:`, data);
    } catch (error) {
      console.error(`${testName} error:`, error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">AniList API Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => runTest('Fetch Anime', () => fetchAnimeAniList(1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch New Releases
        </button>
        
        <button
          onClick={() => runTest('Search Anime', () => fetchAnimeAniList(1, 'naruto'))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search Anime "naruto"
        </button>
        
        <button
          onClick={() => runTest('Fetch Popular Anime', () => fetchPopularAnimeAniList(1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Popular Anime
        </button>
        
        <button
          onClick={() => runTest('Fetch Trending Anime', () => fetchTrendingAnimeAniList(1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Trending Anime
        </button>
        
        <button
          onClick={() => runTest('Fetch Upcoming Anime', () => fetchUpcomingAnimeAniList(1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Upcoming Anime
        </button>
        
        <button
          onClick={() => runTest('Fetch Anime Details', () => fetchAnimeDetailsAniList('1'))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Anime Details (ID: 1)
        </button>
        
        <button
          onClick={() => runTest('Fetch Most Favorited Anime', () => fetchMostFavoritedAnimeAniList())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Most Favorited Anime
        </button>
        
        <button
          onClick={() => runTest('Fetch Seasonal Anime', () => fetchSeasonalAnimeAniList(2023, 'winter', 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Seasonal Anime (Winter 2023)
        </button>
        
        <button
          onClick={() => runTest('Fetch Yearly Anime', () => fetchYearlyAnimeAniList(2023, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Yearly Anime (2023)
        </button>
        
        <button
          onClick={() => runTest('Fetch All Genres', () => fetchAllGenresAniList())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch All Genres
        </button>
        
        <button
          onClick={() => runTest('Fetch Anime By Genre', () => fetchAnimeByGenreAniList(1, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Anime By Genre (ID: 1)
        </button>
        
        <button
          onClick={() => runTest('Fetch Most Popular Anime', () => fetchMostPopularAnimeAniList())}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Most Popular Anime
        </button>
        
        <button
          onClick={() => runTest('Fetch Anime By Studio', () => fetchAnimeByStudioAniList(1, 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Anime By Studio (ID: 1)
        </button>
        
        <button
          onClick={() => runTest('Fetch Anime Studios', () => fetchAnimeStudiosAniList('1'))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fetch Anime Studios (Anime ID: 1)
        </button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {activeTest ? `Results for: ${activeTest}` : 'No test run yet'}
          {loading && ' (Loading...)'}
        </h2>
        
        {result && (
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-[500px]">
            <pre className="text-sm whitespace-pre-wrap break-words">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { 
  useTrendingAnimeQuery, 
  useSeasonalAnimeQuery,
  useAnimeDetailsQuery,
  useSearchAnimeQuery,
  useGetAllGenresQuery,
  useGetAnimeByGenreQuery,
  useGetAnimeByStudioQuery
} from '@/redux/hooks';

export default function TestPage() {
  const [testResults, setTestResults] = useState<{ name: string; success: boolean; error?: string }[]>([]);
  
  // Set up query parameters for testing
  const [seasonalParams] = useState({ year: 2023, season: 'winter' as const, page: 1 });
  const [genreParams] = useState({ genreId: 'Action', page: 1 });
  const [studioParams] = useState({ studioId: 1, page: 1 });
  const [searchParams] = useState({ query: 'Naruto', page: 1 });
  
  // Initialize RTK Query hooks with skip: true so they don't run immediately
  const { refetch: refetchTrending } = useTrendingAnimeQuery(1, { skip: true });
  const { refetch: refetchSeasonal } = useSeasonalAnimeQuery(seasonalParams, { skip: true });
  const { refetch: refetchDetails } = useAnimeDetailsQuery('1', { skip: true });
  const { refetch: refetchSearch } = useSearchAnimeQuery(searchParams, { skip: true });
  const { refetch: refetchGenres } = useGetAllGenresQuery(undefined, { skip: true });
  const { refetch: refetchAnimeByGenre } = useGetAnimeByGenreQuery(genreParams, { skip: true });
  const { refetch: refetchAnimeByStudio } = useGetAnimeByStudioQuery(studioParams, { skip: true });

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
      <h1 className="text-2xl font-bold mb-4">API Tests (RTK Query)</h1>
      <div className="grid gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Trending Anime', async () => {
            const result = await refetchTrending();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch Trending Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Seasonal Anime', async () => {
            const result = await refetchSeasonal();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch Seasonal Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime Details', async () => {
            const result = await refetchDetails();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch Anime Details
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Search Anime', async () => {
            const result = await refetchSearch();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Search Anime
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch All Genres', async () => {
            const result = await refetchGenres();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch All Genres
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime by Genre', async () => {
            const result = await refetchAnimeByGenre();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch Anime by Genre
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => runTest('Fetch Anime by Studio', async () => {
            const result = await refetchAnimeByStudio();
            if (result.error) throw result.error;
            return result.data;
          })}
        >
          Test Fetch Anime by Studio
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

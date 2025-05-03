'use client';

import { useState } from 'react';
import {
  useTrendingAnimeQuery,
  useSeasonalAnimeQuery,
  useUpcomingAnimeQuery,
  useTop100AnimeQuery
} from '@/redux/hooks';

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<'trending' | 'seasonal' | 'upcoming' | 'top100' | null>(null);
  const [page] = useState(1);
  const [seasonalParams] = useState({ year: 2025, season: 'summer' as const, page: 1 });
  const [copied, setCopied] = useState(false);

  const trending = useTrendingAnimeQuery(page, { skip: selectedTest !== 'trending' });
  const seasonal = useSeasonalAnimeQuery({ ...seasonalParams, page }, { skip: selectedTest !== 'seasonal' });
  const upcoming = useUpcomingAnimeQuery(page, { skip: selectedTest !== 'upcoming' });
  const top100 = useTop100AnimeQuery(page, { skip: selectedTest !== 'top100' });

  const queryMap = {
    trending,
    seasonal,
    upcoming,
    top100,
  };

  const selectedQuery = selectedTest ? queryMap[selectedTest] : null;
  const data = selectedQuery?.data ?? null;
  const isLoading = selectedQuery?.isLoading ?? false;

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${selectedTest === 'top100' ? 'bg-yellow-800' : 'bg-yellow-600 hover:bg-yellow-800'}`}
            onClick={() => setSelectedTest('top100')}
          >
            Test Top 100 Anime
          </button>
        </div>
      </div>

      <div className="w-4/5 p-6 overflow-y-auto">
        {!selectedTest && (
          <p className="text-gray-500 text-lg">Click a test button to start fetching API data.</p>
        )}

        {selectedTest && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold capitalize">
                {selectedTest.replace(/([a-z])([A-Z])/g, '$1 $2')} Anime Result
              </h2>
              {data && (
                <button
                  onClick={handleCopy}
                  className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              )}
            </div>

            {isLoading && (
              <p className="text-gray-700 text-lg mb-4">Loading...</p>
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
          </>
        )}
      </div>
    </div>
  );
}

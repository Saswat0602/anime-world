'use client';

import React, { useState } from 'react';
import {
  useTrendingAnimeQuery,
  useSeasonalAnimeQuery,
} from '@/redux/api/animeApi';
import { useUpcomingAnimeQuery } from '@/redux/api/upcomingAnimeApi';
import { useTop100AnimeQuery } from '@/redux/api/top100AnimeApi';
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { JSONTree } from '@/components/JSONTree';

type AnimeTestType = 'trending' | 'seasonal' | 'upcoming' | 'top100' | null;
type ViewModeType = 'tree' | 'raw';
type SeasonType = 'winter' | 'spring' | 'summer' | 'fall';

interface SeasonalParams {
  year: number;
  season: SeasonType;
  page: number;
}

export default function TestPage(): React.ReactElement {
  const [testType, setTestType] = useState<AnimeTestType>(null);
  const [viewMode, setViewMode] = useState<ViewModeType>('tree');
  const [page] = useState<number>(1);
  const [seasonalParams] = useState<SeasonalParams>({ year: 2025, season: 'summer', page: 1 });
  const [copied, setCopied] = useState<boolean>(false);

  const trending = useTrendingAnimeQuery({ page }, { skip: testType !== 'trending' });
  const seasonal = useSeasonalAnimeQuery(seasonalParams, { skip: testType !== 'seasonal' });
  const upcoming = useUpcomingAnimeQuery(page, { skip: testType !== 'upcoming' });
  const top100 = useTop100AnimeQuery(page, { skip: testType !== 'top100' });

  const queryMap = {
    trending,
    seasonal,
    upcoming,
    top100,
  } as const;

  const selectedQuery = testType ? queryMap[testType] : null;
  const data = selectedQuery?.data ?? null;
  const isLoading = selectedQuery?.isLoading ?? false;

  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100 dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${testType === 'trending' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-800'}`}
            onClick={() => setTestType('trending')}
          >
            Test Trending Anime
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${testType === 'seasonal' ? 'bg-green-800' : 'bg-green-600 hover:bg-green-800'}`}
            onClick={() => setTestType('seasonal')}
          >
            Test Seasonal Anime
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${testType === 'upcoming' ? 'bg-purple-800' : 'bg-purple-600 hover:bg-purple-800'}`}
            onClick={() => setTestType('upcoming')}
          >
            Test Upcoming Anime
          </button>
          <button
            className={`py-2 px-4 rounded font-semibold text-white ${testType === 'top100' ? 'bg-yellow-800' : 'bg-yellow-600 hover:bg-yellow-800'}`}
            onClick={() => setTestType('top100')}
          >
            Test Top 100 Anime
          </button>
        </div>
      </div>

      <div className="w-4/5 p-6 overflow-y-auto">
        {!testType && (
          <p className="text-gray-500 text-lg">Click a test button to start fetching API data.</p>
        )}

        {testType && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold capitalize">
                {testType.replace(/([a-z])([A-Z])/g, '$1 $2')} Anime Result
              </h2>
              <div className="flex gap-2">
                <button
                  className={`py-2 px-4 rounded font-semibold text-white ${viewMode === 'tree' ? 'bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-800'}`}
                  onClick={() => setViewMode('tree')}
                >
                  Tree View
                </button>
                <button
                  className={`py-2 px-4 rounded font-semibold text-white ${viewMode === 'raw' ? 'bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-800'}`}
                  onClick={() => setViewMode('raw')}
                >
                  Raw View
                </button>
                <button
                  className="py-2 px-4 rounded font-semibold text-white bg-gray-600 hover:bg-gray-800 flex items-center gap-2"
                  onClick={handleCopy}
                >
                  <HiOutlineClipboardCopy size={20} />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 overflow-x-auto">
                {viewMode === 'tree' ? (
                  <JSONTree data={data} />
                ) : (
                  <pre className="text-sm whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
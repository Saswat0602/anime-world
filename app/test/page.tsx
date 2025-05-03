'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import {
  useTrendingAnimeQuery,
  useSeasonalAnimeQuery,
  useUpcomingAnimeQuery,
  useTop100AnimeQuery
} from '@/redux/hooks';
import { HiOutlineClipboardCopy } from "react-icons/hi";

// Define missing types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Type for JSXElementConstructor if missing
type JSXElementConstructor<P> = (props: P) => React.ReactElement<P, any> | null;

interface JsonTreeProps {
  data: any;
  initialExpandPaths?: string[];
}

// Memoized line component to prevent unnecessary renders
const LineNumber = memo(({ num }: { num: number }) => {
  return <div className="leading-tight">{num}</div>;
});
LineNumber.displayName = 'LineNumber';

// JSON Tree component for better JSON visualization with line numbering and copy feature
const JSONTree = memo(({ data, initialExpandPaths = ['root', 'root.data', 'root.pagination'] }: JsonTreeProps) => {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(initialExpandPaths));
  const lineCountRef = useRef<number>(1);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Update line numbers when expanded keys change or data changes
  useEffect(() => {
    // Reset line counter
    lineCountRef.current = 1;
    const calculateTotalLines = (obj: any, path: string = 'root'): number => {
      // Skip if path is not expanded
      if (!expandedKeys.has(path)) return 1;
      
      if (obj === null || typeof obj !== 'object') return 1;
      
      let lines = 1; // Current node
      
      if (Array.isArray(obj) || Object.keys(obj).length > 0) {
        if (expandedKeys.has(path)) {
          // Add lines for each property
          Object.keys(obj).forEach(key => {
            lines += calculateTotalLines(obj[key], `${path}.${key}`);
          });
          lines++; // Closing bracket
        }
      }
      
      return lines;
    };
    
    const totalLines = calculateTotalLines(data);
    setLineNumbers(Array.from({ length: totalLines }, (_, i) => i + 1));
  }, [expandedKeys, data]);

  const toggleNode = (path: string): void => {
    setExpandedKeys(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      return newExpanded;
    });
  };

  const copyToClipboard = (value: any, path: string): void => {
    const stringValue = typeof value === 'object' && value !== null
      ? JSON.stringify(value, null, 2)
      : String(value);
    
    navigator.clipboard.writeText(stringValue);
    setCopiedField(path);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const renderValue = (value: any, path: string, key: string): React.ReactElement => {
    // For null values
    if (value === null) return (
      <div className="inline-flex items-center">
        <span className="text-gray-400">null</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    // For boolean values
    if (typeof value === 'boolean') return (
      <div className="inline-flex items-center">
        <span className="text-orange-400">{value.toString()}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    // For number values
    if (typeof value === 'number') return (
      <div className="inline-flex items-center">
        <span className="text-blue-400">{value}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    // For string values
    if (typeof value === 'string') return (
      <div className="inline-flex items-center">
        <span className="text-green-400">"{value}"</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    // For any other primitive type
    if (typeof value !== 'object') return (
      <div className="inline-flex items-center">
        <span className="text-gray-400">{String(value)}</span>
        <button 
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            copyToClipboard(value, path);
          }}
          className="ml-2 opacity-50 hover:opacity-100"
          title="Copy value"
        >
          <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
        </button>
      </div>
    );
    
    // For objects and arrays
    const isArray = Array.isArray(value);
    const prefix = isArray ? '[' : '{';
    const suffix = isArray ? ']' : '}';
    const isExpanded = expandedKeys.has(path);
    const isEmpty = value === null || Object.keys(value).length === 0;
    
    if (isEmpty) {
      return (
        <div className="inline-flex items-center">
          <span>{isArray ? "[]" : "{}"}</span>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              copyToClipboard(value, path);
            }}
            className="ml-2 opacity-50 hover:opacity-100"
            title="Copy object"
          >
            <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
        </div>
      );
    }

    return (
      <div className="ml-1">
        <div className="inline-flex items-center">
          <span 
            className="cursor-pointer hover:text-blue-500"
            onClick={() => toggleNode(path)}
          >
            {prefix}
            <span className="ml-1 text-gray-400">
              {isExpanded ? "" : isArray ? `Array(${Object.keys(value).length})` : `${Object.keys(value).length} keys`}
            </span>
            {isExpanded ? "" : suffix}
          </span>
          <button 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              copyToClipboard(value, path);
            }}
            className="ml-2 opacity-50 hover:opacity-100"
            title="Copy object"
          >
            <HiOutlineClipboardCopy size={14} className={`${copiedField === path ? 'text-green-400' : 'text-gray-400'}`} />
          </button>
        </div>
        
        {isExpanded && (
          <div className="ml-4 border-l-2 border-gray-700 pl-2">
            {Object.keys(value).map((k, i) => (
              <div key={k} className="whitespace-nowrap">
                <span className="text-purple-400">{isArray ? "" : `"${k}": `}</span>
                {renderValue(value[k], `${path}.${k}`, k)}
                {i < Object.keys(value).length - 1 ? "," : ""}
              </div>
            ))}
            <span>{suffix}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-mono text-sm flex">
      <div className="mr-2 text-right text-gray-500 select-none border-r pr-2 min-w-[30px]">
        {lineNumbers.map((num) => (
          <LineNumber key={num} num={num} />
        ))}
      </div>
      <div className="w-full">
        {renderValue(data, 'root', '')}
      </div>
    </div>
  );
});
JSONTree.displayName = 'JSONTree';

// Define types for query results
interface QueryResult<T> {
  data?: T;
  isLoading: boolean;
}

// Type definitions
type AnimeTestType = 'trending' | 'seasonal' | 'upcoming' | 'top100' | null;
type ViewModeType = 'tree' | 'raw';
type SeasonType = 'winter' | 'spring' | 'summer' | 'fall';

interface SeasonalParams {
  year: number;
  season: SeasonType;
  page: number;
}

export default function TestPage(): JSX.Element {
  const [selectedTest, setSelectedTest] = useState<AnimeTestType>(null);
  const [page] = useState<number>(1);
  const [seasonalParams] = useState<SeasonalParams>({ year: 2025, season: 'summer', page: 1 });
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewModeType>('tree');

  const trending = useTrendingAnimeQuery(page, { skip: selectedTest !== 'trending' }) as QueryResult<any>;
  const seasonal = useSeasonalAnimeQuery({ ...seasonalParams, page }, { skip: selectedTest !== 'seasonal' }) as QueryResult<any>;
  const upcoming = useUpcomingAnimeQuery(page, { skip: selectedTest !== 'upcoming' }) as QueryResult<any>;
  const top100 = useTop100AnimeQuery(page, { skip: selectedTest !== 'top100' }) as QueryResult<any>;

  const queryMap: Record<string, QueryResult<any>> = {
    trending,
    seasonal,
    upcoming,
    top100,
  };

  const selectedQuery = selectedTest ? queryMap[selectedTest] : null;
  const data = selectedQuery?.data ?? null;
  const isLoading = selectedQuery?.isLoading ?? false;

  const handleCopy = (): void => {
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
              <div className="flex gap-2">
                <div className="flex border rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('tree')}
                    className={`text-sm px-3 py-1 ${viewMode === 'tree' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    Tree View
                  </button>
                  <button
                    onClick={() => setViewMode('raw')}
                    className={`text-sm px-3 py-1 ${viewMode === 'raw' 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    Raw JSON
                  </button>
                </div>
                {data && (
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    {copied ? 'Copied!' : 'Copy JSON'}
                  </button>
                )}
              </div>
            </div>

            {isLoading && (
              <p className="text-gray-700 text-lg mb-4">Loading...</p>
            )}

            {data && (
              <div className={`border rounded-md p-4 overflow-x-auto max-h-[700px] ${viewMode === 'raw' ? 'bg-black' : 'bg-gray-900'}`}>
                {viewMode === 'tree' ? (
                  <JSONTree 
                    data={data} 
                    initialExpandPaths={['root', 'root.data', 'root.pagination']} 
                  />
                ) : (
                  <pre className="text-sm text-white whitespace-pre-wrap">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                )}
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
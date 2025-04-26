'use client';

import { useTrendingAnimeQuery, useSeasonalAnimeQuery } from '@/redux/api/animeApi';
import Link from "next/link";
import { AnimeCard } from "@/components/Home/AnimeCard";
import { Anime } from "@/lib/types";

// Get current season
const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

// Get current year
const getCurrentYear = () => new Date().getFullYear();

export default function HomePage() {
  const currentSeason = getCurrentSeason();
  const currentYear = getCurrentYear();

  const { data: trendingAnimeData, isLoading: trendingLoading } = useTrendingAnimeQuery(1);
  const { data: seasonalAnimeData, isLoading: seasonalLoading } = useSeasonalAnimeQuery({ year: currentYear, season: currentSeason, page: 1 });

  const trendingAnime = trendingAnimeData?.data?.slice(0, 6) || [];
  const popularThisSeason = seasonalAnimeData?.data?.slice(0, 6) || [];
  const loading = trendingLoading || seasonalLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trending Now Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">TRENDING NOW</h2>
          <Link href="/trending" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-[3/4] w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingAnime.map((anime, index) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={index} />
            ))}
          </div>
        )}
      </div>
      
      {/* Popular This Season Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">POPULAR THIS SEASON</h2>
          <Link href="/seasonal" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View All
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-[3/4] w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularThisSeason.map((anime, index) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
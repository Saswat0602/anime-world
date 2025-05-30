'use client';

import React from 'react';
import { Search, Play, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSearchQuery } from '@/redux/features/searchSlice';

const topSearches = [
  "One Piece", "The Apothecary Diaries", "Wind Breaker Season 2",
  "Fire Force Season 3", "Attack on Titan", "Solo Leveling Season 2", "Frieren: Beyond Journey's End", "Death Note", "Bleach"
];

export function HeroSection() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.searchQuery);
  const router = useRouter();

  const handleSearchSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    dispatch(setSearchQuery(trimmedQuery));
    if (trimmedQuery) {
      router.push(`${ROUTES.ANIME.FILTTER}?search=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleTopSearchClick = (title: string) => {
    dispatch(setSearchQuery(title));
    router.push(`${ROUTES.ANIME.FILTTER}?search=${encodeURIComponent(title)}`);
  };

  return (
    <section className="relative mt-12 lg:mt-20 mb-8 rounded-2xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-100/10 dark:from-black dark:to-gray-900 p-4 lg:p-16 min-h-[400px]">
      {/* Hero Image */}
      <div className="absolute right-0 top-0 h-full w-0 sm:w-1/3 md:w-1/2 z-0">
        <div className="relative w-full h-full">
          <Image
            width={800}
            height={600}
            src="/heroImage.webp"
            alt="Anime characters"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 dark:via-black/40 dark:to-black/80"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Otaku.<span className="text-blue-500">Realm</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl">
            Discover your next favorite anime adventure
          </p>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border rounded-2xl p-3 hover:shadow-lg transition-all">
          <Search className="text-gray-400 dark:text-gray-500 ml-2" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            placeholder="Search anime, manga..."
            className="w-[90%] bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none px-2 py-2 text-base"
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-gradient-to-r from-violet-500 to-purple-900 text-white px-4 py-2 rounded-xl font-medium hover:scale-105 transition-all"
          >
            Search
          </button>
        </div>

        {/* Trending */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-gray-500 dark:text-gray-400" size={14} />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Trending Now:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topSearches.map((title) => (
              <button
                key={title}
                onClick={() => handleTopSearchClick(title)}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 border text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* CTA + Stats */}
        <div className="flex gap-4 mb-12">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-6 rounded-2xl hover:scale-105 transition">
            <Play size={16} /> Explore Now
          </Link>
          <Link href={ROUTES.My_WATCHLIST} className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 border dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-600 transition">
            <Star size={16} /> My Watchlist
          </Link>
        </div>
      </div>
    </section>
  );
}

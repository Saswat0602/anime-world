'use client'

import React, { useState } from "react";
import { Search, Play, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/routes";
import Image from "next/image";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const topSearches = [
  "One Piece",
  "The Apothecary Diaries",
  "Wind Breaker Season 2",
  "Fire Force Season 3",
  "Attack on Titan",
  "Solo Leveling Season 2"
];

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTopSearchClick = (title: string) => {
    setSearchQuery(title);
    onSearch(title);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section className="relative mt-12 sm:mt-12 md:mt-12 lg:mt-20 mb-8 sm:mb-12 md:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-100/10 dark:from-black dark:to-gray-900 p-4 sm:p-6 md:p-8 lg:p-16 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] transition-colors">
      {/* Hero Image - Hidden on mobile, visible on larger screens */}
      <div className="absolute right-0 top-0 h-full w-0 sm:w-1/3 md:w-1/2 z-0">
        <div className="relative w-full h-full">
          <Image
            width={800} 
            height={600}
            src="/heroImage.webp"
            alt="Anime characters"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 dark:via-black/40 dark:to-black/80"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-white leading-tight">
            Otaku.<span className="text-blue-500">Realm</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
            Discover your next favorite anime adventure
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-4 sm:mb-6">
          <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg dark:hover:bg-slate-700 transition-all duration-200">
            <div className="flex items-center gap-2 sm:gap-4">
              <Search className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search anime, manga..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none text-sm sm:text-base min-w-0"
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-gradient-to-r from-violet-500 to-purple-900 text-white px-3 sm:px-6 py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 hover:scale-105 text-sm sm:text-base flex-shrink-0"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Trending searches */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <TrendingUp className="text-gray-500 dark:text-gray-400" size={14} />
            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">Trending Now:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {topSearches.map((title) => (
              <button
                key={title}
                onClick={() => handleTopSearchClick(title)}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 text-xs sm:text-sm font-medium"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Link
            href={ROUTES.HOME}
            className="flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-105 text-sm sm:text-base"
          >
            <Play size={16} />
            Explore Now
          </Link>

          <Link
            href={ROUTES.My_WATCHLIST}
            className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 text-sm sm:text-base"
          >
            <Star size={16} />
            My Watchlist
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-gray-600 dark:text-gray-400">
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-400">10K+</div>
            <div className="text-xs sm:text-sm">Anime Series</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">5M+</div>
            <div className="text-xs sm:text-sm">Happy Users</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">24/7</div>
            <div className="text-xs sm:text-sm">New Episodes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
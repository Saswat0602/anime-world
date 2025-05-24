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
    <section className="relative mt-20 mb-16 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-100 to-slate-100/10 dark:from-black dark:to-gray-900 p-8 md:p-16 min-h-[500px] transition-colors">
      {/* Hero Image */}
      <div className="absolute right-0 top-0 h-full w-1/2 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/heroImage.webp"
            alt="Anime characters"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60 dark:via-black/40 dark:to-black/80"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Otaku.<span className="text-blue-500">Realm</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            Discover your next favorite anime adventure
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-lg dark:hover:bg-slate-700 transition-all duration-200">
            <div className="flex items-center gap-4">
              <Search className="text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                placeholder="Search for anime, manga, characters..."
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
              />
              <button
                onClick={handleSearchSubmit}
                className="bg-gradient-to-r from-violet-500 to-purple-900  text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Trending searches */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-gray-500 dark:text-gray-400" size={16} />
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Trending Now:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {topSearches.map((title) => (
              <button
                key={title}
                onClick={() => handleTopSearchClick(title)}
                className="px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 text-sm font-medium"
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <Link
          href={ROUTES.HOME}

          className="flex flex-wrap gap-4 mb-12">
          <button className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-6 rounded-2xl transition-all duration-200 hover:scale-105">
            <Play size={18} />
            Explore Now
          </button>

          <Link
            href={ROUTES.My_WATCHLIST}
            className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-2xl transition-all duration-200">
            <Star size={18} />
            My Watchlist
          </Link>
        </Link>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 text-gray-600 dark:text-gray-400">
          <div>
            <div className="text-2xl font-bold text-cyan-400">10K+</div>
            <div className="text-sm">Anime Series</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">5M+</div>
            <div className="text-sm">Happy Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">24/7</div>
            <div className="text-sm">New Episodes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
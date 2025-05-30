'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Play, Plus, Star, Calendar, Users, Clock } from 'lucide-react';
import type { Media } from '@/types/animeDetails';

interface HeroSectionProps {
  anime: Media;
}

const AnimeHeroSection: React.FC<HeroSectionProps> = ({ anime }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Banner with Gradient Overlay */}
      <div className="relative w-full h-[45vh] lg:h-[50vh]">
        {anime.bannerImage ? (
          <Image
            src={anime.bannerImage}
            alt={`${anime.title.userPreferred} banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        )}

        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent dark:from-gray-900/95 dark:via-gray-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative flex flex-col lg:flex-row -mt-40 lg:-mt-32 z-10 gap-6 lg:gap-8">

          {/* Cover Image with Hover Effects */}
          <div className="group relative">
            <div className="relative w-48 h-64 lg:w-56 lg:h-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
              <Image
                src={anime.coverImage.large}
                alt={anime.title.userPreferred}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Floating Rating Badge */}
            {anime.averageScore && (
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                {anime.averageScore / 10}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-grow space-y-6">
            {/* Glassmorphism Card */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 lg:p-8 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl">

              {/* Title Section */}
              <div className="space-y-3 mb-6">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                  {anime.title.english || anime.title.romaji}
                </h1>

                {anime.title.native && anime.title.native !== anime.title.romaji && (
                  <h2 className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-medium">
                    {anime.title.native}
                  </h2>
                )}
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                {anime.startDate?.year && (
                  <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                    <Calendar size={14} />
                    <span>{anime.startDate.year}</span>
                  </div>
                )}

                {anime.episodes && (
                  <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                    <Play size={14} />
                    <span>{anime.episodes} episodes</span>
                  </div>
                )}

                {anime.duration && (
                  <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                    <Clock size={14} />
                    <span>{anime.duration}min</span>
                  </div>
                )}

                {anime.popularity && (
                  <div className="flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                    <Users size={14} />
                    <span>{anime.popularity.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {anime.genres.slice(0, 6).map((genre: string, index: number) => (
                  <span
                    key={genre}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary CTA Button */}
                <button
                  onClick={() => setIsInList(!isInList)}
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Plus size={20} className={`transition-transform duration-300 ${isInList ? 'rotate-45' : ''}`} />
                  <span className="relative z-10">{isInList ? 'Added to List' : 'Add to List'}</span>
                </button>

                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="group relative bg-white/20 dark:bg-gray-800/20 hover:bg-pink-500 dark:hover:bg-pink-600 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 hover:border-pink-500 dark:hover:border-pink-600 p-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-xl"
                >
                  <Heart
                    size={24}
                    className={`transition-all duration-300 ${isLiked
                        ? 'text-pink-500 fill-pink-500 scale-110'
                        : 'text-gray-600 dark:text-gray-400 group-hover:text-white'
                      }`}
                  />
                </button>

                {/* Watch Trailer Button */}
                <button className="group relative bg-white/20 dark:bg-gray-800/20 hover:bg-red-500 dark:hover:bg-red-600 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 hover:border-red-500 dark:hover:border-red-600 py-3 px-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <Play size={18} className="text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <span className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300">Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default AnimeHeroSection;
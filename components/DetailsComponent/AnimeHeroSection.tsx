'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Play, Plus, Star, Calendar, Users, Clock, Share2, Bookmark } from 'lucide-react';
import type { Media } from '@/types/animeDetails';

interface HeroSectionProps {
  anime: Media;
}

const AnimeHeroSection: React.FC<HeroSectionProps> = ({ anime }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10  overflow-hidden">

      <div className="absolute inset-0">
        {anime.bannerImage ? (
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px]">
            <Image
              src={anime.bannerImage}
              alt={`${anime.title.userPreferred} banner`}
              fill
              className="object-cover object-center transition-transform duration-1000 ease-in-out"
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-40"></div>
        )}

        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 left-8 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Top Status Bar Space */}
        <div className="h-12 sm:h-16"></div>

        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-8 max-w-7xl mx-auto w-full">

          {/* Cover Image - Floating Design */}
          <div className="flex justify-center mb-8">
            <div className={`relative transform transition-all duration-1000 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="relative w-40 h-56 sm:w-48 sm:h-64 lg:w-56 lg:h-80 group">

                {/* Glowing Background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>

                {/* Main Cover */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20">
                  <Image
                    src={anime.coverImage.large}
                    alt={anime.title.userPreferred}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Floating Rating Badge */}
                {anime.averageScore && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black px-3 py-2 rounded-2xl font-bold shadow-2xl flex items-center gap-2 animate-bounce">
                    <Star size={16} fill="currentColor" className="animate-spin" style={{ animationDuration: '3s' }} />
                    <span className="text-sm">{(anime.averageScore / 10).toFixed(1)}</span>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 hover:bg-white/30 transition-all duration-200 active:scale-95">
                    <Play size={24} className="text-white ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Title Section with Stunning Typography */}
          <div className="text-center mb-8 space-y-4">
            <div className={`transform transition-all duration-1000 delay-300 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 leading-tight tracking-tight">
                {anime.title.english || anime.title.romaji}
              </h1>

              {anime.title.native && anime.title.native !== anime.title.romaji && (
                <h2 className="text-lg sm:text-xl text-gray-300 font-light mt-2 tracking-wide">
                  {anime.title.native}
                </h2>
              )}
            </div>

            {/* Animated Stats Pills */}
            <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 transform transition-all duration-1000 delay-500 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {anime.startDate?.year && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                  <Calendar size={14} className="text-purple-300" />
                  <span className="text-white font-medium text-sm">{anime.startDate.year}</span>
                </div>
              )}

              {anime.episodes && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                  <Play size={14} className="text-blue-300" />
                  <span className="text-white font-medium text-sm">{anime.episodes} episodes</span>
                </div>
              )}

              {anime.duration && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                  <Clock size={14} className="text-green-300" />
                  <span className="text-white font-medium text-sm">{anime.duration}min</span>
                </div>
              )}

              {anime.popularity && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                  <Users size={14} className="text-pink-300" />
                  <span className="text-white font-medium text-sm">{(anime.popularity / 1000).toFixed(0)}K fans</span>
                </div>
              )}
            </div>
          </div>

          {/* Genre Tags with Gradient Backgrounds */}
          <div className={`flex flex-wrap justify-center gap-2 mb-8 transform transition-all duration-1000 delay-700 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            {anime.genres.slice(0, 5).map((genre: string, index: number) => (
              <span
                key={genre}
                className="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-sm text-white rounded-2xl font-semibold text-sm border border-white/20 hover:from-purple-400/90 hover:to-pink-400/90 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {genre}
              </span>
            ))}
            {anime.genres.length > 5 && (
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm text-gray-300 rounded-2xl font-semibold text-sm border border-white/20">
                +{anime.genres.length - 5} more
              </span>
            )}
          </div>

          {/* Action Buttons - Redesigned for Mobile */}
          <div className={`space-y-4 transform transition-all duration-1000 delay-1000 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Primary Action Button */}
            <button
              onClick={() => setIsInList(!isInList)}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600/10 to-purple-600/10 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-500 active:scale-95 flex items-center justify-center gap-3 shadow-2xl hover:shadow-purple-500/25 border border-white/10"
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: isInList ? '100% 0' : '0 0'
              }}
            >
              <Plus
                size={22}
                className={`transition-all duration-500 ${isInList ? 'rotate-45 text-green-300' : 'rotate-0'}`}
              />
              <span className="tracking-wide">
                {isInList ? 'Added to Watchlist ✨' : 'Add to Watchlist'}
              </span>
            </button>

            {/* Secondary Actions Row */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-pink-500/30 py-4 rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-500 ${isLiked
                      ? 'text-pink-400 fill-pink-400 scale-110'
                      : 'text-gray-300 group-hover:text-pink-300'
                    }`}
                />
                <span className="text-white font-medium hidden sm:inline">
                  {isLiked ? 'Liked' : 'Like'}
                </span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-blue-500/30 py-4 rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Bookmark
                  size={20}
                  className={`transition-all duration-500 ${isBookmarked
                      ? 'text-blue-400 fill-blue-400 scale-110'
                      : 'text-gray-300 group-hover:text-blue-300'
                    }`}
                />
                <span className="text-white font-medium hidden sm:inline">Save</span>
              </button>

              <button className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 py-4 rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group">
                <Share2 size={20} className="text-gray-300 group-hover:text-white transition-colors duration-300" />
                <span className="text-white font-medium hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Watch Trailer Button */}
            <button className="w-full bg-black/30 backdrop-blur-md border border-white/20 hover:bg-black/50 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 group">
              <div className="relative">
                <Play size={20} className="text-red-400 group-hover:text-red-300 transition-colors duration-300" fill="currentColor" />
                <div className="absolute inset-0 bg-red-400 rounded-full opacity-0 group-hover:opacity-20 animate-ping"></div>
              </div>
              <span className="tracking-wide">Watch Trailer</span>
            </button>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-0 w-2 h-32 bg-gradient-to-b from-purple-500/50 to-transparent blur-sm animate-pulse"></div>
      <div className="absolute bottom-1/4 right-0 w-2 h-32 bg-gradient-to-t from-pink-500/50 to-transparent blur-sm animate-pulse delay-1000"></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimeHeroSection;
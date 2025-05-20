'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import type { Media } from '@/types/animeDetails';

interface HeroSectionProps {
  anime: Media;
}
const AnimeHeroSection: React.FC<HeroSectionProps> = ({ anime }) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full h-72 lg:h-96">
        {anime.bannerImage ? (
          <Image
            src={anime.bannerImage}
            alt={`${anime.title.userPreferred} banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900"></div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row -mt-32 z-10">
          <div className="w-40 h-56 md:w-48 md:h-64 flex-shrink-0 rounded overflow-hidden border-4 border-gray-200 dark:border-gray-800 shadow-lg">
            <Image
              src={anime.coverImage.large}
              alt={anime.title.userPreferred}
              width={192}
              height={256}
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-8 flex-grow">
            <div className="bg-white/90 dark:bg-gray-800/90 p-4 md:p-6 rounded backdrop-blur-sm">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {anime.title.english || anime.title.romaji}
              </h1>
              <h2 className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {anime.title.native && anime.title.native !== anime.title.romaji 
                  ? anime.title.native : anime.title.romaji}
              </h2>
              
              <div className="flex flex-wrap gap-3 mb-4">
                {anime.genres.slice(0, 5).map((genre: string) => (
                  <span key={genre} className="px-3 py-1 bg-blue-600 dark:bg-blue-700 rounded-full text-sm text-white">
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded flex items-center space-x-2 transition">
                  <span>Add to List</span>
                </button>
                <button className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 text-white p-2 rounded transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHeroSection;
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, ChevronRight, Star, Mic } from 'lucide-react';
import { CharacterEdge } from '@/types/animeDetails';

interface CharactersSectionProps {
  characters: CharacterEdge[];
}

const CharactersSection: React.FC<CharactersSectionProps> = ({ characters }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!characters || characters.length === 0) {
    return null;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'MAIN':
        return 'from-yellow-400 to-orange-500';
      case 'SUPPORTING':
        return 'from-blue-400 to-indigo-500';
      case 'BACKGROUND':
        return 'from-gray-400 to-gray-500';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  return (
    <section id="characters" className="mb-16">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="relative p-6 pb-4 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Users size={24} className="text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Characters
              </h2>
            </div>

            <Link
              href="#"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 hover:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-white font-medium">View All</span>
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
            </Link>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {characters.slice(0, 8).map((edge, index) => (
              <div
                key={edge.node.id}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-gray-800/80"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex">
                  {/* Character Image */}
                  <div className="relative w-20 h-24 flex-shrink-0">
                    <Image
                      src={edge.node.image.large}
                      alt={edge.node.name.full}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Role Badge */}
                    <div className={`absolute -top-1 -left-1 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRoleColor(edge.role)} shadow-lg`}>
                      {edge.role === 'MAIN' ? 'MAIN' : edge.role === 'SUPPORTING' ? 'SUP' : 'BG'}
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="flex-grow p-4 flex justify-between items-center">
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {edge.node.name.full}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                        <Star size={12} className="text-yellow-400" />
                        <span>{edge.role.charAt(0) + edge.role.slice(1).toLowerCase()} Role</span>
                      </p>
                    </div>

                    {/* Voice Actor Info */}
                    {edge.voiceActors && edge.voiceActors.length > 0 && (
                      <div className="text-right mr-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {edge.voiceActors[0].name.full}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-end space-x-1">
                          <Mic size={10} />
                          <span>Japanese</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Voice Actor Image */}
                  {edge.voiceActors && edge.voiceActors.length > 0 && (
                    <div className="relative w-20 h-24 flex-shrink-0">
                      <Image
                        src={edge.voiceActors[0].image.large}
                        alt={edge.voiceActors[0].name.full}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharactersSection;
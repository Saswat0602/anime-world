'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ChevronRight, Star, TrendingUp, Users } from 'lucide-react';
import { Recommendation } from '@/types/animeDetails';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ANIME':
        return 'from-blue-400 to-indigo-500';
      case 'MANGA':
        return 'from-green-400 to-emerald-500';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ANIME':
        return <Star size={12} className="text-blue-500" />;
      case 'MANGA':
        return <Heart size={12} className="text-green-500" />;
      default:
        return <TrendingUp size={12} className="text-purple-500" />;
    }
  };

  return (
    <section id="recommendations" className="mb-16">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="relative p-6 pb-4 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                <Heart size={24} className="text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Recommendations
              </h2>
            </div>

            <Link
              href="#"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 hover:bg-pink-500 dark:hover:bg-pink-600 transition-all duration-300 hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-white font-medium">View All</span>
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
            </Link>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="p-6 pt-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recommendations.slice(0, 10).map((node, index) => (
              <div
                key={node.mediaRecommendation.id}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.05] hover:bg-white/80 dark:hover:bg-gray-800/80"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Media Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={node.mediaRecommendation.coverImage.large}
                    alt={node.mediaRecommendation.title.userPreferred}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Type Badge */}
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(node.mediaRecommendation.type)} shadow-lg backdrop-blur-sm`}>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(node.mediaRecommendation.type)}
                      <span>{node.mediaRecommendation.type}</span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  {node.mediaRecommendation.averageScore && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                      <Star size={10} className="text-yellow-400 fill-current" />
                      <span className="text-xs text-white font-medium">
                        {node.mediaRecommendation.averageScore}%
                      </span>
                    </div>
                  )}

                  {/* Recommendation Rating */}
                  {node.rating && (
                    <div className="absolute bottom-2 left-2 flex items-center space-x-1 px-2 py-1 bg-pink-500/80 backdrop-blur-sm rounded-full">
                      <Users size={10} className="text-white" />
                      <span className="text-xs text-white font-bold">
                        {node.rating}
                      </span>
                    </div>
                  )}

                  {/* Hover Content */}
                  <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-white text-sm mb-2 line-clamp-2">
                      {node.mediaRecommendation.title.userPreferred}
                    </h4>
                    
                    {node.mediaRecommendation.genres && node.mediaRecommendation.genres.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {node.mediaRecommendation.genres.slice(0, 2).map((genre) => (
                          <span
                            key={genre}
                            className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm text-white rounded-lg"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title for non-hover state */}
                <div className="p-3 group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                    {node.mediaRecommendation.title.userPreferred}
                  </h4>
                  
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {node.mediaRecommendation.type}
                    </span>
                    {node.mediaRecommendation.averageScore && (
                      <div className="flex items-center space-x-1">
                        <Star size={10} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {node.mediaRecommendation.averageScore}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
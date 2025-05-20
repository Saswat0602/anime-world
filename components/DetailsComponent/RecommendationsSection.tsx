'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Recommendation } from '@/types/animeDetails';

interface RecommendationsSectionProps {
  recommendations: Recommendation[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Recommendations</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendations.slice(0, 10).map((node) => (
          <Link 
            key={node.mediaRecommendation.id}
            href={`/anime/${node.mediaRecommendation.id}`}
            className="block bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <div className="relative w-full pt-[140%]">
              <Image
                src={node.mediaRecommendation.coverImage.large}
                alt={node.mediaRecommendation.title.userPreferred}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="absolute top-0 left-0 object-cover"
              />
            </div>
            
            <div className="p-2">
              <h4 className="font-medium text-sm line-clamp-2 h-10 text-gray-900 dark:text-white">
                {node.mediaRecommendation.title.userPreferred}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {node.mediaRecommendation.type}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendationsSection;
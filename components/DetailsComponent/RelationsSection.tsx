'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GitBranch, ChevronRight} from 'lucide-react';
import { MediaRelationEdge } from '@/types/animeDetails';

interface RelationsSectionProps {
  relations: MediaRelationEdge[];
}

const RelationsSection: React.FC<RelationsSectionProps> = ({ relations }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (!relations || relations.length === 0) {
    return null;
  }

  const formatRelationType = (type: string) => {
    return type.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getRelationColor = (type: string) => {
    switch (type) {
      case 'SEQUEL':
        return 'from-green-400 to-emerald-500';
      case 'PREQUEL':
        return 'from-blue-400 to-cyan-500';
      case 'SIDE_STORY':
        return 'from-purple-400 to-violet-500';
      case 'ADAPTATION':
        return 'from-orange-400 to-red-500';
      case 'ALTERNATIVE':
        return 'from-pink-400 to-rose-500';
      case 'SPIN_OFF':
        return 'from-yellow-400 to-amber-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };



  return (
    <section id="relations" className="mb-16">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="relative p-6 pb-4 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/20 to-blue-500/20 rounded-full blur-2xl"></div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
                <GitBranch size={24} className="text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Relations
              </h2>
            </div>

            <Link
              href="#"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 hover:bg-green-500 dark:hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-white font-medium">View All</span>
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-white" />
            </Link>
          </div>
        </div>

        {/* Relations Grid */}
        <div className="p-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relations.map((edge, index) => (
              <div
                key={edge.node.id}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-gray-800/80"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Media Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={edge.node.coverImage.large}
                    alt={edge.node.title.userPreferred}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Relation Type Badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getRelationColor(edge.relationType)} shadow-lg backdrop-blur-sm`}>
                    {formatRelationType(edge.relationType)}
                  </div>

                  {/* Format Badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    <span className="text-xs text-white font-medium">
                      {edge.node.format?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                    {edge.node.title.userPreferred}
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {edge.node.status?.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelationsSection;
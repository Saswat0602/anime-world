'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RelationsSectionProps {
  relations: any[];
}

const RelationsSection: React.FC<RelationsSectionProps> = ({ relations }) => {
  if (!relations || relations.length === 0) {
    return null;
  }

  const formatRelationType = (type: string) => {
    return type.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Relations</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {relations.map((edge) => (
          <Link 
            key={edge.node.id}
            href={`/anime/${edge.node.id}`}
            className="block bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <div className="relative w-full pt-[140%]">
              <Image
                src={edge.node.coverImage.large}
                alt={edge.node.title.userPreferred}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="absolute top-0 left-0 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                <p className="text-xs text-white truncate">
                  {formatRelationType(edge.relationType)}
                </p>
              </div>
            </div>
            
            <div className="p-2">
              <h4 className="font-medium text-sm line-clamp-2 h-10 text-gray-900 dark:text-white">
                {edge.node.title.userPreferred}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {edge.node.format?.replace(/_/g, ' ')} • {edge.node.status?.replace(/_/g, ' ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelationsSection;
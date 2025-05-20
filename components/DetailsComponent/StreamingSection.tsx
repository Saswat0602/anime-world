'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Episode {
  id: string;
  title: string;
  url: string;
  site: string;
  thumbnail?: string;
  episode: number;
}

interface StreamingSectionProps {
  episodes: Episode[];
}

type SiteConfig = {
  [key: string]: {
    color: string;
    logo: boolean;
  };
};

const siteConfig: SiteConfig = {
  'Crunchyroll': {
    color: 'bg-orange-600',
    logo: true,
  },
  'Funimation': {
    color: 'bg-blue-600',
    logo: true,
  },
  'Netflix': {
    color: 'bg-red-600',
    logo: true,
  },
  'HIDIVE': {
    color: 'bg-purple-600',
    logo: true,
  },
  'default': {
    color: 'bg-gray-600',
    logo: false,
  }
};

const StreamingSection: React.FC<StreamingSectionProps> = ({ episodes }) => {
  if (!episodes || episodes.length === 0) {
    return null;
  }

  // Group episodes by streaming site
  const episodesBySite = episodes.reduce((acc, episode) => {
    const site = episode.site || 'Other';
    if (!acc[site]) {
      acc[site] = [];
    }
    acc[site].push(episode);
    return acc;
  }, {} as Record<string, Episode[]>);

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Watch Online</h2>
      
      <div className="space-y-8">
        {Object.entries(episodesBySite).map(([site, siteEpisodes]) => (
          <div key={site} className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            <div 
              className={`p-4 flex items-center ${siteConfig[site]?.color || siteConfig.default.color}`}
            >
              {siteConfig[site]?.logo ? (
                <div className="w-6 h-6 mr-2">
                  {/* Replace with actual logo if available */}
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
              ) : null}
              <h3 className="text-lg font-bold text-white">{site}</h3>
            </div>
            
            <div className="p-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {siteEpisodes.map((episode) => (
                  <Link 
                    key={episode.id}
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white dark:bg-gray-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
                      {episode.thumbnail ? (
                        <Image
                          src={episode.thumbnail}
                          alt={episode.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="absolute top-0 left-0 object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">No thumbnail</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-2">
                      <h4 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">
                        {episode.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Episode {episode.episode}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StreamingSection;
'use client';

import React from 'react';
import { Star, Calendar, Award } from 'lucide-react';
import type { Media, FuzzyDate, Ranking } from '@/types/animeDetails';

interface AnimeOverviewProps {
  anime: Media;
}

const AnimeOverview: React.FC<AnimeOverviewProps> = ({ anime }) => {
  const formatDate = (date: FuzzyDate) => {
    if (!date.year) return 'TBA';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      FINISHED: 'bg-green-600',
      RELEASING: 'bg-blue-600',
      NOT_YET_RELEASED: 'bg-yellow-600',
      CANCELLED: 'bg-red-600',
      HIATUS: 'bg-purple-600',
    };
    return colors[status] || 'bg-gray-600';
  };

  const nextEpisode = anime.nextAiringEpisode;
  const daysUntilNext = nextEpisode ? Math.floor(nextEpisode.timeUntilAiring / 86400) : null;
  const hoursUntilNext = nextEpisode ? Math.floor((nextEpisode.timeUntilAiring % 86400) / 3600) : null;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {anime.averageScore ? `${anime.averageScore / 10} / 10` : 'N/A'}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({anime.popularity.toLocaleString()} users)</span>
          </span>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Status</h3>
          <div className="flex items-center text-gray-900 dark:text-white">
            <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(anime.status)}`}></span>
            <span>{anime.status.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {nextEpisode && (
          <div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Next Episode</h3>
            <p className="text-gray-900 dark:text-white">
              EP {nextEpisode.episode} airing in {daysUntilNext}d {hoursUntilNext}h
            </p>
          </div>
        )}

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Format</h3>
          <p className="text-gray-900 dark:text-white">{anime.format.replace(/_/g, ' ')}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Episodes</h3>
          <p className="text-gray-900 dark:text-white">{anime.episodes || '?'} × {anime.duration || '?'} min</p>
        </div>

        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <h3 className="font-medium text-gray-600 dark:text-gray-400">Aired</h3>
        </div>
        <p className="pl-5 text-gray-900 dark:text-white">
          {formatDate(anime.startDate)} to {anime.status === 'FINISHED' ? formatDate(anime.endDate) : 'Present'}
        </p>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Season</h3>
          <p className="text-gray-900 dark:text-white">
            {anime.season ? `${anime.season.charAt(0).toUpperCase()}${anime.season.slice(1).toLowerCase()} ${anime.seasonYear}` : 'N/A'}
          </p>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Studios</h3>
          <div className="flex flex-wrap gap-1">
            {anime.studios.edges
              .filter((edge) => edge.isMain)
              .map((edge) => (
                <span
                  key={edge.node.id}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {edge.node.name}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Source</h3>
          <p className="text-gray-900 dark:text-white">
            {anime.source?.replace(/_/g, ' ') || 'Original'}
          </p>
        </div>

        {anime.rankings.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Rankings</h3>
            <div className="space-y-1">
              {anime.rankings.slice(0, 2).map((ranking: Ranking, index: number) => (
                <div key={index} className="flex items-center text-gray-900 dark:text-white">
                  <Award className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>
                    #{ranking.rank} {ranking.context} {ranking.year ? `(${ranking.year})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Popularity</h3>
          <p className="text-gray-900 dark:text-white">#{anime.popularity.toLocaleString()}</p>
        </div>

        <div>
          <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-1">Favorites</h3>
          <p className="text-gray-900 dark:text-white">{anime.favourites.toLocaleString()}</p>
        </div>

        <div className="pt-2">
          <a
            href={anime.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
          >
            View on AniList
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimeOverview;

'use client';

import React, { useState, useEffect } from 'react';
import { Star, Calendar, Award, Clock, Play, Users, Heart, ExternalLink, TrendingUp, Zap, Trophy, Eye } from 'lucide-react';
import type { Media, FuzzyDate, Ranking } from '@/types/animeDetails';

interface AnimeOverviewProps {
  anime: Media;
}

const AnimeOverview: React.FC<AnimeOverviewProps> = ({ anime }) => {
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  const formatDate = (date: FuzzyDate) => {
    if (!date.year) return 'TBA';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = date.month ? months[date.month - 1] : '';
    const day = date.day ? String(date.day).padStart(2, '0') : '';
    return `${month} ${day}, ${date.year}`.replace(/,\s*$/, '');
  };

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { color: string; bg: string; icon: React.ReactNode; pulse?: boolean }> = {
      FINISHED: { color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30', icon: <Trophy size={14} /> },
      RELEASING: { color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30', icon: <Zap size={14} />, pulse: true },
      NOT_YET_RELEASED: { color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30', icon: <Clock size={14} /> },
      CANCELLED: { color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', icon: <Play size={14} /> },
      HIATUS: { color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/30', icon: <Clock size={14} /> },
    };
    return configs[status] || { color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30', icon: <Clock size={14} /> };
  };

  const nextEpisode = anime.nextAiringEpisode;

  // Update countdown timer
  useEffect(() => {
    if (!nextEpisode) return;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = nextEpisode.timeUntilAiring;

      if (remaining <= 0) {
        setTimeUntilNext('Available now!');
        return;
      }

      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);

      if (days > 0) {
        setTimeUntilNext(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeUntilNext(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilNext(`${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [nextEpisode]);

  const statusConfig = getStatusConfig(anime.status);

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
      {/* Header Section with Score */}
      <div className="relative p-6 pb-4 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

        <div className="relative flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/30 dark:border-gray-700/50">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {anime.averageScore ? `${(anime.averageScore / 10).toFixed(1)}` : 'N/A'}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <Users size={14} />
              <span>{anime.popularity?.toLocaleString() || '0'}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border backdrop-blur-sm ${statusConfig.bg} ${statusConfig.pulse ? 'animate-pulse' : ''}`}>
            <span className={statusConfig.color}>{statusConfig.icon}</span>
            <span className={`text-sm font-medium ${statusConfig.color}`}>
              {anime.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-6 space-y-6">

        {/* Next Episode Countdown */}
        {nextEpisode && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">Next Episode</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Episode {nextEpisode.episode}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Airing in</p>
                <p className="text-lg font-bold text-blue-400">{timeUntilNext}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Format & Episodes */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Play size={16} className="text-indigo-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Format</h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium">
              {anime.format?.replace(/_/g, ' ') || 'N/A'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {anime.episodes || '?'} episodes × {anime.duration || '?'} min
            </p>
          </div>

          {/* Season */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={16} className="text-green-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Season</h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium">
              {anime.season ? `${anime.season.charAt(0).toUpperCase()}${anime.season.slice(1).toLowerCase()} ${anime.seasonYear}` : 'N/A'}
            </p>
          </div>

          {/* Aired */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={16} className="text-purple-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Aired</h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium">
              {formatDate(anime.startDate)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              to {anime.status === 'FINISHED' ? formatDate(anime.endDate) : 'Present'}
            </p>
          </div>

          {/* Source */}
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <Eye size={16} className="text-orange-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Source</h3>
            </div>
            <p className="text-gray-900 dark:text-white font-medium">
              {anime.source?.replace(/_/g, ' ') || 'Original'}
            </p>
          </div>
        </div>

        {/* Studios */}
        {anime.studios?.edges?.length > 0 && (
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Studios</h3>
            <div className="flex flex-wrap gap-2">
              {anime.studios.edges
                .filter((edge) => edge.isMain)
                .map((edge) => (
                  <span
                    key={edge.node.id}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-full font-medium hover:scale-105 transition-transform cursor-pointer"
                  >
                    {edge.node.name}
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Rankings */}
        {anime.rankings?.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy size={16} className="text-yellow-500" />
              <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Rankings</h3>
            </div>
            <div className="space-y-2">
              {anime.rankings.slice(0, 3).map((ranking: Ranking, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {ranking.rank}
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {ranking.context} {ranking.year ? `(${ranking.year})` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <TrendingUp size={16} className="text-blue-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Popularity</h3>
            </div>
            <p className="text-xl font-bold text-blue-500">#{anime.popularity?.toLocaleString() || '0'}</p>
          </div>

          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30 dark:border-gray-700/50 text-center">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <Heart size={16} className="text-pink-500" />
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Favorites</h3>
            </div>
            <p className="text-xl font-bold text-pink-500">{anime.favourites?.toLocaleString() || '0'}</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AnimeOverview;
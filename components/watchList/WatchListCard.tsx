import { Play, Plus, Calendar, Star, Eye, CheckCircle, Bookmark } from 'lucide-react';
import Image from 'next/image';

interface AnimeWatchList {
  id: string | number;
  title: string;
  image: string;
  rating: number;
  watchedEpisodes?: number;
  totalEpisodes: number;
  episode?: string;
  timeLeft?: string;
  completedDate?: string;
  releaseDate?: string;
  studio: string;
  genres: string[];
  description: string;
}

interface WatchListCardProps {
  anime: AnimeWatchList;
  type: 'watching' | 'completed' | 'planToWatch';
}

const WatchListCard: React.FC<WatchListCardProps> = ({ anime, type = 'watching' }) => {
  const getProgressColor = (rating: number): string => {
    if (rating >= 80) return 'text-green-500';
    if (rating >= 70) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const getGenreColor = (genre: string): string => {
    const colors: Record<string, string> = {
      action: 'bg-red-500/20 text-red-400 border-red-500/30',
      adventure: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      drama: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      mystery: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[genre] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const progressPercentage = type === 'watching' && anime.watchedEpisodes 
    ? Math.round((anime.watchedEpisodes / anime.totalEpisodes) * 100)
    : 0;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          width={300} 
          height={400}
          src={anime.image} 
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Progress/Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {type === 'watching' && anime.watchedEpisodes && (
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-white">
              {anime.watchedEpisodes}/{anime.totalEpisodes}
            </div>
          )}
          <div className={`bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium ${getProgressColor(anime.rating)}`}>
            {anime.rating}%
          </div>
        </div>

        {/* Action Button */}
        <button className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90">
          <Plus size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Timing Info */}
        {type === 'watching' && (
          <div className="mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{anime.episode}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{anime.timeLeft}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">TV Show • {anime.totalEpisodes} episodes</div>
          </div>
        )}

        {type === 'completed' && (
          <div className="mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed {anime.completedDate}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">TV Show • {anime.totalEpisodes} episodes</div>
          </div>
        )}

        {type === 'planToWatch' && (
          <div className="mb-2">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Releases {anime.releaseDate}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">TV Show • {anime.totalEpisodes} episodes</div>
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
          {anime.title}
        </h3>

        {/* Studio */}
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{anime.studio}</div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.map((genre) => (
            <span 
              key={genre}
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getGenreColor(genre)}`}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {anime.description}
        </p>

        {/* Progress Bar for Currently Watching */}
        {type === 'watching' && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {type === 'watching' && (
            <>
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <Play size={16} />
                Continue
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                <CheckCircle size={16} />
              </button>
            </>
          )}

          {type === 'completed' && (
            <>
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <Star size={16} />
                Rate
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                <Eye size={16} />
              </button>
            </>
          )}

          {type === 'planToWatch' && (
            <>
              <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                <Bookmark size={16} />
                Add to List
              </button>
              <button className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200">
                <Calendar size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
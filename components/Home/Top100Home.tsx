'use client';

import { useTop100AnimeQuery } from '@/redux/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';

interface Top100AnimeSectionProps {
  displayCount?: number;
}

export const Top100Home = ({ displayCount = 10 }: Top100AnimeSectionProps) => {
  const router = useRouter();
  
  const { data: top100AnimeData, isLoading: top100Loading } = useTop100AnimeQuery({ page: 1 });
  
  const top100Anime = top100AnimeData?.data?.slice(0, displayCount) || [];

  const handleViewAll = () => {
    router.push(ROUTES.ANIME.TOP_100);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top 100 Anime</h2>
        <button
          onClick={handleViewAll}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200 text-sm"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {top100Anime.map((anime, index) => (
          <div
            key={anime.mal_id}
            className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-lg shadow-md border border-[#334155] transition-shadow duration-200"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-10 text-center">
              <span className="text-2xl font-bold text-[#64748b]">
                #{index + 1}
              </span>
            </div>

            {/* Anime Image */}
            <div className="flex-shrink-0 w-14 h-18 rounded overflow-hidden border border-[#475569]">
              <img
                src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Anime Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-100 text-base mb-1 line-clamp-2">
                {anime.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {anime.genres?.slice(0, 3).map((genre) => (
                  <span
                    key={genre.name}
                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#0f172a] text-[#93c5fd]"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400 leading-tight">
                <div>{anime.type || 'Unknown'} • {anime.episodes ? `${anime.episodes} episodes` : (anime.duration || 'Duration TBA')}</div>
                <div className="mt-0.5">{anime.year ? `${anime.season} ${anime.year}` : 'Date TBA'} • {anime.status?.toLowerCase() || 'Unknown'}</div>
              </div>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center justify-end mb-2">
                <span className="inline-block px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded">
                  {anime.score ? `${Math.round(anime.score * 10)}%` : 'N/A'}
                </span>
              </div>
              <div className="text-xs text-gray-400 leading-tight">
                {anime.scored_by ? `${anime.scored_by.toLocaleString()} users` : 'Users N/A'}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Skeletons */}
        {top100Loading &&
          Array(displayCount)
            .fill(0)
            .map((_, index) => (
              <div
                key={`top100-skeleton-${index}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-shrink-0 w-12 text-center">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="flex-shrink-0 w-16 h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-shrink-0 space-y-2">
                  <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};
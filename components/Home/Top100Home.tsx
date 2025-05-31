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

    const handleAnimeClick = (animeId: number) => {
        router.push(`/anime/${animeId}`);
    };

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">TOP 100 ANIME</h2>
                <button
                    onClick={handleViewAll}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-all duration-300 text-sm hover:scale-105 flex items-center gap-1"
                >
                    View All
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="space-y-3">
                {top100Anime.map((anime, index) => (
                    <div
                        key={anime.mal_id}
                        onClick={() => handleAnimeClick(anime.mal_id)}
                        className="group flex items-center gap-4 p-4 
                                 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800
                                 border border-gray-200 dark:border-gray-600/50 
                                 hover:border-blue-500/60 dark:hover:border-blue-400/60 
                                 rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] 
                                 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                                 backdrop-blur-sm shadow-sm dark:shadow-gray-900/20"
                    >
                        {/* Rank with gradient background */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center relative">
                            {/* Only for top 3 */}
                            {index < 3 && (
                                <svg
                                    className="absolute -top-3 w-5 h-5 text-yellow-400 drop-shadow-md"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M2 6l5 9 5-7 5 7 5-9v15H2V6z" />
                                </svg>
                            )}
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                                    ${index < 3
                                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg'
                                        : index < 10
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                            : 'bg-gradient-to-br from-gray-400 to-gray-500 dark:from-slate-600 dark:to-slate-700 text-white dark:text-gray-300'
                                    }transition-transform duration-300 group-hover:scale-110 `}
                            >
                                #{index + 1}
                            </div>
                        </div>


                        {/* Anime Image with better aspect ratio */}
                        <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-500 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-300">
                            <img
                                src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
                                alt={anime.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>

                        {/* Anime Info - Better structured */}
                        <div className="flex-1 min-w-0 py-1">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {anime.title}
                            </h3>

                            {/* Genres with better styling */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {anime.genres?.slice(0, 5).map((genre, genreIndex) => (
                                    <span
                                        key={genre.name}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300
                                            ${genreIndex === 0
                                                ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600/50'
                                                : genreIndex === 1
                                                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-600/50'
                                                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-600/50'
                                            }
                                            group-hover:scale-105`}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {/* Meta info with better layout */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full"></div>
                                        {anime.type || 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-300 rounded-full"></div>
                                        {anime.episodes ? `${anime.episodes} episodes` : (anime.duration || 'Duration TBA')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                    <span>{anime.year ? `${anime.season} ${anime.year}` : 'Date TBA'}</span>
                                    <span>•</span>
                                    <span className="capitalize">{anime.status?.toLowerCase() || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score and Stats - Right aligned */}
                        <div className="flex-shrink-0 text-right space-y-2">
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-500 text-white text-sm font-bold rounded-lg shadow-lg">
                                        {anime.score ? `${Math.round(anime.score)}%` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-300 font-medium">
                                    {anime.scored_by ? `${anime.scored_by.toLocaleString()} users` : 'No ratings'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Enhanced Loading Skeletons */}
                {top100Loading &&
                    Array(displayCount)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={`top100-skeleton-${index}`}
                                className="flex items-center gap-4 p-4 
                                         bg-white dark:bg-gradient-to-r dark:from-gray-800/70 dark:to-gray-700/60 
                                         rounded-xl border border-gray-200 dark:border-gray-600/40 animate-pulse shadow-sm dark:shadow-gray-900/20"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="flex-shrink-0 w-16 h-20 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-6 w-18 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 space-y-2">
                                    <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                </div>
                            </div>
                        ))}
            </div>
        </section>
    );
};
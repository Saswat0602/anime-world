'use client';

import { useTop100AnimeQuery } from '@/redux/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
        <section className="mb-8 sm:mb-12 px-2 sm:px-0">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-600 dark:from-slate-300 dark:via-blue-400 dark:to-indigo-400 text-transparent bg-clip-text text-center sm:text-left">
                    TOP 100 ANIME
                </h2>
                <button
                    onClick={handleViewAll}
                    className="relative inline-flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-blue-500 rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 self-center sm:self-auto"
                >
                    View All
                    <ChevronRight />
                </button>
            </div>

            {/* Anime List */}
            <div className="space-y-2 sm:space-y-3">
                {top100Anime.map((anime, index) => (
                    <div
                        key={anime.mal_id}
                        onClick={() => handleAnimeClick(anime.mal_id)}
                        className="group flex items-center gap-2 sm:gap-4 p-3 sm:p-4 
                                 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800
                                 border border-gray-200 dark:border-gray-600/50 
                                 hover:border-blue-500/60 dark:hover:border-blue-400/60 
                                 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] 
                                 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20
                                 backdrop-blur-sm shadow-sm dark:shadow-gray-900/20"
                    >
                        {/* Rank Section */}
                        <div className="flex-shrink-0 w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center relative">
                            {/* Crown for top 3 - hidden on very small screens */}
                            {index < 3 && (
                                <svg
                                    className="absolute -top-2 sm:-top-3 w-3 sm:w-5 h-3 sm:h-5 text-yellow-400 drop-shadow-md hidden xs:block"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M2 6l5 9 5-7 5 7 5-9v15H2V6z" />
                                </svg>
                            )}
                            <div
                                className={`w-6 sm:w-10 h-6 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center font-bold text-xs sm:text-lg
                                    ${index < 3
                                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg'
                                        : index < 10
                                            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                                            : 'bg-gradient-to-br from-gray-400 to-gray-500 dark:from-slate-600 dark:to-slate-700 text-white dark:text-gray-300'
                                    } transition-transform duration-300 group-hover:scale-110`}
                            >
                                #{index + 1}
                            </div>
                        </div>

                        {/* Anime Image */}
                        <div className="flex-shrink-0 w-10 sm:w-16 h-14 sm:h-20 rounded-md sm:rounded-lg overflow-hidden border border-gray-300 dark:border-gray-500 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors duration-300">
                            <Image
                            src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url || "/zoro.png"}
                            alt={anime.title || "Anime image"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                            />
                        </div>

                        {/* Anime Info - Responsive Layout */}
                        <div className="flex-1 min-w-0 py-1">
                            {/* Title */}
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {anime.title}
                            </h3>

                            {/* Genres - Responsive display */}
                            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                                {anime.genres?.slice(0, window.innerWidth < 640 ? 2 : 5).map((genre, genreIndex) => (
                                    <span
                                        key={genre.name}
                                        className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full transition-all duration-300
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

                            {/* Meta info - Responsive layout */}
                            <div className="space-y-0.5 sm:space-y-1">
                                {/* Mobile: Stack vertically, Desktop: Side by side */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                    <span className="flex items-center gap-1">
                                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full"></div>
                                        {anime.type || 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-500 dark:bg-green-300 rounded-full"></div>
                                        {anime.episodes ? `${anime.episodes} ep` : (anime.duration || 'Duration TBA')}
                                    </span>
                                </div>

                                {/* Secondary info - Hidden on very small screens */}
                                <div className="hidden xs:flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    <span className="truncate">{anime.year ? `${anime.season} ${anime.year}` : 'Date TBA'}</span>
                                    <span>•</span>
                                    <span className="capitalize truncate">{anime.status?.toLowerCase() || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score Section - Responsive */}
                        <div className="flex-shrink-0 text-right">
                            <div className="flex flex-col items-end gap-1 sm:gap-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs sm:text-sm font-bold rounded-md sm:rounded-lg shadow-lg">
                                        {anime.score ? `${Math.round(anime.score)}%` : 'N/A'}
                                    </span>
                                </div>
                                {/* User count - Hidden on small screens */}
                                <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-300 font-medium">
                                    {anime.scored_by ? `${anime.scored_by.toLocaleString()} users` : 'No ratings'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Loading Skeletons - Responsive */}
                {top100Loading &&
                    Array(displayCount)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={`top100-skeleton-${index}`}
                                className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 
                                         bg-white dark:bg-gradient-to-r dark:from-gray-800/70 dark:to-gray-700/60 
                                         rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600/40 animate-pulse shadow-sm dark:shadow-gray-900/20"
                            >
                                <div className="flex-shrink-0 w-8 sm:w-12 h-8 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-md sm:rounded-lg"></div>
                                <div className="flex-shrink-0 w-10 sm:w-16 h-14 sm:h-20 bg-gray-300 dark:bg-gray-600 rounded-md sm:rounded-lg"></div>
                                <div className="flex-1 space-y-2 sm:space-y-3">
                                    <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded-md sm:rounded-lg w-3/4"></div>
                                    <div className="flex gap-1 sm:gap-2">
                                        <div className="h-5 sm:h-6 w-12 sm:w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-5 sm:h-6 w-14 sm:w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="hidden sm:block h-6 w-18 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                        <div className="hidden xs:block h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 space-y-1 sm:space-y-2">
                                    <div className="h-6 sm:h-8 w-12 sm:w-16 bg-gray-300 dark:bg-gray-600 rounded-md sm:rounded-lg"></div>
                                    <div className="hidden sm:block h-3 sm:h-4 w-16 sm:w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                </div>
                            </div>
                        ))}
            </div>
        </section>
    );
};
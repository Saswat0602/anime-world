'use client';

import { useTop100AnimeQuery } from '@/redux/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/routes';
import { ChevronRight, Star } from 'lucide-react';
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
        <section className="mb-4 sm:mb-8 ">
            <div className="flex items-center justify-between px-3 sm:px-4 mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 text-transparent bg-clip-text">
                    TOP 100 ANIME
                </h2>
                <button
                    onClick={handleViewAll}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                    View All
                    <ChevronRight className="w-3 h-3" />
                </button>
            </div>

            <div className="space-y-1 sm:space-y-2">
                {top100Anime.map((anime, index) => (
                    <div
                        key={anime.mal_id}
                        onClick={() => handleAnimeClick(anime.mal_id)}
                      className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4
                                 bg-white dark:bg-gray-800
                                 border border-gray-200 dark:border-gray-700
                                 rounded-xl sm:rounded-2xl
                                 shadow-sm hover:shadow-md sm:hover:shadow-lg
                                 hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20
                                 hover:border-purple-300 dark:hover:border-purple-600
                                 transition-all duration-300 cursor-pointer 
                                 hover:scale-[1.01] active:scale-[0.99]
                                 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30
                                 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10"
                    >
                        <div className="relative flex-shrink-0">
                            {index < 3 && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center z-10">
                                    <Star className="w-2 h-2 text-yellow-800 fill-current" />
                                </div>
                            )}
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base
                                    ${index < 3
                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md'
                                        : index < 10
                                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                                            : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white'
                                    } group-hover:scale-110 transition-transform duration-300`}
                            >
                                {index + 1}
                            </div>
                        </div>

                        {/* Anime Image - Optimized size */}
                        <div className="relative flex-shrink-0 w-12 h-16 sm:w-14 sm:h-18 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                            <Image
                                src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url || "/zoro.png"}
                                alt={anime.title || "Anime"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                                sizes="(max-width: 640px) 48px, 56px"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content - Maximized space */}
                        <div className="flex-1 min-w-0">
                            {/* Title */}
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 mb-1">
                                {anime.title}
                            </h3>

                            {/* Type & Episodes - Inline */}
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-1">
                                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
                                    {anime.type || 'TV'}
                                </span>
                                <span>•</span>
                                <span>{anime.episodes ? `${anime.episodes} ep` : 'Ongoing'}</span>
                            </div>

                            {/* Genres - Mobile optimized */}
                            <div className="flex flex-wrap gap-1">
                                {anime.genres?.slice(0, 2).map((genre, idx) => (
                                    <span
                                        key={genre.name}
                                        className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all duration-300 group-hover:scale-105
                                            ${idx === 0 
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                                                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                            }`}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Score - Compact */}
                        <div className="flex-shrink-0 text-right">
                            <div className="flex items-center justify-end gap-1 mb-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-lg shadow-md">
                                    {anime.score ? `${anime.score.toFixed(1)}` : 'N/A'}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                                {anime.scored_by ? `${(anime.scored_by / 1000).toFixed(0)}k` : '0'} votes
                            </div>
                        </div>

                        {/* Hover indicator */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="w-4 h-4 text-purple-500" />
                        </div>
                    </div>
                ))}

                {/* Loading Skeletons - Compact */}
                {top100Loading &&
                    Array(displayCount)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/60 dark:bg-gray-900/60 animate-pulse"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="w-12 h-16 sm:w-14 sm:h-18 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                                    <div className="flex gap-2">
                                        <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            </div>
                        ))}
            </div>
        </section>
    );
};
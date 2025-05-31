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
                <h2 className="text-3xl font-bold text-white tracking-tight">TOP 100 ANIME</h2>
                <button
                    onClick={handleViewAll}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 text-sm hover:scale-105 flex items-center gap-1"
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
                        className="group flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/30 
                                 rounded-xl border border-slate-600/30 hover:border-blue-500/50 
                                 transition-all duration-300 cursor-pointer hover:scale-[1.02] 
                                 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm"
                    >
                        {/* Rank with gradient background */}
                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg
                                ${index < 3 
                                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg' 
                                    : index < 10 
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                                    : 'bg-gradient-to-br from-slate-600 to-slate-700 text-gray-300'
                                }
                                transition-transform duration-300 group-hover:scale-110
                            `}>
                                #{index + 1}
                            </div>
                        </div>

                        {/* Anime Image with better aspect ratio */}
                        <div className="flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 border-slate-600 group-hover:border-blue-400 transition-colors duration-300">
                            <img
                                src={anime.images?.jpg?.image_url || anime.images?.webp?.image_url}
                                alt={anime.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>

                        {/* Anime Info - Better structured */}
                        <div className="flex-1 min-w-0 py-1">
                            <h3 className="font-bold text-white text-lg mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors duration-300">
                                {anime.title}
                            </h3>
                            
                            {/* Genres with better styling */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {anime.genres?.slice(0, 3).map((genre, genreIndex) => (
                                    <span
                                        key={genre.name}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300
                                            ${genreIndex === 0 
                                                ? 'bg-gradient-to-r from-green-500/20 to-green-400/20 text-green-300 border border-green-500/30' 
                                                : genreIndex === 1 
                                                ? 'bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-300 border border-purple-500/30'
                                                : 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 text-blue-300 border border-blue-500/30'
                                            }
                                            group-hover:scale-105`}
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Meta info with better layout */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                        {anime.type || 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                        {anime.episodes ? `${anime.episodes} episodes` : (anime.duration || 'Duration TBA')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
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
                                        {anime.score ? `${Math.round(anime.score * 10)}%` : 'N/A'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
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
                                className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-800/30 to-slate-700/20 
                                         rounded-xl border border-slate-600/20 animate-pulse"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-slate-600 rounded-lg"></div>
                                <div className="flex-shrink-0 w-16 h-20 bg-slate-600 rounded-lg"></div>
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 bg-slate-600 rounded-lg w-3/4"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 bg-slate-600 rounded-full"></div>
                                        <div className="h-6 w-20 bg-slate-600 rounded-full"></div>
                                        <div className="h-6 w-18 bg-slate-600 rounded-full"></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                                        <div className="h-4 bg-slate-600 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 space-y-2">
                                    <div className="h-8 w-16 bg-slate-600 rounded-lg"></div>
                                    <div className="h-4 w-20 bg-slate-600 rounded"></div>
                                </div>
                            </div>
                        ))}
            </div>
        </section>
    );
};
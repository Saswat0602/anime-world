'use client';

import React from 'react';
import { useAnimeDetailsQuery } from '@/redux/api/detailsApi';
import { AnimeDetailSkeleton } from '@/components/loaders';
import AnimeOverview from '@/components/DetailsComponent/AnimeOverview';
import type { Episode, Media } from '@/types/animeDetails';
import ErrorDisplay from '@/components/ui/error-display';
import AnimeHeroSection from '@/components/DetailsComponent/AnimeHeroSection';
import CharactersSection from '@/components/DetailsComponent/CharactersSection';
import StaffSection from '@/components/DetailsComponent/StaffSection';
import RelationsSection from '@/components/DetailsComponent/RelationsSection';
import RecommendationsSection from '@/components/DetailsComponent/RecommendationsSection';
import ReviewsSection from '@/components/DetailsComponent/ReviewsSection';
import StatsSection from '@/components/DetailsComponent/StatsSection';
import StreamingSection from '@/components/DetailsComponent/StreamingSection';

interface Props {
  id: string;
}

const AnimeDetailsClient = ({ id }: Props) => {
  const { data, isLoading, error } = useAnimeDetailsQuery(id);
  const animeData: Media | undefined = data;

  if (isLoading) return <AnimeDetailSkeleton />;
  if (error || !animeData) return <ErrorDisplay message="Failed to load anime details" />;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <AnimeHeroSection anime={animeData} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AnimeOverview anime={animeData} />
          </div>
          <div className="lg:col-span-3">
            <div id="overview" className="mb-16">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 pb-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                  <h2 className="relative text-2xl lg:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Synopsis
                  </h2>
                </div>

                <div className="p-6 pt-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: animeData.description || '' }}
                  />
                </div>
              </div>
            </div>

            <CharactersSection characters={animeData.characters?.edges || []} />
            <StaffSection staff={animeData.staff?.edges || []} />
            <RelationsSection relations={animeData.relations?.edges || []} />
            <RecommendationsSection recommendations={animeData.recommendations?.nodes || []} />
            <ReviewsSection reviews={animeData.reviews?.nodes || []} />
            <StatsSection stats={animeData.stats} />
            <StreamingSection episodes={(animeData.streamingEpisodes ?? []) as Episode[]} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnimeDetailsClient;

'use client';

import React from 'react';
import { useAnimeDetailsQuery } from '@/redux/api/detailsApi';
import { AnimeDetailSkeleton } from '@/components/loaders';
import AnimeOverview from '@/components/DetailsComponent/AnimeOverview';
import CharactersSection from '@/components/DetailsComponent/CharactersSection';
import StaffSection from '@/components/DetailsComponent/StaffSection';
import RelationsSection from '@/components/DetailsComponent/RelationsSection';
import AnimeHeroSection from '@/components/DetailsComponent/AnimeHeroSection';
import ErrorDisplay from '@/components/ui/error-display';
import RecommendationsSection from '@/components/DetailsComponent/RecommendationsSection';
import ReviewsSection from '@/components/DetailsComponent/ReviewsSection';
import StatsSection from '@/components/DetailsComponent/StatsSection';
import StreamingSection from '@/components/DetailsComponent/StreamingSection';
import type { Episode, Media } from '@/types/animeDetails';

interface Props {
  params: {
    id: string;
  };
}

const AnimeDetailsPage = ({ params }: Props) => {
  const { data, isLoading, error } = useAnimeDetailsQuery(params.id);

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
            <div id="overview" className="mb-10">
              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: animeData.description || '' }}
              />
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

export default AnimeDetailsPage;

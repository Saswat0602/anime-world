'use client';

import React from 'react';
import { useAnimeDetailsQuery } from '@/redux/api/detailsApi';
import { Metadata } from 'next';
import Head from 'next/head';
import { SkeletonLoader } from '@/components/loaders';
import AnimeOverview from '@/components/DetailsComponent/AnimeOverview';
import CharactersSection from '@/components/DetailsComponent/CharactersSection';
import StaffSection from '@/components/DetailsComponent/StaffSection';
import RelationsSection from '@/components/DetailsComponent/RelationsSection';
import AnimeHeroSection from '@/components/DetailsComponent/AnimeHeroSection';
import ErrorDisplay from '@/components/ui/error-display';
import RecommendationsSection from '@/components/DetailsComponent/RecommendationsSection';
import ReviewsSection from '@/components/DetailsComponent/ReviewsSection';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// export async function generateMetadata({ params }: any): Promise<Metadata> {
//   const id = params.id;
//   // You would fetch this data server-side for SEO
//   const response = await fetch('https://graphql.anilist.co', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({
//       query: `
//         query ($id: Int) {
//           Media(id: $id, type: ANIME) {
//             title {
//               romaji
//               english
//               native
//             }
//             description(asHtml: false)
//             coverImage {
//               large
//             }
//           }
//         }
//       `,
//       variables: { id: parseInt(id) },
//     }),
//   });

//   const { data } = await response.json();
//   const anime = data?.Media;

//   return {
//     title: `${anime?.title?.english || anime?.title?.romaji} | Anime Details`,
//     description: anime?.description?.substring(0, 160).replace(/<[^>]*>/g, '') || 'Anime details page',
//     openGraph: {
//       images: [anime?.coverImage?.large || ''],
//       title: `${anime?.title?.english || anime?.title?.romaji} | Anime Details`,
//       description: anime?.description?.substring(0, 160).replace(/<[^>]*>/g, '') || 'Anime details page',
//       type: 'website',
//     },
//   };
// }

const AnimeDetailsPage = ({ params }: Props) => {
  const resolvedParams = React.use(params);
  const { data, isLoading, error } = useAnimeDetailsQuery(resolvedParams.id);
  const animeData:any = data?.data?.Media;

  if (isLoading) {
    return <SkeletonLoader variant="banner" />;
  }

  if (error || !animeData) {
    return <ErrorDisplay message="Failed to load anime details" />;
  }

  return (
    <>
      {/* <Head>
        <meta name="description" content={animeData.description?.substring(0, 160).replace(/<[^>]*>/g, '') || 'Anime details page'} />
        <meta property="og:title" content={`${animeData.title?.english || animeData.title?.romaji} | Anime Details`} />
        <meta property="og:description" content={animeData.description?.substring(0, 160).replace(/<[^>]*>/g, '') || 'Anime details page'} />
        <meta property="og:image" content={animeData.coverImage?.large || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TVSeries',
              name: animeData.title?.english || animeData.title?.romaji,
              description: animeData.description?.replace(/<[^>]*>/g, ''),
              image: animeData.coverImage?.large,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: animeData?.averageScore && animeData?.averageScore / 10,
                bestRating: '10',
                worstRating: '1',
                ratingCount: animeData.popularity,
              },
              genre: animeData.genres,
              datePublished: animeData.startDate?.year 
                ? `${animeData.startDate.year}-${animeData.startDate.month?.toString().padStart(2, '0')}-${animeData.startDate.day?.toString().padStart(2, '0')}`
                : undefined,
            }),
          }}
        />
      </Head> */}

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <AnimeHeroSection anime={animeData} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AnimeOverview anime={animeData} />
            </div>
            
            <div className="lg:col-span-3">
              <div id="overview" className="mb-10">
                <div className="prose prose-lg max-w-none dark:prose-invert" 
                     dangerouslySetInnerHTML={{ __html: animeData.description || '' }} />
              </div>
              
              <CharactersSection characters={animeData.characters?.edges || []} />
              <StaffSection staff={animeData.staff?.edges || []} />
              <RelationsSection relations={animeData.relations?.edges || []} />
              <RecommendationsSection recommendations={animeData.recommendations?.nodes || []} />
              <ReviewsSection reviews={animeData.reviews?.nodes || []} />
              {/* <StatsSection stats={animeData.stats} />
              <StreamingSection episodes={animeData.streamingEpisodes || []} /> */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnimeDetailsPage;
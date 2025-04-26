import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { getAnimeDetails } from '@/lib/jikan';
import AnimeDetailsTabs from '@/components/anime-details/AnimeDetailsTabs';
import { AnimeDetailSkeleton } from '@/components/loaders';
import Link from 'next/link';

// Generate metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch anime details
  const resolvedParams = await params;
  const id = resolvedParams.id;
  let animeData = null;
  
  try {
    const response = await getAnimeDetails(id);
    if (response) {
      animeData = response.data;
    }
  } catch (error) {
    console.error('Error fetching anime data for metadata:', error);
  }

  // If we couldn't fetch the data, return default metadata
  if (!animeData) {
    return {
      title: 'Anime Not Found | Otaku.Realm',
      description: 'The requested anime could not be found.',
    };
  }

  // Get the previous metadata
  const previousImages = (await parent).openGraph?.images || [];
  const fallbackImage = '/og-image.jpg';

  // Generate SEO description from synopsis (truncate if too long)
  const description = animeData.synopsis 
    ? (animeData.synopsis.length > 160 
        ? animeData.synopsis.substring(0, 157) + '...' 
        : animeData.synopsis)
    : `Details about ${animeData.title} anime. Rating: ${animeData.score}/10. Status: ${animeData.status}. Episodes: ${animeData.episodes}.`;

  // Get image URL for OpenGraph
  let ogImageUrl = animeData.images?.jpg?.large_image_url || 
                  animeData.images?.jpg?.image_url || 
                  fallbackImage;
  
  // Try to get URL from previous images if available
  if (previousImages.length > 0 && typeof previousImages[0] === 'object') {
    const firstImage = previousImages[0];
    if ('url' in firstImage && typeof firstImage.url === 'string') {
      ogImageUrl = firstImage.url;
    }
  }

  // Generate metadata
  return {
    title: `${animeData.title} (${animeData.year || 'Anime'}) | Otaku.Realm`,
    description,
    alternates: {
      canonical: `/anime/${id}`,
    },
    keywords: [
      animeData.title,
      ...(animeData.title_english && animeData.title_english !== animeData.title ? [animeData.title_english] : []),
      ...(animeData.genres?.map(genre => genre.name) || []),
      'anime', 'otaku', 'watch anime'
    ].join(', '),
    openGraph: {
      title: `${animeData.title} (${animeData.year || 'Anime'}) | Otaku.Realm`,
      description,
      url: `https://otaku-realm.com/anime/${id}`,
      siteName: 'Otaku.Realm',
      images: [
        {
          url: ogImageUrl,
          width: 600,
          height: 900,
          alt: animeData.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${animeData.title} | Otaku.Realm`,
      description,
      images: [animeData.images?.jpg?.large_image_url || animeData.images?.jpg?.image_url || '/twitter-image.jpg'],
    },
  };
}

// This component will fetch the anime data and display a loading state
export default async function AnimeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const animeResponse = await getAnimeDetails(id);
    
    if (!animeResponse || !animeResponse.data) {
      return (
        <div className="container-custom py-16">
          <div className="mx-auto max-w-lg rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
            <svg 
              className="mx-auto h-12 w-12 text-red-500 dark:text-red-400 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Anime Not Found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">The anime details could not be found.</p>
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    const animeDetails = animeResponse.data;

    return (
      <div className="container-custom pb-16">
        <div className="mb-6">
          <Link 
            href="/"
            className="flex items-center text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <Suspense fallback={<AnimeDetailSkeleton />}>
          <AnimeDetailsTabs animeDetails={animeDetails} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error in AnimeDetailsPage:', error);
    return (
      <div className="container-custom py-16">
        <div className="mx-auto max-w-lg rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
          <svg 
            className="mx-auto h-12 w-12 text-red-500 dark:text-red-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Error Loading Anime</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">An error occurred while fetching anime details.</p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}
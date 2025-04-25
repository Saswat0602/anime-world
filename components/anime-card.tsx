"use client";

import { Anime, AnimeDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface AnimeCardProps {
  anime: Anime | AnimeDetails;
  index: number;
}

// Use memo to prevent unnecessary re-renders
export const AnimeCard = memo(function AnimeCard({ anime, index }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [, setImageError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Handle possible undefined image URLs
  const imageUrl = anime?.images?.jpg?.image_url || '/placeholder.jpg';
  
  // Format anime title - english if available, otherwise default title
  const englishTitle = anime?.title_english || anime?.title || 'Unknown Title';
  const originalTitle = anime?.title !== anime?.title_english ? anime?.title : null;

  // Get year for SEO
  const year = anime?.year || '';
  
  // Format genre names for SEO and accessibility
  const genres = 'genres' in anime ? anime.genres : undefined;
  const genreString = genres?.map(g => g.name).join(', ') || '';

  // Create anime URL for structured data
  const animeUrl = `/anime/${anime.mal_id}`;

  // Handle card click with immediate navigation
  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    router.push(animeUrl); // Navigate programmatically
  };

  // Only run client-side animations after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    // Prefetch the anime detail page to speed up navigation
    const prefetchDetail = async () => {
      try {
        // Only prefetch for the first 20 visible items to avoid excessive requests
        if (index < 20) {
          router.prefetch(animeUrl);
        }
      } catch (error) {
        console.error('Error prefetching anime detail:', error);
      }
    };
    
    prefetchDetail();
  }, [anime.mal_id, index, router, animeUrl]);

  // Avoid hydration mismatch by only rendering client-specific elements after mounting
  if (!isMounted) {
    return (
      <div className="anime-card h-[420px]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl" style={{ height: '280px' }}>
          <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </div>
        <div className="p-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  // Use a simpler animation for better performance
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }} // Cap the delay for better performance
      whileHover={{ y: -5 }}
      className="h-[420px]"
    >
      <Link 
        href={animeUrl}
        onClick={handleCardClick}
        className="anime-card group block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`View details for ${englishTitle}`}
        prefetch={true}
      >
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TVSeries',
              name: englishTitle,
              alternateName: originalTitle,
              image: imageUrl,
              url: `https://otaku-realm.com${animeUrl}`,
              ...(anime.score && { aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: anime.score,
                bestRating: '10',
                worstRating: '1',
                ratingCount: anime.scored_by || 0
              }}),
              ...(year && { datePublished: `${year}` }),
              ...(genreString && { genre: genreString.split(', ') }),
              numberOfEpisodes: anime.episodes,
              contentRating: anime.rating,
              status: anime.status
            })
          }}
        />

        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl" style={{ height: '280px' }}>
          <Image
            src={imageUrl}
            alt={anime.title || 'Anime'}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
            onError={() => setImageError(true)}
            priority={index < 5} // Only prioritize first 5 images
            loading={index < 10 ? "eager" : "lazy"} // Eager loading for first 10 items
          />
          {anime.score && (
            <div className="absolute top-2 right-2 z-10">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500/90 backdrop-blur-sm text-white font-bold shadow-lg">
                {anime.score.toFixed(1)}
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        <div className="p-4">
          <h2 className="line-clamp-2 font-bold text-slate-900 dark:text-white mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            {englishTitle}
          </h2>
          
          {originalTitle && (
            <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400 mb-2 italic">
              {originalTitle}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1.5 mt-2">
            {anime.type && (
              <span className="badge badge-primary">
                {anime.type}
              </span>
            )}
            {anime.episodes && (
              <span className="badge">
                {anime.episodes} eps
              </span>
            )}
            {anime.status && (
              <span className="badge badge-secondary">
                {anime.status}
              </span>
            )}
          </div>
          
          <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
            {anime.aired?.string || anime.season}
            {genreString && <span className="ml-1">• {genreString}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}); 
'use client';

import { Anime, AnimeDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle possible undefined image URLs
  const imageUrl = anime?.images?.jpg?.image_url || '/placeholder.jpg';
  
  // Format anime title
  const title = anime?.title || 'Unknown Title';

  // Get studios if available
  const animeAsDetails = anime as unknown as AnimeDetails;
  const studioName = animeAsDetails?.studios?.[0]?.name;
  const hasStudio = !!studioName;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/anime/${anime.mal_id}`}>
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-[3/4] w-full">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            />
            
            {/* Hover Info */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300 flex items-end">
              <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {anime.score && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                    {anime.score.toFixed(1)}
                  </div>
                )}
                <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {anime.type && (
                    <span className="text-xs bg-blue-600 px-1.5 py-0.5 rounded">{anime.type}</span>
                  )}
                  {anime.episodes && (
                    <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded">{anime.episodes} eps</span>
                  )}
                </div>
                
                {/* Additional info like air date */}
                {anime.aired && anime.aired.string && (
                  <div className="mt-1 text-xs text-gray-300">{anime.aired.string}</div>
                )}
                
                {/* Studios info if available */}
                {hasStudio && (
                  <div className="mt-1 text-xs text-gray-300">
                    {studioName}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {anime.type} {anime.status ? `• ${anime.status === 'Currently Airing' ? 'Airing' : anime.status}` : ''}
      </p>
    </motion.div>
  );
} 
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

  const imageUrl = anime?.images?.jpg?.large_image_url || '/placeholder.jpg';
  const title = anime?.title || 'Unknown Title';
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
          </div>
        </div>
      </Link>

      {/* Floating Hover Card */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-20 w-64 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg top-[-10px] left-1/2 transform -translate-x-1/2 translate-y-[-100%]"
        >
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-between mb-2">
              <span>Ep {anime.episodes || '-'} airing soon</span>
              {anime.score && (
                <span className="flex items-center gap-1 text-orange-500 font-bold">
                  {anime.score}%
                </span>
              )}
            </div>
            {hasStudio && (
              <div className="font-semibold text-gray-900 dark:text-white">
                {studioName}
              </div>
            )}
            <div className="text-xs mb-2 text-gray-500">{anime.type} • {anime.status}</div>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {(animeAsDetails?.genres || []).slice(0, 3).map((genre, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Title below */}
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {anime.type} {anime.status ? `• ${anime.status === 'Currently Airing' ? 'Airing' : anime.status}` : ''}
      </p>
    </motion.div>
  );
}

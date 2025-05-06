import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from "@/types/types";
import CardHover from "./CardHover";
import { motion } from "framer-motion";
import { ROUTES } from '@/routes';

interface AnimeCardProps {
  anime: Anime;
  index: number;
  onLoad?: () => void;
  showRank?: boolean;
}

export const AnimeCard = ({ anime, index, onLoad, showRank }: AnimeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = anime?.images?.jpg?.large_image_url || "/zoro.jpg";
  const title = anime?.title_english ? anime?.title_english : anime?.title || "Unknown Title";

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showRank && (
        <div className="absolute top-1 left-1 z-10">
          <div
            className="text-sm font-bold text-white px-3 py-2 rounded-full shadow-md"
            style={{ backgroundColor: anime.color || '#2563eb' }}
          >
            #{index + 1}
          </div>
        </div>
      )}

      <Link href={ROUTES.ANIME.DETAIL(anime.mal_id)}>
        <div className="overflow-hidden rounded-lg">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 40vw, (max-width: 1200px) 25vw, 12vw"
              priority={index < 6}
              onLoadingComplete={handleImageLoad}
              style={{
                transform: isHovered
                  ? `rotateX(${15}deg) rotateY(${15}deg)`
                  : "rotateX(0) rotateY(0)",
              }}
            />
          </div>
        </div>
      </Link>

      {isHovered && <CardHover anime={anime} />}

      <h3
        className="mt-2 text-sm font-medium line-clamp-2 transition-colors duration-300"
        style={{
          color: isHovered
            ? anime.color || '#2563eb'
            : 'var(--tw-text-opacity, 1) var(--tw-text-neutral-900, #111827)',
        }}
      >
        {title}
      </h3>
      <p
        className="text-xs transition-colors duration-300"
        style={{
          color: isHovered
            ? anime.color || '#2563eb'
            : 'var(--tw-text-opacity, 1) var(--tw-text-gray-500, #6b7280)',
        }}
      >
        {anime.type}{" "}
        {anime.status
          ? `• ${anime.status === "Currently Airing" ? "Airing" : anime.status}`
          : ""}
      </p>
    </motion.div>

  );
}



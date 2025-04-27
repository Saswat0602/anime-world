

import { Anime } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import CardHover from "./CardHover";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = anime?.images?.jpg?.large_image_url || "/placeholder.jpg";
  const title =anime?.title_english ?anime?.title_english: anime?.title || "Unknown Title";
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

      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {anime.type}{" "}
        {anime.status
          ? `• ${anime.status === "Currently Airing" ? "Airing" : anime.status}`
          : ""}
      </p>
    </motion.div>
  );
}

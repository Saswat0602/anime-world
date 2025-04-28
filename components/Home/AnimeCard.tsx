// AnimeCard.tsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Anime } from "@/types/types";

interface AnimeCardProps {
  anime: Anime;
  index: number;
  onLoad?: () => void; // Add this callback prop
}

export const AnimeCard = ({ anime, index, onLoad }: AnimeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            priority={index < 6}
            onLoadingComplete={handleImageLoad}
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{anime.title}</h3>
        </div>
      </div>
    </Link>
  );
};
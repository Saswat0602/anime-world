'use client';

import { AnimeDetails } from '@/lib/types';
import Image from 'next/image';

interface AnimeBannerProps {
  animeDetails: AnimeDetails;
}

const AnimeBanner = ({ animeDetails }: AnimeBannerProps) => {
  return (
    <div className="relative h-64 w-full sm:h-80 md:h-96">
      <Image
        src={animeDetails.images.jpg.large_image_url || animeDetails.images.jpg.image_url}
        alt={animeDetails.title}
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow-md">{animeDetails.title}</h1>
        {animeDetails.title_english && animeDetails.title_english !== animeDetails.title && (
          <p className="mt-1 text-lg text-white/80 drop-shadow-md">{animeDetails.title_english}</p>
        )}
        {animeDetails.title_japanese && (
          <p className="mt-1 text-sm text-white/70 drop-shadow-md">{animeDetails.title_japanese}</p>
        )}
      </div>
    </div>
  );
};

export default AnimeBanner;
'use client';

import { getAnimeDetails } from '@/lib/jikan';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AnimeDetails {
  data: {
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    synopsis: string;
    rating: string;
  };
}

export default function AnimeDetailsPage() {
  const { id } = useParams();
  const [animeDetails, setAnimeDetails] = useState<AnimeDetails | null>(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (id) {
        try {
          const data = await getAnimeDetails(id as string);
          if (data) {
            setAnimeDetails(data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (!animeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{animeDetails.data.title}</h1>
      <Image
        src={animeDetails.data.images.jpg.image_url}
        alt={animeDetails.data.title}
        width={200}
        height={300}
        className="w-full h-96 object-cover mb-4 rounded-md"
      />
      <p className="text-gray-700 mb-4">{animeDetails.data.synopsis}</p>
      <p className="text-gray-700">Rating: {animeDetails.data.rating}</p>
    </div >
  );
}
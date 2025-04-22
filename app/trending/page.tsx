'use client';

import { getTrendingAnime } from '@/lib/jikan';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export default function Trending() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      const data = await getTrendingAnime(page);
      if (data) {
        setTrendingAnime(data.data);
        setTotalPages(data.pagination.last_visible_page);
      }
    };

    fetchTrendingAnime();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Trending Anime</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingAnime.map((anime) => (
          <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id} className="border rounded-md p-4">
            <Image src={anime.images.jpg.image_url} alt={anime.title} width={200} height={300} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{anime.title}</h2>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
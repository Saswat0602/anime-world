import { AnimeCardSkeleton } from '@/components/loaders';

export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Upcoming Anime
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover anime that will be released soon
        </p>
      </header>
      
      <AnimeCardSkeleton count={24} />
    </div>
  );
} 
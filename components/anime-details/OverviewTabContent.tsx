'use client';

import { AnimeDetails } from '@/lib/types';
import { motion } from 'framer-motion';

interface OverviewTabContentProps {
  animeDetails: AnimeDetails;
}

const OverviewTabContent = ({ animeDetails }: OverviewTabContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Synopsis */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Synopsis</h2>
        <p className="whitespace-pre-line text-slate-700 dark:text-slate-300 leading-relaxed">
          {animeDetails.synopsis || 'No synopsis available.'}
        </p>
      </div>

      {/* Genres */}
      {animeDetails.genres && animeDetails.genres.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {animeDetails.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 dark:bg-slate-700 dark:text-slate-200"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Studios */}
      {animeDetails.studios && animeDetails.studios.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Studios</h2>
          <div className="flex flex-wrap gap-2">
            {animeDetails.studios.map((studio) => (
              <span
                key={studio.mal_id}
                className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
              >
                {studio.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OverviewTabContent;
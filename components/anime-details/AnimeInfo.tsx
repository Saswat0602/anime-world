'use client';

import { AnimeDetails } from '@/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimeInfoProps {
  animeDetails: AnimeDetails;
}

const AnimeInfo = ({ animeDetails }: AnimeInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="relative  overflow-hidden rounded-lg shadow-xl ">
        <div className="relative aspect-[3/4] w-56 mx-auto md:w-full max-w-[224px]">
          <Image
            src={animeDetails.images.jpg.large_image_url || animeDetails.images.jpg.image_url}
            alt={animeDetails.title}
            fill
            sizes="(max-width: 768px) 224px, 224px"
            priority
            className="object-cover"
          />
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 rounded-lg bg-slate-50 p-5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
      >
        {animeDetails.score && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Score</h3>
            <div className="flex items-center">
              <svg
                className="mr-1 h-4 w-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold text-slate-900 dark:text-white">{animeDetails.score.toFixed(2)}</span>
              {animeDetails.scored_by && (
                <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({animeDetails.scored_by.toLocaleString()} votes)</span>
              )}
            </div>
          </div>
        )}
        
        {animeDetails.rank && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Rank</h3>
            <p className="font-medium text-slate-900 dark:text-white">#{animeDetails.rank}</p>
          </div>
        )}
        
        {animeDetails.popularity && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Popularity</h3>
            <p className="font-medium text-slate-900 dark:text-white">#{animeDetails.popularity}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Type</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.type}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.status}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Episodes</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.episodes || 'Unknown'}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Duration</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.duration}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Rating</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.rating || 'Unknown'}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Season</h3>
          <p className="capitalize font-medium text-slate-900 dark:text-white">
            {animeDetails.season && animeDetails.year
              ? `${animeDetails.season} ${animeDetails.year}`
              : 'Unknown'}
          </p>
        </div>
        
        {animeDetails.broadcast && animeDetails.broadcast.string && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Broadcast</h3>
            <p className="font-medium text-slate-900 dark:text-white">{animeDetails.broadcast.string}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Source</h3>
          <p className="font-medium text-slate-900 dark:text-white">{animeDetails.source}</p>
        </div>
        
        {animeDetails.streaming && animeDetails.streaming.length > 0 && (
          <div className="pt-2">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Streaming on</h3>
            <div className="flex flex-wrap gap-2">
              {animeDetails.streaming.map((platform, index) => (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40 transition-colors"
                >
                  {platform.name}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-3 w-3">
                    <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnimeInfo;
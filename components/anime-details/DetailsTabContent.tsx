'use client';

import { AnimeDetails } from '@/lib/types';
import { motion } from 'framer-motion';

interface DetailsTabContentProps {
  animeDetails: AnimeDetails;
}

const DetailsTabContent = ({ animeDetails }: DetailsTabContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Additional information */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Aired</h2>
        <p className="text-slate-700 dark:text-slate-300">{animeDetails.aired?.string || 'Unknown'}</p>
      </div>

      {/* Relations section */}
      {animeDetails.relations && animeDetails.relations.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Relations</h2>
          <div className="space-y-4">
            {animeDetails.relations.map((relation, relationIndex) => (
              <div key={relationIndex}>
                <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-2">{relation.relation}</h3>
                <div className="flex flex-wrap gap-2">
                  {relation.entry.map((entry) => (
                    <div 
                      key={entry.mal_id}
                      className="flex flex-col justify-between border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-800 max-w-[210px] w-full"
                    >
                      <div>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            entry.type === 'anime' ? 'bg-sky-500' : 'bg-emerald-500'
                          }`}></span>
                          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">{entry.type}</span>
                        </div>
                        <h4 className="mt-1 font-medium text-slate-900 dark:text-white line-clamp-2">{entry.name}</h4>
                      </div>
                      <a 
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-xs font-medium text-sky-600 dark:text-sky-400"
                      >
                        View details
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="ml-1 h-3 w-3">
                          <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Themes */}
      {animeDetails.themes && animeDetails.themes.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Themes</h2>
          <div className="flex flex-wrap gap-2">
            {animeDetails.themes.map((theme) => (
              <span
                key={theme.mal_id}
                className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
              >
                {theme.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Demographics */}
      {animeDetails.demographics && animeDetails.demographics.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Demographics</h2>
          <div className="flex flex-wrap gap-2">
            {animeDetails.demographics.map((demographic) => (
              <span
                key={demographic.mal_id}
                className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
              >
                {demographic.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Producers */}
      {animeDetails.producers && animeDetails.producers.length > 0 && (
        <div>
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Producers</h2>
          <div className="flex flex-wrap gap-2">
            {animeDetails.producers.map((producer) => (
              <span
                key={producer.mal_id}
                className="rounded-full bg-fuchsia-100 px-3 py-1 text-sm font-medium text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300"
              >
                {producer.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DetailsTabContent;
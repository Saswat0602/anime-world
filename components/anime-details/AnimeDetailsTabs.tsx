'use client';

import { AnimeDetails } from '@/lib/types';
import { useState } from 'react';
import AnimeBanner from './AnimeBanner';
import AnimeInfo from './AnimeInfo';
import AnimeTabs from './AnimeTabs';
import OverviewTabContent from './OverviewTabContent';
import DetailsTabContent from './DetailsTabContent';
import ReviewsTabContent from './ReviewsTabContent';

interface AnimeDetailsTabsProps {
  animeDetails: AnimeDetails;
}

const AnimeDetailsTabs = ({ animeDetails }: AnimeDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'reviews'>('overview');

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
      <AnimeBanner animeDetails={animeDetails} />

      <AnimeTabs setActiveTab={setActiveTab} activeTab={activeTab} />

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-8">
        <AnimeInfo animeDetails={animeDetails} />

        <div className="md:col-span-2">
          {activeTab === 'overview' && (
            <OverviewTabContent animeDetails={animeDetails} />
          )}

          {activeTab === 'details' && (
            <DetailsTabContent animeDetails={animeDetails} />
          )}

          {activeTab === 'reviews' && (
            <ReviewsTabContent />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailsTabs;
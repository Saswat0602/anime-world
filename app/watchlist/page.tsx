'use client';

import { sampleAnime } from "@/data/sampleWatchlist";
import { useState } from "react";
import {  Eye, CheckCircle, Bookmark } from 'lucide-react';
import WatchListCard from "@/components/watchList/WatchListCard";
import TabNavigation from "@/components/watchList/TabNavigation";
import SectionHeaderWatchList from "@/components/watchList/SectionHeaderWatchList";

type TabType = 'watching' | 'completed' | 'planToWatch';

const WatchlistPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('watching');

  const renderContent = () => {
    switch (activeTab) {
      case 'watching':
        return (
          <div>
            <SectionHeaderWatchList title="Currently Watching" count={sampleAnime.watching.length} icon={Eye} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleAnime.watching.map((anime) => (
                <WatchListCard key={anime.id} anime={anime} type="watching" />
              ))}
            </div>
          </div>
        );
      case 'completed':
        return (
          <div>
            <SectionHeaderWatchList title="Completed" count={sampleAnime.completed.length} icon={CheckCircle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleAnime.completed.map((anime) => (
                <WatchListCard key={anime.id} anime={anime} type="completed" />
              ))}
            </div>
          </div>
        );
      case 'planToWatch':
        return (
          <div>
            <SectionHeaderWatchList title="Plan to Watch" count={sampleAnime.planToWatch.length} icon={Bookmark} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleAnime.planToWatch.map((anime) => (
                <WatchListCard key={anime.id} anime={anime} type="planToWatch" />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-14">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Watchlist</h1>
          <p className="text-gray-600 dark:text-gray-400">Some Of My WatchList</p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default WatchlistPage;
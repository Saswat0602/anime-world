import React from 'react';
import { Eye, CheckCircle, Bookmark } from 'lucide-react';
import { sampleAnime } from '@/data/sampleWatchlist';

type TabType = 'watching' | 'completed' | 'planToWatch';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'watching' as TabType, label: 'Currently Watching', icon: Eye, count: sampleAnime.watching.length },
    { id: 'completed' as TabType, label: 'Completed', icon: CheckCircle, count: sampleAnime.completed.length },
    { id: 'planToWatch' as TabType, label: 'Plan to Watch', icon: Bookmark, count: sampleAnime.planToWatch.length }
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation; 
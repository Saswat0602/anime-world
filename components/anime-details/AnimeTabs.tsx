'use client';

import React from 'react';

interface AnimeTabsProps {
  setActiveTab: (tab: 'overview' | 'details' | 'reviews') => void;
  activeTab: 'overview' | 'details' | 'reviews';
}

const AnimeTabs = ({ setActiveTab, activeTab }: AnimeTabsProps) => {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <div className="flex justify-center px-6">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'overview'
                ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'details'
                ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'reviews'
                ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Reviews
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AnimeTabs;
import React from 'react';

export function AnimeCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-lg">
        <div className="relative aspect-[3/4] w-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="mt-2 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
} 
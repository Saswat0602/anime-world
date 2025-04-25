import React from "react";

interface SkeletonProps {
  variant: "card" | "detail" | "banner" | "text";
  count?: number;
  className?: string;
}

export function SkeletonLoader({ variant, count = 1, className = "" }: SkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className="animate-pulse h-[420px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl" style={{ height: "280px" }}>
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700"></div>
            </div>
            <div className="p-4">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        );
      
      case "detail":
        return (
          <div className="animate-pulse space-y-8 w-full">
            {/* Banner with image and title */}
            <div className="relative w-full h-64 md:h-80 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            
            {/* Info section */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-48 h-64 bg-slate-200 dark:bg-slate-700 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
              <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-10 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            
            {/* Content */}
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        );
      
      case "banner":
        return (
          <div className="animate-pulse w-full h-40 md:h-64 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
        );
      
      case "text":
        return (
          <div className="animate-pulse space-y-2 w-full">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
          </div>
        );
    }
  };

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

export function AnimeCardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonLoader key={index} variant="card" />
      ))}
    </div>
  );
}

export function AnimeDetailSkeleton() {
  return <SkeletonLoader variant="detail" />;
} 
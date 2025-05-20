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
          <div className="animate-pulse space-y-4 w-full">
            {/* Banner image - full width hero image */}
            <div className="relative w-full h-64 bg-slate-200 dark:bg-slate-700 rounded-none"></div>
            
            {/* Main content area with dark background */}
            <div className="bg-slate-800 min-h-screen pb-8">
              {/* Title section with poster and info */}
              <div className="flex flex-col md:flex-row px-4 md:px-6 -mt-16">
                {/* Poster image - square for anime */}
                <div className="w-40 h-56 bg-slate-200 dark:bg-slate-700 rounded border-4 border-slate-800 flex-shrink-0"></div>
                
                {/* Title and basic info */}
                <div className="flex-1 ml-0 md:ml-6 mt-4 md:mt-0 space-y-3">
                  <div className="h-8 bg-slate-700 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-700 rounded w-1/2"></div>
                  
                  {/* Genre tags */}
                  <div className="flex flex-wrap gap-2 py-2">
                    <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
                    <div className="h-8 w-24 bg-slate-700 rounded-full"></div>
                    <div className="h-8 w-16 bg-slate-700 rounded-full"></div>
                    <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2">
                    <div className="h-10 w-32 bg-slate-700 rounded"></div>
                    <div className="h-10 w-10 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Rating section */}
              <div className="flex items-center gap-2 px-4 md:px-6 mt-6">
                <div className="h-6 w-6 bg-slate-700 rounded"></div>
                <div className="h-6 w-16 bg-slate-700 rounded"></div>
                <div className="h-6 w-32 bg-slate-700 rounded"></div>
              </div>
              
              {/* Status info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-6 mt-6">
                <div className="space-y-2">
                  <div className="h-5 bg-slate-700 rounded w-24"></div>
                  <div className="h-5 bg-slate-700 rounded w-32"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-slate-700 rounded w-28"></div>
                  <div className="h-5 bg-slate-700 rounded w-40"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-slate-700 rounded w-20"></div>
                  <div className="h-5 bg-slate-700 rounded w-16"></div>
                </div>
              </div>
              
              {/* Description paragraphs */}
              <div className="px-4 md:px-6 mt-8 space-y-3">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-4/5"></div>
              </div>
              
              {/* Episode list section */}
              <div className="px-4 md:px-6 mt-8">
                <div className="h-6 bg-slate-700 rounded w-40 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-slate-700 rounded w-full"></div>
                  <div className="h-12 bg-slate-700 rounded w-full"></div>
                  <div className="h-12 bg-slate-700 rounded w-full"></div>
                </div>
              </div>
            </div>
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
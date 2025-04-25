import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Loading</span>
        </div>
      </div>
    </div>
  );
} 
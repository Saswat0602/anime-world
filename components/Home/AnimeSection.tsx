import React from "react";
import { Anime } from "@/lib/types";
import { AnimeCardSkeleton } from "@/components/loaders";
import { ErrorMessage } from "@/components/ui/error-message";
import { SectionHeader } from "@/components/ui/section-header";
import { Pagination } from "@/components/pagination";
import { AnimeGrid } from "./anime-grid";

export interface AnimeData {
  data: Anime[];
  pagination?: {
    last_visible_page: number;
  };
}

export interface AnimeSectionProps {
  title: string;
  icon: React.ReactNode;
  data: AnimeData | null;  
  isLoading: boolean;
  error: string | null;  
  currentPage?: number;
  onPageChange?: (page: number) => void;
  viewAllLink?: string;
  sliceCount?: number;
  emptyMessage?: string;
}

export function AnimeSection({
  title,
  icon,
  data,
  isLoading,
  error,
  currentPage,
  onPageChange,
  viewAllLink,
  sliceCount,
  emptyMessage
}: AnimeSectionProps) {
  const animeList = data?.data ? (sliceCount ? data.data.slice(0, sliceCount) : data.data) : [];
  const customEmptyMessage = emptyMessage || "No anime data found";
  
  return (
    <section className="mb-16">
      <SectionHeader 
        title={title} 
        icon={icon} 
        viewAllLink={viewAllLink} 
      />

      {isLoading ? <AnimeCardSkeleton count={10} /> :
       error ? <ErrorMessage message={error} /> :
       !animeList.length ? (
         <div className="py-20 text-center">
           <p className="text-xl text-slate-500 dark:text-slate-400">{customEmptyMessage}</p>
         </div>
       ) : (
         <>
           <AnimeGrid animeList={animeList} />
           
           {data?.pagination && data.pagination.last_visible_page > 1 && onPageChange && (
             <div className="mt-12">
               <Pagination
                 currentPage={currentPage || 1}
                 totalPages={data.pagination.last_visible_page}
                 onPageChange={onPageChange}
               />
             </div>
           )}
         </>
       )}
    </section>
  );
}
import React from "react";
import { Anime } from "@/lib/types";
import { AnimeCard } from "../anime-card";

interface AnimeGridProps {
  animeList: Anime[];
}

export function AnimeGrid({ animeList }: AnimeGridProps) {
  if (!animeList || animeList.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-slate-500 dark:text-slate-400">
          No anime data found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {animeList.map((anime: Anime, index: number) => (
        <AnimeCard 
          key={anime.mal_id} 
          anime={anime} 
          index={index}
        />
      ))}
    </div>
  );
} 
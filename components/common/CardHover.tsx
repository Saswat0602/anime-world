import React from "react";
import { motion } from "framer-motion";
import { Anime } from "@/types/types";

interface CardHoverProps {
  anime: Anime;
}

const CardHover: React.FC<CardHoverProps> = ({ anime }) => {


  const getEmoji = (score: number) => {
    if (score >= 80) return "🙂";
    if (score >= 50) return "😐";
    return "😞";
  };
  const formatTimeUntil = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) {
      return `${days}d${hours > 0 ? ` ${hours}h` : ""}`;
    }
    return `${hours}h ${minutes}m`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 w-72 p-4 top-[-10px] left-1/2 transform -translate-x-1/2 translate-y-[-100%]
        rounded-2xl shadow-md bg-white dark:bg-gray-800 backdrop-blur-md border border-gray-200 dark:border-gray-700
        transition-all duration-300"
    >
      <div className="text-base text-gray-800 dark:text-gray-100 font-medium">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 dark:text-gray-400 font-semibold">
            {anime.nextAiringEpisode
              ? `Ep ${anime.nextAiringEpisode.episode} airing in ${formatTimeUntil(anime.nextAiringEpisode.timeUntilAiring)}`
              : "No upcoming episode"}
          </span>

          {anime.score !== undefined && (
            <span
              className={`flex items-center gap-1 font-bold ${anime.score >= 80
                ? "text-green-500"
                : anime.score >= 50
                  ? "text-orange-400"
                  : "text-red-500"
                }`}
            >
              {getEmoji(anime.score)}
              {anime.score}%
            </span>
          )}
        </div>

        {anime.studios && anime.studios.length > 0 && (
          <div
            className="font-semibold truncate text-lg"
            style={{ color: anime.color || "#2563eb" }}
          >
            {anime.studios.map((studio) => studio.name).join(", ")}
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
          {anime.type} • {anime.status}
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {(anime.genres || []).slice(0, 3).map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-sm font-semibold rounded-full"
              style={{
                color: anime.color || "#2563eb",
                backgroundColor: anime.color
                  ? anime.color + "22"
                  : "#bfdbfe",
              }}
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CardHover;

import React from "react";
import { motion } from "framer-motion";
import { Anime } from "@/lib/types";

interface CardHoverProps {
  anime: Anime;
}

const CardHover: React.FC<CardHoverProps> = ({ anime }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 w-64 p-4 top-[-10px] left-1/2 transform -translate-x-1/2 translate-y-[-100%]
        rounded-2xl shadow-lg bg-gradient-to-br from-white/80 to-white/30 dark:from-gray-800/80 dark:to-gray-700/30
        backdrop-blur-md border border-white/30 dark:border-gray-500/30
        hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300"
    >
      <div className="text-sm text-gray-800 dark:text-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span>Ep {anime.episodes || "-"}</span>
          {anime.score && (
            <span
              className={`flex items-center gap-1 font-bold ${
                anime.score * 10 >= 80
                  ? "text-green-500"
                  : anime.score * 10 >= 50
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {anime.score * 10 >= 80
                ? "😄"
                : anime.score * 10 >= 50
                ? "😐"
                : "😢"}
              {Math.round(anime.score * 10)}%
            </span>
          )}
        </div>

        {/* {anime.studios?.[0]?.name && (
          <div className="font-semibold">{anime.studios[0].name}</div>
        )} */}
        <div className="text-xs mb-2 text-gray-600 dark:text-gray-400">
          {anime.type} • {anime.status}
        </div>

        {/* Genre tags */}
        {/* <div className="flex flex-wrap gap-2 mt-2">
          {(anime?.genres || []).slice(0, 3).map((genre, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div> */}
      </div>
    </motion.div>
  );
};

export default CardHover;

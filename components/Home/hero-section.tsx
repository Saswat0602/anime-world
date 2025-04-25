import React from "react";
import { motion } from "framer-motion";
import { SearchBar } from "./search-bar";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="mb-16">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Discover Amazing Anime
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore thousands of anime titles, stay updated with the latest releases, 
          and find your next favorite series.
        </p>
      </motion.div>

      <SearchBar onSearch={onSearch} />
    </section>
  );
} 
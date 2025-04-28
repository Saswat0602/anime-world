import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/Home/search-bar";
import { ROUTES } from "@/routes";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative mb-16 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-8 md:p-16 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-slate-100/10 dark:from-slate-900 dark:to-slate-900/10 z-0 transition-colors"></div>

      <div className="absolute right-0 top-0 h-full w-1/2 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/heroImage.webp"
            alt="Anime characters"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center right' }}
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Otaku.<span className="text-blue-500">Realm</span>
          </h1>
        </div>

        <div className="mb-6">
          <SearchBar onSearch={onSearch} placeholder="Search anime..." />
        </div>

        {/* Top search items */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-2">Top search:</div>
          <div className="flex flex-wrap gap-2 text-sm text-slate-700 dark:text-slate-300 transition-colors">
            <span>One Piece,</span>
            <span>The Apothecary Diaries,</span>
            <span>Wind Breaker Season 2,</span>
            <span>Fire Force Season 3,</span>
            <span>Attack on Titan,</span>
            <span>Solo Leveling Season 2,</span>
            <span>Overlord: The Sacred Kingdom,</span>
            <span>KonoSuba: God&apos;s Blessing,</span>
            <span>The Super Cube,</span>
            <span>Please Put Them On, Takamine-san</span>
          </div>
        </div>

        {/* Read manga button */}
        <Link href={ROUTES.HOME}
          className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
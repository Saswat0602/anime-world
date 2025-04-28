"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';
import { ROUTES } from "@/routes";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Trending", path: ROUTES.ANIME.TRENDING },
    { name: "Upcoming", path: ROUTES.ANIME.UPCOMING },
    { name: "Seasonal", path: ROUTES.ANIME.SEASONAL },
    { name: "Top 100", path: ROUTES.ANIME.TOP_100 },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105">
            <Image
              src="/zoro2.png"
              alt="Otaku Realm Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />

            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Otaku.Realm
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out ${pathname === link.path
                  ? "text-sky-700 dark:text-sky-300"
                  : "text-slate-700 hover:scale-105 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute inset-x-0 -bottom-1 h-0.5 bg-sky-500 dark:bg-sky-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="md:hidden rounded-full p-2 text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 active:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:active:bg-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with fade animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-white dark:bg-slate-900 md:hidden"
          >
            <div className="border-t border-slate-200 dark:border-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition-transform duration-200 ${pathname === link.path
                    ? "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300"
                    : "text-slate-700 hover:scale-105 hover:bg-slate-100 active:scale-95 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ROUTES } from "@/routes";
import { Menu, X } from "lucide-react";
import { setSearchQuery } from '@/redux/features/searchSlice';
import { useDispatch } from "react-redux";


export function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Trending", path: ROUTES.ANIME.TRENDING },
    { name: "Upcoming", path: ROUTES.ANIME.UPCOMING },
    { name: "Seasonal", path: ROUTES.ANIME.SEASONAL },
    { name: "Top 100", path: ROUTES.ANIME.TOP_100 },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed w-full top-0 z-50 transition-all duration-500 border-b-2 border-gray-400 dark:border-gray-800 ${isScrolled
          ? 'bg-white/60 dark:bg-slate-950/60 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-md '
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}

      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => {
                dispatch(setSearchQuery(""));
              }}
              className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/zoro2.png"
                alt="Otaku Realm Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Otaku<span className="text-blue-600 dark:text-blue-400">.</span>Realm
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => dispatch(setSearchQuery(""))}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${pathname === link.path
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                >
                  {pathname === link.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200/50 dark:border-blue-800/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Theme + Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        dispatch(setSearchQuery(""));
                      }}
                      className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${pathname === link.path
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>

  );
}

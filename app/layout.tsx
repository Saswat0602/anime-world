"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider, useTheme } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <div className="container mx-auto py-8">
            <nav className="flex items-center justify-between mb-8">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/">New Releases</Link>
                </li>
                <li>
                  <Link href="/trending">Trending</Link>
                </li>
                <li>
                  <Link href="/upcoming">Upcoming</Link>
                </li>
              </ul>
              <ThemeToggle />
            </nav>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-10 h-10 p-3 rounded-full focus:outline-none"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
        >
          <path
            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.591a.75.75 0 001.06 1.061l1.591-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l1.591-1.591a.75.75 0 00-1.061-1.06l-1.591 1.59zM12 18a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H11.25a.75.75 0 01.75.75zM6.166 17.834a.75.75 0 001.06 1.06l1.591-1.591a.75.75 0 00-1.061-1.06l-1.591 1.591zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM6.166 6.166a.75.75 0 00-1.06-1.06L3.515 5.105a.75.75 0 001.061 1.06l1.591-1.591z"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
          <path d="M12 9a3 3 0 100-6 3 3 0 000 6zM12 12a6 6 0 110-12 6 6 0 010 12zM18 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM6 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM19.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM4.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM13.5 4.5a1.5 1.5 0 10-3 0 1.5 1.5 0 013 0zM13.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 013 0z" />
        </svg>
      )}
    </button>
  );
}

'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/theme-provider';
import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function Providers({ children }: { children: React.ReactNode }) {
  // Handle client-side only date to avoid hydration mismatch

  
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="anime-world-theme">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-6">
            {children}
          </main>
          <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <div className="container mx-auto">
              <p>© {'2025'} Otaku.Realm. Powered by .--------------</p>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </Provider>
  );
} 
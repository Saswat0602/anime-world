'use client';

import React from 'react';
import { ThemeProvider } from '@/lib/theme-provider';
import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Footer from '@/components/Footer';

export function Providers({ children }: { children: React.ReactNode }) {


  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="anime-world-theme">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 px-4 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  );
} 
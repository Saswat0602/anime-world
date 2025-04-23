'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/lib/theme-provider';
// import { Navbar } from './components/navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  // Handle client-side only date to avoid hydration mismatch
  const [currentYear, setCurrentYear] = useState('');
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);
  
  return (
    <ThemeProvider defaultTheme="system" storageKey="anime-world-theme">
      <div className="flex min-h-screen flex-col">
      currentYear
      </div>
    </ThemeProvider>
  );
} 





'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Add other global states here as needed
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <GlobalContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
} 
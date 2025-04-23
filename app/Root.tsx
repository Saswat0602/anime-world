'use client';

import './globals.css';
import { useEffect, useState } from 'react';

export default function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  // Handle client-side initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      {children}
    </div>
  );
}
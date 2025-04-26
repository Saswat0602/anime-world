// components/LottieAnimation.tsx
'use client'; // This marks it as a Client Component

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Now it's safe to use dynamic with ssr: false in a client component
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottieAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Fetch the JSON file when component mounts
    fetch('/404.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => {
        console.error('Error loading animation:', error);
      });
  }, []);

  if (!animationData) {
    return null; // Show nothing while loading
  }

  return (
    <Lottie 
      animationData={animationData}
      loop={true}
      autoplay={true}
    />
  );
}

'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onLoaded: () => void;
  loadingDuration?: number;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ onLoaded, loadingDuration = 2500 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, loadingDuration - 500); // Start fade-out 500ms before full duration

    const loadedTimer = setTimeout(() => {
      onLoaded();
    }, loadingDuration);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(loadedTimer);
    };
  }, [onLoaded, loadingDuration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <Image
        src="/images/local-logo.jpeg"
        alt="Local Cafe Logo"
        width={150}
        height={150}
        className="rounded-full mb-8 animate-pulse"
        priority // Ensures logo loads quickly for LCP
      />
      <h1 className="font-headline text-4xl text-primary mb-2">Welcome to</h1>
      <h2 className="font-headline text-5xl text-accent">Local Cafe</h2>
    </div>
  );
};

export default LoadingScreen;

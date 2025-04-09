'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    // Si le chemin a changé, c'est une transition de page
    if (prevPathRef.current !== pathname && containerRef.current) {
      import('animejs').then((animeModule) => {
        // @ts-ignore
        const anime = animeModule.default || animeModule;
        
        // Animation de sortie puis d'entrée
        anime.timeline({
          targets: containerRef.current,
        })
        .add({
          opacity: [1, 0],
          translateY: [0, -20],
          duration: 300,
          easing: 'easeInOutQuad',
        })
        .add({
          opacity: [0, 1], 
          translateY: [20, 0],
          duration: 500,
          easing: 'easeOutExpo',
        });

        prevPathRef.current = pathname;
      });
    }
  }, [pathname]);

  return (
    <div 
      ref={containerRef} 
      className={`transition-opacity ${className}`}
    >
      {children}
    </div>
  );
}
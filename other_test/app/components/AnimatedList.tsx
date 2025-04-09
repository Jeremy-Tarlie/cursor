'use client';

import { useEffect, useRef } from 'react';

interface AnimatedListProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'bounce' | 'pulse' | 'flip' | 'rotate' | 'scale' | 'shake';
  delay?: number;
  duration?: number;
  className?: string;
  staggerDelay?: number;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: string;
  loop?: boolean | number;
}

export default function AnimatedList({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  className = '',
  staggerDelay = 100,
  direction = 'normal',
  easing = 'easeOutExpo',
  loop = false,
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current) return;

    // Sélectionner tous les enfants directs
    const children = listRef.current.children;
    if (!children.length) return;

    // Créer un tableau de cibles pour l'animation
    const targets = Array.from(children);

    // Import dynamique d'Anime.js
    import('animejs').then((animeModule) => {
      // @ts-ignore
      const anime = animeModule.default || animeModule;
      
      // Configuration de base de l'animation
      const baseConfig = {
        targets,
        opacity: [0, 1],
        translateY: [20, 0],
        duration,
        delay: anime.stagger(staggerDelay, { start: delay }),
        easing,
        direction,
        loop,
      };

      // Configuration spécifique selon le type d'animation
      let animationConfig: any = { ...baseConfig };

      switch (animation) {
        case 'slideIn':
          animationConfig = {
            ...baseConfig,
            translateX: [-50, 0],
          };
          break;
        case 'bounce':
          animationConfig = {
            ...baseConfig,
            scale: [0.3, 1.05, 1],
          };
          break;
        case 'pulse':
          animationConfig = {
            ...baseConfig,
            scale: [1, 1.05, 1],
          };
          break;
        case 'flip':
          animationConfig = {
            ...baseConfig,
            rotateY: [90, 0],
          };
          break;
        case 'rotate':
          animationConfig = {
            ...baseConfig,
            rotate: [0, 360],
            scale: [0.8, 1],
          };
          break;
        case 'scale':
          animationConfig = {
            ...baseConfig,
            scale: [0, 1],
          };
          break;
        case 'shake':
          animationConfig = {
            ...baseConfig,
            translateX: [0, -10, 10, -10, 10, 0],
          };
          break;
      }

      anime(animationConfig);
    });
  }, [animation, delay, duration, staggerDelay, direction, easing, loop]);

  return (
    <div ref={listRef} className={className}>
      {children}
    </div>
  );
} 
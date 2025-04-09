'use client';

import { useEffect, useRef } from 'react';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideIn' | 'bounce' | 'pulse' | 'flip' | 'rotate' | 'scale' | 'shake' | 'custom';
  delay?: number;
  duration?: number;
  className?: string;
  customAnimation?: any;
  loop?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate';
  easing?: string;
  stagger?: number;
  staggerChildren?: string;
}

const predefinedAnimations: Record<string, any> = {
  fadeIn: {
    opacity: [0, 1],
    translateY: [20, 0],
  },
  slideIn: {
    translateX: [-50, 0],
    opacity: [0, 1],
  },
  bounce: {
    scale: [0.3, 1.05, 1],
    opacity: [0, 1],
  },
  pulse: {
    scale: [1, 1.05, 1],
  },
  flip: {
    rotateY: [90, 0],
    opacity: [0, 1],
  },
  rotate: {
    rotate: [0, 360],
    scale: [0.8, 1],
    opacity: [0, 1],
  },
  scale: {
    scale: [0, 1],
    opacity: [0, 1],
  },
  shake: {
    translateX: [0, -10, 10, -10, 10, 0],
  },
  custom: {},
};

export default function AnimatedElement({
  children,
  animation,
  delay = 0,
  duration = 800,
  className = '',
  customAnimation,
  loop = false,
  direction = 'normal',
  easing = 'easeOutExpo',
  stagger = 0,
  staggerChildren,
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animationConfig = customAnimation || {
      targets: elementRef.current,
      ...predefinedAnimations[animation],
      duration,
      delay,
      easing,
      direction,
      loop,
    };

    // Ajouter le stagger si nécessaire
    if (stagger > 0) {
      animationConfig.stagger = stagger;
    }

    // Ajouter le staggerChildren si nécessaire
    if (staggerChildren) {
      animationConfig.staggerChildren = staggerChildren;
    }

    // Import dynamique d'Anime.js
    import('animejs').then((animeModule) => {
      // @ts-ignore
      const anime = animeModule.default || animeModule;
      anime(animationConfig);
    });
  }, [animation, delay, duration, customAnimation, loop, direction, easing, stagger, staggerChildren]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
} 
'use client';

import { useState, useRef, useEffect } from 'react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export default function AnimatedButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Effet pour l'animation au survol
  useEffect(() => {
    if (!buttonRef.current) return;

    const animate = async () => {
      // @ts-ignore
      const animejs = await import('animejs');
      
      if (isHovered) {
        // @ts-ignore
        animejs.default({
          targets: buttonRef.current,
          scale: 1.05,
          duration: 200,
          easing: 'easeOutElastic(1, .5)',
        });
      } else {
        // @ts-ignore
        animejs.default({
          targets: buttonRef.current,
          scale: 1,
          duration: 200,
          easing: 'easeOutQuad',
        });
      }
    };

    animate();
  }, [isHovered]);

  // Effet pour l'animation au clic
  useEffect(() => {
    if (!buttonRef.current) return;

    const animate = async () => {
      // @ts-ignore
      const animejs = await import('animejs');
      
      if (isPressed) {
        // @ts-ignore
        animejs.default({
          targets: buttonRef.current,
          scale: 0.95,
          duration: 100,
          easing: 'easeOutQuad',
        });
      } else {
        // @ts-ignore
        animejs.default({
          targets: buttonRef.current,
          scale: isHovered ? 1.05 : 1,
          duration: 200,
          easing: 'easeOutElastic(1, .5)',
        });
      }
    };

    animate();
  }, [isPressed, isHovered]);

  // Classes de base pour le bouton
  const baseClasses = 'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Classes de variante
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
  };
  
  // Classes de taille
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Classes de largeur
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Classes d'état désactivé
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Classes combinées
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`;

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => !disabled && !loading && setIsHovered(false)}
      onMouseDown={() => !disabled && !loading && setIsPressed(true)}
      onMouseUp={() => !disabled && !loading && setIsPressed(false)}
      onTouchStart={() => !disabled && !loading && setIsPressed(true)}
      onTouchEnd={() => !disabled && !loading && setIsPressed(false)}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement...
        </div>
      ) : children}
    </button>
  );
} 
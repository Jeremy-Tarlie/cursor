import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'px-4 py-2 rounded-md font-medium transition-colors',
          variant === 'default' && 'bg-primary-500 text-white hover:bg-primary-600',
          variant === 'outline' && 'border border-primary-500 text-primary-500 hover:bg-primary-50',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button'; 
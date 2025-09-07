'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, disabled, ...props }, ref) => {
    const baseClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium",
      "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:pointer-events-none disabled:opacity-50 active:scale-95",
      "relative overflow-hidden group"
    );

    const variantClasses = {
      default: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-500 hover:to-indigo-500",
      secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600",
      outline: "border-2 border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
      destructive: "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-500 hover:to-red-400"
    };

    const sizeClasses = {
      default: "h-10 px-6 py-2",
      sm: "h-8 px-4 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        disabled={disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
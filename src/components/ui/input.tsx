'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            className={cn(
              "flex h-12 w-full rounded-lg border bg-white/50 dark:bg-gray-900/50",
              "px-4 py-3 text-sm transition-all duration-200",
              "border-gray-200 dark:border-gray-700",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:scale-[1.01]",
              "dark:focus:border-blue-400 dark:focus:ring-blue-400/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "backdrop-blur-sm",
              icon && iconPosition === 'left' && "pl-10",
              icon && iconPosition === 'right' && "pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            onFocus={() => {}}
            onBlur={() => {}}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <div className="animate-slide-down">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
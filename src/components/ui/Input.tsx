import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightElement,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full h-12 px-4 rounded-xl border-2 bg-white text-gray-900 text-sm font-medium',
            'transition-all duration-200 outline-none',
            'placeholder:text-gray-400 placeholder:font-normal',
            'focus:border-[#005BAC] focus:ring-2 focus:ring-blue-100',
            error
              ? 'border-[#EF4444] focus:border-[#EF4444] focus:ring-red-100'
              : 'border-gray-200 hover:border-gray-300',
            leftIcon && 'pl-10',
            rightElement && 'pr-24',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#EF4444] flex items-center gap-1">
          <span className="material-icons-round text-sm">error_outline</span>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const variantClasses = {
  primary: 'bg-[#005BAC] text-white hover:bg-[#004d94] active:bg-[#003d78] shadow-lg shadow-blue-200',
  secondary: 'bg-[#F58220] text-white hover:bg-[#e07318] active:bg-[#c96510] shadow-lg shadow-orange-200',
  outline: 'bg-white text-[#005BAC] border-2 border-[#005BAC] hover:bg-blue-50',
  ghost: 'bg-transparent text-[#005BAC] hover:bg-blue-50',
  danger: 'bg-[#EF4444] text-white hover:bg-red-600 shadow-lg shadow-red-200',
  success: 'bg-[#22C55E] text-white hover:bg-green-600 shadow-lg shadow-green-200',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm h-9',
  md: 'px-6 py-3 text-sm h-11',
  lg: 'px-8 py-3.5 text-base h-12',
  xl: 'px-8 py-4 text-lg h-14',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 select-none cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </span>
      )}
      <span className={cn('flex items-center gap-2', loading && 'invisible')}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  );
}

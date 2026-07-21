import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  animate?: boolean;
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'card-shadow',
  lg: 'card-shadow-lg',
};

export default function Card({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  onClick,
  animate = false,
}: CardProps) {
  const classes = cn(
    'bg-white rounded-2xl',
    paddingClasses[padding],
    shadowClasses[shadow],
    onClick && 'cursor-pointer',
    className
  );

  if (animate || onClick) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
}

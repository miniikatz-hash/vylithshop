'use client';

import { useRef } from 'react';
import { useMagneticEffect } from '@/components/hooks/useMagneticEffect';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagneticEffect(ref);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative ${className}`}
    >
      {children}
    </button>
  );
}

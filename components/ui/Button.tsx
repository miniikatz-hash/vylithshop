'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useMagneticEffect } from '@/components/hooks/useMagneticEffect';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  useMagneticEffect(ref as React.RefObject<HTMLElement>);

  const baseStyles = 'relative inline-flex items-center justify-center px-8 py-4 font-sans text-sm font-medium tracking-wider uppercase transition-all duration-300 overflow-hidden';

  const variants = {
    primary: 'bg-vylith-purple text-vylith-white hover:bg-vylith-purple-glow glow-purple',
    secondary: 'border border-vylith-gold text-vylith-gold hover:bg-vylith-gold hover:text-vylith-black',
    ghost: 'text-vylith-white/70 hover:text-vylith-white',
  };

  const combined = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={combined}>
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
    >
      {children}
    </button>
  );
}

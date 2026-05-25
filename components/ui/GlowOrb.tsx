'use client';

export function GlowOrb({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] opacity-30 animate-breathe pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%)',
      }}
    />
  );
}

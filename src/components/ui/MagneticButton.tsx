import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';

type MagneticButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'light' | 'outline';
  className?: string;
};

const variants = {
  light: {
    button: 'bg-bone text-ink hover:bg-white',
    icon: 'bg-ink text-bone'
  },
  outline: {
    button: 'border border-bone/25 bg-ink/10 text-bone backdrop-blur-md hover:border-bone/60',
    icon: 'bg-bone/10 text-bone'
  }
};

export function MagneticButton({ children, onClick, variant = 'light', className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => v * 0.35);
  const ty = useTransform(sy, (v) => v * 0.35);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const style = variants[variant];

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.97 }}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex h-14 items-center gap-4 rounded-full pl-7 pr-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${style.button} ${className}`}>
      
      <motion.span style={{ x: tx, y: ty }} className="whitespace-nowrap">
        {children}
      </motion.span>
      <span className={`grid h-10 w-10 place-items-center rounded-full ${style.icon}`}>
        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:rotate-45" aria-hidden="true" />
      </span>
    </motion.button>);

}
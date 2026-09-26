import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ClipImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/** Scroll-linked clip-path reveal with an inner parallax + settle zoom. */
export function ClipImage({ src, alt, className = '' }: ClipImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const clipPath = useTransform(enter, (v) => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const scale = useTransform(enter, [0, 1], [1.3, 1.08]);
  const y = useTransform(pass, [0, 1], ['-6%', '6%']);

  return (
    <motion.div ref={ref} style={{ clipPath }} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform" />
      
    </motion.div>);

}
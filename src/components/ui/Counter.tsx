import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type CounterProps = {
  to: number;
  suffix?: string;
};

/** Counts up as it scrolls into view — tied to scroll, not a timer. */
export function Counter({ to, suffix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.55'] });
  const value = useTransform(scrollYProgress, [0, 1], [0, to]);
  const rounded = useTransform(value, (v) => Math.round(v).toString());

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${to}${suffix}`}>
      <motion.span aria-hidden="true">{rounded}</motion.span>
      <span aria-hidden="true">{suffix}</span>
    </span>);

}
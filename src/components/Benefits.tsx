import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { benefits } from '../data/benefits';

export function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="bg-bone py-28 text-ink md:py-40">
      <div className="shell">
        <div className="flex flex-col justify-between gap-4 border-b border-ink/15 pb-6 md:flex-row md:items-end">
          <h2 id="benefits-title" className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/60">
            Why AIIVA
          </h2>
          <p className="max-w-md text-base text-ink/65">What changes when your home becomes intelligent.</p>
        </div>

        <ul className="mt-6">
          {benefits.map((b, i) =>
          <BenefitRow key={b.word} word={b.word} description={b.description} index={i} />
          )}
        </ul>
      </div>
    </section>);

}

type BenefitRowProps = {
  word: string;
  description: string;
  index: number;
};

function BenefitRow({ word, description, index }: BenefitRowProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.4'] });
  const clipPath = useTransform(scrollYProgress, (v) => `inset(0% ${(1 - v) * 100}% 0% 0%)`);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? '-4%' : '4%', '0%']);
  const descOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const descY = useTransform(scrollYProgress, [0.6, 1], [12, 0]);

  return (
    <li ref={ref} className="border-b border-ink/10 py-6 md:py-8">
      <motion.div style={{ x }} className="relative">
        <p aria-hidden="true" className="text-outline font-display text-[9.2vw] font-medium uppercase leading-[0.9] tracking-[-0.045em] md:text-[8.4vw]">
          {word}
        </p>
        <motion.p
          style={{ clipPath }}
          className="absolute inset-0 font-display text-[9.2vw] font-medium uppercase leading-[0.9] tracking-[-0.045em] text-ink md:text-[8.4vw]">
          
          {word}
        </motion.p>
      </motion.div>
      <motion.p style={{ opacity: descOpacity, y: descY }} className="mt-4 max-w-sm text-sm leading-relaxed text-ink/65 md:ml-auto md:text-base">
        {description}
      </motion.p>
    </li>);

}
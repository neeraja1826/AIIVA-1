import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ease } from '../../utils/motion';

type SplitTextProps = {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  accentClassName?: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
  amount?: number;
};

const wordVariants: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.3, ease } }
};

/**
 * Word-by-word mask reveal. Wrap words in underscores (e.g. `_Smarter_`)
 * to render them in the italic serif accent style.
 */
export function SplitText({
  text,
  as = 'h2',
  className = '',
  accentClassName = 'font-serif italic font-normal',
  delay = 0,
  stagger = 0.05,
  onMount = false,
  amount = 0.4
}: SplitTextProps) {
  const lines = text.split('\n');
  const plain = text.replace(/_/g, '').replace(/\n/g, ' ');
  const Comp = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p }[as] as typeof motion.h2;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } }
  };

  const trigger = onMount ?
  { animate: 'visible' } :
  { whileInView: 'visible', viewport: { once: true, amount } };

  return (
    <Comp aria-label={plain} className={className} variants={container} initial="hidden" {...trigger}>
      {lines.map((line, li) =>
      <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi, arr) => {
          let core = word;
          let rest = '';
          let accent = false;
          if (word.startsWith('_')) {
            const end = word.lastIndexOf('_');
            if (end > 0) {
              accent = true;
              core = word.slice(1, end);
              rest = word.slice(end + 1);
            }
          }
          return (
            <React.Fragment key={wi}>
                <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span variants={wordVariants} className="inline-block will-change-transform">
                    {accent ? <span className={`${accentClassName} pr-[0.05em]`}>{core}</span> : core}
                    {rest}
                  </motion.span>
                </span>
                {wi < arr.length - 1 ? ' ' : ''}
              </React.Fragment>);

        })}
        </span>
      )}
    </Comp>);

}
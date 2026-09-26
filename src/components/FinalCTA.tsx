import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { MagneticButton } from './ui/MagneticButton';
import { images } from '../data/images';
import { scrollToId } from '../utils/scroll';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.02]);

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative flex min-h-[720px] items-end overflow-hidden bg-ink py-20 text-bone md:h-[110vh] md:py-28">
      <motion.img
        src={images.cta}
        alt=""
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover will-change-transform" />
      
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />

      <div className="shell relative grid gap-10 md:grid-cols-12 md:items-end">
        <div id="cta-title" className="md:col-span-8">
          <SplitText
            text={'Imagine Your Home.\n_Then_ Automate It.'}
            className="font-display text-[12vw] font-medium leading-[0.94] tracking-[-0.04em] md:text-[6.4vw]"
            accentClassName="font-serif italic font-normal text-champagne"
            stagger={0.07} />
          
        </div>
        <Reveal className="md:col-span-4 md:pb-3" delay={0.2}>
          <p className="max-w-sm text-base leading-relaxed text-bone/75 md:text-lg">
            Transform everyday living with intelligent automation designed around you.
          </p>
          <MagneticButton className="mt-8" onClick={() => scrollToId('contact')}>
            Start Your Smart Home
          </MagneticButton>
        </Reveal>
      </div>
    </section>);

}
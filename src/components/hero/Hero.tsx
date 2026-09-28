import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroNodes } from './HeroNodes';
import { SplitText } from '../ui/SplitText';
import { MagneticButton } from '../ui/MagneticButton';
import { images } from '../../data/images';
import { companyDetails } from '../../data/company';
import { scrollToId } from '../../utils/scroll';
import { ease } from '../../utils/motion';
import { Shield, Sparkles, Zap, MessageSquare } from 'lucide-react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.24]);
  const textY = useTransform(scrollYProgress, [0, 0.55], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.45], [1, 0]);
  const lines = useTransform(scrollYProgress, [0.06, 0.62], [0, 1]);
  const veil = useTransform(scrollYProgress, [0.74, 1], [0, 1]);

  return (
    <section ref={ref} id="home" aria-label="AIIVA Automation" className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
          <motion.img
            src={images.hero}
            alt="AIIVA Smart Automation Villa in Hyderabad with automated lighting, curtains and climate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/65 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />

        <HeroNodes progress={lines} />

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-x-0 bottom-0 pb-12 md:pb-16"
        >
          <div className="shell grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-bone/20 bg-ink/60 px-4 py-1.5 backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5 text-volt" />
                <span className="text-xs font-semibold tracking-wider text-bone">
                  {companyDetails.tagline} • HYDERABAD
                </span>
              </motion.div>

              <SplitText
                as="h1"
                onMount
                delay={0.2}
                stagger={0.07}
                text={'Smart Living.\n_Affordable_ Technology.'}
                className="font-display text-[13.5vw] font-medium leading-[0.92] tracking-[-0.04em] text-bone md:text-[7.2vw]"
                accentClassName="font-serif italic font-normal text-champagne tracking-[-0.01em]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.75 }}
              className="md:col-span-4 md:pb-4"
            >
              <p className="max-w-sm text-base leading-relaxed text-bone/80 md:text-lg">
                Hyderabad's trusted home & building automation specialist. Simple, reliable, and value-for-money automation for homes, apartments, villas, and commercial spaces.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton onClick={() => scrollToId('products')}>
                  Explore Products
                </MagneticButton>
                <a
                  href={companyDetails.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/20 bg-ink/40 px-5 text-sm font-medium text-bone backdrop-blur-sm transition-all duration-200 hover:border-volt hover:text-volt"
                >
                  <MessageSquare className="h-4 w-4 text-volt" />
                  <span>WhatsApp 9000006000</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:right-12 md:flex"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-bone/50 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="relative block h-16 w-px overflow-hidden bg-bone/15">
            <span className="scroll-cue absolute inset-0 bg-bone/70" />
          </span>
        </motion.div>

        <motion.div style={{ opacity: veil }} className="pointer-events-none absolute inset-0 bg-bone" />
      </div>
    </section>
  );
}
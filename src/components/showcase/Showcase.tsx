import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ChapterMark } from '../ui/ChapterMark';
import { zones } from '../../data/zones';
import { scrollToY } from '../../utils/scroll';
import { ease } from '../../utils/motion';

const COUNT = zones.length;

export function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT + 0.25)));
    setActive((p) => p === idx ? p : idx);
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const target = i === 0 ? 0 : (i - 0.05) / COUNT + 0.02;
    scrollToY(top + target * distance);
  };

  const zone = zones[active];

  return (
    <section ref={ref} id="showcase" aria-label="Smart home showcase" className="relative bg-ink text-bone" style={{ height: `${COUNT * 100 + 50}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {zones.map((z, i) =>
        <ZoneImage key={z.name} src={z.image} alt={`${z.name} with automated lighting and climate`} index={i} progress={scrollYProgress} />
        )}

        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ink/80 via-ink/20 to-transparent md:w-2/3" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />

        {/* Hotspots */}
        <div className="absolute inset-0" aria-live="polite">
          <AnimatePresence>
            {zone.features.map((f, j) =>
            <motion.div
              key={`${zone.name}-${f.label}`}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease, delay: 0.12 + j * 0.06 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
              className="absolute hidden sm:block">
              
                <div className="flex -translate-x-[6px] -translate-y-1/2 items-center gap-3">
                  <span className="relative block h-3 w-3 shrink-0">
                    <span className="node-pulse absolute inset-0 rounded-full bg-volt" />
                    <span className="absolute inset-0 rounded-full border-2 border-volt bg-ink" />
                  </span>
                  <span className="glass flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-bone">{f.label}</span>
                    <span className="text-xs text-bone/65">{f.value}</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Header */}
        <div className="shell absolute inset-x-0 top-28 md:top-32">
          <ChapterMark numeral="III" label="Automation" className="text-bone/70" />
          <p className="mt-4 max-w-xs text-sm text-bone/60">Every room with its own intelligence. Scroll through the residence.</p>
        </div>

        {/* Zone copy */}
        <div className="shell absolute inset-x-0 bottom-12 md:bottom-16">
          <div className="flex items-end justify-between gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease }}
                className="max-w-2xl">
                
                <p className="text-sm tabular-nums text-bone/55">
                  {String(active + 1).padStart(2, '0')} <span className="text-bone/30">/ {String(COUNT).padStart(2, '0')}</span>
                </p>
                <h3 className="mt-3 font-display text-[15vw] font-medium leading-[0.9] tracking-[-0.045em] md:text-[7vw]">{zone.name}</h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-bone/75">{zone.description}</p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:hidden">
                  {zone.features.map((f) =>
                  <li key={f.label} className="text-[11px] uppercase tracking-[0.18em] text-volt">
                      {f.label}
                    </li>
                  )}
                </ul>
              </motion.div>
            </AnimatePresence>

            <nav aria-label="Rooms" className="hidden shrink-0 md:block">
              <ul className="space-y-1">
                {zones.map((z, i) =>
                <li key={z.name}>
                    <button
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-current={i === active ? 'true' : undefined}
                    className="group flex items-center gap-4 py-1.5 text-right focus-visible:outline-none">
                    
                      <span
                      className={`h-px bg-bone transition-[width,opacity] duration-300 ease-out-expo ${
                      i === active ? 'w-10 opacity-100' : 'w-4 opacity-30 group-hover:opacity-60'}`
                      } />
                    
                      <span
                      className={`text-sm transition-colors duration-200 ${
                      i === active ? 'text-bone' : 'text-bone/45 group-hover:text-bone/80 group-focus-visible:text-bone'}`
                      }>
                      
                        {z.name}
                      </span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>);

}

type ZoneImageProps = {
  src: string;
  alt: string;
  index: number;
  progress: MotionValue<number>;
};

function ZoneImage({ src, alt, index, progress }: ZoneImageProps) {
  const start = (index - 0.45) / COUNT;
  const end = (index - 0.05) / COUNT;
  const reveal = useTransform(progress, [start, end], [index === 0 ? 1 : 0, 1]);
  const clipPath = useTransform(reveal, (v) => `inset(${(1 - v) * 100}% 0% 0% 0%)`);
  const scale = useTransform(progress, [start, (index + 1) / COUNT], [1.2, 1]);

  return (
    <motion.div style={{ clipPath }} className="absolute inset-0">
      <motion.img
        src={src}
        alt={alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        style={{ scale }}
        className="h-full w-full object-cover will-change-transform" />
      
    </motion.div>);

}
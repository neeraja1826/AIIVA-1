import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { journey } from '../data/journey';

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = v <= 0 ? -1 : Math.min(journey.length - 1, Math.floor(v * journey.length));
    setActive((p) => p === idx ? p : idx);
  });

  return (
    <section aria-labelledby="journey-title" className="bg-sand py-28 text-ink md:py-40">
      <div className="shell grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/60">Your journey</p>
            <div id="journey-title" className="mt-6">
              <SplitText
                text={'From first\nconversation to\nlifelong _support._'}
                className="font-display text-[11vw] font-medium leading-[0.98] tracking-[-0.04em] md:text-[4.2vw]"
                accentClassName="font-serif italic font-normal" />
              
            </div>
            <Reveal>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-ink/65">
                One dedicated team, from the first sketch to the day you move in — and every year after.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={ref} className="relative md:col-span-7">
          <span className="absolute bottom-0 left-[5px] top-0 w-px bg-ink/15" aria-hidden="true">
            <motion.span style={{ scaleY: scrollYProgress }} className="block h-full origin-top bg-ink" />
          </span>
          {journey.map((step, i) => {
            const on = i <= active;
            return (
              <li key={step.title} className="relative pb-14 pl-12 last:pb-0 md:pb-20 md:pl-16">
                <span
                  className={`absolute left-0 top-3 h-[11px] w-[11px] rounded-full border transition-colors duration-300 ease-out-expo ${
                  on ? 'border-ink bg-ink' : 'border-ink/30 bg-sand'}`
                  }
                  aria-hidden="true" />
                
                <div className="flex items-baseline justify-between gap-6">
                  <h3
                    className={`font-display text-3xl font-medium tracking-[-0.03em] transition-colors duration-300 md:text-5xl ${
                    on ? 'text-ink' : 'text-ink/35'}`
                    }>
                    
                    {step.title}
                  </h3>
                  <span className="shrink-0 text-xs tabular-nums text-ink/55">{step.timing}</span>
                </div>
                <p className={`mt-4 max-w-md text-base leading-relaxed transition-colors duration-300 ${on ? 'text-ink/70' : 'text-ink/40'}`}>
                  {step.body}
                </p>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}
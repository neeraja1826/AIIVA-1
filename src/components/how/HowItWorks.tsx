import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SystemDiagram } from './SystemDiagram';
import { ChapterMark } from '../ui/ChapterMark';
import { howSteps } from '../../data/howItWorks';
import { ease } from '../../utils/motion';

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const nextStep = v < 0.36 ? 0 : v < 0.66 ? 1 : 2;
    const nextStage = v < 0.13 ? 0 : v < 0.36 ? 1 : v < 0.8 ? 2 : 3;
    setStep((p) => p === nextStep ? p : nextStep);
    setStage((p) => p === nextStage ? p : nextStage);
  });

  return (
    <section ref={ref} id="how-it-works" className="relative h-[340vh] bg-ink text-bone">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="shell grid w-full items-center gap-8 pt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <ChapterMark numeral="II" label="Intelligence" className="text-bone/60" />
            <h2 className="mt-6 font-display text-4xl font-medium leading-[0.98] tracking-[-0.035em] md:text-6xl">
              How home automation <span className="font-serif font-normal italic text-champagne">works.</span>
            </h2>

            <ol className="mt-8 space-y-5 md:mt-14">
              {howSteps.map((s, i) =>
              <li key={s.number} className={`relative pt-5 ${i === step ? 'block' : 'hidden md:block'}`}>
                  <StepRule progress={scrollYProgress} index={i} />
                  <div className="flex items-baseline gap-5">
                    <span className="font-display text-sm tabular-nums text-volt">{s.number}</span>
                    <div>
                      <h3
                      className={`font-display text-2xl font-medium uppercase tracking-[-0.01em] transition-colors duration-300 ease-out-expo md:text-3xl ${
                      i === step ? 'text-bone' : 'text-bone/30'}`
                      }>
                      
                        {s.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {i === step &&
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden">
                        
                            <span className="block max-w-sm pt-3 text-base leading-relaxed text-bone/65">{s.body}</span>
                          </motion.p>
                      }
                      </AnimatePresence>
                    </div>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="md:col-span-7 lg:col-span-8 lg:pl-8">
            <SystemDiagram progress={scrollYProgress} stage={stage} />
          </div>
        </div>
      </div>
    </section>);

}

function StepRule({ progress, index }: {progress: MotionValue<number>;index: number;}) {
  const bounds = [
  [0, 0.36],
  [0.36, 0.66],
  [0.66, 0.95]][
  index];
  const scaleX = useTransform(progress, bounds, [0, 1]);
  return (
    <div className="absolute inset-x-0 top-0 h-px bg-bone/10" aria-hidden="true">
      <motion.div style={{ scaleX }} className="h-full origin-left bg-volt/70" />
    </div>);

}
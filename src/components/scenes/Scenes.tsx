import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ScenePanel } from './ScenePanel';
import { ChapterMark } from '../ui/ChapterMark';
import { SplitText } from '../ui/SplitText';
import { Reveal } from '../ui/Reveal';
import { scenes } from '../../data/scenes';

const COUNT = scenes.length;
const SLIDE = 0.6; // slide length relative to one hold
const TOTAL = COUNT + SLIDE * (COUNT - 1);

// Hold on each scene while its sequence plays, then glide to the next.
const input: number[] = [];
const output: number[] = [];
const holds: number[] = [];
let cursor = 0;
for (let i = 0; i < COUNT; i++) {
  holds.push(cursor / TOTAL);
  input.push(cursor / TOTAL);
  output.push(-i * 100 / COUNT);
  cursor += 1;
  input.push(cursor / TOTAL);
  output.push(-i * 100 / COUNT);
  if (i < COUNT - 1) cursor += SLIDE;
}

export function Scenes() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const xValue = useTransform(scrollYProgress, input, output);
  const x = useTransform(xValue, (v) => `${v}%`);
  const [done, setDone] = useState<number[]>(() => scenes.map(() => 0));
  const keyRef = useRef('');

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const hold = 1 / TOTAL;
    const next = scenes.map((scene, i) => {
      const frac = (v - holds[i]) / (hold * 0.85);
      return Math.max(0, Math.min(scene.steps.length, Math.floor(frac * (scene.steps.length + 1))));
    });
    const key = next.join(',');
    if (key !== keyRef.current) {
      keyRef.current = key;
      setDone(next);
    }
  });

  const activeScene = Math.max(0, done.findIndex((d, i) => d < scenes[i].steps.length));
  const current = done.every((d, i) => d === scenes[i].steps.length) ? COUNT - 1 : activeScene;

  return (
    <section aria-labelledby="scenes-title" className="bg-ink text-bone">
      <div className="shell grid gap-10 pb-16 pt-28 md:grid-cols-12 md:items-end md:pb-24 md:pt-40">
        <div className="md:col-span-8">
          <ChapterMark numeral="IV" label="Experience" className="text-bone/60" />
          <div id="scenes-title" className="mt-8">
            <SplitText
              text={'One Touch.\nAn Entire _Experience._'}
              className="font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] md:text-[6vw]"
              accentClassName="font-serif italic font-normal text-champagne" />
            
          </div>
        </div>
        <Reveal className="md:col-span-4 md:pb-3">
          <p className="max-w-sm text-base leading-relaxed text-bone/65">
            Scenes orchestrate dozens of devices in a single, choreographed moment — triggered by a touch, a voice, a time
            of day or simply you walking through the door.
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative" style={{ height: `${Math.round(TOTAL * 80 + 100)}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden border-t border-bone/10">
          <motion.div style={{ x, width: `${COUNT * 100}%` }} className="flex h-full will-change-transform">
            {scenes.map((scene, i) =>
            <ScenePanel key={scene.name} scene={scene} index={i} total={COUNT} done={done[i]} />
            )}
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 md:bottom-10">
            <div className="shell flex gap-3 md:justify-end">
              {scenes.map((scene, i) =>
              <div key={scene.name} className="w-full md:w-32">
                  <div className="h-px bg-bone/15">
                    <div
                    className="h-full origin-left bg-bone transition-transform duration-300 ease-out-expo"
                    style={{ transform: `scaleX(${done[i] / scene.steps.length})` }} />
                  
                  </div>
                  <p className={`mt-2 hidden text-[11px] transition-colors duration-200 md:block ${i === current ? 'text-bone' : 'text-bone/40'}`}>
                    {scene.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}
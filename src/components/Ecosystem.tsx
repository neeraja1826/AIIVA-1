import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { ecosystemNodes, ecosystemSpecs } from '../data/ecosystem';

const C = 300;
const R = 222;
const HUB_R = 76;

const nodes = ecosystemNodes.map((node, i) => {
  const a = (-90 + i * 60) * Math.PI / 180;
  const x = C + R * Math.cos(a);
  const y = C + R * Math.sin(a);
  const sx = C + HUB_R * Math.cos(a);
  const sy = C + HUB_R * Math.sin(a);
  const ex = C + (R - 10) * Math.cos(a);
  const ey = C + (R - 10) * Math.sin(a);
  const ma = a + 0.22;
  const mr = (HUB_R + R) / 2;
  const cx = C + mr * Math.cos(ma);
  const cy = C + mr * Math.sin(ma);
  return {
    ...node,
    x,
    y,
    d: `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
  };
});

export function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'center 0.5'] });

  return (
    <section id="technology" className="relative overflow-hidden bg-coal py-28 text-bone md:py-40">
      <div className="shell grid items-center gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-bone/55">The AIIVA Smart Ecosystem</p>
          <SplitText
            text={'One hub.\nEvery _system._'}
            className="mt-6 font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] md:text-[5vw]"
            accentClassName="font-serif italic font-normal text-champagne" />
          
          <Reveal>
            <p className="mt-8 max-w-md text-base leading-relaxed text-bone/65 md:text-lg">
              At the centre of every AIIVA home sits a single intelligent hub. It speaks every protocol, so lighting,
              security, climate and entertainment finally share one language — and one app.
            </p>
          </Reveal>
          <dl className="mt-12 divide-y divide-bone/10 border-y border-bone/10">
            {ecosystemSpecs.map((spec, i) =>
            <Reveal key={spec.title} delay={i * 0.06} y={12}>
                <div className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-bone">{spec.title}</dt>
                  <dd className="text-sm text-bone/55">{spec.body}</dd>
                </div>
              </Reveal>
            )}
          </dl>
        </div>

        <div className="md:col-span-7">
          <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[640px]">
            <div
              className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(111,216,242,0.16),transparent_65%)]"
              aria-hidden="true" />
            
            <motion.div
              className="absolute inset-[24%] rounded-full border border-dashed border-bone/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true" />
            
            <div className="absolute inset-[13%] rounded-full border border-bone/[0.06]" aria-hidden="true" />

            <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {nodes.map((n, i) =>
              <EcoPath key={n.label} d={n.d} index={i} progress={scrollYProgress} />
              )}
              {nodes.map((n, i) =>
              <g key={`p-${n.label}`}>
                  <circle r={2.5} fill="#6FD8F2">
                    <animateMotion dur="3.2s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={n.d} />
                  </circle>
                  <circle r={2} fill="#C9B58C">
                    <animateMotion
                    dur="3.8s"
                    begin={`${i * 0.3 + 1}s`}
                    repeatCount="indefinite"
                    path={n.d}
                    keyPoints="1;0"
                    keyTimes="0;1"
                    calcMode="linear" />
                  
                  </circle>
                </g>
              )}
            </svg>

            <div className="absolute left-1/2 top-1/2 grid aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-volt/40 bg-graphite/80 backdrop-blur-md">
              <div className="text-center">
                <p className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">AIIVA</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.24em] text-bone/60 md:text-[10px]">Smart Hub</p>
              </div>
            </div>

            {nodes.map((n, i) =>
            <EcoLabel key={n.label} label={n.label} stat={n.stat} x={n.x} y={n.y} index={i} progress={scrollYProgress} />
            )}
          </div>
        </div>
      </div>
    </section>);

}

function EcoPath({ d, index, progress }: {d: string;index: number;progress: MotionValue<number>;}) {
  const start = index * 0.08;
  const pathLength = useTransform(progress, [start, start + 0.5], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  return <motion.path d={d} fill="none" stroke="#6FD8F2" strokeOpacity={0.45} strokeWidth={1.2} style={{ pathLength, opacity }} />;
}

type EcoLabelProps = {
  label: string;
  stat: string;
  x: number;
  y: number;
  index: number;
  progress: MotionValue<number>;
};

function EcoLabel({ label, stat, x, y, index, progress }: EcoLabelProps) {
  const start = index * 0.08 + 0.35;
  const opacity = useTransform(progress, [start, start + 0.15], [0, 1]);
  const above = y < C;
  return (
    <motion.div
      style={{ left: `${x / 600 * 100}%`, top: `${y / 600 * 100}%`, opacity }}
      className={`absolute flex -translate-x-1/2 items-center gap-2 ${above ? '-translate-y-[calc(100%_-_6px)] flex-col-reverse' : '-translate-y-[6px] flex-col'}`}>
      
      <span className="block h-3 w-3 rounded-full border-2 border-volt bg-coal" />
      <span className="text-center">
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-bone md:text-[11px]">{label}</span>
        <span className="mt-0.5 block text-[10px] text-bone/50 md:text-xs">{stat}</span>
      </span>
    </motion.div>);

}
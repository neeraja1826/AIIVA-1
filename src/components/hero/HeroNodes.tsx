import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { heroHub, heroNodes } from '../../data/hero';
import { ease } from '../../utils/motion';

type HeroNodesProps = {
  progress: MotionValue<number>;
};

export function HeroNodes({ progress }: HeroNodesProps) {
  const hubOpacity = useTransform(progress, [0.55, 0.85], [0, 1]);
  const hubScale = useTransform(progress, [0.55, 0.85], [0.96, 1]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {heroNodes.map((node, i) =>
        <HeroLine
          key={node.label}
          index={i}
          progress={progress}
          d={`M ${node.x} ${node.y} Q ${(node.x + heroHub.x) / 2} ${node.y} ${heroHub.x} ${heroHub.y}`} />

        )}
      </svg>

      <div style={{ left: `${heroHub.x}%`, top: `${heroHub.y}%` }} className="absolute -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ opacity: hubOpacity, scale: hubScale }} className="glass grid h-16 w-16 place-items-center rounded-full border-volt/40">
          <span className="font-display text-sm font-semibold tracking-[-0.01em] text-bone">AIIVA</span>
        </motion.div>
      </div>

      {heroNodes.map((node, i) =>
      <div
        key={node.label}
        style={{ left: `${node.x}%`, top: `${node.y}%` }}
        className={`absolute -translate-y-1/2 ${node.align === 'left' ? '-translate-x-[calc(100%_-_5px)]' : '-translate-x-[5px]'}`}>
        
          <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease, delay: 0.9 + i * 0.08 }}
          className={`flex items-center gap-3 ${node.align === 'left' ? 'flex-row-reverse' : ''}`}>
          
            <span className="relative block h-2.5 w-2.5 shrink-0">
              <span className="node-pulse absolute inset-0 rounded-full bg-volt" />
              <span className="absolute inset-0 rounded-full bg-volt" />
            </span>
            <span className="glass hidden items-center gap-3 whitespace-nowrap rounded-full px-3.5 py-1.5 md:flex">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-bone">{node.label}</span>
              <span className="text-[11px] text-bone/60">{node.status}</span>
            </span>
          </motion.div>
        </div>
      )}
    </div>);

}

type HeroLineProps = {
  d: string;
  index: number;
  progress: MotionValue<number>;
};

function HeroLine({ d, index, progress }: HeroLineProps) {
  const start = index * 0.07;
  const pathLength = useTransform(progress, [start, start + 0.55], [0, 1]);
  const opacity = useTransform(progress, [start, start + 0.02], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#6FD8F2"
      strokeOpacity={0.7}
      strokeWidth={0.12}
      strokeLinecap="round"
      style={{ pathLength, opacity }} />);


}
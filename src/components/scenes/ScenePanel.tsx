import React from 'react';
import { motion } from 'framer-motion';
import { ease } from '../../utils/motion';

type Scene = {
  name: string;
  trigger: string;
  image: string;
  dim: number[];
  steps: {label: string;detail: string;}[];
};

type ScenePanelProps = {
  scene: Scene;
  index: number;
  total: number;
  done: number;
};

export function ScenePanel({ scene, index, total, done }: ScenePanelProps) {
  const pressed = done > 0;

  return (
    <article className="relative flex h-full shrink-0 flex-col md:flex-row" style={{ width: `${100 / total}%` }} aria-label={scene.name}>
      <div className="relative h-[42%] overflow-hidden md:h-full md:w-[58%]">
        <img src={scene.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <motion.div
          className="absolute inset-0 bg-ink"
          initial={false}
          animate={{ opacity: scene.dim[Math.min(done, scene.dim.length - 1)] }}
          transition={{ duration: 0.3, ease }} />
        
        <div className="absolute left-6 top-24 md:left-12 md:top-32">
          <div className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-5">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full border transition-colors duration-300 ease-out-expo ${
              pressed ? 'border-volt bg-volt' : 'border-bone/30'}`
              }>
              
              <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${pressed ? 'bg-ink' : 'bg-bone/50'}`} />
            </span>
            <span className="text-sm text-bone">{scene.name}</span>
            <span className="text-xs text-bone/50">{pressed ? 'Running' : 'One touch'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-8 md:px-14 lg:px-20">
        <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">
          Scene {index + 1} of {total} · {scene.trigger}
        </p>
        <h3 className="mt-4 font-display text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-bone md:text-[4.6vw]">{scene.name}</h3>

        <ol className="mt-8 md:mt-12">
          {scene.steps.map((step, j) => {
            const on = j < done;
            const last = j === scene.steps.length - 1;
            return (
              <li key={step.label} className="relative flex gap-5 pb-6 md:pb-8">
                {!last &&
                <span className="absolute left-[5px] top-4 h-[calc(100%-0.5rem)] w-px bg-bone/15" aria-hidden="true">
                    <span
                    className="block h-full origin-top bg-volt transition-transform duration-300 ease-out-expo"
                    style={{ transform: `scaleY(${j < done - 1 ? 1 : 0})` }} />
                  
                  </span>
                }
                <span
                  className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border transition-colors duration-300 ease-out-expo ${
                  on ? 'border-volt bg-volt' : 'border-bone/35 bg-ink'}`
                  }
                  aria-hidden="true" />
                
                <div>
                  <p className={`font-display text-2xl tracking-[-0.02em] transition-colors duration-300 md:text-3xl ${on ? 'text-bone' : 'text-bone/30'}`}>
                    {step.label}
                  </p>
                  <p className={`mt-1 text-sm transition-colors duration-300 ${on ? 'text-bone/60' : 'text-bone/25'}`}>{step.detail}</p>
                </div>
              </li>);

          })}
        </ol>
      </div>
    </article>);

}
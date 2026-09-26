import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { automations } from '../data/automations';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/motion';

// Editorial layout: spans chosen so the grid reads as a composed spread, not a uniform wall.
const spans = [
'md:col-span-7 md:row-span-2',
'md:col-span-5',
'md:col-span-5',
'md:col-span-4 md:row-span-2',
'md:col-span-4',
'md:col-span-4',
'md:col-span-8',
'md:col-span-5',
'md:col-span-7 md:row-span-2',
'md:col-span-5'];


export function AutomateGrid() {
  return (
    <section id="solutions" className="bg-bone py-28 text-ink md:py-40">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <SplitText
            text={'What can\nAIIVA _automate?_'}
            className="font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] md:col-span-8 md:text-[5.6vw]"
            accentClassName="font-serif italic font-normal" />
          
          <Reveal className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-base leading-relaxed text-ink/65">
              Ten systems, designed and installed as one. Choose a single room to start, or the entire residence.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-flow-dense gap-3 md:mt-24 md:auto-rows-[300px] md:grid-cols-12 lg:auto-rows-[340px]">
          {automations.map((item, i) =>
          <motion.a
            key={item.title}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('contact');
            }}
            aria-label={`${item.title} — enquire`}
            initial={{ opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease, delay: i % 3 * 0.06 }}
            className={`group relative block h-[420px] overflow-hidden rounded-sm bg-graphite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt focus-visible:ring-offset-2 focus-visible:ring-offset-bone md:h-auto ${spans[i]}`}>
            
              <img
              src={item.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out-expo group-hover:scale-[1.06] group-focus-visible:scale-[1.06]" />
            
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent opacity-70 transition-opacity duration-300 ease-out-expo group-hover:opacity-100 group-focus-visible:opacity-100" />

              <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-bone/0 text-bone opacity-0 transition-[opacity,background-color] duration-200 ease-out-expo group-hover:bg-bone/15 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="transition-transform duration-300 ease-out-expo md:translate-y-12 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-bone md:text-3xl">{item.title}</h3>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-bone/60">{item.tag}</span>
                  </div>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80 transition-opacity duration-300 ease-out-expo md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          )}
        </div>
      </div>
    </section>);

}
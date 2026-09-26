import React from 'react';
import { ChapterMark } from './ui/ChapterMark';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { ClipImage } from './ui/ClipImage';
import { Counter } from './ui/Counter';
import { images } from '../data/images';
import { introStats } from '../data/intro';

export function Intro() {
  return (
    <section id="intro" className="bg-bone py-28 text-ink md:py-40">
      <div className="shell">
        <ChapterMark numeral="I" label="Home" className="text-ink/60" />

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <SplitText
              text={'A home that\nresponds to _you._'}
              className="font-display text-[13vw] font-medium leading-[0.95] tracking-[-0.04em] md:text-[6.2vw]"
              accentClassName="font-serif italic font-normal text-ink/80" />
            

            <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-10">
              <Reveal>
                <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                  Home automation connects the systems you already live with — lights, climate, curtains, locks,
                  cameras and music — so they work together instead of apart.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-base leading-relaxed text-ink/60">
                  Instead of a wall of switches and a dozen apps, your home learns your rhythms. It warms the bedroom
                  before you wake, lights the path when you arrive and quietly secures itself when you leave.
                </p>
              </Reveal>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-6 md:mt-24 md:gap-10">
              {introStats.map((stat) =>
              <div key={stat.label} className="border-t border-ink/15 pt-5">
                  <dd className="font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 text-xs leading-snug text-ink/60 md:text-sm">{stat.label}</dt>
                </div>
              )}
            </dl>
          </div>

          <figure className="md:col-span-5 md:mt-40">
            <ClipImage
              src={images.intro}
              alt="Minimal concrete and walnut hallway washed in warm, automated evening light"
              className="aspect-[3/4] w-full rounded-sm" />
            
            <figcaption className="mt-4 flex justify-between text-xs text-ink/55">
              <span>Residence K. — hallway</span>
              <span>Warm-dim scene · 18:40</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>);

}
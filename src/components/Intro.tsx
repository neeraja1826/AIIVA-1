import React from 'react';
import { ChapterMark } from './ui/ChapterMark';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { ClipImage } from './ui/ClipImage';
import { Counter } from './ui/Counter';
import { images } from '../data/images';
import { introStats } from '../data/intro';
import { companyDetails } from '../data/company';
import { CheckCircle2, UserCheck, Sparkles, Building2, Home } from 'lucide-react';

export function Intro() {
  return (
    <section id="intro" className="bg-bone py-28 text-ink md:py-40">
      <div className="shell">
        <ChapterMark numeral="I" label="About AIIVA" className="text-ink/60" />

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-sand/60 px-3.5 py-1 text-xs font-semibold tracking-wider text-ink">
              <Building2 className="h-3.5 w-3.5" />
              <span>HYDERABAD • HOME & BUILDING AUTOMATION</span>
            </div>

            <SplitText
              text={'Making Smart Living\nAccessible to _Everyone._'}
              className="font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] md:text-[5.6vw]"
              accentClassName="font-serif italic font-normal text-ink/80"
            />

            <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
              <Reveal>
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    AIIVA Automation Pvt. Ltd.
                  </h3>
                  <p className="text-base leading-relaxed text-ink/80 md:text-lg">
                    {companyDetails.shortIntro}
                  </p>
                  <p className="text-sm leading-relaxed text-ink/65">
                    {companyDetails.fullProfile}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="rounded-xl border border-ink/10 bg-sand/40 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Our Core Focus</p>
                  <p className="mt-2 text-base font-medium leading-snug text-ink">
                    {companyDetails.focus}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                    {companyDetails.servicesList.slice(0, 5).map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-ink/75">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-ink" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Leadership Details */}
            <div className="mt-12 rounded-xl border border-ink/10 bg-sand/30 p-6 md:mt-16">
              <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
                Founder & Director Leadership
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {companyDetails.directors.map((dir, idx) => (
                  <div key={idx} className="flex items-start gap-3 border-l-2 border-ink/20 pl-3">
                    <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-bone">
                      <UserCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-ink">{dir.name}</h4>
                      <p className="text-xs font-medium text-ink/60">{dir.designation}</p>
                      <p className="mt-1 text-xs text-ink/70">{dir.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/15 pt-8 md:mt-16 md:gap-10">
              {introStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-4xl font-medium tracking-[-0.03em] md:text-6xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 text-xs leading-snug text-ink/60 md:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <figure className="md:col-span-5 md:mt-24">
            <ClipImage
              src={images.intro}
              alt="AIIVA smart automation touch switch installation in luxury Hyderabad residence"
              className="aspect-[3/4] w-full rounded-xl object-cover shadow-2xl"
            />

            <figcaption className="mt-4 flex justify-between text-xs text-ink/55">
              <span>Basheer Bagh Experience Design</span>
              <span>Smart Living · Hyderabad</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
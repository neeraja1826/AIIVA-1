import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { MagneticButton } from './ui/MagneticButton';
import { images } from '../data/images';
import { companyDetails } from '../data/company';
import { scrollToId } from '../utils/scroll';
import { MessageSquare, Phone, MapPin } from 'lucide-react';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.02]);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      className="relative flex min-h-[760px] items-end overflow-hidden bg-ink py-20 text-bone md:h-[110vh] md:py-28"
    >
      <motion.img
        src={images.cta}
        alt=""
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover will-change-transform"
      />

      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent" />

      <div className="shell relative grid gap-10 md:grid-cols-12 md:items-end">
        <div id="cta-title" className="md:col-span-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-champagne">
            {companyDetails.tagline} • HYDERABAD
          </p>
          <SplitText
            text={'Imagine Your Space.\n_Then_ Automate It.'}
            className="font-display text-[12vw] font-medium leading-[0.94] tracking-[-0.04em] md:text-[6.2vw]"
            accentClassName="font-serif italic font-normal text-champagne"
            stagger={0.07}
          />
        </div>
        <Reveal className="md:col-span-5 md:pb-3" delay={0.2}>
          <div className="rounded-2xl border border-bone/15 bg-ink/70 p-6 backdrop-blur-md">
            <p className="text-base leading-relaxed text-bone/85 md:text-lg">
              Ready to upgrade your home, villa, or office with smart, reliable & affordable automation?
            </p>

            <div className="mt-4 space-y-1.5 text-xs text-bone/60">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-volt" />
                <span>#504, The Legend, Basheer Bagh, Hyderabad</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-volt" />
                <span>+91 90000 06000 • +91 97043 00006</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={companyDetails.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Instant WhatsApp</span>
              </a>
              <MagneticButton
                variant="outline"
                onClick={() => scrollToId('contact')}
              >
                Contact Details
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
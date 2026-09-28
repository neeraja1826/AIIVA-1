import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MenuIcon, XIcon, MessageSquare } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { images } from '../data/images';
import { companyDetails } from '../data/company';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/motion';

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 40;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const go = (target: string) => {
    setOpen(false);
    scrollToId(target);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-4">
        <div className="shell">
          <nav
            aria-label="Primary"
            className={`flex h-16 items-center justify-between rounded-full border pl-4 pr-2 transition-[background-color,border-color] duration-300 ease-out-expo md:pl-6 ${
              scrolled || open
                ? 'border-bone/15 bg-ink/85 backdrop-blur-xl shadow-2xl'
                : 'border-transparent bg-ink/30 backdrop-blur-sm'
            }`}
          >
            {/* Logo and Brand */}
            <button
              type="button"
              onClick={() => go('home')}
              className="group flex items-center gap-3 text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt rounded-full py-1 pr-2"
            >
              <img
                src={images.emblem}
                alt="AIIVA Emblem"
                className="h-9 w-9 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-bold tracking-tight text-bone md:text-xl">
                    AIIVA
                  </span>
                  <span className="hidden rounded bg-volt/15 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-volt sm:inline-block">
                    SMART & AFFORDABLE
                  </span>
                </div>
                <span className="text-[9px] tracking-wider text-bone/60 uppercase">
                  AUTOMATION PVT LTD
                </span>
              </div>
            </button>

            {/* Nav links */}
            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => go(link.target)}
                    className="text-sm font-normal text-bone/70 transition-colors duration-200 hover:text-bone focus-visible:outline-none focus-visible:text-bone"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <a
                href={companyDetails.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden h-10 items-center gap-2 rounded-full border border-bone/20 bg-graphite/60 px-4 text-xs font-medium text-bone transition-colors duration-200 hover:border-volt hover:text-volt sm:inline-flex"
              >
                <MessageSquare className="h-3.5 w-3.5 text-volt" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => go('contact')}
                className="hidden h-11 items-center rounded-full bg-bone px-5 text-xs font-medium text-ink transition-colors duration-200 hover:bg-white md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
              >
                Book Consultation
              </button>

              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-11 w-11 place-items-center rounded-full text-bone lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
              >
                {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-12 pt-28 lg:hidden"
          >
            <ul className="space-y-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.target}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease, delay: 0.04 * i }}
                >
                  <button
                    type="button"
                    onClick={() => go(link.target)}
                    className="font-display text-3xl font-medium tracking-tight text-bone hover:text-volt"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="space-y-4 border-t border-bone/10 pt-6">
              <p className="text-xs uppercase tracking-wider text-bone/50">Contact AIIVA</p>
              <div className="space-y-1 text-sm text-bone/80">
                <p>#504, The Legend, Basheer Bagh, Hyderabad</p>
                <p>+91 90000 06000 • +91 97043 00006</p>
                <p>aiivaautomation@gmail.com</p>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href={companyDetails.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-volt/20 py-3 text-center text-xs font-semibold text-volt"
                >
                  WhatsApp Us
                </a>
                <a
                  href="tel:+919000006000"
                  className="flex-1 rounded-full bg-bone py-3 text-center text-xs font-semibold text-ink"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
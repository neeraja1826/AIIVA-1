import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { scrollToId } from '../utils/scroll';
import { ease } from '../utils/motion';

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const next = v > 40;
    setScrolled((prev) => prev === next ? prev : next);
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
            className={`flex h-16 items-center justify-between rounded-full border pl-6 pr-2 transition-[background-color,border-color] duration-300 ease-out-expo ${
            scrolled || open ? 'border-bone/10 bg-ink/60 backdrop-blur-xl' : 'border-transparent bg-transparent'}`
            }>
            
            <button type="button" onClick={() => go('home')} className="flex items-baseline gap-2 text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt rounded-sm">
              <span className="font-display text-xl font-semibold tracking-[-0.02em]">AIIVA</span>
              <span className="text-[13px] text-bone/60">Automation</span>
            </button>

            <ul className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(1, 5).map((link) =>
              <li key={link.target}>
                  <button
                  type="button"
                  onClick={() => go(link.target)}
                  className="text-sm text-bone/70 transition-colors duration-200 hover:text-bone focus-visible:outline-none focus-visible:text-bone">
                  
                    {link.label}
                  </button>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go('contact')}
                className="hidden h-12 items-center rounded-full bg-bone px-6 text-sm font-medium text-ink transition-colors duration-200 hover:bg-white sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt">
                
                Book a consultation
              </button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-12 w-12 place-items-center rounded-full text-bone lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt">
                
                {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          className="fixed inset-0 z-40 bg-ink pt-32 lg:hidden">
          
            <ul className="shell space-y-2">
              {navLinks.map((link, i) =>
            <motion.li
              key={link.target}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease, delay: 0.04 * i }}>
              
                  <button
                type="button"
                onClick={() => go(link.target)}
                className="font-display text-5xl font-medium tracking-[-0.03em] text-bone">
                
                    {link.label}
                  </button>
                </motion.li>
            )}
            </ul>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}
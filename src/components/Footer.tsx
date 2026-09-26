import React from 'react';
import { footerPillars, navLinks } from '../data/navigation';
import { scrollToId } from '../utils/scroll';

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-bone">
      <div className="shell border-t border-bone/10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-medium tracking-[-0.03em] md:text-4xl">AIIVA Automation</p>
            <p className="mt-4 text-sm text-bone/55">{footerPillars.join(' • ')}</p>
            <a
              href="mailto:hello@aiivaautomation.com"
              className="mt-10 inline-block font-display text-2xl tracking-[-0.02em] text-bone underline decoration-bone/25 underline-offset-8 transition-colors duration-200 hover:decoration-volt md:text-3xl">
              
              hello@aiivaautomation.com
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) =>
              <li key={link.target}>
                  <button
                  type="button"
                  onClick={() => scrollToId(link.target)}
                  className="text-base text-bone/75 transition-colors duration-200 hover:text-bone focus-visible:outline-none focus-visible:text-volt">
                  
                    {link.label}
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">Studio</p>
            <address className="mt-5 space-y-1 text-base not-italic text-bone/75">
              <p>AIIVA Experience Centre</p>
              <p>21 Harbour Crescent, Suite 4</p>
              <a href="tel:+10000000000" className="block transition-colors duration-200 hover:text-bone">
                +1 (000) 000-0000
              </a>
            </address>
            <p className="mt-6 text-sm text-bone/50">Consultations by appointment, Monday to Saturday.</p>
          </div>
        </div>

        <p aria-hidden="true" className="mt-24 select-none font-display text-[26vw] font-semibold leading-[0.78] tracking-[-0.06em] text-bone/[0.06] md:mt-32">
          AIIVA
        </p>

        <div className="flex flex-col justify-between gap-4 border-t border-bone/10 py-8 text-xs text-bone/45 md:flex-row">
          <p>© 2026 AIIVA Automation. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-200 hover:text-bone">Praiivacy</a>
            <a href="#" className="transition-colors duration-200 hover:text-bone">Terms</a>
          </div>
        </div>
      </div>
    </footer>);

}
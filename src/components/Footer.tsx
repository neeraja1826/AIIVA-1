import React from 'react';
import { footerPillars, navLinks } from '../data/navigation';
import { companyDetails } from '../data/company';
import { images } from '../data/images';
import { scrollToId } from '../utils/scroll';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-ink text-bone">
      <div className="shell border-t border-bone/10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          {/* Company branding & direct contact */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src={images.emblem}
                alt="AIIVA Automation Emblem"
                className="h-11 w-11 object-contain drop-shadow-md"
              />
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
                  {companyDetails.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-volt">
                  {companyDetails.tagline}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-bone/65">
              {companyDetails.slogan}
            </p>

            <p className="mt-2 text-xs text-bone/50">
              {footerPillars.slice(0, 4).join(' • ')}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`mailto:${companyDetails.contact.email}`}
                className="inline-flex items-center gap-2 font-display text-xl tracking-tight text-bone underline decoration-bone/25 underline-offset-8 transition-colors duration-200 hover:text-volt hover:decoration-volt md:text-2xl"
              >
                <Mail className="h-5 w-5 text-volt" />
                <span>{companyDetails.contact.email}</span>
              </a>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={companyDetails.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-volt/20 px-5 py-2.5 text-xs font-semibold text-volt transition-colors hover:bg-volt hover:text-ink"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp: {companyDetails.contact.whatsapp}</span>
                </a>
                <a
                  href={`tel:${companyDetails.contact.rawPhones[0]}`}
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-graphite/60 px-5 py-2.5 text-xs font-semibold text-bone transition-colors hover:border-bone"
                >
                  <Phone className="h-4 w-4 text-bone/70" />
                  <span>Call: {companyDetails.contact.phones[0]}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.target)}
                    className="text-base text-bone/75 transition-colors duration-200 hover:text-volt focus-visible:outline-none focus-visible:text-volt"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-bone/10 pt-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">Directors</p>
              <ul className="mt-2 space-y-1 text-xs text-bone/70">
                {companyDetails.directors.map((d, i) => (
                  <li key={i}>{d.name}</li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Office & Experience Center Address */}
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bone/45">Head Office</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-bone/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-volt" />
                <div>
                  <p className="font-semibold text-bone">AIIVA Automation Pvt. Ltd.</p>
                  <p className="mt-0.5 leading-relaxed text-bone/80">
                    {companyDetails.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-t border-bone/10 pt-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-volt" />
                <div className="space-y-0.5">
                  <a
                    href={`tel:${companyDetails.contact.rawPhones[0]}`}
                    className="block transition-colors duration-200 hover:text-volt"
                  >
                    {companyDetails.contact.phones[0]}
                  </a>
                  <a
                    href={`tel:${companyDetails.contact.rawPhones[1]}`}
                    className="block transition-colors duration-200 hover:text-volt"
                  >
                    {companyDetails.contact.phones[1]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 border-t border-bone/10 pt-3">
                <Clock className="h-4 w-4 shrink-0 text-volt" />
                <p className="text-xs text-bone/70">
                  Working Hours: {companyDetails.contact.workingHours}
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Large watermark brand */}
        <p
          aria-hidden="true"
          className="mt-20 select-none font-display text-[22vw] font-semibold leading-[0.78] tracking-[-0.06em] text-bone/[0.05] md:mt-28 text-center"
        >
          AIIVA
        </p>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between gap-4 border-t border-bone/10 py-8 text-xs text-bone/45 md:flex-row md:items-center">
          <p>© 2026 AIIVA AUTOMATION PRIVATE LIMITED. All rights reserved. • Hyderabad, India</p>
          <div className="flex gap-6">
            <span className="text-bone/60">SMART AND AFFORDABLE</span>
            <a
              href="#home"
              onClick={() => scrollToId('home')}
              className="transition-colors duration-200 hover:text-bone"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
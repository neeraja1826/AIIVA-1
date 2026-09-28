import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterMark } from './ui/ChapterMark';
import { SplitText } from './ui/SplitText';
import { Reveal } from './ui/Reveal';
import { productsData, productCategories, ProductItem } from '../data/products';
import { companyDetails } from '../data/company';
import { ease } from '../utils/motion';
import { Check, ArrowUpRight } from 'lucide-react';

type FilterGroup = 'All' | 'Master Panels' | 'Fan Controls' | 'Modular Switches';

export function Products() {
  const [activeGroup, setActiveGroup] = useState<FilterGroup>('All');
  const [selectedId, setSelectedId] = useState<string>(productsData[0].id);

  const filteredProducts =
    activeGroup === 'All'
      ? productsData
      : productsData.filter((p) => p.group === activeGroup);

  const activeProduct =
    productsData.find((p) => p.id === selectedId) || filteredProducts[0] || productsData[0];

  const handleGroupChange = (group: FilterGroup) => {
    setActiveGroup(group);
    const firstInGroup =
      group === 'All' ? productsData[0] : productsData.find((p) => p.group === group);
    if (firstInGroup) {
      setSelectedId(firstInGroup.id);
    }
  };

  return (
    <section id="products" className="relative bg-coal py-28 text-bone md:py-40">
      <div className="shell">
        <ChapterMark numeral="IV" label="Smart Hardware & Switches" className="text-bone/60" />

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.22em] text-champagne">
              {companyDetails.tagline} • Complete Touch Switch Range
            </p>
            <div className="mt-3">
              <SplitText
                text={'Smart Touch Switches.\nEngineered for _Modern Living._'}
                className="font-display text-[11vw] font-medium leading-[0.95] tracking-[-0.04em] md:text-[5.2vw]"
                accentClassName="font-serif italic font-normal text-champagne"
              />
            </div>
          </div>
          <Reveal className="md:col-span-4 md:pb-3">
            <p className="max-w-sm text-base leading-relaxed text-bone/65">
              Feather-touch capacitive glass panels, silent electronic fan regulators, and modular socket combinations. Designed to fit standard Indian wall boxes with 100% retrofit ease.
            </p>
          </Reveal>
        </div>

        {/* Filter Category Pills */}
        <div className="mt-14 flex flex-wrap items-center gap-2 border-b border-bone/10 pb-5">
          {(['All', 'Master Panels', 'Fan Controls', 'Modular Switches'] as FilterGroup[]).map(
            (group) => {
              const isActive = activeGroup === group;
              const count =
                group === 'All'
                  ? productsData.length
                  : productsData.filter((p) => p.group === group).length;

              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => handleGroupChange(group)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium transition-all duration-300 md:text-sm ${
                    isActive
                      ? 'bg-bone text-ink shadow-md shadow-bone/10'
                      : 'bg-graphite/60 text-bone/60 hover:bg-graphite hover:text-bone'
                  }`}
                >
                  <span>{group}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isActive ? 'bg-ink text-bone' : 'bg-bone/15 text-bone/70'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Product Selector Headlines Only */}
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((item) => {
            const isSelected = item.id === activeProduct.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-volt bg-graphite shadow-lg ring-1 ring-volt/40'
                    : 'border-bone/10 bg-graphite/30 hover:border-bone/25 hover:bg-graphite/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isSelected ? 'text-volt font-semibold' : 'text-bone/45 group-hover:text-volt'
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isSelected ? 'bg-volt shadow-[0_0_8px_rgba(111,216,242,0.8)]' : 'bg-bone/20'
                    }`}
                  />
                </div>
                <h4
                  className={`mt-2 text-sm font-medium leading-snug transition-colors ${
                    isSelected ? 'text-bone font-semibold' : 'text-bone/75 group-hover:text-bone'
                  }`}
                >
                  {item.name}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Product Detailed View */}
        <div className="mt-8 rounded-2xl border border-bone/10 bg-graphite/40 p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease }}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              {/* Product Image Stage */}
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-bone/10 bg-ink/70 p-8 lg:col-span-6">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,216,242,0.14),transparent_70%)]"
                  aria-hidden="true"
                />
                <motion.img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="relative z-10 max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.35, ease }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="rounded-full border border-bone/10 bg-coal/90 px-3 py-1 text-[11px] font-mono text-volt">
                    {activeProduct.tag}
                  </span>
                  <span className="text-[11px] text-bone/45">Tempered Obsidian Glass</span>
                </div>
              </div>

              {/* Product Info & Specs */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-volt/15 px-3 py-1 text-[11px] font-semibold tracking-wider text-volt">
                    {activeProduct.group}
                  </span>
                  <span className="text-xs text-bone/50">• Capacitive Smart Panel</span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-medium tracking-tight text-bone md:text-4xl">
                  {activeProduct.name}
                </h3>
                <p className="mt-3 text-base text-bone/70">{activeProduct.subtitle}</p>

                {/* Key features checklist */}
                <div className="mt-6 space-y-2.5">
                  {activeProduct.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt/15 text-volt">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-bone/85">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Specs table */}
                <div className="mt-8 grid grid-cols-2 gap-3 border-t border-bone/10 pt-6">
                  {activeProduct.specs.map((spec, idx) => (
                    <div key={idx} className="rounded-lg bg-ink/40 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-bone/45">{spec.label}</p>
                      <p className="mt-1 text-sm font-medium text-bone">{spec.val}</p>
                    </div>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`https://wa.me/919000006000?text=Hi%20AIIVA%20Automation%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                      activeProduct.name
                    )}.%20Please%20share%20details%20and%20pricing.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-bone px-7 text-sm font-medium text-ink transition-colors duration-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt"
                  >
                    <span>Enquire on WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:+919000006000"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/20 px-6 text-sm font-medium text-bone transition-colors duration-200 hover:border-bone/50 hover:bg-bone/5"
                  >
                    <span>Call +91 90000 06000</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Product ecosystem categories summary */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.06}>
              <div className="h-full rounded-xl border border-bone/10 bg-graphite/25 p-6 transition-colors duration-300 hover:border-bone/25 hover:bg-graphite/45">
                <p className="text-[10px] uppercase tracking-[0.2em] text-volt">{cat.count}</p>
                <h4 className="mt-2 font-display text-xl font-medium text-bone">{cat.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-bone/60">{cat.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

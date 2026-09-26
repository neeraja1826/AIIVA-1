import React from 'react';

type ChapterMarkProps = {
  numeral: string;
  label: string;
  className?: string;
};

/** Marks the four story chapters: Home → Intelligence → Automation → Experience. */
export function ChapterMark({ numeral, label, className = '' }: ChapterMarkProps) {
  return (
    <div className={`flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] ${className}`}>
      <span className="font-serif text-lg normal-case italic tracking-normal">{numeral}</span>
      <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
      <span>{label}</span>
    </div>);

}
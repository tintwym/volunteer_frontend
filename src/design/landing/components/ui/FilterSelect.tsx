'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type FilterSelectProps = {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  buttonClassName?: string;
  'aria-label'?: string;
};

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
  buttonClassName = '',
  'aria-label': ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      {label ? (
        <label className="mb-1 block text-[11px] font-semibold text-stone-500 dark:text-stone-400">
          {label}
        </label>
      ) : null}

      <button
        type="button"
        aria-label={ariaLabel || label || 'Select option'}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border border-stone-200 bg-white px-3 py-2 text-left text-xs font-medium text-stone-900 outline-none transition-colors hover:border-stone-300 focus:ring-2 focus:ring-emerald-500/60 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:border-stone-600 ${buttonClassName}`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-stone-400 transition-transform dark:text-stone-300 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel || label || 'Options'}
          className="absolute left-0 right-0 z-[70] mt-1.5 max-h-60 overflow-auto rounded-xl border border-stone-200 bg-white p-1.5 shadow-xl dark:border-stone-700 dark:bg-stone-900"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                    selected
                      ? 'bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                      : 'text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800'
                  }`}
                >
                  <Check
                    className={`h-3.5 w-3.5 shrink-0 ${
                      selected
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-transparent'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

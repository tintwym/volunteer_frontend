"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";

type CollapsedNavTooltipProps = {
  /** Shown only when `enabled` is true (sidebar collapsed). */
  label: string;
  enabled: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Instant label beside a collapsed sidebar icon. Uses fixed positioning so
 * parent `overflow-y-auto` does not clip the tooltip.
 */
export function CollapsedNavTooltip({
  label,
  enabled,
  children,
  className,
}: CollapsedNavTooltipProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const show = useCallback(() => {
    if (!enabled || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
  }, [enabled]);

  const hide = useCallback(() => setPos(null), []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div
      ref={wrapRef}
      className={className ?? "relative w-full"}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {pos && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-[200] flex -translate-y-1/2 items-center"
          style={{ top: pos.top, left: pos.left }}
        >
          <span
            className="mr-[-1px] h-0 w-0 border-y-[5px] border-r-[6px] border-y-transparent border-r-slate-900 dark:border-r-slate-700"
            aria-hidden
          />
          <span className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg dark:bg-slate-700">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

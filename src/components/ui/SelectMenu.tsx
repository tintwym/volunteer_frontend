"use client";

import { Check, ChevronDown } from "lucide-react";
import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
type Option = { value: string; label: ReactNode; text: string; disabled: boolean };

type OptionProps = {
  value?: string | number;
  children?: ReactNode;
  disabled?: boolean;
};

/** Mirrors the event shape callers already read from a native <select>. */
export type SelectMenuChangeEvent = {
  target: { value: string; name?: string };
  currentTarget: { value: string; name?: string };
};

type SelectMenuProps = {
  value: string | number;
  onChange: (event: SelectMenuChangeEvent) => void;
  children: ReactNode;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

const MENU_MAX_HEIGHT = 288;
const MENU_GAP = 6;

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

function collectOptions(children: ReactNode, out: Option[] = []): Option[] {
  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.type === Fragment) {
      collectOptions((child as ReactElement<{ children?: ReactNode }>).props.children, out);
      return;
    }
    if (child.type !== "option") return;
    const props = (child as ReactElement<OptionProps>).props;
    const text = textOf(props.children);
    out.push({
      value: String(props.value ?? text),
      label: props.children,
      text,
      disabled: Boolean(props.disabled),
    });
  });
  return out;
}

/**
 * Drop-in replacement for a controlled native <select> with <option> children,
 * rendered as a styled listbox instead of the OS menu.
 */
export function SelectMenu({
  value,
  onChange,
  children,
  className = "",
  id,
  name,
  disabled = false,
  "aria-label": ariaLabel,
}: SelectMenuProps) {
  const options = collectOptions(children);
  const selectedIndex = options.findIndex((o) => o.value === String(value));
  const selected = options[selectedIndex];

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [position, setPosition] = useState<{
    left: number;
    width: number;
    top?: number;
    bottom?: number;
    maxHeight: number;
    fontSize: string;
  } | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ query: "", timer: 0 });
  const listboxId = useId();

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP - 8;
    const spaceAbove = rect.top - MENU_GAP - 8;
    const openUp = spaceBelow < Math.min(MENU_MAX_HEIGHT, 160) && spaceAbove > spaceBelow;
    const width = Math.max(rect.width, 160);
    const left = Math.min(rect.left, window.innerWidth - width - 8);
    const fontSize = window.getComputedStyle(trigger).fontSize;
    setPosition({
      left: Math.max(8, left),
      width,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + MENU_GAP }
        : { top: rect.bottom + MENU_GAP }),
      maxHeight: Math.min(MENU_MAX_HEIGHT, openUp ? spaceAbove : spaceBelow),
      fontSize: parseFloat(fontSize) < 13 ? "13px" : fontSize,
    });
  }, []);

  const openMenu = useCallback(
    (index = selectedIndex) => {
      if (disabled || options.length === 0) return;
      updatePosition();
      setActiveIndex(index >= 0 ? index : options.findIndex((o) => !o.disabled));
      setOpen(true);
    },
    [disabled, options, selectedIndex, updatePosition]
  );

  const closeMenu = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const choose = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    if (option.value !== String(value)) {
      const target = { value: option.value, name };
      onChange({ target, currentTarget: target });
    }
    closeMenu();
  };

  const moveActive = (from: number, step: 1 | -1) => {
    for (let i = 1; i <= options.length; i++) {
      const next = (from + step * i + options.length) % options.length;
      if (!options[next].disabled) return next;
    }
    return from;
  };

  const handleTypeahead = (key: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.query += key.toLowerCase();
    state.timer = window.setTimeout(() => (state.query = ""), 500);
    const start = open ? activeIndex : selectedIndex;
    const ordered = options.map((_, i) => (start + 1 + i) % options.length);
    const match = ordered.find(
      (i) => !options[i].disabled && options[i].text.toLowerCase().startsWith(state.query)
    );
    if (match === undefined) return;
    if (open) setActiveIndex(match);
    else choose(match);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      } else if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
        handleTypeahead(e.key);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => moveActive(i, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => moveActive(i, -1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(moveActive(-1, 1));
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(moveActive(options.length, -1));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        break;
      case "Tab":
        closeMenu(false);
        break;
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) handleTypeahead(e.key);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      closeMenu(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, closeMenu, updatePosition]);

  useLayoutEffect(() => {
    if (!open || activeIndex < 0) return;
    const item = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onKeyDown}
        className={`inline-flex items-center justify-between gap-2 text-left transition-colors hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-60 ${
          open ? "ring-2 ring-emerald-500/30 border-emerald-400" : ""
        } ${className}`}
      >
        {/* Stacking every label in one grid cell sizes the trigger to the longest option, like a native select. */}
        <span className="grid min-w-0">
          {options.map((o) => (
            <span
              key={o.value}
              aria-hidden
              className="invisible col-start-1 row-start-1 truncate whitespace-nowrap"
            >
              {o.label}
            </span>
          ))}
          <span className="col-start-1 row-start-1 truncate whitespace-nowrap">
            {selected?.label ?? ""}
          </span>
        </span>
        <ChevronDown
          aria-hidden
          className={`h-4 w-4 shrink-0 opacity-60 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open &&
        position &&
        createPortal(
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            style={{
              position: "fixed",
              left: position.left,
              top: position.top,
              bottom: position.bottom,
              minWidth: position.width,
              maxHeight: position.maxHeight,
              fontSize: position.fontSize,
            }}
            className="z-[1000] max-w-[min(24rem,calc(100vw-16px))] overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 text-slate-700 shadow-lg shadow-slate-900/10 ring-1 ring-black/5"
          >
            {options.map((o, i) => {
              const isSelected = i === selectedIndex;
              const isActive = i === activeIndex;
              return (
                <li
                  key={`${o.value}-${i}`}
                  id={`${listboxId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={o.disabled || undefined}
                  onPointerEnter={() => !o.disabled && setActiveIndex(i)}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={`flex cursor-pointer select-none items-center justify-between gap-3 rounded-lg px-3 py-2 ${
                    o.disabled
                      ? "cursor-not-allowed opacity-40"
                      : isActive
                        ? "bg-emerald-50 text-emerald-900"
                        : ""
                  } ${isSelected ? "font-semibold text-emerald-700" : ""}`}
                >
                  <span className="truncate">{o.label}</span>
                  {isSelected && <Check aria-hidden className="h-4 w-4 shrink-0 text-emerald-600" />}
                </li>
              );
            })}
          </ul>,
          document.body
        )}
    </>
  );
}

"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function Select({
  id, name, value, onChange, options, ariaLabel,
  className = "", buttonClassName = "field", menuClassName = "", disabled = false,
}) {
  const generatedId = useId();
  const listId = `${generatedId}-options`;
  const root = useRef(null);
  const trigger = useRef(null);
  const list = useRef(null);
  const typed = useRef("");
  const typeTimer = useRef(null);
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const [active, setActive] = useState(0);
  const selected = Math.max(0, options.findIndex((option) => option.value === value));

  function show() {
    if (disabled || !options.length) return;
    const rect = trigger.current.getBoundingClientRect();
    const menuHeight = Math.min(options.length * 44 + 16, 288, window.innerHeight / 2);
    setAbove(window.innerHeight - rect.bottom < menuHeight && rect.top > window.innerHeight - rect.bottom);
    setActive(selected);
    setOpen(true);
  }
  function choose(index) {
    if (!options[index]) return;
    onChange(options[index].value);
    setOpen(false);
    trigger.current?.focus();
  }
  useEffect(() => {
    if (!open) return;
    const close = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);
  useEffect(() => {
    if (open) list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);
  useEffect(() => () => clearTimeout(typeTimer.current), []);
  function keyDown(event) {
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      if (!open) show();
      if (event.key === "Home") setActive(0);
      else if (event.key === "End") setActive(options.length - 1);
      else if (open) setActive((current) => (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open ? choose(active) : show();
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      clearTimeout(typeTimer.current);
      typed.current += event.key.toLowerCase();
      const index = options.findIndex((option) => option.label.toLowerCase().startsWith(typed.current));
      if (!open) show();
      if (index >= 0) setActive(index);
      typeTimer.current = setTimeout(() => { typed.current = ""; }, 650);
    }
  }
  return (
    <div ref={root} className={`relative min-w-0 ${className}`}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    >
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={trigger} id={id} type="button" role="combobox"
        aria-label={ariaLabel} aria-haspopup="listbox" aria-expanded={open}
        aria-controls={listId} aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled} onKeyDown={keyDown}
        onClick={() => open ? setOpen(false) : show()}
        className={`flex w-full items-center justify-between gap-3 text-left ${buttonClassName}`}
      >
        <span className="min-w-0 truncate">{options[selected]?.label}</span>
        <ChevronDown size={16} className={`shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul ref={list} id={listId} role="listbox" aria-label={ariaLabel || "Options"}
          className={`absolute left-0 z-[70] max-h-[min(18rem,50dvh)] w-full overflow-y-auto rounded-xl border bg-surface p-1.5 shadow-xl ${above ? "bottom-full mb-2" : "top-full mt-2"} ${menuClassName}`}
        >
          {options.map((option, index) => (
            <li key={option.value} role="option" id={`${listId}-${index}`} aria-selected={option.value === value}
              data-index={index} onPointerMove={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()} onClick={() => choose(index)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[15px] transition ${index === active ? "bg-accent-soft" : ""} ${option.value === value ? "font-medium text-accent" : "text-foreground"}`}
            >
              <span className="min-w-0 flex-1 whitespace-normal break-words">{option.label}</span>
              {option.value === value && <Check size={16} className="shrink-0" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

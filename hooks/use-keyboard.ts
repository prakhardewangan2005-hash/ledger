"use client";
import { useEffect } from "react";

type Combo = { key: string; meta?: boolean; shift?: boolean; alt?: boolean; ctrl?: boolean };

export function useKeyboard(combo: Combo | Combo[], handler: (e: KeyboardEvent) => void, deps: unknown[] = []) {
  useEffect(() => {
    const combos = Array.isArray(combo) ? combo : [combo];
    function onKey(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      const isTyping =
        tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      const hit = combos.some(
        (c) =>
          e.key.toLowerCase() === c.key.toLowerCase() &&
          !!c.meta === (e.metaKey || e.ctrlKey) &&
          !!c.shift === e.shiftKey &&
          !!c.alt === e.altKey
      );
      if (!hit) return;
      const allowWhileTyping = combos.every((c) => c.meta);
      if (isTyping && !allowWhileTyping) return;
      handler(e);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Vim-style "G X" two-stroke navigation. Press G, then a letter within 1.2s.
 */
export function useLeaderKey(map: Record<string, () => void>) {
  useEffect(() => {
    let leader = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    function onKey(e: KeyboardEvent) {
      const tgt = e.target as HTMLElement | null;
      const isTyping =
        tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable);
      if (isTyping) return;
      if (!leader && e.key.toLowerCase() === "g") {
        leader = true;
        timer = setTimeout(() => (leader = false), 1200);
        return;
      }
      if (leader) {
        const fn = map[e.key.toLowerCase()];
        leader = false;
        if (timer) clearTimeout(timer);
        if (fn) {
          e.preventDefault();
          fn();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [map]);
}

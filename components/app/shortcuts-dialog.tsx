"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { useUIStore } from "@/stores/ui-store";
import { SHORTCUTS } from "@/lib/shortcuts";

export function ShortcutsDialog() {
  const { shortcutsOpen, setShortcutsOpen } = useUIStore();

  const groups = SHORTCUTS.reduce((acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  }, {} as Record<string, typeof SHORTCUTS>);

  return (
    <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>For analysts who don't reach for the mouse.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{group}</div>
              <ul className="mt-3 space-y-2">
                {items.map((s) => (
                  <li key={s.description} className="flex items-center justify-between text-sm">
                    <span className="text-foreground/90">{s.description}</span>
                    <span className="flex items-center gap-1">
                      {s.keys.map((k) => <Kbd key={k}>{k}</Kbd>)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

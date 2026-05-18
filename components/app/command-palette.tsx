"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Home, Rss, LayoutGrid, FileText, Archive, Sparkles, ShieldCheck, Settings,
  Search, Sun, Moon, Plus, Keyboard
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator
} from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { useUIStore } from "@/stores/ui-store";
import { REGULATIONS } from "@/data/regulations";
import { PRODUCTS } from "@/data/products";

const ICONS = { Home, Rss, LayoutGrid, FileText, Archive, Sparkles, ShieldCheck };

export function CommandPalette() {
  const { cmdOpen, setCmdOpen, setShortcutsOpen } = useUIStore();
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen(!cmdOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmdOpen, setCmdOpen]);

  const navItems = [
    { label: "Go to Today", icon: ICONS.Home, action: () => router.push("/today"), shortcut: "G T" },
    { label: "Go to Feed", icon: ICONS.Rss, action: () => router.push("/feed"), shortcut: "G F" },
    { label: "Go to Products", icon: ICONS.LayoutGrid, action: () => router.push("/products"), shortcut: "G P" },
    { label: "Go to Filings", icon: ICONS.FileText, action: () => router.push("/filings"), shortcut: "G L" },
    { label: "Go to Evidence", icon: ICONS.Archive, action: () => router.push("/evidence"), shortcut: "G E" },
    { label: "Go to Copilot", icon: ICONS.Sparkles, action: () => router.push("/copilot"), shortcut: "G C" },
    { label: "Go to Audit", icon: ICONS.ShieldCheck, action: () => router.push("/audit"), shortcut: "G A" }
  ];

  function run(fn: () => void) {
    setCmdOpen(false);
    fn();
  }

  return (
    <CommandDialog open={cmdOpen} onOpenChange={setCmdOpen}>
      <CommandInput placeholder="Search regulations, products, filings… or type a command" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navItems.map((nav) => (
            <CommandItem key={nav.label} onSelect={() => run(nav.action)}>
              <nav.icon className="h-4 w-4" />
              <span>{nav.label}</span>
              <span className="ml-auto"><Kbd className="text-[9px]">{nav.shortcut}</Kbd></span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Regulations">
          {REGULATIONS.slice(0, 5).map((r) => (
            <CommandItem key={r.id} onSelect={() => run(() => router.push(`/feed/${r.id}`))}>
              <Rss className="h-4 w-4" />
              <span className="truncate">{r.title}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{r.citation}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Products">
          {PRODUCTS.map((p) => (
            <CommandItem key={p.id} onSelect={() => run(() => router.push(`/products/${p.id}`))}>
              <LayoutGrid className="h-4 w-4" />
              <span>{p.name}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground capitalize">{p.category}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => run(() => router.push("/products"))}>
            <Plus className="h-4 w-4" /><span>New product launch</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => router.push("/filings"))}>
            <FileText className="h-4 w-4" /><span>Start new filing</span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setShortcutsOpen(true))}>
            <Keyboard className="h-4 w-4" /><span>Keyboard shortcuts</span>
            <span className="ml-auto"><Kbd className="text-[9px]">?</Kbd></span>
          </CommandItem>
          <CommandItem onSelect={() => run(() => setTheme(theme === "dark" ? "light" : "dark"))}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span>Toggle theme</span>
            <span className="ml-auto"><Kbd className="text-[9px]">⌘.</Kbd></span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

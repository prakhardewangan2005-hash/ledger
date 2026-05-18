"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home, Rss, LayoutGrid, FileText, Archive, Sparkles, ShieldCheck,
  Settings, ChevronsLeft, ChevronsRight
} from "lucide-react";
import { Logo, LogoMark } from "@/components/shared/logo";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

const ICONS = { Home, Rss, LayoutGrid, FileText, Archive, Sparkles, ShieldCheck } as const;

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 60 : 240 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-30 hidden h-svh shrink-0 flex-col border-r border-border bg-card/40 md:flex"
    >
      <div className={cn("flex h-14 items-center border-b border-border", sidebarCollapsed ? "justify-center" : "px-4")}>
        {sidebarCollapsed ? (
          <Link href="/today" aria-label="Ledger home"><LogoMark className="h-6 w-6" /></Link>
        ) : (
          <Logo />
        )}
      </div>

      <TooltipProvider delayDuration={200}>
        <nav className={cn("flex flex-1 flex-col gap-0.5", sidebarCollapsed ? "items-center px-2 py-3" : "px-3 py-3")}>
          {!sidebarCollapsed && (
            <div className="mb-1.5 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </div>
          )}
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const link = (
              <Link
                href={item.href}
                className={cn(
                  "group relative flex h-8 items-center gap-2.5 rounded-md text-sm transition-colors",
                  sidebarCollapsed ? "w-8 justify-center" : "px-2.5",
                  active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <Kbd className="hidden h-4 px-1 text-[9px] tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
                      {item.shortcut}
                    </Kbd>
                  </>
                )}
                {active ? (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r bg-primary" aria-hidden />
                ) : null}
              </Link>
            );
            return sidebarCollapsed ? (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-2">
                  {item.label} <Kbd className="text-[9px]">{item.shortcut}</Kbd>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span key={item.href}>{link}</span>
            );
          })}

          <div className="mt-auto">
            <Link
              href="/settings"
              className={cn(
                "flex h-8 items-center gap-2.5 rounded-md text-sm transition-colors text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                sidebarCollapsed ? "w-8 justify-center" : "px-2.5"
              )}
            >
              <Settings className="h-4 w-4" />
              {!sidebarCollapsed && <span>Settings</span>}
            </Link>
            <div className={cn("mt-2 flex", sidebarCollapsed ? "justify-center" : "justify-end")}>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar" className="h-7 w-7">
                {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </nav>
      </TooltipProvider>
    </motion.aside>
  );
}

"use client";

import { Search, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useUIStore } from "@/stores/ui-store";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { UserMenu } from "@/components/app/user-menu";
import { NotificationsPopover } from "@/components/app/notifications-popover";
import { WorkspaceSwitcher } from "@/components/app/workspace-switcher";
import { Breadcrumbs } from "@/components/app/breadcrumbs";

export function Topbar() {
  const { setCmdOpen, toggleCopilot } = useUIStore();
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <WorkspaceSwitcher />
      <div className="h-4 w-px bg-border" aria-hidden />
      <Breadcrumbs />

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setCmdOpen(true)}
          className="hidden h-8 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs text-muted-foreground transition-colors hover:bg-accent md:flex"
          aria-label="Open command palette"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search</span>
          <span className="h-3 w-px bg-border" />
          <Kbd>⌘K</Kbd>
        </button>
        <Button variant="ghost" size="icon" onClick={() => setCmdOpen(true)} aria-label="Search" className="md:hidden">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleCopilot} aria-label="Toggle Copilot" className="relative">
          <Sparkles className="h-4 w-4" />
        </Button>
        <NotificationsPopover>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </Button>
        </NotificationsPopover>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}

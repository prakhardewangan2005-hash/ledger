"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { CommandPalette } from "@/components/app/command-palette";
import { ShortcutsDialog } from "@/components/app/shortcuts-dialog";
import { CopilotPanel } from "@/components/app/copilot-panel";
import { useLeaderKey, useKeyboard } from "@/hooks/use-keyboard";
import { useUIStore } from "@/stores/ui-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setShortcutsOpen, toggleSidebar, toggleCopilot } = useUIStore();
  const { theme, setTheme } = useTheme();

  // Rehydrate persisted UI state once we're on the client — avoids SSR mismatch
  useEffect(() => {
    useUIStore.persist.rehydrate();
  }, []);

  // G+letter navigation
  useLeaderKey({
    t: () => router.push("/today"),
    f: () => router.push("/feed"),
    p: () => router.push("/products"),
    l: () => router.push("/filings"),
    e: () => router.push("/evidence"),
    c: () => router.push("/copilot"),
    a: () => router.push("/audit"),
    s: () => router.push("/settings")
  });

  useKeyboard({ key: "?", shift: true }, () => setShortcutsOpen(true), []);
  useKeyboard({ key: "b", meta: true }, (e) => { e.preventDefault(); toggleSidebar(); }, [toggleSidebar]);
  useKeyboard({ key: ".", meta: true }, (e) => { e.preventDefault(); setTheme(theme === "dark" ? "light" : "dark"); }, [theme, setTheme]);
  useKeyboard({ key: "/", meta: true }, (e) => { e.preventDefault(); toggleCopilot(); }, [toggleCopilot]);

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main id="main" className="flex-1">
          {children}
        </main>
      </div>
      <CopilotPanel />
      <CommandPalette />
      <ShortcutsDialog />
    </div>
  );
}

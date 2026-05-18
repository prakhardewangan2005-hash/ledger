"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  sidebarCollapsed: boolean;
  copilotOpen: boolean;
  cmdOpen: boolean;
  shortcutsOpen: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  setCopilotOpen: (v: boolean) => void;
  toggleCopilot: () => void;
  setCmdOpen: (v: boolean) => void;
  setShortcutsOpen: (v: boolean) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      copilotOpen: false,
      cmdOpen: false,
      shortcutsOpen: false,
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setCopilotOpen: (v) => set({ copilotOpen: v }),
      toggleCopilot: () => set((s) => ({ copilotOpen: !s.copilotOpen })),
      setCmdOpen: (v) => set({ cmdOpen: v }),
      setShortcutsOpen: (v) => set({ shortcutsOpen: v })
    }),
    {
      name: "ledger-ui",
      partialize: (s) => ({ sidebarCollapsed: s.sidebarCollapsed }),
      skipHydration: true            // ← critical fix: prevents SSR mismatch
    }
  )
);

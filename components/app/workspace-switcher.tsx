"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const WORKSPACES = [
  { id: "northwind", name: "Northwind Markets", role: "Series C exchange" },
  { id: "helix",     name: "Helix Custody",      role: "Custodian" }
];

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-accent">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/15 font-mono text-[10px] font-semibold text-primary">
            NW
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-xs font-medium text-foreground">Northwind Markets</span>
            <span className="font-mono text-[10px] text-muted-foreground">Production</span>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        {WORKSPACES.map((w, i) => (
          <DropdownMenuItem key={w.id} className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/15 font-mono text-[10px] font-semibold text-primary">
              {w.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1">
              <div className="text-sm text-foreground">{w.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{w.role}</div>
            </div>
            {i === 0 ? <Check className="h-4 w-4 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>+ New workspace</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

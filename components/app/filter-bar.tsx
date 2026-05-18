"use client";

import { ListFilter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FilterBar({
  query,
  setQuery,
  filters,
  placeholder = "Search…"
}: {
  query: string;
  setQuery: (v: string) => void;
  filters?: { label: string; count?: number; active?: boolean; onClick?: () => void }[];
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {filters?.map((f) => (
          <button
            key={f.label}
            onClick={f.onClick}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors ${
              f.active ? "border-primary/40 bg-primary/10 text-foreground" : "border-border bg-card text-muted-foreground hover:bg-accent"
            }`}
          >
            {f.label}
            {f.count !== undefined ? <Badge variant="muted" className="px-1 text-[9px]">{f.count}</Badge> : null}
          </button>
        ))}
        <Button variant="outline" size="sm">
          <ListFilter className="h-3.5 w-3.5" />
          More filters
        </Button>
      </div>
    </div>
  );
}

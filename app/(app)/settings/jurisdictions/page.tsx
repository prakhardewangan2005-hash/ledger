"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { JURISDICTIONS } from "@/data/jurisdictions";

export default function JurisdictionsSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(JURISDICTIONS.map((j) => [j.code, true]))
  );

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-base font-medium text-foreground">Operating jurisdictions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ledger subscribes to regulatory feeds, builds matrix columns, and routes filings for the jurisdictions you enable here.
        </p>
      </div>

      <Card className="divide-y divide-border">
        {JURISDICTIONS.map((j) => (
          <div key={j.code} className="flex items-center gap-4 p-4">
            <span className="text-2xl leading-none">{j.flag}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{j.name}</span>
                <Badge variant={j.riskTier === 1 ? "destructive" : j.riskTier === 2 ? "warning" : "muted"}>
                  Tier {j.riskTier}
                </Badge>
              </div>
              <div className="font-mono text-[11px] text-muted-foreground">{j.regulator}</div>
            </div>
            <Switch
              checked={enabled[j.code]}
              onCheckedChange={(v) => setEnabled((e) => ({ ...e, [j.code]: v }))}
              aria-label={`Toggle ${j.name}`}
            />
          </div>
        ))}
      </Card>
    </div>
  );
}

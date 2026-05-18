"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const CHANNELS = [
  { key: "critical_regs",   label: "Critical regulatory changes",       desc: "Always notified within 5 minutes of feed publication." },
  { key: "high_regs",       label: "High severity regulatory changes",  desc: "Daily digest at 9am workspace time." },
  { key: "filings_due",     label: "Filings due in <7 days",            desc: "Slack channel + email." },
  { key: "filing_overdue",  label: "Filings overdue",                   desc: "Immediate Slack DM + email." },
  { key: "audit_room",      label: "Audit Room activity",                desc: "Notify when auditors post or upload." },
  { key: "weekly_digest",   label: "Weekly digest",                     desc: "Monday morning — top 5 changes, filing burn-down, evidence freshness." },
  { key: "copilot_results", label: "Copilot completed long tasks",      desc: "Notify when a long-running Copilot job finishes." },
  { key: "mentions",        label: "@mentions",                          desc: "Direct mentions in any thread." }
];

export default function NotificationsSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    critical_regs: true, high_regs: true, filings_due: true, filing_overdue: true,
    audit_room: true, weekly_digest: true, copilot_results: false, mentions: true
  });

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-base font-medium text-foreground">Notifications</h2>
        <p className="mt-1 text-sm text-muted-foreground">Channels Ledger uses to reach you: email, in-app, and Slack DM.</p>
      </div>

      <Card className="divide-y divide-border">
        {CHANNELS.map((c) => (
          <div key={c.key} className="flex items-center gap-4 p-4">
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{c.label}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{c.desc}</div>
            </div>
            <Switch
              checked={!!enabled[c.key]}
              onCheckedChange={(v) => setEnabled((e) => ({ ...e, [c.key]: v }))}
              aria-label={`Toggle ${c.label}`}
            />
          </div>
        ))}
      </Card>
    </div>
  );
}

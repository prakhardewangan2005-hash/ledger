"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const INTEGRATIONS = [
  { name: "Slack",        category: "communication", desc: "Pipe regulatory updates and filing reminders into your team channels.", connected: true },
  { name: "Google Drive", category: "files",         desc: "Index Drive folders as searchable evidence sources.",                  connected: true },
  { name: "Notion",       category: "docs",          desc: "Two-way sync for compliance playbooks and policies.",                  connected: false },
  { name: "Linear",       category: "tracking",      desc: "Open Ledger change projects as Linear issues for engineering owners.", connected: true },
  { name: "Fireblocks",   category: "custody",       desc: "Onchain attestations from your custody infrastructure.",               connected: true },
  { name: "Chainalysis",  category: "screening",     desc: "Sanctions screening and transaction monitoring data.",                  connected: true },
  { name: "Notabene",     category: "travel-rule",   desc: "Travel Rule message data for FATF-aligned jurisdictions.",              connected: false },
  { name: "Okta",         category: "identity",      desc: "SSO and SCIM provisioning for team management.",                       connected: false }
];

export default function IntegrationsSettingsPage() {
  const [state, setState] = useState(INTEGRATIONS.map((i) => i.connected));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-medium text-foreground">Integrations</h2>
        <p className="mt-1 text-sm text-muted-foreground">Connect the tools your compliance team already uses.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {INTEGRATIONS.map((i, idx) => (
          <Card key={i.name} className="flex items-start gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary">
              {i.name[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{i.name}</span>
                <Badge variant="muted" className="font-mono">{i.category}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
              <div className="mt-3 flex items-center gap-2">
                <Switch checked={state[idx]} onCheckedChange={(v) => setState((s) => s.map((x, j) => j === idx ? v : x))} />
                <span className="text-xs text-muted-foreground">{state[idx] ? "Connected" : "Disconnected"}</span>
                <Button variant="ghost" size="sm" className="ml-auto h-7 px-2 text-xs"><ExternalLink className="h-3 w-3" /> Docs</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

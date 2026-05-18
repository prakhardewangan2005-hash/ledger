"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Plus, Trash2 } from "lucide-react";

const KEYS = [
  { id: "k1", name: "Production · evidence-ingest",  prefix: "sk_live_a7d2",  scope: "evidence:write",                created: "Mar 12, 2026", lastUsed: "2 minutes ago" },
  { id: "k2", name: "Production · feed-reader",       prefix: "sk_live_b3e9",  scope: "regulations:read",              created: "Feb 04, 2026", lastUsed: "11 hours ago" },
  { id: "k3", name: "Staging · slack-bridge",         prefix: "sk_test_d18f",  scope: "activity:write, filings:read", created: "Apr 30, 2026", lastUsed: "3 days ago" }
];

export default function APISettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-medium text-foreground">API keys</h2>
          <p className="mt-1 text-sm text-muted-foreground">Server-to-server credentials. Rotate keys quarterly.</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5" /> Create key</Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {KEYS.map((k) => (
              <TableRow key={k.id}>
                <TableCell><span className="text-sm font-medium text-foreground">{k.name}</span></TableCell>
                <TableCell>
                  <span className="font-mono text-xs text-muted-foreground">{k.prefix}…<span className="ml-1 text-foreground/40">••••••••</span></span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {k.scope.split(",").map((s) => <Badge key={s} variant="outline" className="font-mono text-[9px]">{s.trim()}</Badge>)}
                  </div>
                </TableCell>
                <TableCell><span className="font-mono text-xs text-muted-foreground">{k.created}</span></TableCell>
                <TableCell><span className="font-mono text-xs text-muted-foreground">{k.lastUsed}</span></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="p-6">
        <h3 className="text-base font-medium text-foreground">Webhook URL</h3>
        <p className="mt-1 text-sm text-muted-foreground">Receive real-time events for regulatory feed updates and filing state changes.</p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 rounded-md border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-muted-foreground">
            https://api.northwind.xyz/v1/hooks/ledger
          </div>
          <Button variant="outline" size="sm"><Copy className="h-3.5 w-3.5" /> Copy</Button>
        </div>
      </Card>
    </div>
  );
}

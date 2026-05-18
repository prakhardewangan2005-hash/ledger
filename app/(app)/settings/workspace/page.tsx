"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function WorkspaceSettingsPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <Card className="p-6">
        <div>
          <h2 className="text-base font-medium text-foreground">Workspace profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">This is shown to your team and on filings.</p>
        </div>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Legal entity name</Label>
            <Input id="name" defaultValue="Northwind Markets Ltd." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticker">Trading name</Label>
            <Input id="ticker" defaultValue="Northwind" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Primary domain</Label>
            <Input id="domain" defaultValue="northwind.xyz" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hq">Headquarters</Label>
            <Input id="hq" defaultValue="Singapore" />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost">Reset</Button>
          <Button>Save changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <div>
          <h2 className="text-base font-medium text-foreground">Compliance posture</h2>
          <p className="mt-1 text-sm text-muted-foreground">Defaults Ledger uses when drafting filings and routing escalations.</p>
        </div>
        <Separator className="my-5" />
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Default escalation threshold</dt><dd className="mt-1 text-foreground">AI confidence &lt; 75%</dd></div>
          <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Outside counsel SLA</dt><dd className="mt-1 text-foreground">2 business days</dd></div>
          <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Evidence retention</dt><dd className="mt-1 text-foreground">7 years</dd></div>
          <div><dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">SOC 2 audit window</dt><dd className="mt-1 text-foreground">Q3 annually</dd></div>
        </dl>
      </Card>

      <Card className="border-destructive/40 p-6">
        <div>
          <h2 className="text-base font-medium text-destructive">Danger zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">Permanently delete this workspace and all evidence stored within it.</p>
        </div>
        <Separator className="my-5" />
        <Button variant="destructive">Delete workspace</Button>
      </Card>
    </div>
  );
}

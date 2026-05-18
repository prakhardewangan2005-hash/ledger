"use client";

import { PageHeader } from "@/components/app/page-header";
import { Section } from "@/components/app/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { initials } from "@/lib/utils";
import { TEAM } from "@/data/personas";
import { Plus, ShieldCheck, Users, ExternalLink, Lock } from "lucide-react";

const ROOMS = [
  {
    id: "ar_001",
    name: "Q2 SOC 2 Type II — PwC review",
    auditor: "PwC US — Pillar Audit",
    status: "active",
    jurisdiction: "US",
    progress: 64,
    artifacts: 142,
    threads: 8,
    members: [TEAM[0], TEAM[5], TEAM[1]],
    closesAt: "Jul 30, 2026"
  },
  {
    id: "ar_002",
    name: "MiCA whitepaper review — NWUSD",
    auditor: "Linklaters Frankfurt",
    status: "active",
    jurisdiction: "EU",
    progress: 38,
    artifacts: 47,
    threads: 3,
    members: [TEAM[0], TEAM[4]],
    closesAt: "Jun 30, 2026"
  },
  {
    id: "ar_003",
    name: "FCA cryptoasset annual — outside counsel",
    auditor: "Slaughter and May, London",
    status: "draft",
    jurisdiction: "UK",
    progress: 12,
    artifacts: 9,
    threads: 1,
    members: [TEAM[0], TEAM[4]],
    closesAt: "Aug 15, 2026"
  },
  {
    id: "ar_004",
    name: "ISO 27001 surveillance — A-LIGN",
    auditor: "A-LIGN",
    status: "closed",
    jurisdiction: "US",
    progress: 100,
    artifacts: 218,
    threads: 0,
    members: [TEAM[0], TEAM[5], TEAM[6]],
    closesAt: "Apr 02, 2026"
  }
];

const BUNDLES = [
  { id: "b1", name: "SOC 2 — Section 5 control evidence",  size: "1.4 GB",  items: 142, created: "May 17, 2026" },
  { id: "b2", name: "MiCA Title V — custody evidence pack", size: "318 MB",  items: 47,  created: "May 15, 2026" },
  { id: "b3", name: "Q1 board pack — compliance summary",   size: "44 MB",   items: 18,  created: "Apr 30, 2026" }
];

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Audit room"
        title="Where auditors and regulators meet."
        description="Permissioned rooms. Every artifact in scope is hashed and access-logged."
        actions={
          <>
            <Button variant="outline" size="sm"><Users className="h-3.5 w-3.5" /> Invite auditor</Button>
            <Button size="sm"><Plus className="h-3.5 w-3.5" /> New room</Button>
          </>
        }
      />

      {/* Stats strip */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Active rooms",    value: ROOMS.filter(r => r.status === "active").length.toString() },
          { label: "Open threads",    value: ROOMS.reduce((s, r) => s + r.threads, 0).toString() },
          { label: "Artifacts in scope", value: ROOMS.reduce((s, r) => s + r.artifacts, 0).toString() },
          { label: "Next close",      value: "Jun 30" }
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-bold text-3xl text-foreground">{s.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="Rooms">
            <div className="space-y-3">
              {ROOMS.map((room) => (
                <Card key={room.id} className="p-5 transition-colors hover:border-primary/30">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <JurisdictionPill code={room.jurisdiction} />
                        <Badge
                          variant={room.status === "active" ? "default" : room.status === "draft" ? "muted" : "success"}
                          className="capitalize"
                        >
                          {room.status === "active" ? <ShieldCheck className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          {room.status}
                        </Badge>
                        <span className="ml-auto font-mono text-[10px] text-muted-foreground">closes {room.closesAt}</span>
                      </div>
                      <h3 className="mt-2.5 text-sm font-medium text-foreground">{room.name}</h3>
                      <div className="font-mono text-[10px] text-muted-foreground">{room.auditor}</div>

                      <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
                        <span>{room.artifacts} artifacts</span>
                        <span>{room.threads} threads</span>
                        <div className="flex -space-x-2">
                          {room.members.map((m) => (
                            <Avatar key={m.id} className="h-5 w-5 ring-2 ring-card">
                              <AvatarFallback style={{ background: m.avatarColor, color: "white" }} className="text-[9px]">
                                {initials(m.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <Progress value={room.progress} className="h-1.5 flex-1" />
                        <span className="font-mono text-[10px] text-muted-foreground">{room.progress}%</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Open room">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </div>

        <aside>
          <Section title="Evidence bundles">
            <div className="space-y-2">
              {BUNDLES.map((b) => (
                <Card key={b.id} className="p-4">
                  <div className="text-sm font-medium text-foreground">{b.name}</div>
                  <div className="mt-1.5 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                    <span>{b.items} items</span>
                    <span>·</span>
                    <span>{b.size}</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">created {b.created}</div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">Download bundle</Button>
                </Card>
              ))}
            </div>
          </Section>
        </aside>
      </div>
    </div>
  );
}

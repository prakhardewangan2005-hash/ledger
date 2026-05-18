"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Paperclip, Send, Eye } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Section } from "@/components/app/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { FilingStatusPill } from "@/components/app/status-pill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AICard } from "@/components/app/ai-card";
import { FILINGS } from "@/data/filings";
import { EVIDENCE } from "@/data/evidence";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";

export default function FilingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const filing = FILINGS.find((f) => f.id === id);
  if (!filing) notFound();

  const attached = EVIDENCE.slice(0, filing.evidenceCount);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link href="/filings" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> All filings
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow={`filing · ${filing.type}`}
          title={filing.title}
          actions={
            <>
              <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /> Preview</Button>
              <Button size="sm"><Send className="h-3.5 w-3.5" /> Submit for review</Button>
            </>
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <JurisdictionPill code={filing.jurisdiction} />
        <FilingStatusPill status={filing.status} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{filing.regulator}</span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AICard title="Copilot · readiness check" confidence={0.91}>
            Filing is on track. {attached.length} evidence artifacts attached, {filing.evidenceCount > 0 ? "all timestamped and hash-attested" : "none yet"}. Suggested next step: route to <strong>Lin Wei</strong> for legal review before submission. Estimated time to ready: 2 business days.
          </AICard>

          <Card className="p-5">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Completion</div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Source data collected", done: true },
                { label: "AI-drafted submission", done: true },
                { label: "Internal review by compliance lead", done: filing.status !== "draft" },
                { label: "Legal sign-off", done: filing.status === "ready" || filing.status === "filed" },
                { label: "Submitted to regulator", done: filing.status === "filed" }
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] ${
                    step.done ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"
                  }`}>
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span className={`text-sm ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Progress value={filing.status === "filed" ? 100 : filing.status === "ready" ? 80 : filing.status === "in-review" ? 60 : 40} />
            </div>
          </Card>

          <Section title={`Attached evidence · ${attached.length}`}>
            <div className="space-y-2">
              {attached.length === 0 ? (
                <Card className="p-6 text-sm text-muted-foreground">No evidence attached yet.</Card>
              ) : attached.map((e) => (
                <Card key={e.id} className="flex items-center gap-3 p-4">
                  <Paperclip className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-foreground">{e.title}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{e.source} · {fmtDate(e.collectedAt)} · {e.hash}</div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </div>

        <aside className="space-y-5">
          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Timeline</div>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Due</dt><dd className="text-foreground">{fmtDate(filing.dueAt, { withYear: true })}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Regulator</dt><dd className="text-foreground">{filing.regulator}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="text-foreground">{filing.type}</dd></div>
            </dl>
          </Card>

          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Owner</div>
            <div className="mt-3 flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback style={{ background: filing.owner.avatarColor, color: "white" }}>{initials(filing.owner.name)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-foreground">{filing.owner.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{filing.owner.role}</div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

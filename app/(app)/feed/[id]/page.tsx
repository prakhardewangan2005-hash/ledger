"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText, Share2, Star } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { AICard } from "@/components/app/ai-card";
import { Section } from "@/components/app/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { SeverityPill } from "@/components/app/severity-pill";
import { RegulationStatusPill } from "@/components/app/status-pill";
import { Citation } from "@/components/app/citation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { REGULATIONS } from "@/data/regulations";
import { PRODUCTS } from "@/data/products";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";

export default function RegulationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const reg = REGULATIONS.find((r) => r.id === id);
  if (!reg) notFound();

  const products = PRODUCTS.filter((p) => reg.productsAffected.includes(p.id));

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <Link href="/feed" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Back to feed
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow={reg.citation}
          title={reg.title}
          actions={
            <>
              <Button variant="ghost" size="icon" aria-label="Star"><Star className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Share"><Share2 className="h-4 w-4" /></Button>
              <Button size="sm"><FileText className="h-3.5 w-3.5" /> Open change project</Button>
            </>
          }
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {reg.jurisdictions.map((j) => <JurisdictionPill key={j} code={j} />)}
        <SeverityPill severity={reg.severity} />
        <RegulationStatusPill status={reg.status} />
        {reg.tags.map((t) => <span key={t} className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">#{t}</span>)}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <AICard title="Copilot summary" confidence={reg.aiConfidence}>{reg.summary}</AICard>

          <Card className="p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Source text excerpt</h2>
            <div className="mt-4 rounded-md border border-border bg-muted/30 p-4 font-mono text-[11px] leading-relaxed text-foreground/90">
              {reg.id === "reg_mica_t5_60" && (
                <>
                  <span className="text-muted-foreground">Article 60(3a) —</span> A crypto-asset service provider that custodies qualifying crypto-assets shall publish, on its website, a quarterly attestation, signed by a registered statutory auditor, of the composition and reserve backing of any qualifying crypto-asset that represents more than five per cent (5%) of the total assets under custody. The attestation shall be published within thirty (30) days following the end of each quarter.
                </>
              )}
              {reg.id === "reg_genius_act" && (
                <>
                  <span className="text-muted-foreground">§5(b)(1) —</span> A permitted payment stablecoin issuer shall hold reserves equal to or greater than the aggregate amount of the issuer's outstanding payment stablecoins, consisting solely of (i) United States coins and currency, (ii) demand deposits at an insured depository institution, (iii) Treasury bills with a remaining maturity of ninety-three days or less, and (iv) overnight reverse repurchase agreements collateralized by securities described in clause (iii).
                </>
              )}
              {reg.id !== "reg_mica_t5_60" && reg.id !== "reg_genius_act" && (
                <>{reg.summary}</>
              )}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Citation>{reg.citation}</Citation>
              <Citation>{reg.source}</Citation>
              <Button variant="link" size="sm" asChild className="ml-auto h-auto p-0 text-xs">
                <a href={reg.sourceUrl} target="_blank" rel="noreferrer">
                  Read full text <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </Card>

          <Section title="Products affected">
            <div className="space-y-2">
              {products.map((p) => {
                const cell = p.cells.find((c) => reg.jurisdictions.includes(c.jurisdiction));
                return (
                  <Link key={p.id} href={`/products/${p.id}`} className="block">
                    <Card className="p-4 transition-colors hover:border-primary/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-foreground">{p.name}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{p.category}</div>
                        </div>
                        <div className="text-right">
                          {cell?.license ? <div className="font-mono text-[10px] text-muted-foreground">{cell.license}</div> : null}
                          <div className="font-mono text-[10px] text-muted-foreground">{cell?.obligations ?? 0} open obligations</div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </Section>
        </div>

        <aside className="space-y-5">
          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Timeline</div>
            <dl className="mt-3 space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Published</dt><dd className="text-foreground">{fmtDate(reg.publishedAt, { withYear: true })}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Effective</dt><dd className="text-foreground">{fmtDate(reg.effectiveAt, { withYear: true })}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Length</dt><dd className="text-foreground">{reg.pages} pages</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">AI confidence</dt><dd className="text-foreground">{Math.round(reg.aiConfidence * 100)}%</dd></div>
            </dl>
          </Card>

          {reg.owner ? (
            <Card className="p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Owner</div>
              <div className="mt-3 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback style={{ background: reg.owner.avatarColor, color: "white" }}>{initials(reg.owner.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">{reg.owner.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{reg.owner.role}</div>
                </div>
              </div>
            </Card>
          ) : null}

          <Card className="p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Sources</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={reg.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-foreground hover:underline"><ExternalLink className="h-3 w-3" />{reg.source} · {reg.citation}</a></li>
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}

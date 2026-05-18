"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit3, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Section } from "@/components/app/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { ProductStatusPill } from "@/components/app/status-pill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/data/products";
import { REGULATIONS } from "@/data/regulations";
import { JURISDICTIONS } from "@/data/jurisdictions";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const relatedRegulations = REGULATIONS.filter((r) => r.productsAffected.includes(product.id));
  const totalObligations = product.cells.reduce((sum, c) => sum + c.obligations, 0);
  const liveCells = product.cells.filter((c) => c.status === "live");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> All products
      </Link>

      <div className="mt-4">
        <PageHeader
          eyebrow={`product · ${product.category}`}
          title={product.name}
          description={product.description}
          actions={
            <>
              <Button variant="outline" size="sm"><Edit3 className="h-3.5 w-3.5" /> Edit</Button>
              <Button size="sm"><Plus className="h-3.5 w-3.5" /> Launch in new jurisdiction</Button>
            </>
          }
        />
      </div>

      {/* Stats strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Live in", value: `${liveCells.length} jurisdictions` },
          { label: "Open obligations", value: totalObligations.toString() },
          { label: "Owner", value: product.owner.name },
          { label: "Last changed", value: fmtDate(product.lastChanged) }
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-base font-medium text-foreground">{s.value}</div>
          </Card>
        ))}
      </div>

      {/* Jurisdiction status table */}
      <div className="mt-10">
        <Section title="Status by jurisdiction">
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Jurisdiction</th>
                  <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</th>
                  <th className="px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">License</th>
                  <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Open obligations</th>
                  <th className="px-4 py-2.5 text-right font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Last reviewed</th>
                </tr>
              </thead>
              <tbody>
                {product.cells.map((cell) => {
                  const j = JURISDICTIONS.find((x) => x.code === cell.jurisdiction)!;
                  return (
                    <tr key={cell.jurisdiction} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <JurisdictionPill code={cell.jurisdiction} />
                          <span className="text-sm text-foreground">{j.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><ProductStatusPill status={cell.status} /></td>
                      <td className="px-4 py-3 text-sm text-foreground/90">{cell.license || <span className="text-muted-foreground">—</span>}</td>
                      <td className="px-4 py-3 text-right font-mono text-sm text-foreground">{cell.obligations}</td>
                      <td className="px-4 py-3 text-right font-mono text-xs text-muted-foreground">{fmtDate(cell.lastReviewed)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </Section>
      </div>

      {/* Related regulations */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Section title="Recent regulatory changes affecting this product">
            <div className="space-y-3">
              {relatedRegulations.length === 0 ? (
                <Card className="p-6 text-sm text-muted-foreground">No regulations currently tracked.</Card>
              ) : relatedRegulations.map((r) => (
                <Link key={r.id} href={`/feed/${r.id}`}>
                  <Card className="p-4 transition-colors hover:border-primary/30">
                    <div className="flex items-center gap-2">
                      {r.jurisdictions.map((j) => <JurisdictionPill key={j} code={j} />)}
                      <Badge variant={r.severity === "critical" ? "destructive" : "warning"} className="capitalize">{r.severity}</Badge>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">{r.citation}</span>
                    </div>
                    <div className="mt-2 text-sm font-medium text-foreground">{r.title}</div>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        </div>

        <aside>
          <Section title="Owner">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback style={{ background: product.owner.avatarColor, color: "white" }}>{initials(product.owner.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-foreground">{product.owner.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{product.owner.role}</div>
                </div>
              </div>
            </Card>
          </Section>
        </aside>
      </div>
    </div>
  );
}

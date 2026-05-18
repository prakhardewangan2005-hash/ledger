"use client";

import { PageHeader } from "@/components/app/page-header";
import { ProductMatrix } from "@/components/app/product-matrix";
import { Section } from "@/components/app/section";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

const LEGEND = [
  { label: "Live", color: "bg-success/15 text-success border-success/30" },
  { label: "Pending", color: "bg-warning/15 text-warning border-warning/30" },
  { label: "Blocked", color: "bg-destructive/10 text-destructive border-destructive/30" },
  { label: "Not offered", color: "bg-transparent text-muted-foreground/40 border-border" }
];

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Products"
        title="The matrix."
        description="Every product. Every jurisdiction. Click a cell for license details, open obligations, and review history."
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Export</Button>
            <Button size="sm"><Plus className="h-3.5 w-3.5" /> New product</Button>
          </>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {LEGEND.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-2 font-mono text-[11px]">
            <span className={`flex h-4 w-12 items-center justify-center rounded border ${l.color}`} />
            <span className="text-muted-foreground">{l.label}</span>
          </span>
        ))}
      </div>

      <div className="mt-6">
        <ProductMatrix />
      </div>

      <div className="mt-10">
        <Section title="Notes">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>· Hover any cell for license, obligation count, and last review date.</li>
            <li>· Click a product name for the full status detail and change history.</li>
            <li>· The matrix re-validates every cell every 24 hours against the regulatory feed.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

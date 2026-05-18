"use client";

import { motion } from "framer-motion";
import { Rss, LayoutGrid, Sparkles, Archive, ShieldCheck, Zap } from "lucide-react";

const FEATURES = [
  {
    Icon: Rss,
    title: "Regulatory feed",
    body: "Every published rule, advisory, and consultation in your operating jurisdictions, summarized and ranked by impact. AI confidence is shown on every card.",
    accent: "col-span-12 md:col-span-7"
  },
  {
    Icon: LayoutGrid,
    title: "Product matrix",
    body: "Rows are products. Columns are jurisdictions. The one view a Head of Compliance can hand to the board.",
    accent: "col-span-12 md:col-span-5"
  },
  {
    Icon: Sparkles,
    title: "AI Copilot",
    body: "A junior analyst that always shows its work — citations on every claim, confidence on every verdict, one click to challenge.",
    accent: "col-span-12 md:col-span-5"
  },
  {
    Icon: Archive,
    title: "Evidence vault",
    body: "Timestamped, hash-attested, control-mapped. Pull a complete audit bundle in one click instead of a three-week scramble.",
    accent: "col-span-12 md:col-span-7"
  },
  {
    Icon: ShieldCheck,
    title: "Audit room",
    body: "External counsel and regulators share a permissioned room. Every artifact in scope, every conversation logged.",
    accent: "col-span-12 md:col-span-6"
  },
  {
    Icon: Zap,
    title: "Filings on calendar time",
    body: "Surface deadlines like sprint commitments. Owners, dependencies, evidence — visible.",
    accent: "col-span-12 md:col-span-6"
  }
];

export function FeatureBento() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">the surface</p>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Six surfaces. <span className="font-serif italic font-normal text-primary">One workflow.</span>
        </h2>
        <p className="mt-4 text-pretty text-base font-medium text-muted-foreground">
          Every screen is shaped around a real compliance operation — not a generic GRC table view.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-12 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className={`${f.accent} group relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-extruded card-shimmer transition-colors`}
          >
            <div className="bg-noise absolute inset-0 pointer-events-none" />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <f.Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

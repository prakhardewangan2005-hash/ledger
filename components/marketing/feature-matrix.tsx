"use client";

import { motion } from "framer-motion";

const ROWS = [
  { p: "Spot",         cells: ["live", "live", "live", "live", "live", "pending", "live", "live"] },
  { p: "Vault",        cells: ["live", "live", "live", "live", "blocked", "—", "live", "live"] },
  { p: "Derivatives",  cells: ["blocked", "live", "live", "—", "live", "—", "pending", "—"] },
  { p: "Earn",         cells: ["live", "—", "blocked", "blocked", "pending", "—", "—", "live"] },
  { p: "NWUSD",        cells: ["live", "live", "live", "pending", "live", "—", "—", "—"] },
  { p: "Pay",          cells: ["live", "live", "live", "live", "—", "—", "—", "—"] }
];
const COLS = ["EU", "US", "SG", "UK", "AE", "JP", "HK", "CH"];

const STATUS_STYLES: Record<string, string> = {
  live: "bg-success/15 text-success border-success/30",
  pending: "bg-warning/15 text-warning border-warning/30",
  blocked: "bg-destructive/10 text-destructive border-destructive/30",
  "—": "bg-transparent text-muted-foreground/40 border-border"
};

export function FeatureMatrix() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">product × jurisdiction</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          The one view <span className="font-serif italic font-normal text-primary">your CEO will ask for.</span>
        </h2>
        <p className="mt-4 text-pretty text-base font-medium text-muted-foreground">
          Every product. Every jurisdiction. Every license, obligation, and last-reviewed timestamp — at a glance.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 overflow-x-auto rounded-2xl border border-border bg-card p-1.5 card-extruded card-shimmer"
      >
        <table className="w-full min-w-[760px] border-separate border-spacing-1.5 text-sm">
          <thead>
            <tr>
              <th className="w-32 px-2 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Product</th>
              {COLS.map((c) => (
                <th key={c} className="px-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.p}>
                <td className="rounded-md bg-background/40 px-3 py-2 text-sm font-semibold text-foreground">{row.p}</td>
                {row.cells.map((cell, i) => (
                  <td key={i} className="px-1">
                    <div className={`flex h-9 items-center justify-center rounded-md border font-mono text-[10px] font-semibold uppercase tracking-[0.1em] ${STATUS_STYLES[cell]}`}>
                      {cell === "—" ? "·" : cell}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}

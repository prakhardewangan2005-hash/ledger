"use client";

import { motion } from "framer-motion";

export function FeatureFeed() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">regulatory feed</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Find out from us, <span className="font-serif italic font-normal text-primary">not from Twitter.</span>
          </h2>
          <p className="mt-5 text-pretty text-base font-medium text-muted-foreground">
            The median crypto compliance team learns about a regulatory change <em className="font-semibold not-italic">nine days</em> after publication. Ledger surfaces it within two hours — summarized, ranked, and pre-mapped to the products it affects.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { k: "Sources", v: "EUR-Lex · Federal Register · MAS · FCA · VARA · JFSA · SFC · FINMA · OFAC · FATF" },
              { k: "Coverage", v: "Crypto-asset-specific. No noise from unrelated finance rulemaking." },
              { k: "Latency", v: "Median 90 minutes from publication to feed surface." },
              { k: "AI summary", v: "1-paragraph plain-English explanation with citation and confidence score." }
            ].map((x) => (
              <li key={x.k} className="flex gap-3">
                <span className="w-24 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{x.k}</span>
                <span className="font-medium text-foreground/90">{x.v}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-border bg-card p-1.5 card-extruded card-shimmer"
        >
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">EU · ESMA</span>
                <span className="inline-flex items-center rounded bg-warning/15 px-1.5 py-0.5 text-[10px] font-bold text-warning">high</span>
                <span className="font-mono text-[10px] font-medium text-muted-foreground">published 4h ago</span>
              </div>
              <span className="font-mono text-[10px] font-semibold text-muted-foreground">AI · 92%</span>
            </div>
            <h3 className="mt-3 text-base font-bold text-foreground">
              MiCA custody disclosure amendment — qualifying crypto-asset reserves
            </h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
              Amends Article 60 to require crypto-asset service providers offering custody to disclose, on a quarterly basis, the composition and proof of reserves for any qualifying crypto-asset above a 5% portfolio threshold. The amendment introduces a new attestation requirement signed by a registered auditor.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Vault", "Spot", "Earn"].map((p) => (
                <span key={p} className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">{p}</span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Effective</div>
                <div className="mt-0.5 text-sm font-semibold text-foreground">Sep 30, 2026</div>
              </div>
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Owner</div>
                <div className="mt-0.5 text-sm font-semibold text-foreground">Marcus Chen</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

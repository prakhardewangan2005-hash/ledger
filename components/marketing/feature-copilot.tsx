"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function FeatureCopilot() {
  return (
    <section className="relative isolate overflow-hidden bg-card/40 py-24">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl border border-border bg-background/80 p-5 card-extruded card-shimmer backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono font-semibold uppercase tracking-[0.14em] text-muted-foreground">copilot · with citations</span>
              </div>

              <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 text-sm text-foreground">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">priya · 10:42</span>
                <p className="mt-1 font-medium">Are we ready for the GENIUS Act monthly reserve attestation that&rsquo;s due June 15?</p>
              </div>

              <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3.5 text-sm font-medium leading-relaxed text-foreground">
                Yes. NWUSD reserves as of May 17 are <span className="font-mono font-semibold">$2.41B</span>, composition: <span className="font-mono font-semibold">82.4%</span> 30-day T-bills, <span className="font-mono font-semibold">14.1%</span> overnight reverse repo, <span className="font-mono font-semibold">3.5%</span> demand deposits at FDIC-insured institutions. Required attestation evidence is collected (Fireblocks API, BNY Mellon custody confirmation, PwC sign-off scheduled May 31). I&rsquo;ve drafted the filing and assigned to Lin Wei for sign-off.
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Citation>GENIUS Act §5(b)</Citation>
                  <Citation>OCC final rule · §301.4</Citation>
                  <Citation>Evidence vault · 4 items</Citation>
                </div>
                <div className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  AI confidence · 96% · Sources verified by Lin Wei
                </div>
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">AI copilot</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              A junior analyst <span className="font-serif italic font-normal text-primary">that shows its work.</span>
            </h2>
            <p className="mt-5 text-pretty text-base font-medium text-muted-foreground">
              Every answer is grounded in your own workspace — your regulations, your products, your evidence, your filings. Citations are mandatory. Confidence is visible. The right answer is never a black box.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Cites primary sources on every claim — EUR-Lex, Federal Register, MAS notices, FCA handbook",
                "Pulls live evidence from your vault; flags freshness on every artifact used",
                "Routes ambiguous interpretation to outside counsel directly from the chat",
                "Every answer is reviewable, revocable, and logged for audit"
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span className="font-medium text-foreground/90">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Citation({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">
      {children}
    </span>
  );
}

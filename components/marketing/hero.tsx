"use client";

import { motion } from "framer-motion";
import { Sparkles, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContactButton } from "@/components/marketing/contact-button";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_PHONE_HREF, CONTACT_EMAIL_HREF } from "@/lib/contact";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="outline" className="mb-6 gap-2 px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="font-mono uppercase tracking-[0.18em] text-muted-foreground">
              MiCA · GENIUS · MAS · FCA · VARA — covered
            </span>
          </Badge>

          <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-[-0.025em] text-foreground sm:text-6xl md:text-[76px]">
            Regulatory operations,{" "}
            <span className="font-serif italic font-normal text-primary">at the speed of product.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-balance text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            Ledger turns every regulation, jurisdictional launch, and audit request into a tracked, owned,
            evidence-backed workflow — so your compliance team ships at the same cadence as your engineering team.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ContactButton size="xl" threed arrow label="Get in touch" className="min-w-[200px] text-base" />
            <a
              href={CONTACT_PHONE_HREF}
              className="btn-3d-outline inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span className="font-mono text-[13px]">{CONTACT_PHONE}</span>
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <a href={CONTACT_EMAIL_HREF} className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Mail className="h-3 w-3" />
              <span className="normal-case tracking-normal">{CONTACT_EMAIL}</span>
            </a>
            <span className="text-muted-foreground/40">·</span>
            <span>SOC 2 · ISO 27001 · GDPR</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <div className="relative rounded-2xl border border-border bg-card/60 p-2 card-extruded card-shimmer backdrop-blur-md float-soft">
            <div className="relative rounded-xl border border-border bg-background overflow-hidden">
              <HeroPreview />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="grid grid-cols-12 divide-x divide-border min-h-[460px]">
      <div className="col-span-3 hidden flex-col gap-1 p-4 lg:flex">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2 font-semibold">workspace</div>
        {[
          { label: "Today", active: true },
          { label: "Feed", count: 12 },
          { label: "Products", count: 6 },
          { label: "Filings", count: 10 },
          { label: "Evidence", count: 142 },
          { label: "Copilot" },
          { label: "Audit" }
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm font-medium ${
              item.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <span>{item.label}</span>
            {item.count !== undefined ? (
              <span className="font-mono text-[10px] text-muted-foreground">{item.count}</span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="col-span-12 flex flex-col p-6 lg:col-span-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">live feed</div>
        <h3 className="mt-1 text-base font-bold text-foreground">3 new regulatory changes today</h3>

        <div className="mt-4 space-y-3">
          {[
            { tag: "EU · ESMA", title: "MiCA custody disclosure amendment", severity: "high", products: 3 },
            { tag: "US · OCC", title: "GENIUS Act monthly reserve attestation rules finalized", severity: "critical", products: 1 },
            { tag: "AE · VARA", title: "Regulated staking — registration window opens June 1", severity: "high", products: 1 }
          ].map((row) => (
            <div key={row.title} className="rounded-md border border-border bg-card/50 p-3.5 hover:bg-accent/40 transition-colors">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">{row.tag}</span>
                <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  row.severity === "critical" ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-warning"
                }`}>
                  {row.severity}
                </span>
              </div>
              <div className="mt-1.5 text-sm font-semibold text-foreground">{row.title}</div>
              <div className="mt-1 text-xs font-medium text-muted-foreground">{row.products} {row.products === 1 ? "product" : "products"} affected · AI confidence 91%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 flex flex-col gap-3 p-6 lg:col-span-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
          <Sparkles className="h-3 w-3 text-primary" /> copilot
        </div>
        <div className="rounded-md border border-border bg-card/50 p-3">
          <div className="text-xs font-medium text-muted-foreground italic">&ldquo;Can we launch staking in Germany?&rdquo;</div>
        </div>
        <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
          <div className="text-xs font-medium leading-relaxed text-foreground">
            Three regulatory surfaces apply. BaFin §32 KWG — out of scope (variable yield). MiCA Title III — in scope from Dec 30. GwG §10 — enhanced KYC for staked balances over <span className="font-mono font-semibold text-foreground">€15,000</span>.
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["MiCA Title III", "KWG §32", "GwG §10"].map((c) => (
              <span key={c} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground">{c}</span>
            ))}
          </div>
        </div>
        <div className="mt-auto rounded-md border border-dashed border-border p-2.5 text-center text-[11px] font-medium text-muted-foreground">
          Ledger drafted a project plan · 4–6 weeks
        </div>
      </div>
    </div>
  );
}

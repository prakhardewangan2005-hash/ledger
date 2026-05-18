"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How is Ledger different from ComplyAdvantage or Chainalysis?",
    a: "Those tools surveil transactions. Ledger runs the workflow that sits around them — regulatory tracking, jurisdictional product status, evidence preservation, filing prep, and audit response. We integrate with them, not replace them."
  },
  {
    q: "How does the AI Copilot avoid hallucinating about regulations?",
    a: "Every claim is grounded in your own workspace — your regulations, your products, your evidence. Every answer ships with primary-source citations (EUR-Lex, Federal Register, MAS notices, etc.) and an AI confidence score. Low-confidence answers are routed to a human-review queue by default."
  },
  {
    q: "Which jurisdictions are covered at launch?",
    a: "EU (under MiCA), US (federal + 43 states), Singapore, United Kingdom, UAE, Japan, Hong Kong, and Switzerland. We add jurisdictions in response to customer demand — typically 4–6 weeks from request to live coverage."
  },
  {
    q: "Can my compliance team migrate from Notion or Excel-based workflows?",
    a: "Yes. We have an importer for Notion, Confluence, Google Drive, and Excel. The median migration takes 2.5 days for a 5-jurisdiction firm. We do it with you, not for you."
  },
  {
    q: "What security certifications do you hold?",
    a: "SOC 2 Type II (annual), ISO 27001, and GDPR / UK-GDPR controller alignment. Enterprise deployments support private VPC, customer-managed encryption keys, and on-prem self-hosted via a Kubernetes Helm chart."
  },
  {
    q: "Do you sell to non-crypto firms?",
    a: "No. Ledger is crypto-native by design — every workflow, every taxonomy, every regulatory model is shaped around digital-asset operations. A horizontal GRC tool will always beat us at horizontal use cases; we don't try."
  }
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">questions</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Quietly <span className="font-serif italic font-normal text-primary">answered.</span>
        </h2>
      </div>
      <div className="mt-10 divide-y divide-border border-y border-border">
        {FAQS.map((item, i) => (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
              aria-expanded={open === i}
            >
              <span className="pr-6 text-base font-semibold text-foreground">{item.q}</span>
              {open === i ? <Minus className="h-4 w-4 shrink-0 text-muted-foreground" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}
            </button>
            <AnimatePresence initial={false}>
              {open === i ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm font-medium leading-relaxed text-muted-foreground">{item.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

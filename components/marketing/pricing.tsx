"use client";

import { Check } from "lucide-react";
import { ContactButton } from "@/components/marketing/contact-button";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Team",
    blurb: "For compliance teams operating in 1–5 jurisdictions.",
    price: "$2,400",
    cadence: "/ month",
    features: [
      "Up to 10 compliance seats",
      "5 jurisdictions, 5 products",
      "Regulatory feed + AI summaries",
      "Evidence vault, 50 GB",
      "Email + Slack notifications",
      "SOC 2 Type II + ISO 27001"
    ],
    ctaLabel: "Talk to us",
    accent: false
  },
  {
    name: "Scale",
    blurb: "For multi-jurisdictional crypto-native firms.",
    price: "$7,800",
    cadence: "/ month",
    features: [
      "Unlimited seats",
      "All 27+ jurisdictions",
      "AI Copilot with custom playbooks",
      "Evidence vault, 1 TB + immutable storage",
      "Audit room + outside counsel routing",
      "SSO, SCIM, audit log API",
      "Dedicated solutions engineer"
    ],
    ctaLabel: "Talk to sales",
    accent: true
  },
  {
    name: "Enterprise",
    blurb: "For listed issuers and global custodians.",
    price: "Custom",
    cadence: "",
    features: [
      "Everything in Scale",
      "Private deployment (VPC / on-prem)",
      "Custom regulation onboarding",
      "Dedicated regulatory analyst (named)",
      "99.99% uptime SLA + 24/7 incident channel",
      "Regulator-direct read access"
    ],
    ctaLabel: "Contact us",
    accent: false
  }
];

export function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">pricing</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Priced like the work,{" "}
          <span className="font-serif italic font-normal text-primary">not the seats.</span>
        </h2>
        <p className="mt-4 text-pretty text-base font-medium text-muted-foreground">
          Three tiers. Everyone gets the full surface. The difference is jurisdictional coverage and deployment shape.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex flex-col rounded-2xl border p-7 card-extruded card-shimmer",
              tier.accent ? "border-primary/50 bg-primary/[0.04]" : "border-border bg-card"
            )}
          >
            {tier.accent ? (
              <span className="absolute right-5 top-5 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                Most picked
              </span>
            ) : null}
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{tier.name}</h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{tier.blurb}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-bold tracking-tight text-foreground">{tier.price}</span>
              <span className="pb-1.5 text-sm font-medium text-muted-foreground">{tier.cadence}</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ContactButton
                label={tier.ctaLabel}
                size="default"
                variant={tier.accent ? "default" : "outline"}
                threed
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

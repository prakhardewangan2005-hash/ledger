import { Phone } from "lucide-react";
import { ContactButton } from "@/components/marketing/contact-button";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contact";

export function CTA() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-card/40 py-24">
      <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">begin</p>
        <h2 className="mt-3 text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Ship products. Pass audits.{" "}
          <span className="font-serif italic font-normal text-primary">Sleep at night.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base font-medium text-muted-foreground">
          A guided 30-minute walkthrough with our team. No deck, no SDR. Just your real compliance backlog on a screen share.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ContactButton size="xl" threed arrow label="Get in touch" className="min-w-[200px] text-base" />
          <a
            href={CONTACT_PHONE_HREF}
            className="btn-3d-outline inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="font-mono text-[13px]">{CONTACT_PHONE}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pt-24 text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">pricing</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Honest <span className="font-serif italic font-normal text-primary">pricing.</span>
        </h1>
        <p className="mt-4 text-pretty text-base font-medium text-muted-foreground">
          Three tiers. Everyone gets the full surface. The difference is jurisdictional coverage and deployment shape.
        </p>
      </section>
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

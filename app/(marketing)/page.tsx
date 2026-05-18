import { Hero } from "@/components/marketing/hero";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { FeatureBento } from "@/components/marketing/feature-bento";
import { FeatureFeed } from "@/components/marketing/feature-feed";
import { FeatureCopilot } from "@/components/marketing/feature-copilot";
import { FeatureMatrix } from "@/components/marketing/feature-matrix";
import { Pricing } from "@/components/marketing/pricing";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <FeatureBento />
      <FeatureFeed />
      <FeatureCopilot />
      <FeatureMatrix />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}

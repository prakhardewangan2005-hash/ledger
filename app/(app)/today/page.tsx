"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Plus } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Section } from "@/components/app/section";
import { KPICard } from "@/components/app/kpi-card";
import { RegulationCard } from "@/components/app/regulation-card";
import { FilingCard } from "@/components/app/filing-card";
import { ActivityFeed } from "@/components/app/activity-feed";
import { AICard } from "@/components/app/ai-card";
import { Citation } from "@/components/app/citation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartArea } from "@/components/app/chart-area";
import { KPIS } from "@/data/kpis";
import { REGULATIONS } from "@/data/regulations";
import { FILINGS } from "@/data/filings";
import { ME } from "@/data/personas";

const VELOCITY_TREND = [
  { label: "Jan", value: 1.9 },
  { label: "Feb", value: 2.4 },
  { label: "Mar", value: 2.9 },
  { label: "Apr", value: 3.4 },
  { label: "May", value: 3.8 }
];

export default function TodayPage() {
  // Hydration-safe greeting + date. Server renders fallback; effect updates on client.
  const [greeting, setGreeting] = useState("Welcome back");
  const [dateLabel, setDateLabel] = useState("Today");

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    setDateLabel(new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
  }, []);

  const topRegs = REGULATIONS.slice(0, 3);
  const urgentFilings = FILINGS.filter((f) => f.status !== "filed").slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow={dateLabel}
        title={`${greeting}, ${ME.name.split(" ")[0]}.`}
        description="Twelve open regulatory changes. Four filings due this week. Two products waiting on Dubai launch sign-off."
        actions={
          <>
            <Button variant="outline" size="sm" className="font-semibold">
              <Calendar className="h-3.5 w-3.5" /> This week
            </Button>
            <Button size="sm" className="font-semibold">
              <Plus className="h-3.5 w-3.5" /> New project
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi, i) => <KPICard key={kpi.id} kpi={kpi} index={i} />)}
      </div>

      {/* AI brief */}
      <div className="mt-8">
        <AICard title="Today's brief" confidence={0.92} citations={["MiCA Art. 60", "OFAC CV-2026-08", "VARA Rulebook Ch. 4 §4.6"]}>
          Three items deserve attention this morning. <strong className="font-bold">MiCA Article 60</strong> custody disclosure amendment was published Friday — affects Spot, Vault, and Earn in the EU; suggest opening a change project today.{" "}
          <strong className="font-bold">OFAC issued Advisory CV-2026-08</strong> on cross-chain bridge sanctions risk — Lin Wei is the natural owner.{" "}
          <strong className="font-bold">VARA&rsquo;s regulated-staking registration window</strong> opens June 1 — three weeks of internal prep needed for our Earn product Dubai launch. I&rsquo;ve sketched a project plan for each; ask me to draft any of them in full.
        </AICard>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Velocity trend */}
        <div className="lg:col-span-2">
          <Section
            title="Compliance velocity · 5-month trend"
            action={<Link href="/feed" className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">View detail →</Link>}
          >
            <Card className="p-5">
              <ChartArea data={VELOCITY_TREND} />
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-muted-foreground">Q1 2026 baseline · 1.9×</span>
                <Citation>internal · velocity-attribution.md</Citation>
              </div>
            </Card>
          </Section>
        </div>

        {/* Activity */}
        <Section title="Activity" action={<span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">team · 8 today</span>}>
          <Card className="p-5">
            <ActivityFeed limit={7} />
          </Card>
        </Section>
      </div>

      {/* Top regs */}
      <div className="mt-10">
        <Section
          title="Top regulatory changes"
          action={<Link href="/feed" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">All updates <ArrowRight className="h-3 w-3" /></Link>}
        >
          <motion.div
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {topRegs.map((r, i) => <RegulationCard key={r.id} regulation={r} index={i} />)}
          </motion.div>
        </Section>
      </div>

      {/* Filings */}
      <div className="mt-10">
        <Section
          title="This week's filings"
          action={<Link href="/filings" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">Calendar <ArrowRight className="h-3 w-3" /></Link>}
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {urgentFilings.map((f) => <FilingCard key={f.id} filing={f} />)}
          </div>
        </Section>
      </div>
    </div>
  );
}

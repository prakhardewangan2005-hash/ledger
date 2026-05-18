"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/app/sparkline";
import type { KPI } from "@/types";
import { cn } from "@/lib/utils";

export function KPICard({ kpi, index = 0 }: { kpi: KPI; index?: number }) {
  const positive = kpi.delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{kpi.label}</div>
        <div className="mt-3 flex items-end justify-between">
          <div className="font-bold text-4xl leading-none text-foreground">{kpi.value}</div>
          <Sparkline data={kpi.spark} color={positive ? "var(--success)" : "var(--destructive)"} className="text-success" />
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={cn("inline-flex items-center gap-0.5 font-mono", positive ? "text-success" : "text-destructive")}>
            {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {Math.abs(kpi.delta)}
            {kpi.id === "k4" || kpi.id === "k1" ? "" : ""}
          </span>
          <span className="text-muted-foreground">{kpi.deltaLabel}</span>
        </div>
      </Card>
    </motion.div>
  );
}

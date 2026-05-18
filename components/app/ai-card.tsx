"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Citation } from "@/components/app/citation";
import { cn } from "@/lib/utils";

export function AICard({
  title,
  children,
  citations,
  confidence,
  className
}: {
  title?: string;
  children: React.ReactNode;
  citations?: string[];
  confidence?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative overflow-hidden rounded-xl border border-primary/30 bg-primary/[0.04] p-5", className)}
    >
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{title || "Copilot"}</span>
          {confidence !== undefined ? (
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">AI · {Math.round(confidence * 100)}%</span>
          ) : null}
        </div>
        <div className="mt-3 text-sm leading-relaxed text-foreground">{children}</div>
        {citations && citations.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {citations.map((c) => <Citation key={c}>{c}</Citation>)}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

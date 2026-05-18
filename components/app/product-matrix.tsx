"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { JURISDICTIONS } from "@/data/jurisdictions";
import { PRODUCTS } from "@/data/products";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/types";

const STATUS_STYLES: Record<ProductStatus, string> = {
  live:          "bg-success/12 text-success border-success/30 hover:bg-success/20",
  pending:       "bg-warning/12 text-warning border-warning/30 hover:bg-warning/20",
  blocked:       "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/20",
  "not-offered": "bg-transparent text-muted-foreground/40 border-border hover:bg-muted/30",
  sunset:        "bg-muted/30 text-muted-foreground border-border hover:bg-muted/50"
};

const STATUS_LABELS: Record<ProductStatus, string> = {
  live: "Live",
  pending: "Pending",
  blocked: "Blocked",
  "not-offered": "—",
  sunset: "Sunset"
};

export function ProductMatrix() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-1.5 card-extruded">
        <table
          className="w-full min-w-[820px] border-separate border-spacing-1.5 text-sm"
          role="grid"
          aria-label="Product status by jurisdiction"
        >
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-40 bg-card px-3 text-left font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Product
              </th>
              {JURISDICTIONS.map((j) => (
                <th key={j.code} className="px-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center gap-1">{j.flag}<span>{j.code}</span></span>
                    </TooltipTrigger>
                    <TooltipContent>{j.name} · {j.regulator}</TooltipContent>
                  </Tooltip>
                </th>
              ))}
              <th className="px-2 text-right font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Owner</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, rowIndex) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowIndex * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <td className="sticky left-0 z-10 rounded-md bg-card px-3 py-2.5">
                  <Link href={`/products/${p.id}`} className="block group">
                    <div className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{p.name}</div>
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{p.category}</div>
                  </Link>
                </td>
                {p.cells.map((cell) => (
                  <td key={cell.jurisdiction} className="px-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/products/${p.id}`}
                          className={cn(
                            "flex h-11 flex-col items-center justify-center rounded-md border px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] transition-all",
                            STATUS_STYLES[cell.status]
                          )}
                          aria-label={`${p.name} in ${cell.jurisdiction}: ${STATUS_LABELS[cell.status]}`}
                        >
                          <span>{STATUS_LABELS[cell.status]}</span>
                          {cell.obligations > 0 ? (
                            <span className="mt-0.5 text-[9px] font-medium opacity-70">{cell.obligations} obl.</span>
                          ) : null}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <div className="font-semibold text-foreground">{p.name} · {cell.jurisdiction}</div>
                        <div className="mt-1 text-xs font-medium text-muted-foreground">{STATUS_LABELS[cell.status]}</div>
                        {cell.license ? (
                          <div className="mt-1 font-mono text-[10px] font-medium text-foreground/90">{cell.license}</div>
                        ) : null}
                        <div className="mt-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          Reviewed {fmtDate(cell.lastReviewed)} · {cell.obligations} open obligations
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                ))}
                <td className="px-2 text-right">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="ml-auto h-6 w-6">
                        <AvatarFallback style={{ background: p.owner.avatarColor, color: "white" }} className="text-[10px]">
                          {initials(p.owner.name)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{p.owner.name} · {p.owner.role}</TooltipContent>
                  </Tooltip>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
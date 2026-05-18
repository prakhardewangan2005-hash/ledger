"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { SeverityPill } from "@/components/app/severity-pill";
import { RegulationStatusPill } from "@/components/app/status-pill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Citation } from "@/components/app/citation";
import { fmtDate, fmtRelative } from "@/lib/format";
import { initials } from "@/lib/utils";
import type { Regulation } from "@/types";
import { PRODUCTS } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export function RegulationCard({ regulation, index = 0 }: { regulation: Regulation; index?: number }) {
  const products = PRODUCTS.filter((p) => regulation.productsAffected.includes(p.id));
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group p-5 transition-colors hover:border-primary/30">
        <Link href={`/feed/${regulation.id}`} className="block">
          <div className="flex flex-wrap items-center gap-2">
            {regulation.jurisdictions.map((j) => <JurisdictionPill key={j} code={j} />)}
            <SeverityPill severity={regulation.severity} />
            <RegulationStatusPill status={regulation.status} />
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">{fmtRelative(regulation.publishedAt)}</span>
          </div>

          <h3 className="mt-3 text-base font-medium leading-tight text-foreground transition-colors group-hover:text-primary">
            {regulation.title}
          </h3>
          <Citation className="mt-1.5 inline-block">{regulation.citation}</Citation>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{regulation.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs">
            <span className="font-mono text-muted-foreground">
              Effective <span className="text-foreground">{fmtDate(regulation.effectiveAt, { withYear: true })}</span>
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="font-mono text-muted-foreground">
              {products.length} {products.length === 1 ? "product" : "products"}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="font-mono text-muted-foreground">
              AI <span className="text-foreground">{Math.round(regulation.aiConfidence * 100)}%</span>
            </span>
            {regulation.owner ? (
              <span className="ml-auto flex items-center gap-1.5">
                <Avatar className="h-5 w-5">
                  <AvatarFallback style={{ background: regulation.owner.avatarColor, color: "white" }} className="text-[9px]">
                    {initials(regulation.owner.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-muted-foreground">{regulation.owner.name.split(" ")[0]}</span>
              </span>
            ) : null}
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { JurisdictionPill } from "@/components/app/jurisdiction-pill";
import { FilingStatusPill } from "@/components/app/status-pill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";
import type { Filing } from "@/types";
import { Paperclip, Clock } from "lucide-react";

export function FilingCard({ filing }: { filing: Filing }) {
  const due = new Date(filing.dueAt);
  const now = new Date();
  const days = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const tone = days < 0 ? "text-destructive" : days <= 7 ? "text-warning" : "text-muted-foreground";

  return (
    <Card className="group p-4 transition-colors hover:border-primary/30">
      <Link href={`/filings/${filing.id}`} className="block">
        <div className="flex items-center gap-2">
          <JurisdictionPill code={filing.jurisdiction} />
          <FilingStatusPill status={filing.status} />
          <span className="ml-auto font-mono text-[10px] font-semibold text-muted-foreground">{filing.type}</span>
        </div>
        <h3 className="mt-2.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{filing.title}</h3>
        <div className="mt-3 flex items-center gap-3 text-xs">
          <span className={`inline-flex items-center gap-1 font-mono font-semibold ${tone}`}>
            <Clock className="h-3 w-3" />
            {days < 0 ? `${Math.abs(days)}d overdue` : `Due in ${days}d`}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-mono font-medium text-muted-foreground">{fmtDate(filing.dueAt, { withYear: true })}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1 font-mono font-medium text-muted-foreground">
            <Paperclip className="h-3 w-3" /> {filing.evidenceCount}
          </span>
          <Avatar className="ml-auto h-5 w-5">
            <AvatarFallback style={{ background: filing.owner.avatarColor, color: "white" }} className="text-[9px]">
              {initials(filing.owner.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </Link>
    </Card>
  );
}
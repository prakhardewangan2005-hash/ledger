import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";
import { fmtDate } from "@/lib/format";
import type { Evidence } from "@/types";
import { FileText, Image as ImageIcon, Code2, ShieldCheck, Activity } from "lucide-react";

const ICONS = {
  document: FileText,
  screenshot: ImageIcon,
  log: Code2,
  attestation: ShieldCheck,
  transaction: Activity
};

export function EvidenceCard({ evidence }: { evidence: Evidence }) {
  const Icon = ICONS[evidence.kind] || FileText;
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-foreground">{evidence.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{evidence.kind}</span>
            <span className="text-muted-foreground/40">·</span>
            <span className="font-mono text-[10px] text-muted-foreground">{evidence.source}</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {evidence.controls.map((c) => <Badge key={c} variant="outline" className="font-mono text-[9px]">{c}</Badge>)}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Avatar className="h-5 w-5">
              <AvatarFallback style={{ background: evidence.collectedBy.avatarColor, color: "white" }} className="text-[9px]">
                {initials(evidence.collectedBy.name)}
              </AvatarFallback>
            </Avatar>
            <span>{evidence.collectedBy.name.split(" ")[0]}</span>
            <span className="text-muted-foreground/40">·</span>
            <span>{fmtDate(evidence.collectedAt)}</span>
            <span className="ml-auto font-mono">{evidence.hash}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

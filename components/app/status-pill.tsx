import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, Circle, Pause } from "lucide-react";
import type { ProductStatus, FilingStatus, RegulationStatus } from "@/types";

const PRODUCT_MAP: Record<ProductStatus, { variant: any; label: string; Icon: any }> = {
  live:         { variant: "success",     label: "Live",         Icon: CheckCircle2 },
  pending:      { variant: "warning",     label: "Pending",      Icon: Clock },
  blocked:      { variant: "destructive", label: "Blocked",      Icon: AlertTriangle },
  "not-offered": { variant: "muted",      label: "Not offered",  Icon: Circle },
  sunset:        { variant: "muted",      label: "Sunset",       Icon: Pause }
};

const FILING_MAP: Record<FilingStatus, { variant: any; label: string; Icon: any }> = {
  draft:     { variant: "muted",       label: "Draft",     Icon: Circle },
  "in-review": { variant: "info",      label: "In review", Icon: Clock },
  ready:     { variant: "default",     label: "Ready",     Icon: CheckCircle2 },
  filed:     { variant: "success",     label: "Filed",     Icon: CheckCircle2 },
  overdue:   { variant: "destructive", label: "Overdue",   Icon: AlertTriangle }
};

const REG_MAP: Record<RegulationStatus, { variant: any; label: string }> = {
  proposed:   { variant: "muted",   label: "Proposed" },
  published:  { variant: "default", label: "Published" },
  enforced:   { variant: "success", label: "Enforced" },
  superseded: { variant: "muted",   label: "Superseded" }
};

export function ProductStatusPill({ status }: { status: ProductStatus }) {
  const { variant, label, Icon } = PRODUCT_MAP[status];
  return <Badge variant={variant}><Icon className="h-3 w-3" />{label}</Badge>;
}

export function FilingStatusPill({ status }: { status: FilingStatus }) {
  const { variant, label, Icon } = FILING_MAP[status];
  return <Badge variant={variant}><Icon className="h-3 w-3" />{label}</Badge>;
}

export function RegulationStatusPill({ status }: { status: RegulationStatus }) {
  const { variant, label } = REG_MAP[status];
  return <Badge variant={variant}>{label}</Badge>;
}

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, Circle } from "lucide-react";
import type { Severity } from "@/types";

const MAP: Record<Severity, { variant: Parameters<typeof Badge>[0]["variant"]; Icon: typeof AlertTriangle }> = {
  critical: { variant: "destructive", Icon: AlertTriangle },
  high:     { variant: "warning",     Icon: AlertCircle },
  medium:   { variant: "info",        Icon: Info },
  low:      { variant: "muted",       Icon: Circle }
};

export function SeverityPill({ severity }: { severity: Severity }) {
  const { variant, Icon } = MAP[severity];
  return (
    <Badge variant={variant} className="capitalize">
      <Icon className="h-3 w-3" />
      {severity}
    </Badge>
  );
}

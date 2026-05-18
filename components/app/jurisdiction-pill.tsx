import { cn } from "@/lib/utils";
import { JURISDICTIONS } from "@/data/jurisdictions";

export function JurisdictionPill({ code, className }: { code: string; className?: string }) {
  const j = JURISDICTIONS.find((x) => x.code === code);
  if (!j) return <span className="font-mono text-[10px] text-muted-foreground">{code}</span>;
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-foreground", className)}
      title={j.name}
    >
      <span aria-hidden>{j.flag}</span>
      <span>{j.code}</span>
    </span>
  );
}

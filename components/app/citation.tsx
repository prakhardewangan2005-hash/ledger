import { cn } from "@/lib/utils";

export function Citation({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground",
      className
    )}>
      {children}
    </span>
  );
}

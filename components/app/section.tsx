import { cn } from "@/lib/utils";

export function Section({
  title, action, children, className
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          {title ? <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</h2> : <span />}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

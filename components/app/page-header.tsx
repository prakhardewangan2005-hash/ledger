import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
  serifAccent
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
  /** Optional italic serif word to append after title for visual character */
  serifAccent?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-[34px]">
          {title}
          {serifAccent ? (
            <>{" "}<span className="font-serif italic font-normal text-primary">{serifAccent}</span></>
          ) : null}
        </h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm font-medium text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

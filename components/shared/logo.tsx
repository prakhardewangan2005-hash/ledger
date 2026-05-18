import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-foreground", className)} aria-label="Ledger home">
      <LogoMark className="h-5 w-5" />
      <span className="font-serif text-lg italic leading-none tracking-tight">Ledger</span>
    </Link>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" className="text-primary" />
      <path d="M7 8.5h10M7 12h10M7 15.5h6" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18.2" cy="15.5" r="1.6" fill="white" />
    </svg>
  );
}

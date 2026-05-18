"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const first = segments[0];
  const nav = NAV_ITEMS.find((n) => n.href.slice(1) === first);
  const label = nav?.label || first.charAt(0).toUpperCase() + first.slice(1);
  const rest = segments.slice(1);

  return (
    <div className="hidden items-center gap-1.5 text-sm md:flex">
      <Link href={`/${first}`} className="font-medium text-foreground transition-colors hover:text-foreground">
        {label}
      </Link>
      {rest.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 2).join("/");
        const isLast = i === rest.length - 1;
        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            {isLast ? (
              <span className="font-mono text-xs text-muted-foreground">{seg}</span>
            ) : (
              <Link href={href} className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
                {seg}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}

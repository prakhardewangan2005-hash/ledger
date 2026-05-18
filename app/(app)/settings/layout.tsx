"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/app/page-header";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Workspace",     href: "/settings/workspace" },
  { label: "Team",          href: "/settings/team" },
  { label: "Jurisdictions", href: "/settings/jurisdictions" },
  { label: "Integrations",  href: "/settings/integrations" },
  { label: "API",           href: "/settings/api" },
  { label: "Notifications", href: "/settings/notifications" },
  { label: "Appearance",    href: "/settings/appearance" }
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings."
        description="Configure your team, jurisdictions, integrations, and notification preferences."
      />
      <nav className="mt-6 -mb-px flex flex-wrap gap-1 border-b border-border" aria-label="Settings tabs">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative px-3.5 py-2 text-sm transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {active ? <span className="absolute inset-x-3 -bottom-px h-px bg-primary" aria-hidden /> : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}

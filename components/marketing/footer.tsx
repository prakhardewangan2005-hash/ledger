import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_PHONE_HREF, CONTACT_EMAIL_HREF } from "@/lib/contact";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Regulatory feed", href: "/#product" },
      { label: "Product matrix", href: "/#product" },
      { label: "AI Copilot", href: "/#product" },
      { label: "Evidence vault", href: "/#product" },
      { label: "Audit room", href: "/#product" },
      { label: "Pricing", href: "/pricing" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Changelog", href: "/changelog" },
      { label: "Brand", href: "#" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Regulatory library", href: "#" },
      { label: "Status", href: "#" },
      { label: "Security", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "DPA", href: "#" },
      { label: "Trust center", href: "#" },
      { label: "Subprocessors", href: "#" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm font-medium text-muted-foreground">
              Regulatory operations for crypto-native firms.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={CONTACT_PHONE_HREF}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono">{CONTACT_PHONE}</span>
              </a>
              <a
                href={CONTACT_EMAIL_HREF}
                className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground break-all"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono">{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {col.title}
              </div>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs font-medium text-muted-foreground" suppressHydrationWarning>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Ledger Labs, Inc. All rights reserved.
          </p>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Ledger does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

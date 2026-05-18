export const APP_NAME = "Ledger";
export const APP_TAGLINE = "Regulatory operations for crypto-native firms.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const NAV_ITEMS = [
  { label: "Today", href: "/today", shortcut: "G T", icon: "Home" },
  { label: "Feed", href: "/feed", shortcut: "G F", icon: "Rss" },
  { label: "Products", href: "/products", shortcut: "G P", icon: "LayoutGrid" },
  { label: "Filings", href: "/filings", shortcut: "G L", icon: "FileText" },
  { label: "Evidence", href: "/evidence", shortcut: "G E", icon: "Archive" },
  { label: "Copilot", href: "/copilot", shortcut: "G C", icon: "Sparkles" },
  { label: "Audit", href: "/audit", shortcut: "G A", icon: "ShieldCheck" }
] as const;

export const MARKETING_NAV = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Docs", href: "/#docs" },
  { label: "Customers", href: "/#customers" }
] as const;
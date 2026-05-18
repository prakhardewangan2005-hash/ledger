import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Ledger — Regulatory operations for crypto-native firms",
    template: "%s · Ledger"
  },
  description:
    "An AI-native workspace where every product launch, jurisdiction expansion, and regulatory change becomes a tracked, owned, evidence-backed workflow.",
  keywords: [
    "regulatory operations",
    "crypto compliance",
    "MiCA",
    "FinCEN",
    "MAS DPT",
    "compliance workspace",
    "AI compliance"
  ],
  authors: [{ name: "Ledger" }],
  openGraph: {
    type: "website",
    siteName: "Ledger",
    title: "Ledger — Regulatory operations for crypto-native firms",
    description:
      "An AI-native workspace where every product launch and regulatory change becomes a tracked, evidence-backed workflow."
  },
  twitter: { card: "summary_large_image", title: "Ledger", description: "Regulatory operations for crypto-native firms." }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0E14" }
  ],
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-svh antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "border border-border bg-popover text-popover-foreground",
              duration: 4000
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

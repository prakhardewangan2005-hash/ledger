import { Badge } from "@/components/ui/badge";

const RELEASES = [
  {
    version: "0.18",
    date: "May 12, 2026",
    title: "MiCA Title V — full coverage shipped",
    items: [
      "Article 60 custody disclosure amendment integrated into the regulatory feed within 4 hours of publication.",
      "Product matrix now auto-flags reserve-disclosure obligations for affected products.",
      "Evidence vault accepts new attestation type: independent-auditor signed quarterly reserves."
    ],
    tag: "regulation"
  },
  {
    version: "0.17",
    date: "Apr 29, 2026",
    title: "GENIUS Act — monthly reserve filing template",
    items: [
      "Pre-filled filing template based on OCC final rule §301.4.",
      "AI Copilot now drafts the monthly attestation when sources are connected.",
      "Slack integration: weekly compliance digest now includes filing burn-down."
    ],
    tag: "regulation"
  },
  {
    version: "0.16",
    date: "Apr 18, 2026",
    title: "Audit Room beta",
    items: [
      "Permissioned rooms for external counsel and regulators.",
      "Every artifact in a room is hashed and logged on access.",
      "Real-time co-presence with shared cursors."
    ],
    tag: "feature"
  },
  {
    version: "0.15",
    date: "Apr 3, 2026",
    title: "Command palette + vim-style navigation",
    items: [
      "⌘K opens the global command palette.",
      "G + letter for area-jump navigation (G F → Feed, G P → Products, etc.).",
      "Bulk action mode now reachable via X to multi-select."
    ],
    tag: "ux"
  },
  {
    version: "0.14",
    date: "Mar 19, 2026",
    title: "Notabene + Chainalysis integrations",
    items: [
      "Travel Rule evidence flows directly from Notabene into the vault.",
      "Sanctions screening reports auto-attach to relevant filings.",
      "Onchain attestations from Fireblocks now indexed by control mapping."
    ],
    tag: "integration"
  }
];

export const metadata = { title: "Changelog" };

export default function ChangelogPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">changelog</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight text-foreground">What we <span className="font-serif italic font-normal text-primary">shipped.</span></h1>
      <p className="mt-3 text-pretty text-base font-medium text-muted-foreground">
        Every meaningful change to the product. New regulation onboarding ships on top of this stream — usually within 48 hours of publication.
      </p>

      <div className="mt-14 space-y-14">
        {RELEASES.map((release) => (
          <article key={release.version} className="relative">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-muted-foreground">v{release.version}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="font-mono text-xs font-medium text-muted-foreground">{release.date}</span>
              <Badge variant="outline" className="ml-auto text-[10px] font-semibold uppercase tracking-[0.14em]">{release.tag}</Badge>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground">{release.title}</h2>
            <ul className="mt-4 space-y-2">
              {release.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-medium text-foreground/90">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/app/page-header";
import { FilterBar } from "@/components/app/filter-bar";
import { RegulationCard } from "@/components/app/regulation-card";
import { Button } from "@/components/ui/button";
import { Bookmark, Sparkles } from "lucide-react";
import { REGULATIONS } from "@/data/regulations";

const SEVERITIES = ["critical", "high", "medium", "low"] as const;

export default function FeedPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return REGULATIONS.filter((r) => {
      const m1 = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.summary.toLowerCase().includes(query.toLowerCase()) || r.citation.toLowerCase().includes(query.toLowerCase());
      const m2 = !severity || r.severity === severity;
      return m1 && m2;
    });
  }, [query, severity]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Regulatory feed"
        title="What changed."
        description={`${REGULATIONS.length} updates in your operating jurisdictions over the past 30 days.`}
        actions={
          <>
            <Button variant="outline" size="sm"><Bookmark className="h-3.5 w-3.5" /> Saved views</Button>
            <Button size="sm"><Sparkles className="h-3.5 w-3.5" /> Summarize</Button>
          </>
        }
      />

      <div className="mt-6">
        <FilterBar
          query={query}
          setQuery={setQuery}
          placeholder="Search by title, citation, or summary…"
          filters={[
            { label: "All", active: !severity, onClick: () => setSeverity(null), count: REGULATIONS.length },
            ...SEVERITIES.map((s) => ({
              label: s.charAt(0).toUpperCase() + s.slice(1),
              active: severity === s,
              onClick: () => setSeverity(s),
              count: REGULATIONS.filter((r) => r.severity === s).length
            }))
          ]}
        />
      </div>

      <motion.div
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
        className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2"
      >
        {filtered.map((r, i) => <RegulationCard key={r.id} regulation={r} index={i} />)}
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border bg-card/40 py-12 text-center text-sm text-muted-foreground">
          No regulations match your filters.
        </div>
      ) : null}
    </div>
  );
}

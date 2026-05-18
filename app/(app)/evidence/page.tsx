"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { FilterBar } from "@/components/app/filter-bar";
import { EvidenceCard } from "@/components/app/evidence-card";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { EVIDENCE } from "@/data/evidence";

const KINDS = ["attestation", "document", "screenshot", "transaction", "log"] as const;

export default function EvidencePage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string | null>(null);

  const filtered = useMemo(() => EVIDENCE.filter((e) => {
    const m1 = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.source.toLowerCase().includes(query.toLowerCase());
    const m2 = !kind || e.kind === kind;
    return m1 && m2;
  }), [query, kind]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Evidence vault"
        title="Hash-attested. Timestamped. Audit-ready."
        description={`${EVIDENCE.length} artifacts indexed across ${new Set(EVIDENCE.flatMap(e => e.controls)).size} controls.`}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5" /> Bundle</Button>
            <Button size="sm"><Upload className="h-3.5 w-3.5" /> Upload</Button>
          </>
        }
      />

      <div className="mt-6">
        <FilterBar
          query={query}
          setQuery={setQuery}
          placeholder="Search by title, source, or control…"
          filters={[
            { label: "All", active: !kind, onClick: () => setKind(null), count: EVIDENCE.length },
            ...KINDS.map((k) => ({
              label: k.charAt(0).toUpperCase() + k.slice(1),
              active: kind === k,
              onClick: () => setKind(k),
              count: EVIDENCE.filter((e) => e.kind === k).length
            }))
          ]}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => <EvidenceCard key={e.id} evidence={e} />)}
      </div>
    </div>
  );
}

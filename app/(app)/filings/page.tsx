"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app/page-header";
import { FilterBar } from "@/components/app/filter-bar";
import { FilingCard } from "@/components/app/filing-card";
import { Section } from "@/components/app/section";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { FILINGS } from "@/data/filings";

const STATUSES = ["draft", "in-review", "ready", "filed", "overdue"] as const;

export default function FilingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const filtered = useMemo(() => FILINGS.filter((f) => {
    const m1 = !query || f.title.toLowerCase().includes(query.toLowerCase()) || f.regulator.toLowerCase().includes(query.toLowerCase());
    const m2 = !status || f.status === status;
    return m1 && m2;
  }), [query, status]);

  const groups = useMemo(() => ({
    overdue:  filtered.filter((f) => f.status === "overdue"),
    thisWeek: filtered.filter((f) => f.status !== "overdue" && f.status !== "filed" && new Date(f.dueAt).getTime() < Date.now() + 7 * 86400000),
    upcoming: filtered.filter((f) => f.status !== "overdue" && f.status !== "filed" && new Date(f.dueAt).getTime() >= Date.now() + 7 * 86400000),
    filed:    filtered.filter((f) => f.status === "filed")
  }), [filtered]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Filings"
        title="On the calendar."
        description={`${FILINGS.filter(f => f.status !== "filed").length} active filings across ${new Set(FILINGS.map(f => f.jurisdiction)).size} jurisdictions.`}
        actions={
          <>
            <Button variant="outline" size="sm"><Calendar className="h-3.5 w-3.5" /> Calendar view</Button>
            <Button size="sm"><Plus className="h-3.5 w-3.5" /> New filing</Button>
          </>
        }
      />

      <div className="mt-6">
        <FilterBar
          query={query}
          setQuery={setQuery}
          placeholder="Search filings…"
          filters={[
            { label: "All", active: !status, onClick: () => setStatus(null), count: FILINGS.length },
            ...STATUSES.map((s) => ({
              label: s.replace("-", " "),
              active: status === s,
              onClick: () => setStatus(s),
              count: FILINGS.filter((f) => f.status === s).length
            }))
          ]}
        />
      </div>

      <div className="mt-8 space-y-8">
        {groups.overdue.length > 0 && (
          <Section title={`Overdue · ${groups.overdue.length}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {groups.overdue.map((f) => <FilingCard key={f.id} filing={f} />)}
            </div>
          </Section>
        )}
        {groups.thisWeek.length > 0 && (
          <Section title={`This week · ${groups.thisWeek.length}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {groups.thisWeek.map((f) => <FilingCard key={f.id} filing={f} />)}
            </div>
          </Section>
        )}
        {groups.upcoming.length > 0 && (
          <Section title={`Upcoming · ${groups.upcoming.length}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {groups.upcoming.map((f) => <FilingCard key={f.id} filing={f} />)}
            </div>
          </Section>
        )}
        {groups.filed.length > 0 && (
          <Section title={`Filed · ${groups.filed.length}`}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {groups.filed.map((f) => <FilingCard key={f.id} filing={f} />)}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

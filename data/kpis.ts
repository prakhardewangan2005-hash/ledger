import type { KPI } from "@/types";

export const KPIS: KPI[] = [
  { id: "k1", label: "Compliance velocity", value: "3.8×",  delta: 0.4,   deltaLabel: "vs. last quarter", spark: [1.9,2.1,2.4,2.6,2.9,3.1,3.3,3.4,3.5,3.6,3.7,3.8] },
  { id: "k2", label: "Open changes",         value: "12",    delta: -3,    deltaLabel: "this week",        spark: [18,17,16,15,15,14,14,13,13,12,12,12] },
  { id: "k3", label: "Avg. assessment time", value: "62h",   delta: -28,   deltaLabel: "vs. baseline",     spark: [120,118,108,98,92,86,80,74,70,68,64,62] },
  { id: "k4", label: "Filings on schedule",  value: "94%",   delta: 11,    deltaLabel: "this quarter",     spark: [78,79,81,82,84,86,88,89,90,92,93,94] }
];

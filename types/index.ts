export type Jurisdiction = {
  code: "EU" | "US" | "SG" | "UK" | "AE" | "JP" | "HK" | "CH";
  name: string;
  flag: string;
  regulator: string;
  riskTier: 1 | 2 | 3;
};

export type RegulationStatus = "proposed" | "published" | "enforced" | "superseded";
export type Severity = "critical" | "high" | "medium" | "low";

export type Regulation = {
  id: string;
  citation: string;
  title: string;
  summary: string;
  jurisdictions: Jurisdiction["code"][];
  status: RegulationStatus;
  severity: Severity;
  publishedAt: string;
  effectiveAt: string;
  productsAffected: string[];
  source: string;
  sourceUrl: string;
  aiConfidence: number;
  owner?: TeamMember;
  tags: string[];
  pages: number;
};

export type ProductStatus = "live" | "pending" | "blocked" | "not-offered" | "sunset";

export type ProductCell = {
  jurisdiction: Jurisdiction["code"];
  status: ProductStatus;
  license?: string;
  obligations: number;
  lastReviewed: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: "spot" | "derivatives" | "custody" | "staking" | "stablecoin" | "lending" | "payments";
  description: string;
  cells: ProductCell[];
  owner: TeamMember;
  lastChanged: string;
};

export type FilingStatus = "draft" | "in-review" | "ready" | "filed" | "overdue";

export type Filing = {
  id: string;
  title: string;
  jurisdiction: Jurisdiction["code"];
  regulator: string;
  dueAt: string;
  status: FilingStatus;
  owner: TeamMember;
  evidenceCount: number;
  type: string;
};

export type Evidence = {
  id: string;
  title: string;
  kind: "attestation" | "screenshot" | "document" | "transaction" | "log";
  controls: string[];
  source: string;
  collectedAt: string;
  collectedBy: TeamMember;
  hash: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarColor: string;
};

export type ActivityItem = {
  id: string;
  actor: TeamMember;
  verb: string;
  object: string;
  objectHref?: string;
  at: string;
  meta?: string;
};

export type KPI = {
  id: string;
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  spark: number[];
};

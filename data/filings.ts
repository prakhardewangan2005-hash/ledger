import type { Filing } from "@/types";
import { TEAM } from "./personas";

export const FILINGS: Filing[] = [
  { id: "f_001", title: "MiCA quarterly reserve attestation — Q2 2026",        jurisdiction: "EU", regulator: "ESMA",   dueAt: "2026-07-30T00:00:00Z", status: "in-review", owner: TEAM[1], evidenceCount: 14, type: "Reserve attestation" },
  { id: "f_002", title: "FinCEN SAR — TXN-44219 anomalous transfer",            jurisdiction: "US", regulator: "FinCEN", dueAt: "2026-06-04T00:00:00Z", status: "draft",     owner: TEAM[3], evidenceCount: 8,  type: "Suspicious Activity Report" },
  { id: "f_003", title: "MAS PSN02 marketing affirmation",                       jurisdiction: "SG", regulator: "MAS",    dueAt: "2026-06-15T00:00:00Z", status: "ready",     owner: TEAM[1], evidenceCount: 6,  type: "Marketing affirmation" },
  { id: "f_004", title: "FCA cryptoasset firm annual report",                    jurisdiction: "UK", regulator: "FCA",    dueAt: "2026-06-30T00:00:00Z", status: "in-review", owner: TEAM[1], evidenceCount: 22, type: "Annual report" },
  { id: "f_005", title: "VARA monthly transaction report — May 2026",            jurisdiction: "AE", regulator: "VARA",   dueAt: "2026-06-10T00:00:00Z", status: "draft",     owner: TEAM[4], evidenceCount: 11, type: "Transaction report" },
  { id: "f_006", title: "GENIUS Act monthly reserve attestation — May 2026",     jurisdiction: "US", regulator: "OCC",    dueAt: "2026-06-15T00:00:00Z", status: "in-review", owner: TEAM[4], evidenceCount: 9,  type: "Reserve attestation" },
  { id: "f_007", title: "SOC 2 Type II — evidence refresh AC-2, CC-7.1",         jurisdiction: "US", regulator: "AICPA",  dueAt: "2026-05-29T00:00:00Z", status: "overdue",   owner: TEAM[5], evidenceCount: 3,  type: "Audit refresh" },
  { id: "f_008", title: "MAS Travel Rule conformance — Q2 attestation",          jurisdiction: "SG", regulator: "MAS",    dueAt: "2026-07-15T00:00:00Z", status: "draft",     owner: TEAM[6], evidenceCount: 5,  type: "Travel Rule" },
  { id: "f_009", title: "EBA crypto exposure report — Pillar 3",                 jurisdiction: "EU", regulator: "EBA",    dueAt: "2026-08-31T00:00:00Z", status: "draft",     owner: TEAM[1], evidenceCount: 0,  type: "Capital disclosure" },
  { id: "f_010", title: "FINMA outsourcing notification — matching engine",      jurisdiction: "CH", regulator: "FINMA",  dueAt: "2026-06-01T00:00:00Z", status: "filed",     owner: TEAM[6], evidenceCount: 12, type: "Outsourcing notification" }
];

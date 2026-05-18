import type { ActivityItem } from "@/types";
import { TEAM } from "./personas";

export const ACTIVITY: ActivityItem[] = [
  { id: "a1",  actor: TEAM[1], verb: "assigned",     object: "MiCA quarterly reserve attestation — Q2 2026",         objectHref: "/filings/f_001", at: "2026-05-17T09:22:00Z", meta: "to Lin Wei" },
  { id: "a2",  actor: TEAM[4], verb: "filed",        object: "FINMA outsourcing notification — matching engine",     objectHref: "/filings/f_010", at: "2026-05-17T08:44:00Z" },
  { id: "a3",  actor: TEAM[0], verb: "starred",      object: "MiCA custody disclosure amendment",                     objectHref: "/feed/reg_mica_t5_60", at: "2026-05-17T08:10:00Z" },
  { id: "a4",  actor: TEAM[6], verb: "attached evidence to", object: "GENIUS Act monthly reserve attestation",      objectHref: "/filings/f_006", at: "2026-05-17T07:52:00Z", meta: "Fireblocks attestation API" },
  { id: "a5",  actor: TEAM[3], verb: "drafted",      object: "FinCEN SAR — TXN-44219 anomalous transfer",            objectHref: "/filings/f_002", at: "2026-05-16T22:18:00Z" },
  { id: "a6",  actor: TEAM[1], verb: "approved",     object: "MAS PSN02 marketing affirmation",                       objectHref: "/filings/f_003", at: "2026-05-16T17:40:00Z" },
  { id: "a7",  actor: TEAM[4], verb: "escalated",    object: "VARA staking — Earn product Dubai launch",              objectHref: "/products/prod_earn", at: "2026-05-16T15:02:00Z", meta: "to Lin Wei (external counsel)" },
  { id: "a8",  actor: TEAM[5], verb: "completed",    object: "Q2 reserve attestation — independent auditor signed",   objectHref: "/evidence",      at: "2026-05-13T11:00:00Z" },
  { id: "a9",  actor: TEAM[1], verb: "opened",       object: "Change project — MAS Notice PSN02 marketing carve-out", objectHref: "/feed/reg_mas_dpt_28", at: "2026-05-15T10:08:00Z" },
  { id: "a10", actor: TEAM[2], verb: "requested review of", object: "Earn product Dubai launch — go/no-go memo",     objectHref: "/products/prod_earn", at: "2026-05-15T09:55:00Z" }
];

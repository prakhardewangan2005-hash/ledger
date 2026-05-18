import type { Evidence } from "@/types";
import { TEAM } from "./personas";

export const EVIDENCE: Evidence[] = [
  { id: "ev_001", title: "Q2 reserve attestation — independent auditor signed",       kind: "attestation", controls: ["CC-2.1", "CC-7.4"], source: "PwC Audit Portal",     collectedAt: "2026-05-13T11:00:00Z", collectedBy: TEAM[5], hash: "sha256:8af2…d1a7" },
  { id: "ev_002", title: "Cold-storage proof of reserves — onchain attestation",       kind: "attestation", controls: ["CC-7.4"],            source: "Fireblocks attestation API", collectedAt: "2026-05-12T22:14:00Z", collectedBy: TEAM[6], hash: "sha256:5021…ab09" },
  { id: "ev_003", title: "Quarterly access review — engineering",                       kind: "document",    controls: ["AC-2"],              source: "Okta admin export",   collectedAt: "2026-05-04T09:33:00Z", collectedBy: TEAM[6], hash: "sha256:f12c…7e88" },
  { id: "ev_004", title: "Sanctions screening — chain-analytics report",                 kind: "document",    controls: ["AML-3", "SAN-1"],   source: "Chainalysis KYT",     collectedAt: "2026-05-10T15:20:00Z", collectedBy: TEAM[3], hash: "sha256:b9d4…2f31" },
  { id: "ev_005", title: "Quarterly board meeting — risk committee minutes",              kind: "document",   controls: ["GOV-1"],             source: "Internal — board portal", collectedAt: "2026-04-30T17:00:00Z", collectedBy: TEAM[0], hash: "sha256:1ab8…cc02" },
  { id: "ev_006", title: "Travel Rule message — TRP-99284 settlement evidence",          kind: "transaction", controls: ["TR-1"],              source: "Notabene",             collectedAt: "2026-05-14T13:42:00Z", collectedBy: TEAM[6], hash: "sha256:c731…81ff" },
  { id: "ev_007", title: "MiCA whitepaper publication confirmation — NWUSD",              kind: "document",    controls: ["MAR-2"],            source: "ESMA register",        collectedAt: "2026-05-01T08:11:00Z", collectedBy: TEAM[4], hash: "sha256:2dd9…0a44" },
  { id: "ev_008", title: "Incident response — SOC weekly review",                          kind: "log",         controls: ["IR-3"],             source: "Internal — SIRT runbook", collectedAt: "2026-05-15T09:00:00Z", collectedBy: TEAM[6], hash: "sha256:48fe…7301" },
  { id: "ev_009", title: "Vendor risk assessment refresh — Top 25 critical vendors",      kind: "document",    controls: ["VND-1", "CC-9.2"],  source: "OneTrust",             collectedAt: "2026-05-09T11:45:00Z", collectedBy: TEAM[6], hash: "sha256:9aaf…42c1" },
  { id: "ev_010", title: "Customer complaint log — FCA-tracked",                          kind: "document",    controls: ["COM-1"],            source: "Zendesk export",       collectedAt: "2026-05-14T18:10:00Z", collectedBy: TEAM[7], hash: "sha256:3bef…c019" },
  { id: "ev_011", title: "Penetration test — Q1 2026 final report",                       kind: "document",    controls: ["CC-7.1"],           source: "Trail of Bits",        collectedAt: "2026-03-22T16:00:00Z", collectedBy: TEAM[6], hash: "sha256:71d2…9008" },
  { id: "ev_012", title: "Disaster recovery test — April 2026 tabletop",                  kind: "document",    controls: ["BCP-1"],            source: "Internal — DR program", collectedAt: "2026-04-18T10:00:00Z", collectedBy: TEAM[5], hash: "sha256:e8a1…44bb" }
];

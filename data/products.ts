import type { Product, ProductCell, ProductStatus } from "@/types";
import { TEAM } from "./personas";

const codes = ["EU", "US", "SG", "UK", "AE", "JP", "HK", "CH"] as const;

function cells(map: Partial<Record<(typeof codes)[number], { status: ProductStatus; license?: string; obligations: number; lastReviewed: string }>>): ProductCell[] {
  return codes.map((c) => {
    const v = map[c];
    return {
      jurisdiction: c,
      status: v?.status ?? "not-offered",
      license: v?.license,
      obligations: v?.obligations ?? 0,
      lastReviewed: v?.lastReviewed ?? "2026-01-15T00:00:00Z"
    };
  });
}

export const PRODUCTS: Product[] = [
  {
    id: "prod_spot",
    name: "Spot Exchange",
    slug: "spot",
    category: "spot",
    description: "Buy and sell crypto against fiat and stablecoin pairs.",
    owner: TEAM[2],
    lastChanged: "2026-05-11T16:42:00Z",
    cells: cells({
      EU: { status: "live", license: "CASP — Reg. (EU) 2023/1114", obligations: 47, lastReviewed: "2026-05-01T00:00:00Z" },
      US: { status: "live", license: "Money Transmitter (43 states)", obligations: 84, lastReviewed: "2026-04-22T00:00:00Z" },
      SG: { status: "live", license: "MAS MPI — PSA s.13", obligations: 31, lastReviewed: "2026-05-04T00:00:00Z" },
      UK: { status: "live", license: "FCA — MLR 2017 reg. 14A", obligations: 28, lastReviewed: "2026-04-30T00:00:00Z" },
      AE: { status: "live", license: "VARA VASP Cat. 1", obligations: 22, lastReviewed: "2026-05-06T00:00:00Z" },
      JP: { status: "pending", license: "JFSA Type-1 Crypto Asset Exchange (application)", obligations: 19, lastReviewed: "2026-05-02T00:00:00Z" },
      HK: { status: "live", license: "SFC VATP", obligations: 24, lastReviewed: "2026-04-28T00:00:00Z" },
      CH: { status: "live", license: "FINMA DLT Trading Facility", obligations: 16, lastReviewed: "2026-04-20T00:00:00Z" }
    })
  },
  {
    id: "prod_vault",
    name: "Vault",
    slug: "vault",
    category: "custody",
    description: "Cold-storage institutional custody with MPC key management.",
    owner: TEAM[4],
    lastChanged: "2026-05-13T11:22:00Z",
    cells: cells({
      EU: { status: "live", license: "CASP custody under MiCA Art. 67", obligations: 33, lastReviewed: "2026-05-12T00:00:00Z" },
      US: { status: "live", license: "NYDFS BitLicense + SD trust charter", obligations: 56, lastReviewed: "2026-05-05T00:00:00Z" },
      SG: { status: "live", license: "MAS MPI — custodial DPT", obligations: 24, lastReviewed: "2026-05-08T00:00:00Z" },
      UK: { status: "live", license: "FCA cryptoasset custody registration", obligations: 21, lastReviewed: "2026-04-30T00:00:00Z" },
      AE: { status: "blocked", license: "VARA Cat. 2 application paused — DFSA reciprocity dispute", obligations: 11, lastReviewed: "2026-03-12T00:00:00Z" },
      HK: { status: "live", license: "SFC VATP — custody add-on", obligations: 18, lastReviewed: "2026-04-30T00:00:00Z" },
      CH: { status: "live", license: "FINMA SRO + DLT custodian", obligations: 14, lastReviewed: "2026-04-20T00:00:00Z" }
    })
  },
  {
    id: "prod_derivs",
    name: "Derivatives",
    slug: "derivatives",
    category: "derivatives",
    description: "Perpetual futures, options, and dated futures for institutional clients.",
    owner: TEAM[2],
    lastChanged: "2026-05-10T09:14:00Z",
    cells: cells({
      EU: { status: "blocked", license: "MiFID II / MiCA exclusion — under review", obligations: 9, lastReviewed: "2026-03-22T00:00:00Z" },
      US: { status: "live", license: "CFTC — DCM via subsidiary", obligations: 67, lastReviewed: "2026-04-22T00:00:00Z" },
      SG: { status: "live", license: "MAS RMO (institutional only)", obligations: 28, lastReviewed: "2026-05-01T00:00:00Z" },
      AE: { status: "live", license: "VARA Cat. 3", obligations: 26, lastReviewed: "2026-05-08T00:00:00Z" },
      HK: { status: "pending", license: "SFC Type 7 application (professional only)", obligations: 17, lastReviewed: "2026-05-04T00:00:00Z" }
    })
  },
  {
    id: "prod_earn",
    name: "Earn",
    slug: "earn",
    category: "staking",
    description: "Yield-bearing staking and lending products for retail and institutional clients.",
    owner: TEAM[1],
    lastChanged: "2026-05-08T14:18:00Z",
    cells: cells({
      EU: { status: "live", license: "MiCA Title V — non-yield-fixed staking only", obligations: 22, lastReviewed: "2026-04-28T00:00:00Z" },
      SG: { status: "blocked", license: "MAS prohibition on retail DPT staking", obligations: 4, lastReviewed: "2026-02-12T00:00:00Z" },
      UK: { status: "blocked", license: "FCA financial promotion restriction", obligations: 3, lastReviewed: "2026-01-22T00:00:00Z" },
      AE: { status: "pending", license: "VARA staking registration (window opens June 1)", obligations: 8, lastReviewed: "2026-05-15T00:00:00Z" },
      CH: { status: "live", license: "FINMA — non-Lombard staking allowed", obligations: 9, lastReviewed: "2026-04-20T00:00:00Z" }
    })
  },
  {
    id: "prod_nwusd",
    name: "NWUSD",
    slug: "nwusd",
    category: "stablecoin",
    description: "USD-backed fiat stablecoin, issued via subsidiary.",
    owner: TEAM[4],
    lastChanged: "2026-05-15T08:01:00Z",
    cells: cells({
      EU: { status: "live", license: "MiCA EMT — Article 48", obligations: 19, lastReviewed: "2026-05-12T00:00:00Z" },
      US: { status: "live", license: "GENIUS Act permitted payment stablecoin issuer", obligations: 41, lastReviewed: "2026-05-01T00:00:00Z" },
      SG: { status: "live", license: "MAS single-currency stablecoin", obligations: 18, lastReviewed: "2026-05-04T00:00:00Z" },
      UK: { status: "pending", license: "FCA fiat-referenced cryptoasset issuer (in flight)", obligations: 12, lastReviewed: "2026-05-09T00:00:00Z" },
      AE: { status: "live", license: "VARA fiat-referenced VASP", obligations: 14, lastReviewed: "2026-05-06T00:00:00Z" }
    })
  },
  {
    id: "prod_payments",
    name: "Pay",
    slug: "pay",
    category: "payments",
    description: "Crypto-to-fiat payment rails for merchants.",
    owner: TEAM[2],
    lastChanged: "2026-05-12T18:00:00Z",
    cells: cells({
      EU: { status: "live", license: "EMI license — PSD2 Art. 18", obligations: 31, lastReviewed: "2026-04-25T00:00:00Z" },
      US: { status: "live", license: "Money Transmitter (38 states)", obligations: 52, lastReviewed: "2026-04-15T00:00:00Z" },
      SG: { status: "live", license: "MAS MPI", obligations: 17, lastReviewed: "2026-04-30T00:00:00Z" },
      UK: { status: "live", license: "FCA EMI", obligations: 15, lastReviewed: "2026-04-30T00:00:00Z" }
    })
  }
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

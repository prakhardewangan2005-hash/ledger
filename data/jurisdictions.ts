import type { Jurisdiction } from "@/types";

export const JURISDICTIONS: Jurisdiction[] = [
  { code: "EU", name: "European Union", flag: "🇪🇺", regulator: "ESMA / EBA", riskTier: 1 },
  { code: "US", name: "United States", flag: "🇺🇸", regulator: "SEC / CFTC / FinCEN", riskTier: 1 },
  { code: "SG", name: "Singapore",      flag: "🇸🇬", regulator: "MAS", riskTier: 2 },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", regulator: "FCA", riskTier: 1 },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", regulator: "VARA / SCA", riskTier: 2 },
  { code: "JP", name: "Japan", flag: "🇯🇵", regulator: "FSA / JFSA", riskTier: 2 },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰", regulator: "SFC / HKMA", riskTier: 2 },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", regulator: "FINMA", riskTier: 3 }
];

export const jurisdictionByCode = (code: string) => JURISDICTIONS.find((j) => j.code === code);

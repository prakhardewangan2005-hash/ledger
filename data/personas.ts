import type { TeamMember } from "@/types";

export const TEAM: TeamMember[] = [
  { id: "u_priya",  name: "Priya Subramaniam",  role: "Head of Compliance",     email: "priya@northwind.xyz",   avatarColor: "oklch(0.62 0.18 285)" },
  { id: "u_marcus", name: "Marcus Chen",         role: "Compliance Ops Manager",  email: "marcus@northwind.xyz", avatarColor: "oklch(0.66 0.14 230)" },
  { id: "u_david",  name: "David Reyes",         role: "VP Product",              email: "david@northwind.xyz",  avatarColor: "oklch(0.68 0.16 150)" },
  { id: "u_ade",    name: "Adekunle Okafor",     role: "Senior Compliance Analyst", email: "ade@northwind.xyz",  avatarColor: "oklch(0.72 0.16 60)"  },
  { id: "u_lin",    name: "Lin Wei",             role: "Regulatory Counsel",       email: "lin@northwind.xyz",   avatarColor: "oklch(0.70 0.18 20)"  },
  { id: "u_sara",   name: "Sara Halvorsen",      role: "Audit Lead",               email: "sara@northwind.xyz",  avatarColor: "oklch(0.64 0.14 180)" },
  { id: "u_jonas",  name: "Jonas Pereira",       role: "Compliance Engineer",      email: "jonas@northwind.xyz", avatarColor: "oklch(0.66 0.17 320)" },
  { id: "u_meera",  name: "Meera Iyer",          role: "Compliance Analyst",       email: "meera@northwind.xyz", avatarColor: "oklch(0.70 0.13 140)" }
];

export const ME = TEAM[0]; // Priya is the logged-in persona in this build

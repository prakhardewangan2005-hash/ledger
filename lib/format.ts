import { format, formatDistanceToNow, isThisYear } from "date-fns";

export function fmtDate(date: string | Date, opts?: { withYear?: boolean }) {
  const d = typeof date === "string" ? new Date(date) : date;
  if (opts?.withYear || !isThisYear(d)) return format(d, "MMM d, yyyy");
  return format(d, "MMM d");
}

export function fmtRelative(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function fmtTime(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "h:mm a");
}

export function fmtCompact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function fmtNumber(n: number, digits = 0) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
}

export function fmtPercent(n: number, digits = 1) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function fmtDollar(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

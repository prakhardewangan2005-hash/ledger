export function fmtDate(date: string | Date, opts?: { withYear?: boolean }) {
  const d = typeof date === "string" ? new Date(date) : date;
  const sameYear = d.getFullYear() === new Date().getFullYear();
  const useYear = opts?.withYear || !sameYear;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(useYear ? { year: "numeric" } : {})
  }).format(d);
}

export function fmtRelative(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = d.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const abs = Math.abs(diffSec);
  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  if (abs < 60)        return rtf.format(diffSec, "second");
  if (abs < 3600)      return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400)     return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 604800)    return rtf.format(Math.round(diffSec / 86400), "day");
  if (abs < 2592000)   return rtf.format(Math.round(diffSec / 604800), "week");
  if (abs < 31536000)  return rtf.format(Math.round(diffSec / 2592000), "month");
  return rtf.format(Math.round(diffSec / 31536000), "year");
}

export function fmtTime(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(d);
}

export function fmtCompact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function fmtNumber(n: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(n);
}

export function fmtPercent(n: number, digits = 1) {
  return `${n >= 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function fmtDollar(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(n);
}
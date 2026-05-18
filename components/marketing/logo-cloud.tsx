"use client";

const FIRMS = [
  "Northwind Markets",
  "Helix Custody",
  "Solstice Capital",
  "Brightline Exchange",
  "Meridian Digital",
  "Vector Pay",
  "Atlas Stablecoin",
  "Praxis Derivatives",
  "Citadel Vault",
  "Quorum Crypto"
];

export function LogoCloud() {
  return (
    <section className="border-y border-border bg-card/30 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by compliance teams at regulated crypto-native firms
        </p>
        <div className="pause-on-hover mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
            {[...FIRMS, ...FIRMS].map((firm, i) => (
              <span key={`${firm}-${i}`} className="whitespace-nowrap text-xl font-bold tracking-tight text-muted-foreground/70">
                {firm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

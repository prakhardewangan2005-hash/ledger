"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-svh place-items-center bg-background px-6">
      <div className="text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-destructive">unrecoverable</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">
          Something <span className="font-serif italic font-normal text-primary">broke.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base font-medium text-muted-foreground">
          We logged it. If this keeps happening, this is the kind of thing a real compliance team would file an incident report on.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs font-medium text-muted-foreground">trace · {error.digest}</p>
        ) : null}
        <button
          onClick={reset}
          className="btn-3d-outline mt-8 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}

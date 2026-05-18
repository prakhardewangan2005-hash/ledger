import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-background px-6">
      <div className="text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">404 · not found</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-foreground">
          Off the <span className="font-serif italic font-normal text-primary">map.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base font-medium text-muted-foreground">
          This jurisdiction does not exist in our registry. Return to a known surface, or call the Copilot for directions.
        </p>
        <Link
          href="/"
          className="btn-3d mt-8 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to surface
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}

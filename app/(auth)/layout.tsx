import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh bg-background">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_5%,transparent_70%)]" aria-hidden />
      <header className="absolute inset-x-0 top-0 z-10 mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Logo />
        <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          ← Back to home
        </Link>
      </header>
      <main id="main" className="flex min-h-svh items-center justify-center px-6 py-24">
        {children}
      </main>
    </div>
  );
}

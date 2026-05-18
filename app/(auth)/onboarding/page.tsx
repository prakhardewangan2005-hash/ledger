"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { JURISDICTIONS } from "@/data/jurisdictions";
import { cn } from "@/lib/utils";

const STEPS = ["Workspace", "Jurisdictions", "Products", "Sources", "Ready"] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [workspace, setWorkspace] = useState("Northwind Markets");
  const [jurisdictions, setJurisdictions] = useState<string[]>(["EU", "US", "SG", "UK"]);
  const [products, setProducts] = useState<string[]>(["Spot", "Vault"]);
  const [sources, setSources] = useState<string[]>(["Slack", "Google Drive"]);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setSubmitting(true);
      setTimeout(() => router.push("/today"), 900);
    }
  }
  function prev() { if (step > 0) setStep(step - 1); }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors",
                i < step ? "border-primary bg-primary text-primary-foreground" :
                i === step ? "border-primary text-primary" :
                "border-border text-muted-foreground"
              )}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={cn("hidden text-xs font-semibold sm:inline", i === step ? "text-foreground" : "text-muted-foreground")}>{label}</span>
              {i < STEPS.length - 1 && <div className={cn("ml-2 h-px w-6 sm:w-10", i < step ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === 0 && (
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Name your <span className="font-serif italic font-normal text-primary">workspace.</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">This is what your team will see across the product.</p>
              <div className="mt-8 space-y-2">
                <Label htmlFor="workspace" className="font-semibold">Workspace name</Label>
                <Input id="workspace" value={workspace} onChange={(e) => setWorkspace(e.target.value)} placeholder="Acme Markets" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Where do you <span className="font-serif italic font-normal text-primary">operate?</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">We&rsquo;ll subscribe you to regulatory feeds for these jurisdictions.</p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {JURISDICTIONS.map((j) => {
                  const active = jurisdictions.includes(j.code);
                  return (
                    <button
                      type="button"
                      key={j.code}
                      onClick={() => setJurisdictions(active ? jurisdictions.filter((x) => x !== j.code) : [...jurisdictions, j.code])}
                      className={cn(
                        "group relative flex items-start gap-3 rounded-lg border p-3 text-left transition-all",
                        active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-foreground/20"
                      )}
                    >
                      <span className="text-2xl leading-none">{j.flag}</span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{j.name}</div>
                        <div className="font-mono text-[10px] font-medium text-muted-foreground">{j.regulator}</div>
                      </div>
                      {active ? (
                        <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-3 w-3" />
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                What do you <span className="font-serif italic font-normal text-primary">ship?</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">We&rsquo;ll create a row in your product matrix for each.</p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["Spot Exchange", "Vault / Custody", "Derivatives", "Earn / Staking", "Stablecoin issuance", "Payments / Pay"].map((p) => {
                  const active = products.includes(p.split(" ")[0]);
                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setProducts(active ? products.filter((x) => x !== p.split(" ")[0]) : [...products, p.split(" ")[0]])}
                      className={cn(
                        "flex items-center justify-between rounded-lg border p-4 text-left transition-all",
                        active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-foreground/20"
                      )}
                    >
                      <span className="text-sm font-semibold text-foreground">{p}</span>
                      <div className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border",
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      )}>
                        {active ? <Check className="h-3 w-3" /> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-foreground">
                Connect your <span className="font-serif italic font-normal text-primary">sources.</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">Ledger ingests evidence from where your team already works.</p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {["Slack", "Google Drive", "Notion", "Confluence", "Linear", "Fireblocks", "Chainalysis", "Notabene"].map((s) => {
                  const active = sources.includes(s);
                  return (
                    <label key={s} className={cn("flex items-center gap-3 rounded-lg border p-3.5 transition-colors cursor-pointer", active ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-foreground/20")}>
                      <Checkbox checked={active} onCheckedChange={(v) => setSources(v ? [...sources, s] : sources.filter((x) => x !== s))} />
                      <span className="text-sm font-semibold text-foreground">{s}</span>
                      <span className="ml-auto font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">OAuth</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
                You&rsquo;re <span className="font-serif italic font-normal text-primary">set.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm font-medium text-muted-foreground">
                Your workspace is ready. We&rsquo;ve pre-loaded {jurisdictions.length} jurisdictions, {products.length} products, and {sources.length} integrations. The regulatory feed is already pulling.
              </p>
              <div className="mx-auto mt-8 max-w-sm rounded-lg border border-border bg-card p-4 text-left card-extruded">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">summary</div>
                <dl className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between"><dt className="font-medium text-muted-foreground">Workspace</dt><dd className="font-semibold text-foreground">{workspace}</dd></div>
                  <div className="flex justify-between"><dt className="font-medium text-muted-foreground">Jurisdictions</dt><dd className="font-semibold text-foreground">{jurisdictions.join(" · ")}</dd></div>
                  <div className="flex justify-between"><dt className="font-medium text-muted-foreground">Products</dt><dd className="font-semibold text-foreground">{products.length}</dd></div>
                  <div className="flex justify-between"><dt className="font-medium text-muted-foreground">Sources</dt><dd className="font-semibold text-foreground">{sources.length}</dd></div>
                </dl>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={prev} className="font-semibold">← Back</Button>
        ) : <span />}
        <Button onClick={next} disabled={submitting} className="btn-3d border-0 min-w-[140px] font-semibold">
          {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Provisioning…</>) :
           step === STEPS.length - 1 ? "Open workspace" : (<>Continue<ArrowRight className="h-4 w-4" /></>)}
        </Button>
      </div>
    </div>
  );
}

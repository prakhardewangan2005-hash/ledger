"use client";

import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Moon, Sun, Monitor } from "lucide-react";

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div className="max-w-3xl space-y-8">
      <Card className="p-6">
        <h2 className="text-base font-medium text-foreground">Theme</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ledger is designed dark-first. Light mode is fully supported.</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { value: "light",  label: "Light",   Icon: Sun },
            { value: "dark",   label: "Dark",    Icon: Moon },
            { value: "system", label: "System",  Icon: Monitor }
          ].map((opt) => {
            const active = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-lg border p-5 transition-colors",
                  active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-foreground/20"
                )}
              >
                <opt.Icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm", active ? "text-foreground" : "text-muted-foreground")}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-base font-medium text-foreground">Density</h2>
        <p className="mt-1 text-sm text-muted-foreground">Compact density shows ~30% more data per screen.</p>
        <RadioGroup defaultValue="comfortable" className="mt-5">
          <div className="flex items-center gap-3">
            <RadioGroupItem id="d1" value="comfortable" />
            <Label htmlFor="d1" className="text-sm">Comfortable</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem id="d2" value="compact" />
            <Label htmlFor="d2" className="text-sm">Compact</Label>
          </div>
        </RadioGroup>
      </Card>
    </div>
  );
}

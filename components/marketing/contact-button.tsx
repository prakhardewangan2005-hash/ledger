"use client";

import { Phone, Mail, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_PHONE_HREF, CONTACT_EMAIL_HREF } from "@/lib/contact";

type Props = {
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  arrow?: boolean;
  threed?: boolean;
};

export function ContactButton({
  label = "Get in touch",
  size = "default",
  variant = "default",
  className,
  arrow = false,
  threed = false
}: Props) {
  const [copied, setCopied] = useState<"phone" | "email" | null>(null);

  async function copy(value: string, which: "phone" | "email") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1400);
    } catch {}
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={size}
          variant={variant}
          className={cn(
            "group",
            threed && variant === "default" && "btn-3d border-0",
            threed && variant === "outline" && "btn-3d-outline",
            className
          )}
        >
          {label}
          {arrow ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
        <div className="border-b border-border px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Contact</div>
          <div className="mt-0.5 text-sm font-semibold text-foreground">Let&rsquo;s talk.</div>
        </div>

        <div className="space-y-1 p-2">
          <ContactRow
            icon={Phone}
            label="Call"
            value={CONTACT_PHONE}
            href={CONTACT_PHONE_HREF}
            copied={copied === "phone"}
            onCopy={() => copy(CONTACT_PHONE, "phone")}
          />
          <ContactRow
            icon={Mail}
            label="Email"
            value={CONTACT_EMAIL}
            href={CONTACT_EMAIL_HREF}
            copied={copied === "email"}
            onCopy={() => copy(CONTACT_EMAIL, "email")}
          />
        </div>

        <div className="border-t border-border px-4 py-2.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Replies within one business day.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  copied,
  onCopy
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="group/row flex items-center gap-3 rounded-md px-2.5 py-2 transition-colors hover:bg-accent">
      <a href={href} className="flex flex-1 items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
          <div className="truncate text-sm font-semibold text-foreground">{value}</div>
        </div>
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-foreground group-hover/row:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

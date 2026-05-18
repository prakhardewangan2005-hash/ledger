"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactButton } from "@/components/marketing/contact-button";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_PHONE_HREF, CONTACT_EMAIL_HREF } from "@/lib/contact";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/onboarding"), 700);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Get <span className="font-serif italic font-normal text-primary">started.</span>
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">Tell us about your firm. We respond within one business day.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2"><Label htmlFor="firstname" className="font-semibold">First name</Label><Input id="firstname" required /></div>
          <div className="space-y-2"><Label htmlFor="lastname" className="font-semibold">Last name</Label><Input id="lastname" required /></div>
        </div>
        <div className="space-y-2"><Label htmlFor="email" className="font-semibold">Work email</Label><Input id="email" type="email" required /></div>
        <div className="space-y-2"><Label htmlFor="company" className="font-semibold">Firm</Label><Input id="company" required /></div>
        <div className="space-y-2"><Label htmlFor="role" className="font-semibold">Role</Label><Input id="role" required /></div>
        <Button type="submit" className="btn-3d w-full border-0 font-semibold" disabled={loading}>
          {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Continue</>) : "Continue"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono font-semibold uppercase tracking-[0.18em]">or talk to us directly</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3">
        <ContactButton label="Get in touch" size="default" threed className="w-full font-semibold" arrow />
        <div className="flex flex-col gap-1.5 text-center text-xs">
          <a href={CONTACT_PHONE_HREF} className="inline-flex items-center justify-center gap-1.5 font-mono font-semibold text-foreground transition-colors hover:text-primary">
            <Phone className="h-3 w-3" />{CONTACT_PHONE}
          </a>
          <a href={CONTACT_EMAIL_HREF} className="inline-flex items-center justify-center gap-1.5 font-mono font-semibold text-muted-foreground transition-colors hover:text-foreground break-all">
            <Mail className="h-3 w-3" />{CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}

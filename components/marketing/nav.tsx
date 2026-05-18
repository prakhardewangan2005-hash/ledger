"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MARKETING_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ContactButton } from "@/components/marketing/contact-button";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_PHONE_HREF, CONTACT_EMAIL_HREF } from "@/lib/contact";

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {MARKETING_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CONTACT_PHONE_HREF}
            className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground lg:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-mono">{CONTACT_PHONE}</span>
          </a>
          <ContactButton size="sm" threed arrow />
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-4">
              {MARKETING_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="text-base font-semibold text-foreground">
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <a href={CONTACT_PHONE_HREF} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-mono">{CONTACT_PHONE}</span>
                </a>
                <a href={CONTACT_EMAIL_HREF} className="flex items-center gap-2 text-sm font-medium text-foreground break-all">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-mono">{CONTACT_EMAIL}</span>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

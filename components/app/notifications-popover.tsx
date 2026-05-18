"use client";

import { motion } from "framer-motion";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ACTIVITY } from "@/data/activity";
import { fmtRelative } from "@/lib/format";
import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function NotificationsPopover({ children }: { children: React.ReactNode }) {
  const items = ACTIVITY.slice(0, 6);
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-medium text-foreground">Notifications</span>
          <button className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground">Mark all read</button>
        </div>
        <motion.ul
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          className="max-h-[360px] overflow-y-auto"
        >
          {items.map((a) => (
            <motion.li
              key={a.id}
              variants={{ hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } }}
              className="flex gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-accent/40"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback style={{ background: a.actor.avatarColor, color: "white" }} className="text-[10px]">
                  {initials(a.actor.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-sm">
                <p className="text-foreground/90">
                  <span className="font-medium">{a.actor.name}</span>{" "}
                  <span className="text-muted-foreground">{a.verb}</span>{" "}
                  {a.objectHref ? (
                    <Link href={a.objectHref} className="font-medium underline-offset-2 hover:underline">{a.object}</Link>
                  ) : (
                    <span className="font-medium">{a.object}</span>
                  )}
                  {a.meta ? <span className="text-muted-foreground"> · {a.meta}</span> : null}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{fmtRelative(a.at)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </PopoverContent>
    </Popover>
  );
}

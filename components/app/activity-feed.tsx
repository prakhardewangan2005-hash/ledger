"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ACTIVITY } from "@/data/activity";
import { fmtRelative } from "@/lib/format";
import { initials } from "@/lib/utils";

export function ActivityFeed({ limit = 8 }: { limit?: number }) {
  const items = ACTIVITY.slice(0, limit);
  return (
    <ul className="space-y-3">
      {items.map((a) => (
        <li key={a.id} className="flex items-start gap-3">
          <Avatar className="h-7 w-7">
            <AvatarFallback style={{ background: a.actor.avatarColor, color: "white" }} className="text-[10px]">
              {initials(a.actor.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm leading-relaxed">
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
        </li>
      ))}
    </ul>
  );
}

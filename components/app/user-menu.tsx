"use client";

import { LogOut, Settings, User, HelpCircle } from "lucide-react";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ME } from "@/data/personas";
import { initials } from "@/lib/utils";
import Link from "next/link";

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="User menu">
          <Avatar className="h-8 w-8">
            <AvatarFallback style={{ background: ME.avatarColor, color: "white" }}>{initials(ME.name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-foreground">{ME.name}</span>
          <span className="font-mono text-[10px] normal-case tracking-normal text-muted-foreground">{ME.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings"><Settings className="h-4 w-4" />Settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></Link>
        </DropdownMenuItem>
        <DropdownMenuItem><User className="h-4 w-4" />Profile</DropdownMenuItem>
        <DropdownMenuItem><HelpCircle className="h-4 w-4" />Help & docs</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/"><LogOut className="h-4 w-4" />Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

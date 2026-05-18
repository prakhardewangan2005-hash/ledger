"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TEAM } from "@/data/personas";
import { initials } from "@/lib/utils";
import { Plus, MoreHorizontal } from "lucide-react";

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-base font-medium text-foreground">Team · {TEAM.length} members</h2>
          <p className="mt-1 text-sm text-muted-foreground">Roles control what each member can read, edit, and approve.</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5" /> Invite member</Button>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM.map((m, i) => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7"><AvatarFallback style={{ background: m.avatarColor, color: "white" }} className="text-[10px]">{initials(m.name)}</AvatarFallback></Avatar>
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                    {i === 0 ? <Badge variant="default" className="ml-1">You</Badge> : null}
                  </div>
                </TableCell>
                <TableCell><span className="text-sm text-foreground/90">{m.role}</span></TableCell>
                <TableCell><span className="font-mono text-xs text-muted-foreground">{m.email}</span></TableCell>
                <TableCell>
                  <Badge variant={i === 0 ? "default" : i < 2 ? "info" : "muted"}>
                    {i === 0 ? "Admin" : i < 2 ? "Editor" : "Reviewer"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

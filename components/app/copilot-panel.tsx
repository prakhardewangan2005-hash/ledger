"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Citation } from "@/components/app/citation";
import { useUIStore } from "@/stores/ui-store";
import { useCopilot } from "@/hooks/use-copilot";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "What changed today that affects Vault?",
  "Can we launch staking in Germany?",
  "Are we ready for the GENIUS Act monthly filing?",
  "Which controls have stale evidence?"
];

export function CopilotPanel() {
  const { copilotOpen, setCopilotOpen } = useUIStore();
  const { messages, sendMessage, isStreaming, reset } = useCopilot();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setCopilotOpen(!copilotOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copilotOpen, setCopilotOpen]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <AnimatePresence>
      {copilotOpen ? (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 32, stiffness: 280 }}
          className="fixed inset-y-0 right-0 z-30 flex w-full flex-col border-l border-border bg-card sm:w-[420px]"
          aria-label="Copilot"
        >
          <header className="flex h-14 items-center gap-2 border-b border-border px-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Copilot</div>
              <div className="font-mono text-[10px] text-muted-foreground">grounded in your workspace</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {messages.length ? (
                <Button variant="ghost" size="icon" onClick={reset} aria-label="Clear conversation" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : null}
              <Button variant="ghost" size="icon" onClick={() => setCopilotOpen(false)} aria-label="Close Copilot" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <ScrollArea className="flex-1">
            <div ref={scrollRef} className="space-y-4 p-4">
              {messages.length === 0 ? (
                <div className="pt-8">
                  <h3 className="font-bold text-2xl text-foreground">How can I help?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Every answer cites primary sources. Confidence shown on every claim.</p>
                  <div className="mt-6 space-y-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="block w-full rounded-md border border-border bg-background px-3 py-2 text-left text-sm text-foreground/90 transition-colors hover:border-primary/40 hover:bg-accent"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[88%] rounded-xl px-4 py-2.5 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "border border-primary/30 bg-primary/[0.06] text-foreground"
                      )}
                    >
                      <span className={m.streaming ? "stream-cursor" : ""}>{m.content}</span>
                      {m.citations && !m.streaming ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {m.citations.map((c) => (
                            <Citation key={c.title} className="bg-background">
                              {c.title} <span className="ml-1 text-muted-foreground">· {c.source}</span>
                            </Citation>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <form onSubmit={submit} className="border-t border-border p-3">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                placeholder="Ask Copilot…"
                className="min-h-[60px] resize-none pr-12"
                disabled={isStreaming}
              />
              <Button type="submit" size="icon" className="absolute bottom-2 right-2 h-8 w-8" disabled={isStreaming || !input.trim()} aria-label="Send">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              Enter to send · Shift+Enter for newline · ⌘/ to toggle
            </p>
          </form>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, MessageSquare, Clock, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Citation } from "@/components/app/citation";
import { useCopilot } from "@/hooks/use-copilot";
import { cn } from "@/lib/utils";

const SAMPLE_THREADS = [
  { id: "t1", title: "MiCA Article 60 — impact on Vault product",            preview: "Three products affected. EU enforcement starts…", at: "2h ago" },
  { id: "t2", title: "Germany staking launch — go/no-go memo",                preview: "Three regulatory surfaces apply. BaFin §32 KWG…", at: "1d ago" },
  { id: "t3", title: "GENIUS Act reserve attestation — June filing",          preview: "Reserves as of May 17 are $2.41B, composition…", at: "2d ago" },
  { id: "t4", title: "Audit Room prep — Q2 evidence freshness",               preview: "Eight controls have evidence older than 90 days…", at: "4d ago" },
  { id: "t5", title: "VARA staking registration — timeline & owners",          preview: "Window opens June 1; six-month phased rollout…", at: "6d ago" }
];

const SUGGESTIONS = [
  "What changed today across all jurisdictions?",
  "Which filings are at risk of slipping this week?",
  "Compare our Earn product status in EU vs. UAE.",
  "Generate a board update on MiCA readiness.",
  "Which controls have evidence freshness < 70%?",
  "Draft a memo on the OFAC bridge advisory."
];

export default function CopilotPage() {
  const { messages, sendMessage, isStreaming, reset } = useCopilot();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input);
    setInput("");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Copilot"
        title="Your junior analyst."
        description="Every answer is grounded in your workspace. Every claim cites a primary source."
        actions={messages.length ? (
          <Button variant="outline" size="sm" onClick={reset}><Trash2 className="h-3.5 w-3.5" /> Clear</Button>
        ) : null}
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Threads sidebar */}
        <aside>
          <Card className="p-3">
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Recent threads</div>
              <Button variant="ghost" size="icon" className="h-6 w-6"><MessageSquare className="h-3.5 w-3.5" /></Button>
            </div>
            <ul className="mt-2 space-y-1">
              {SAMPLE_THREADS.map((t, i) => (
                <li key={t.id}>
                  <button className={cn(
                    "w-full rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent",
                    i === 0 ? "bg-accent" : ""
                  )}>
                    <div className="truncate text-xs font-medium text-foreground">{t.title}</div>
                    <div className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{t.preview}</div>
                    <div className="mt-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" /> {t.at}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </aside>

        {/* Conversation */}
        <div>
          <Card className="flex h-[calc(100svh-280px)] min-h-[520px] flex-col">
            <ScrollArea className="flex-1">
              <div ref={scrollRef} className="space-y-4 p-6">
                {messages.length === 0 ? (
                  <div className="py-8">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">Copilot</span>
                    </div>
                    <h2 className="mt-2 font-bold text-3xl text-foreground">How can I help?</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Try one of these — or ask anything about your regulations, products, filings, or evidence.
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="rounded-md border border-border bg-background px-3 py-2.5 text-left text-sm text-foreground/90 transition-colors hover:border-primary/40 hover:bg-accent"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
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
                    </motion.div>
                  ))
                )}
              </div>
            </ScrollArea>

            <form onSubmit={submit} className="border-t border-border p-4">
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
                  placeholder="Ask anything about your compliance workspace…"
                  className="min-h-[68px] resize-none pr-12"
                  disabled={isStreaming}
                />
                <Button type="submit" size="icon" className="absolute bottom-2 right-2 h-8 w-8" disabled={isStreaming || !input.trim()} aria-label="Send">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                Enter to send · Shift+Enter for newline · Citations attached to every answer
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

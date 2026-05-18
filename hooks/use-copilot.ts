"use client";
import { useCallback, useState } from "react";

export type CopilotMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: { title: string; source: string }[];
  streaming?: boolean;
};

const SAMPLE_RESPONSES: Record<string, { content: string; citations: { title: string; source: string }[] }> = {
  default: {
    content:
      "Based on the most recent regulatory feed, the highest-priority change is the MiCA Title V Article 60 amendment governing custody disclosures in the EU. It affects three of your live products (Spot, Vault, Earn) across all 27 EU member states with an enforcement start of September 30. I'd suggest opening a change project today — the median internal-assessment time for items in this band has historically been 9 days.",
    citations: [
      { title: "MiCA — Regulation (EU) 2023/1114, Title V Art. 60", source: "EUR-Lex" },
      { title: "EBA Guidelines on custody disclosure", source: "European Banking Authority" }
    ]
  },
  germany: {
    content:
      "Launching staking in Germany triggers three regulatory surfaces. (1) BaFin requires a Section 32 KWG license if the product offers fixed returns — your current product spec is variable-yield, which falls outside scope. (2) MiCA Title III applies in full from December 30. (3) German Money Laundering Act §10 requires enhanced KYC for staked balances over €15,000. Estimated time to launch-ready: 4–6 weeks with current team. I've drafted a project plan.",
    citations: [
      { title: "MiCA — Title III", source: "EUR-Lex" },
      { title: "KWG Section 32", source: "Bundesbank" },
      { title: "GwG §10 — Enhanced KYC thresholds", source: "BaFin" }
    ]
  },
  audit: {
    content:
      "The most recent SOC 2 Type II audit completed 14 weeks ago. Current evidence freshness across all 142 controls is 91%. Eight controls have evidence older than 90 days — I'd recommend refreshing AC-2 (access reviews), CC-7.1 (incident detection), and CC-9.2 (vendor risk) before next quarter. I can generate refresh tasks now.",
    citations: [
      { title: "Internal — Audit calendar 2026", source: "Evidence vault" },
      { title: "SOC 2 Trust Services Criteria 2017", source: "AICPA" }
    ]
  }
};

function pickResponse(prompt: string) {
  const p = prompt.toLowerCase();
  if (p.includes("germany") || p.includes("staking")) return SAMPLE_RESPONSES.germany;
  if (p.includes("audit") || p.includes("soc")) return SAMPLE_RESPONSES.audit;
  return SAMPLE_RESPONSES.default;
}

export function useCopilot() {
  const [messages, setMessages] = useState<CopilotMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;
    const userId = crypto.randomUUID();
    const asstId = crypto.randomUUID();
    setMessages((m) => [...m, { id: userId, role: "user", content: text }]);
    setIsStreaming(true);

    const { content, citations } = pickResponse(text);
    setMessages((m) => [...m, { id: asstId, role: "assistant", content: "", streaming: true, citations }]);

    // Simulate token streaming
    const words = content.split(" ");
    for (let i = 0; i < words.length; i++) {
      await new Promise((r) => setTimeout(r, 18 + Math.random() * 22));
      setMessages((m) =>
        m.map((msg) =>
          msg.id === asstId
            ? { ...msg, content: words.slice(0, i + 1).join(" "), streaming: i < words.length - 1 }
            : msg
        )
      );
    }
    setIsStreaming(false);
  }, [isStreaming]);

  const reset = useCallback(() => setMessages([]), []);

  return { messages, sendMessage, isStreaming, reset };
}

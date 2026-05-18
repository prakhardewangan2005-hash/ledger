import { NextRequest } from "next/server";

/**
 * Streaming Copilot endpoint.
 * In production, this would proxy to your LLM provider and inject workspace context.
 * For this portfolio build, it streams a deterministic, well-cited response so the demo
 * can run with no external API keys.
 */
export const runtime = "edge";

const SAMPLE = `Based on the most recent regulatory feed, the highest-priority change is the MiCA Title V Article 60 amendment governing custody disclosures in the EU. It affects three of your live products (Spot, Vault, Earn) across all 27 EU member states with an enforcement start of September 30. I'd suggest opening a change project today.

Sources: MiCA — Regulation (EU) 2023/1114 Title V Art. 60 · EBA Guidelines on custody disclosure`;

export async function POST(req: NextRequest) {
  const { message } = (await req.json().catch(() => ({}))) as { message?: string };

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = (message ? `You asked: "${message}". ` : "") + SAMPLE;
      for (const w of words.split(" ")) {
        controller.enqueue(encoder.encode(JSON.stringify({ delta: w + " " }) + "\n"));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + "\n"));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no"
    }
  });
}

import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { runAi } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — EasyWork AI" },
      {
        name: "description",
        content:
          "Chat with the EasyWork workplace assistant for quick answers, drafting help and everyday task automation.",
      },
      { property: "og:title", content: "AI Chatbot — EasyWork AI" },
      {
        property: "og:description",
        content: "A workplace AI chatbot for drafting, planning and quick answers.",
      },
    ],
  }),
  component: ChatPage,
});

const SYSTEM =
  "You are EasyWork, a workplace productivity assistant for professionals. Be concise, practical and professional. Use markdown. When you are unsure, say so and suggest how the user can verify. Never invent facts, figures, policies or citations.";

const SUGGESTIONS = [
  "Rewrite this update so it sounds more confident",
  "Help me prioritise my week",
  "Draft an agenda for a 30-minute client check-in",
];

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const call = useServerFn(runAi);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await call({ data: { system: SYSTEM, messages: next } });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The AI request failed.");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl gradient-brand">
          <Bot className="size-5 text-primary-foreground" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">AI Chatbot</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask anything about your work day — drafting, planning, summarising or explaining.
          </p>
        </div>
      </header>

      <section className="surface-card flex h-[65vh] min-h-[28rem] flex-col p-4 sm:p-6">
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="grid h-full place-items-center text-center">
              <div className="max-w-sm space-y-3">
                <p className="text-sm text-muted-foreground">Start with a prompt:</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => void send(s)}
                    className="block w-full rounded-lg border border-border bg-secondary/60 px-3 py-2 text-left text-sm transition-colors hover:border-accent hover:bg-secondary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                  m.role === "user" ? "bg-secondary text-secondary-foreground" : "gradient-brand text-primary-foreground"
                }`}
              >
                {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
              </span>
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {m.role === "assistant" ? (
                  <article className="prose-easywork space-y-2">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </article>
                ) : (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> EasyWork is thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={2}
              placeholder="Ask EasyWork anything…"
              className="resize-none"
            />
            <Button onClick={() => void send(input)} disabled={loading || !input.trim()} size="lg">
              <Send className="size-4" />
            </Button>
          </div>
          <AiDisclaimer compact />
        </div>
      </section>
    </div>
  );
}

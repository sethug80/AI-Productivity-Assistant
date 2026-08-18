import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — EasyWork AI" },
      {
        name: "description",
        content:
          "Get structured briefings on any work topic, with key findings, trade-offs and the checks you should run yourself.",
      },
      { property: "og:title", content: "AI Research Assistant — EasyWork AI" },
      {
        property: "og:description",
        content: "Structured work briefings with explicit confidence and verification steps.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <ToolWorkbench
      title="AI Research Assistant"
      description="Structured briefings on any workplace topic, with confidence levels and what to verify."
      icon={Search}
      system="You are a research assistant for professionals. You have no live internet access, so rely on general knowledge and say so. Output markdown: Overview, Key findings, Trade-offs / differing views, Practical implications, What to verify (with suggested sources), and Confidence (high/medium/low) with reasoning. Never fabricate citations, statistics or URLs."
      fields={[
        { name: "topic", label: "Research question", type: "textarea", rows: 3, required: true, placeholder: "What should we consider before rolling out a 4-day work week?" },
        { name: "context", label: "Business context", type: "textarea", rows: 3, placeholder: "60-person services firm, client-facing delivery teams" },
        { name: "depth", label: "Depth", type: "select", options: ["Quick brief", "Standard briefing", "Deep dive"] },
        { name: "audience", label: "Audience", type: "select", options: ["Executive", "Team lead", "Technical", "Client-facing"] },
      ]}
      buildPrompt={(v) =>
        `Research question: ${v.topic}\nContext: ${v.context || "none given"}\nDepth: ${v.depth}\nAudience: ${v.audience}`
      }
      ctaLabel="Run research"
    />
  );
}

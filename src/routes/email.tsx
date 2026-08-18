import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — EasyWork AI" },
      {
        name: "description",
        content:
          "Draft clear, professional workplace emails in seconds with structured inputs and fully editable AI output.",
      },
      { property: "og:title", content: "Smart Email Generator — EasyWork AI" },
      {
        property: "og:description",
        content: "Generate and edit professional emails with EasyWork's AI assistant.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ToolWorkbench
      title="Smart Email Generator"
      description="Turn a few bullet points into a polished, on-tone workplace email."
      icon={Mail}
      system="You are an expert business communication assistant. Write clear, concise, professional emails. Return markdown with a subject line, greeting, body and sign-off. Never invent facts, figures or commitments that were not provided; use [bracketed placeholders] instead."
      fields={[
        { name: "recipient", label: "Recipient / audience", placeholder: "e.g. Head of Finance", required: true },
        { name: "purpose", label: "Purpose & key points", type: "textarea", required: true, placeholder: "Request budget approval for Q3 tooling; costs R42k; deadline Friday" },
        { name: "tone", label: "Tone", type: "select", options: ["Professional", "Friendly", "Direct", "Apologetic", "Persuasive", "Formal"] },
        { name: "length", label: "Length", type: "select", options: ["Short", "Medium", "Detailed"] },
        { name: "cta", label: "Desired next step", placeholder: "Approve by Friday 17:00" },
      ]}
      buildPrompt={(v) =>
        `Write a workplace email.\nRecipient: ${v["recipient"]}\nTone: ${v["tone"]}\nLength: ${v["length"]}\nDesired next step: ${v["cta"] || "not specified"}\nKey points:\n${v["purpose"]}`
      }
      ctaLabel="Generate email"
    />
  );
}

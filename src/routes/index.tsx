import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, CalendarCheck, Mail, NotebookPen, Search, Sparkles } from "lucide-react";

import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EasyWork — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "EasyWork automates everyday workplace tasks: draft emails, summarise meetings, plan work and research topics with editable AI output.",
      },
      { property: "og:title", content: "EasyWork — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Draft emails, summarise meetings, plan tasks and research topics with one professional AI workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Bullet points in, a polished on-tone email out — with the length and next step you choose.",
  },
  {
    to: "/meetings",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Messy notes become decisions, action items with owners, and open questions.",
  },
  {
    to: "/planner",
    icon: CalendarCheck,
    title: "AI Task Planner",
    body: "Turn a goal into a prioritised, time-boxed plan with milestones and dependencies.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    body: "Structured briefings with trade-offs, confidence levels and what to verify yourself.",
  },
  {
    to: "/chat",
    icon: Bot,
    title: "AI Chatbot",
    body: "A conversational assistant for everything in between, with full context of your thread.",
  },
] as const;

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl gradient-brand px-6 py-10 text-primary-foreground sm:px-10 sm:py-14">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-3 py-1 text-xs font-medium">
          <Sparkles className="size-3.5" /> AI workplace productivity
        </span>
        <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Automate the busywork. Keep the judgement.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
          EasyWork drafts, summarises, plans and researches for you — with structured inputs and
          output you can edit before anything leaves your desk.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-4 py-2.5 text-sm font-medium text-primary transition-opacity hover:opacity-90"
          >
            Draft an email <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/35 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
          >
            Open the chatbot
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Your tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="surface-card group flex flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-accent/12 text-accent">
                <tool.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{tool.body}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent">
                Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <AiDisclaimer />
    </div>
  );
}

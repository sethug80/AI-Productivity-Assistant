import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — EasyWork AI" },
      {
        name: "description",
        content:
          "Break a goal into a prioritised, time-boxed task plan with owners, dependencies and milestones.",
      },
      { property: "og:title", content: "AI Task Planner — EasyWork AI" },
      {
        property: "og:description",
        content: "Turn goals into prioritised, time-boxed plans with EasyWork AI.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkbench
      title="AI Task Planner"
      description="Convert a goal into a realistic, prioritised plan you can drop straight into your tracker."
      icon={CalendarCheck}
      system="You are a pragmatic project planner. Output markdown: Goal restated, a prioritised task table (Task | Owner | Priority | Estimate | Due), Milestones, Dependencies & risks, and Suggested daily focus. Keep estimates realistic and flag assumptions explicitly."
      fields={[
        { name: "goal", label: "Goal or project", type: "textarea", required: true, rows: 4, placeholder: "Launch the customer onboarding revamp" },
        { name: "deadline", label: "Deadline", placeholder: "30 September" },
        { name: "capacity", label: "Available capacity", placeholder: "2 people, 10 hours/week each" },
        { name: "constraints", label: "Constraints & context", type: "textarea", rows: 3, placeholder: "Legal review needed; no budget for new tools" },
        { name: "style", label: "Plan style", type: "select", options: ["Sprint plan", "Daily schedule", "Weekly roadmap", "Checklist"] },
      ]}
      buildPrompt={(v) =>
        `Create a ${v.style} for this goal.\nGoal: ${v.goal}\nDeadline: ${v.deadline || "not specified"}\nCapacity: ${v.capacity || "not specified"}\nConstraints: ${v.constraints || "none given"}`
      }
      ctaLabel="Build my plan"
    />
  );
}

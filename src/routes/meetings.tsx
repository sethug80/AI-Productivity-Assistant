import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";

import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — EasyWork AI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into a structured summary with decisions, action items and owners.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — EasyWork AI" },
      {
        property: "og:description",
        content: "Summarize meetings into decisions, actions and owners with EasyWork AI.",
      },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <ToolWorkbench
      title="Meeting Notes Summarizer"
      description="Paste messy notes or a transcript and get a clean recap your team can act on."
      icon={NotebookPen}
      system="You summarize meeting notes for busy professionals. Output markdown with these sections: Summary, Key decisions, Action items (task — owner — due date), Risks & open questions. Only use information present in the notes; mark anything unclear as 'unclear from notes'."
      fields={[
        { name: "title", label: "Meeting title", placeholder: "Q3 planning sync" },
        { name: "attendees", label: "Attendees", placeholder: "Thabo, Sarah, Dev team" },
        { name: "notes", label: "Raw notes or transcript", type: "textarea", rows: 12, required: true, placeholder: "Paste your notes here…" },
        { name: "focus", label: "Summary focus", type: "select", options: ["Balanced recap", "Action items only", "Executive summary", "Decisions & risks"] },
      ]}
      buildPrompt={(v) =>
        `Summarize the following meeting.\nTitle: ${v["title"] || "untitled"}\nAttendees: ${v["attendees"] || "not listed"}\nFocus: ${v["focus"]}\n\nNotes:\n${v["notes"]}`
      }
      ctaLabel="Summarize notes"
    />
  );
}

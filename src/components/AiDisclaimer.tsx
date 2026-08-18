import { ShieldAlert } from "lucide-react";

export function AiDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="flex items-start gap-2 rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-3.5 shrink-0 text-accent" />
        AI-generated content may be incomplete, outdated or biased. Verify facts, names and figures
        before you use or send this output.
      </p>
    );
  }

  return (
    <section className="surface-card p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg bg-accent/12 text-accent">
          <ShieldAlert className="size-4" />
        </span>
        <h2 className="text-base font-semibold">Responsible AI use</h2>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold">Limitations</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            The assistant predicts likely text. It can invent details, miss context it was never
            given, and has no live access to your systems, calendar or the internet.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Bias</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Training data carries cultural, gender and language bias. Tone, name choices and
            recommendations may skew — review for fairness and inclusive wording.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Validation steps</h3>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            <li>Check every fact, figure, date and name against a source of truth.</li>
            <li>Edit the draft yourself before sending or sharing.</li>
            <li>Never paste confidential or personal data into prompts.</li>
            <li>Keep a human decision-maker for anything with real-world consequences.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

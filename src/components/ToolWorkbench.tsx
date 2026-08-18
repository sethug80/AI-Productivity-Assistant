import { useServerFn } from "@tanstack/react-start";
import { Copy, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { runAi } from "@/lib/ai.functions";

export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  rows?: number;
};

type Props = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: Field[];
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  ctaLabel?: string;
};

export function ToolWorkbench({
  title,
  description,
  icon: Icon,
  fields,
  system,
  buildPrompt,
  ctaLabel = "Generate with AI",
}: Props) {
  const call = useServerFn(runAi);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === "select" ? (f.options?.[0] ?? "") : ""])),
  );
  const [output, setOutput] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  async function generate() {
    const missing = fields.filter((f) => f.required && !values[f.name]?.trim());
    if (missing.length) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setLoading(true);
    try {
      const res = await call({
        data: { system, messages: [{ role: "user" as const, content: buildPrompt(values) }] },
      });
      setOutput(res.text);
      setEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The AI request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl gradient-brand">
          <Icon className="size-5 text-primary-foreground" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-card space-y-4 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Inputs
          </h2>
          {fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="ml-1 text-accent">*</span>}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  rows={field.rows ?? 5}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {field.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) => set(field.name, e.target.value)}
                />
              )}
            </div>
          ))}
          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> {ctaLabel}
              </>
            )}
          </Button>
          <AiDisclaimer compact />
        </section>

        <section className="surface-card flex min-h-80 flex-col p-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              AI output
            </h2>
            {output && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing((e) => !e)}>
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-3.5" />
                </Button>
                <Button variant="ghost" size="sm" onClick={generate} disabled={loading}>
                  <RotateCcw className="size-3.5" />
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex-1">
            {!output && !loading && (
              <p className="grid h-full place-items-center text-center text-sm text-muted-foreground">
                Fill in the inputs and generate a draft. Everything stays editable.
              </p>
            )}
            {loading && !output && (
              <div className="space-y-2.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3.5 animate-pulse rounded bg-muted" />
                ))}
              </div>
            )}
            {output &&
              (editing ? (
                <Textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="min-h-72 font-mono text-sm"
                />
              ) : (
                <article className="prose-easywork space-y-3 text-sm leading-relaxed">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </article>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

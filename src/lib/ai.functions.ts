import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const Message = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const Input = z.object({
  system: z.string().min(1),
  messages: z.array(Message).min(1),
});

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    try {
      const result = streamText({
        model: gateway("google/gemini-3.6-flash"),
        system: data.system,
        messages: data.messages,
      });
      const text = await result.text;
      return { text };
    } catch (error: unknown) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode
        ?? (error as { status?: number })?.status;
      if (status === 429) {
        throw new Error("The AI service is busy right now. Please retry in a moment.");
      }
      if (status === 402) {
        throw new Error("AI credits are exhausted. Please add credits to continue.");
      }
      if (status === 403) {
        throw new Error("AI access is currently blocked for this workspace.");
      }
      throw new Error(
        (error as { message?: string })?.message ?? "The AI request failed. Please try again.",
      );
    }
  });

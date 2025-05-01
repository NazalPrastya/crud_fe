import { z } from "zod";

export const performanceSchema = z.object({
  notes: z.string().min(1, { message: "Notes is required" }),
  score: z
    .string()
    .min(1, { message: "Minimum score is 1" })
    .max(5, { message: "Maximum score is 5" }),
  reviewer: z
    .string()
    .min(1, { message: "Min 100 character" })
    .max(100, { message: "Max 100 character" }),
});

export type PerformanceSchema = z.infer<typeof performanceSchema>;

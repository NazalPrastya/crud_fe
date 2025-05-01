import { z } from "zod";

export const updatePositionSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name is too long" }),
  desc: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  level: z.string().optional(),
});

export type UpdatePositionSchema = z.infer<typeof updatePositionSchema>;

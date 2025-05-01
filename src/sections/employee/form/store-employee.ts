import { z } from "zod";

export const storeEmployeeSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name is too long" }),
  image: z
    .custom<FileList>()
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only image files are allowed"
    )
    .refine(
      (files) => files?.[0]?.size <= 5_000_000, // 5MB
      "Max file size is 5MB"
    ),
  dateBirth: z.string().min(1, { message: "Date of birth is required" }).date(),
  positionId: z.string().min(1, { message: "Position is required" }),
  dateJoin: z.string().min(1, { message: "Date join is required" }).date(),
  status: z.string().min(1, { message: "Status is required" }),
});

export type StoreEmployeeSchema = z.infer<typeof storeEmployeeSchema>;

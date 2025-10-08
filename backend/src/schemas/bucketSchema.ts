import { z } from 'zod';

export const createBucketSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required"),
  description: z
    .string()
    .optional(),
  icon: z
    .string(),
  fieldSchema: z
    .record(z.string(), z.any())
    .optional()
});

export type CreateBucketInput = z.infer<typeof createBucketSchema>;
import { z } from 'zod';

export const createRecordSchema = z.object({
  data: z
    .record(z.string(), z.any()), 
});

export type CreateRecordInput = z.infer<typeof createRecordSchema>;
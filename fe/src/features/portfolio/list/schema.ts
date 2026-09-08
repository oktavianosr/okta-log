import { z } from 'zod';
export const projectSearchSchema = z.object({
    page: z.coerce.number().int().positive().default(1).catch(1),
});

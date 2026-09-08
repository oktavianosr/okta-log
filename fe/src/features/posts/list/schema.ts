import { z } from 'zod';
export const postSearchSchema = z.object({
    kind: z
        .enum(['all', 'article', 'update', 'solution'])
        .default('all')
        .catch('all'),
    page: z.coerce.number().int().positive().default(1).catch(1),
    search: z.string().max(200).default('').catch(''),
});

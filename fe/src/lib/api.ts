import { z } from 'zod';

import type { ApiPagination, ApiResponse } from '@/types/api';

import { paginationSchema } from './content-schema.ts';
export function normalizeList<T>(
    raw: unknown,
    schema: z.ZodType<T>
): ApiResponse<T[], ApiPagination> {
    const parsed = z
        .object({
            data: z.array(schema),
            meta: z.object({ pagination: paginationSchema }),
        })
        .parse(raw);
    return {
        data: parsed.data,
        message: '',
        meta: parsed.meta.pagination,
        success: true,
    };
}
export function normalizeSingle<T>(
    raw: unknown,
    schema: z.ZodType<T>
): ApiResponse<null | T> {
    const parsed = z.object({ data: schema.nullable() }).parse(raw);
    return { data: parsed.data, message: '', success: true };
}

import assert from 'node:assert/strict';
import test from 'node:test';

import { z } from 'zod';

import { postSearchSchema } from '../src/features/posts/list/schema.ts';
import { normalizeList, normalizeSingle } from '../src/lib/api.ts';

test('REST adapter retains pagination and domain payload', () => {
    const result = normalizeList(
        {
            data: [{ slug: 'solved' }],
            meta: {
                pagination: { page: 2, pageCount: 3, pageSize: 6, total: 15 },
            },
        },
        z.object({ slug: z.string() })
    );
    assert.equal(result.success, true);
    assert.deepEqual(result.data, [{ slug: 'solved' }]);
    assert.deepEqual(result.meta, {
        page: 2,
        pageCount: 3,
        pageSize: 6,
        total: 15,
    });
});
test('malformed API payloads fail validation', () => {
    assert.throws(
        () =>
            normalizeList(
                {
                    data: [{ slug: 42 }],
                    meta: {
                        pagination: {
                            page: 1,
                            pageCount: 1,
                            pageSize: 6,
                            total: 1,
                        },
                    },
                },
                z.object({ slug: z.string() })
            ),
        z.ZodError
    );
    assert.throws(
        () =>
            normalizeList(
                { data: [], meta: {} },
                z.object({ slug: z.string() })
            ),
        z.ZodError
    );
});
test('unpublished single types normalize to null', () => {
    assert.deepEqual(
        normalizeSingle({ data: null }, z.object({ name: z.string() })),
        { data: null, message: '', success: true }
    );
});
test('URL filters default invalid values and preserve valid deep links', () => {
    assert.deepEqual(
        postSearchSchema.parse({ kind: 'admin', page: '-8', search: [] }),
        { kind: 'all', page: 1, search: '' }
    );
    assert.deepEqual(postSearchSchema.parse({}), {
        kind: 'all',
        page: 1,
        search: '',
    });
    assert.deepEqual(
        postSearchSchema.parse({
            kind: 'solution',
            page: '2',
            search: 'cache',
        }),
        { kind: 'solution', page: 2, search: 'cache' }
    );
});

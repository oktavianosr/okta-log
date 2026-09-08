import assert from 'node:assert/strict';

import { normalizeList, normalizeSingle } from '../src/lib/api.ts';
import { buildPostParams } from '../src/lib/content.ts';
import {
    postSchema,
    profileSchema,
    projectSchema,
    tagSchema,
} from '../src/lib/content-schema.ts';

const origin = process.env.CMS_URL || 'http://127.0.0.1:1337';
async function get(path: string) {
    const response = await fetch(origin + '/api' + path, {
        signal: AbortSignal.timeout(12000),
    });
    assert.equal(response.status, 200, path + ' should be readable');
    return response.json();
}

const profile = normalizeSingle(await get('/profile'), profileSchema);
const projects = normalizeList(await get('/projects'), projectSchema);
const posts = normalizeList(
    await get(
        '/posts?' + buildPostParams({ kind: 'all', page: 1, search: '' })
    ),
    postSchema
);
const tags = normalizeList(await get('/tags'), tagSchema);
assert.ok(
    profile.data,
    'Publish a Profile or enable the example seed before this integration smoke test'
);
assert.ok(
    projects.data.length > 0,
    'At least one published Project is required'
);
assert.ok(posts.data.length > 0, 'At least one published Post is required');

for (const post of posts.data) {
    const detail = normalizeList(
        await get('/posts?filters[slug][$eq]=' + encodeURIComponent(post.slug)),
        postSchema
    );
    assert.equal(detail.data.length, 1);
    assert.equal(detail.data[0].documentId, post.documentId);
}
const kind = posts.data[0].kind;
const filtered = normalizeList(
    await get('/posts?' + buildPostParams({ kind, page: 1, search: '' })),
    postSchema
);
assert.ok(filtered.data.length > 0);
assert.ok(filtered.data.every((post) => post.kind === kind));

for (const resource of ['posts', 'projects']) {
    const forcedDraft = await get('/' + resource + '?status=draft');
    assert.ok(
        forcedDraft.data.every(
            (entry: { publishedAt: null | string }) => entry.publishedAt
        )
    );
    const draftFilter = await get(
        '/' + resource + '?filters[publishedAt][$null]=true'
    );
    assert.equal(draftFilter.data.length, 0);
}
const tagPayload = await get(
    '/tags?status=draft&populate[posts][status]=draft'
);
assert.ok(
    tagPayload.data.every((tag: Record<string, unknown>) => !('posts' in tag))
);

console.log('Real CMS integration passed:', {
    filteredKind: kind,
    posts: posts.meta?.total,
    profile: profile.data.name,
    projects: projects.meta?.total,
    tags: tags.meta?.total,
});

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  forceSafeQuery,
  forcePublishedQuery,
  publicPopulates,
} from '../src/utils/public-query.ts';

test('a public query cannot request drafts or arbitrary population', () => {
  const query = forcePublishedQuery(
    {
      status: 'draft',
      populate: '*',
      filters: { slug: { $eq: 'contoh-proyek' } },
      pagination: { page: 2, pageSize: 6 },
    },
    publicPopulates.post,
  );

  assert.deepEqual(query, {
    status: 'published',
    populate: {
      cover: true,
      tags: true,
      project: {
        filters: { publishedAt: { $notNull: true } },
        populate: { cover: true },
      },
    },
    filters: { slug: { $eq: 'contoh-proyek' } },
    pagination: { page: 2, pageSize: 6 },
  });
});

test('a non-draft content type cannot populate backrelations', () => {
  const query = forceSafeQuery(
    { status: 'draft', populate: { posts: '*' }, filters: { slug: { $eq: 'web' } } },
    publicPopulates.tag,
  );

  assert.deepEqual(query, {
    populate: {},
    filters: { slug: { $eq: 'web' } },
  });
});

test('each content type has a fixed safe populate shape', () => {
  assert.deepEqual(publicPopulates.profile, { avatar: true });
  assert.deepEqual(publicPopulates.project, { cover: true });
  assert.deepEqual(publicPopulates.tag, {});
});

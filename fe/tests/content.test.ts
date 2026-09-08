import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPostParams, safeUrl } from '../src/lib/content.ts';

test('feed queries preserve literal search text and constrain pagination and publication', () => {
    const params = buildPostParams({
        kind: 'solution',
        page: 2,
        search: 'fix & deploy',
    });
    assert.equal(
        params.get('filters[$or][0][title][$containsi]'),
        'fix & deploy'
    );
    assert.equal(params.get('filters[kind][$eq]'), 'solution');
    assert.equal(params.get('pagination[page]'), '2');
    assert.equal(params.get('status'), 'published');
    assert.equal(params.get('sort[0]'), 'activityDate:desc');
});

test('invalid pages never reach the CMS and all kinds omit the kind filter', () => {
    for (const page of [-1, 0, NaN, Infinity, 1.5]) {
        const params = buildPostParams({ kind: 'all', page, search: '  ' });
        assert.equal(params.get('pagination[page]'), '1');
        assert.equal(params.has('filters[kind][$eq]'), false);
        assert.equal(params.has('filters[$or][0][title][$containsi]'), false);
    }
});

test('CMS links reject executable and protocol-relative URLs', () => {
    assert.equal(safeUrl('javascript:alert(1)'), undefined);
    assert.equal(safeUrl('//evil.example'), undefined);
    assert.equal(safeUrl('data:text/html,hello'), undefined);
    assert.equal(
        safeUrl('https://example.com/project'),
        'https://example.com/project'
    );
});

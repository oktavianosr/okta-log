import assert from 'node:assert/strict';
import test from 'node:test';
import { errors } from '@strapi/utils';

import { validateStringArray } from '../src/utils/validate-string-array.ts';

test('optional JSON string arrays accept valid values without mutation', () => {
  for (const value of [undefined, null, [], ['React', 'TypeScript'], ['']]) {
    assert.doesNotThrow(() => validateStringArray(value, 'skills'));
  }
});

test('normalizes a JSON array string from the admin editor', () => {
  assert.deepEqual(
    validateStringArray('["React", "TypeScript"]', 'technologies'),
    ['React', 'TypeScript'],
  );
});

test('malformed JSON string arrays fail with a CMS validation error', () => {
  for (const field of ['skills', 'technologies']) {
    for (const value of ['React', '{"name":"React"}', {}, 42, false, ['React', 42], [null], [[]]]) {
      assert.throws(() => validateStringArray(value, field), error => {
        assert.ok(error instanceof errors.ValidationError);
        assert.equal(error.message, `${field} must be an array of strings`);
        return true;
      });
    }
  }
});

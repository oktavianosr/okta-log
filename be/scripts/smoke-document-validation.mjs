import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const databaseFilename = `.tmp/validation-smoke-${process.pid}.db`;
process.env.DATABASE_FILENAME = databaseFilename;
process.env.EXAMPLE_SEED = 'false';

const require = createRequire(import.meta.url);
const { compileStrapi, createStrapi } = require('@strapi/core');
const appContext = await compileStrapi();
const app = await createStrapi(appContext).load();

const rejectsStringArray = error => {
  assert.equal(error.name, 'ValidationError');
  assert.match(error.message, /must be an array of strings/);
  return true;
};

try {
  await assert.rejects(
    app.documents('api::profile.profile').create({
      data: { name: 'Validation fixture', headline: 'Validation fixture', skills: {} },
    }),
    rejectsStringArray,
  );

  const project = await app.documents('api::project.project').create({
    data: {
      title: 'Validation fixture',
      slug: `validation-fixture-${process.pid}`,
      summary: 'Validation fixture',
      technologies: ['TypeScript'],
    },
  });

  await assert.rejects(
    app.documents('api::project.project').update({
      documentId: project.documentId,
      data: { technologies: ['TypeScript', 42] },
    }),
    rejectsStringArray,
  );
} finally {
  await app.destroy();
  for (const suffix of ['', '-shm', '-wal']) {
    rmSync(resolve(`${databaseFilename}${suffix}`), { force: true });
  }
}

console.log('Document validation smoke passed: create and update reject malformed string arrays.');

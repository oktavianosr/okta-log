import assert from 'node:assert/strict';

const origin = process.env.CMS_URL ?? 'http://127.0.0.1:1337';

async function request(path, init) {
  return fetch(`${origin}/api${path}`, { ...init, signal: AbortSignal.timeout(12000) });
}

async function get(path) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path} should be readable`);
  return response.json();
}

const profile = await get('/profile?status=draft');
assert.ok(profile.data.publishedAt);
assert.notEqual(profile.data.headline, '[Draf Contoh] Tidak boleh tampil di API publik');

for (const resource of ['projects', 'posts']) {
  const query = '?status=draft&filters[slug][$eq]=draf-contoh-rahasia';
  assert.deepEqual((await get(`/${resource}${query}`)).data, []);
  assert.deepEqual((await get(`/${resource}?filters[publishedAt][$null]=true`)).data, []);
}

const posts = await get('/posts');
assert.ok(posts.data.length > 0);
assert.ok(posts.data.every(post => !post.project || post.project.publishedAt));

const tags = await get('/tags?populate[posts][filters][publishedAt][$null]=true');
assert.ok(tags.data.every(tag => !Object.hasOwn(tag, 'posts')));

for (const [path, method] of [['/projects', 'POST'], ['/posts', 'POST'], ['/profile', 'PUT']]) {
  const response = await request(path, {
    method,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data: {} }),
  });
  assert.ok([404, 405].includes(response.status), `${method} ${path} should be denied`);
}

const preflight = await request('/posts', {
  method: 'OPTIONS',
  headers: {
    origin: 'http://localhost:5173',
    'access-control-request-method': 'GET',
  },
});
assert.equal(preflight.headers.get('access-control-allow-origin'), 'http://localhost:5173');

console.log('Public API smoke passed: published reads, draft isolation, safe populate, write denial, CORS.');

const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');
const http = require('node:http');

async function withServer(fn) {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  try { await fn(`http://127.0.0.1:${address.port}`); }
  finally { await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve())); }
}

test('GET /health returns healthy status', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/health`);
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'healthy');
  });
});

test('GET /api/tasks returns an array', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/tasks`);
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(await response.json()));
  });
});

test('POST /api/tasks rejects an empty title', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/tasks`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({title:'  '}) });
    assert.equal(response.status, 400);
  });
});

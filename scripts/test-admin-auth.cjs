/* No credentials, network calls or real records: all Firebase operations are isolated fixtures. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');

function fixture(overrides = {}) {
  const state = { cookie: undefined, admin: true, revoked: false, expired: false, idValid: true, recent: true, available: true, calls: [], ...overrides };
  const fakeRecord = { exists: true, id: 'fixture-user', data: () => ({ email: 'fixture@example.invalid', createdAt: '2026-01-01', amount: 10, status: 'active', level: '1' }) };
  const db = { collection(name) {
    state.calls.push(['collection', name]);
    if (name === 'admin_users') return { doc: () => ({ get: async () => ({ exists: state.admin }) }) };
    const query = {
      where: () => query, orderBy: () => query, limit: () => query,
      get: async () => ({ ...fakeRecord, forEach: fn => fn(fakeRecord), size: 1 }),
      update: async data => state.calls.push(['write', name, data]),
      set: async data => state.calls.push(['write', name, data]),
      doc: () => query,
    };
    return query;
  } };
  const auth = {
    verifyIdToken: async (token, checkRevoked) => {
      state.calls.push(['verifyIdToken', token, checkRevoked]);
      if (!state.idValid || token !== 'valid-token') throw new Error('Invalid fixture ID token');
      return { uid: 'fixture-admin', auth_time: Date.now() / 1000 - (state.recent ? 10 : 301) };
    },
    createSessionCookie: async (token, options) => { state.calls.push(['createSessionCookie', token, options]); return 'valid-session'; },
    verifySessionCookie: async (cookie, checkRevoked) => {
      state.calls.push(['verifySessionCookie', cookie, checkRevoked]);
      if (cookie !== 'valid-session' || state.revoked || state.expired) throw new Error('Invalid fixture session');
      return { uid: 'fixture-admin' };
    },
    getUserByEmail: async () => { state.calls.push(['userLookup']); return { uid: 'fixture-user' }; },
  };
  const modules = new Map();
  function load(relative) {
    const filename = path.join(root, relative);
    if (modules.has(filename)) return modules.get(filename).exports;
    const module = { exports: {} };
    modules.set(filename, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
    function mockRequire(name) {
      if (name === 'server-only') return {};
      if (name === '@/lib/firebase-admin') return { getAuth: async () => state.available ? auth : null, getDb: async () => state.available ? db : null };
      if (name === 'next/headers') return { cookies: async () => ({ get: () => state.cookie ? { value: state.cookie } : undefined }) };
      if (name === 'next/navigation') return { redirect: location => { const error = new Error('REDIRECT'); error.location = location; throw error; }, notFound: () => { throw new Error('NOT_FOUND'); } };
      if (name.startsWith('@/components/') || name === 'next/link') return { __esModule: true, default: () => null };
      if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
      if (name.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(filename), name)) + '.ts');
      return require(name);
    }
    const context = { module, exports: module.exports, require: mockRequire, process: { env: { NODE_ENV: 'production' } }, console: { warn() {}, error() {} }, Date, Request, URL, Number, Error };
    vm.runInNewContext(code, context, { filename });
    return module.exports;
  }
  return { state, load, privateCalls: () => state.calls.filter(call => call[0] === 'write' || call[0] === 'userLookup' || (call[0] === 'collection' && call[1] !== 'admin_users')) };
}

function request(method = 'POST', headers = {}, body = { idToken: 'valid-token' }) {
  return new Request('https://www.aptyread.ai/api/admin/session', {
    method,
    headers: { origin: 'https://www.aptyread.ai', 'content-type': 'application/json', 'sec-fetch-site': 'same-origin', ...headers },
    ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
  });
}

test('unauthenticated session check is 401 and never initializes a privileged data query', async () => {
  const f = fixture();
  const response = await f.load('app/api/admin/session/route.ts').GET();
  assert.equal(response.status, 401);
  assert.equal(f.state.calls.length, 0);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
});

for (const reason of ['revoked', 'expired']) test(`${reason} sessions fail closed with revocation checking enabled`, async () => {
  const f = fixture({ cookie: 'valid-session', [reason]: true });
  const response = await f.load('app/api/admin/session/route.ts').GET();
  assert.equal(response.status, 401);
  assert.equal(f.state.calls[0][2], true);
  assert.equal(f.privateCalls().length, 0);
});

test('removing an administrator from the allowlist rejects an otherwise valid session', async () => {
  const f = fixture({ cookie: 'valid-session', admin: false });
  assert.equal((await f.load('app/api/admin/session/route.ts').GET()).status, 403);
  assert.equal(f.privateCalls().length, 0);
});

test('valid session is verified and is not cached as public data', async () => {
  const f = fixture({ cookie: 'valid-session' });
  const response = await f.load('app/api/admin/session/route.ts').GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(f.state.calls[0][2], true);
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
});

test('fresh allowlisted sign-in creates a secure HttpOnly eight-hour session', async () => {
  const f = fixture();
  const response = await f.load('app/api/admin/session/route.ts').POST(request());
  assert.equal(response.status, 200);
  const cookie = response.headers.get('set-cookie');
  for (const expected of ['__Host-apty_admin=valid-session', 'Path=/', 'HttpOnly', 'Secure', 'SameSite=strict', 'Max-Age=28800']) assert(cookie.includes(expected), cookie);
  assert.equal(f.state.calls.find(c => c[0] === 'verifyIdToken')[2], true);
  assert.equal(f.state.calls.find(c => c[0] === 'createSessionCookie')[2].expiresIn, 28800000);
});

test('non-admin, invalid and stale sign-ins cannot create a session', async () => {
  for (const [settings, expected] of [[{admin: false}, 403], [{idValid: false}, 401], [{recent: false}, 401]]) {
    const f = fixture(settings);
    const response = await f.load('app/api/admin/session/route.ts').POST(request());
    assert.equal(response.status, expected);
    assert.equal(response.headers.get('set-cookie'), null);
    assert(!f.state.calls.some(c => c[0] === 'createSessionCookie'));
  }
});

test('login and logout reject absent, cross-origin and cross-site requests before Firebase access', async () => {
  for (const method of ['POST', 'DELETE']) for (const headers of [{origin: ''}, {origin: 'https://other.example'}, {'sec-fetch-site': 'cross-site'}]) {
    const f = fixture();
    const response = await f.load('app/api/admin/session/route.ts')[method](request(method, headers));
    assert.equal(response.status, 403);
    assert.equal(response.headers.get('set-cookie'), null);
    assert.equal(f.state.calls.length, 0);
  }
});

test('session exchange requires JSON and a bounded string token', async () => {
  for (const [headers, body, expected] of [[{'content-type': 'text/plain'}, {}, 415], [{}, {}, 400], [{}, {idToken: 'x'.repeat(8193)}, 400]]) {
    const f = fixture();
    const response = await f.load('app/api/admin/session/route.ts').POST(request('POST', headers, body));
    assert.equal(response.status, expected);
    assert.equal(f.state.calls.length, 0);
  }
});

test('a same-origin request behind the deployment proxy uses its public host and scheme', async () => {
  const f = fixture();
  const proxied = new Request('http://internal:3000/api/admin/session', {
    method: 'POST',
    headers: { origin: 'https://www.aptyread.ai', 'x-forwarded-host': 'www.aptyread.ai', 'x-forwarded-proto': 'https', 'content-type': 'application/json', 'sec-fetch-site': 'same-origin' },
    body: JSON.stringify({ idToken: 'valid-token' }),
  });
  assert.equal((await f.load('app/api/admin/session/route.ts').POST(proxied)).status, 200);
});

test('proxy host or scheme mismatches still reject before authentication', async () => {
  for (const headers of [{'x-forwarded-host': 'other.example'}, {'x-forwarded-proto': 'http'}, {'x-forwarded-host': 'www.aptyread.ai, other.example'}]) {
    const f = fixture();
    const response = await f.load('app/api/admin/session/route.ts').POST(request('POST', headers));
    assert.equal(response.status, 403);
    assert.equal(f.state.calls.length, 0);
  }
});

test('same-origin logout clears the HttpOnly session even when it has expired', async () => {
  const f = fixture({ expired: true });
  const response = await f.load('app/api/admin/session/route.ts').DELETE(request('DELETE'));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /__Host-apty_admin=;/);
  assert.match(response.headers.get('set-cookie'), /Max-Age=0/);
  assert.equal(f.state.calls.length, 0);
});

test('missing Firebase configuration fails closed without leaking details', async () => {
  const f = fixture({ cookie: 'valid-session', available: false });
  const response = await f.load('app/api/admin/session/route.ts').GET();
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: 'Admin sign-in is temporarily unavailable.' });
  assert.equal(f.privateCalls().length, 0);
});

const queries = [
  ['lib/queries/users.ts', 'getUsers', []], ['lib/queries/users.ts', 'getUserById', ['fixture-user']], ['lib/queries/users.ts', 'getUserIdByEmail', ['fixture@example.invalid']],
  ['lib/queries/payments.ts', 'getPurchases', []], ['lib/queries/payments.ts', 'getPurchasesByUserId', ['fixture-user']], ['lib/queries/payments.ts', 'getPurchasesWithFilters', [{}]], ['lib/queries/payments.ts', 'getRevenueStats', []],
];
test('every privileged query independently rejects unauthenticated and non-admin callers before data access', async () => {
  for (const [file, fn, args] of queries) for (const [settings, status] of [[{}, 401], [{cookie: 'valid-session', admin: false}, 403]]) {
    const f = fixture(settings);
    await assert.rejects(() => f.load(file)[fn](...args), error => error.status === status, fn);
    assert.equal(f.privateCalls().length, 0, fn);
  }
});

test('an authenticated allowlisted admin can read fixture records', async () => {
  const f = fixture({ cookie: 'valid-session' });
  const users = await f.load('lib/queries/users.ts').getUsers();
  assert.equal(users[0].email, 'fixture@example.invalid');
  assert(f.privateCalls().some(c => c[1] === 'users'));
});

const actions = [['resolveEmailToUid', ['fixture@example.invalid']], ['markPurchaseRefunded', ['fixture-order']], ['addPurchase', [{userId: 'fixture-user', orderId: 'fixture-order', purchaseToken: 'fixture-token', levelId: '1'}]]];
test('every direct server action rejects unauthorized callers without reading or writing business data', async () => {
  for (const [fn, args] of actions) for (const settings of [{}, {cookie: 'valid-session', admin: false}]) {
    const f = fixture(settings);
    const result = await f.load('lib/actions/admin-purchases.ts')[fn](...args);
    assert(result.error, fn);
    assert.equal(f.privateCalls().length, 0, fn);
  }
});

test('an authenticated allowlisted admin can perform a fixture mutation', async () => {
  const f = fixture({ cookie: 'valid-session' });
  const result = await f.load('lib/actions/admin-purchases.ts').markPurchaseRefunded('fixture-order');
  assert.equal(result.ok, true);
  assert(f.state.calls.some(c => c[0] === 'write' && c[1] === 'purchases'));
});

test('all six protected pages redirect before fetching or serializing private data', async () => {
  for (const file of ['app/admin/page.tsx','app/admin/users/page.tsx','app/admin/users/[uid]/page.tsx','app/admin/payments/page.tsx','app/admin/purchases/page.tsx','app/admin/purchases/add/page.tsx']) {
    const f = fixture();
    await assert.rejects(() => f.load(file).default({params: Promise.resolve({uid: 'fixture-user'}), searchParams: Promise.resolve({})}), error => error.location === '/admin/login?message=session_expired', file);
    assert.equal(f.state.calls.length, 0, file);
  }
});

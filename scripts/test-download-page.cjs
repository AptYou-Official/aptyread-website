const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const moduleFixture = { exports: {} };
const code = ts.transpileModule(fs.readFileSync(path.join(__dirname, '../app/download/download-copy.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
vm.runInNewContext(code, { module: moduleFixture, exports: moduleFixture.exports, URLSearchParams });
const { downloadLanguage, downloadLanguageHref } = moduleFixture.exports;
const campaign = 'kerala_ml_launch_202611';

test('general visitors see English; known Malayalam ad visitors see Malayalam', () => {
  assert.equal(downloadLanguage({}), 'en');
  assert.equal(downloadLanguage({ utm_campaign: campaign }), 'ml');
  assert.equal(downloadLanguage({ utm_campaign: 'unknown' }), 'en');
  assert.equal(downloadLanguage({ utm_campaign: [campaign] }), 'en');
});
test('an explicit language choice overrides campaign language', () => {
  assert.equal(downloadLanguage({ lang: 'en', utm_campaign: campaign }), 'en');
  assert.equal(downloadLanguage({ lang: 'ml' }), 'ml');
  assert.equal(downloadLanguage({ lang: ['ml'] }), 'en');
});
test('switching languages preserves approved ad or QA attribution', () => {
  for (const variant of ['poster', 'video']) {
    const url = new URL(downloadLanguageHref({ utm_campaign: campaign, utm_content: variant }, 'en'), 'https://www.aptyread.ai');
    assert.equal(url.searchParams.get('utm_campaign'), campaign);
    assert.equal(url.searchParams.get('utm_content'), variant);
    assert.equal(url.searchParams.get('utm_medium'), 'paid_social');
    assert.equal(url.searchParams.get('lang'), 'en');
  }
  const qa = new URL(downloadLanguageHref({ utm_campaign: 'tracking_check', utm_content: 'poster' }, 'ml'), 'https://www.aptyread.ai');
  assert.equal(qa.searchParams.get('utm_source'), 'qa');
  assert.equal(qa.searchParams.get('utm_medium'), 'test');
});
test('unknown query values and arbitrary identifiers are never reflected', () => {
  assert.equal(downloadLanguageHref({ email: 'private@example.com', utm_campaign: 'unknown', utm_content: 'private' }, 'ml'), '/download?lang=ml');
  const known = downloadLanguageHref({ utm_campaign: campaign, utm_content: 'private', utm_source: 'private', fbclid: 'private' }, 'en');
  assert.ok(!known.includes('private'));
  assert.ok(!known.includes('fbclid'));
});

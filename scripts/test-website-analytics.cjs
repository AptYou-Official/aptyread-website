/* Isolated fixtures only. No Google requests, credentials, or production events. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const id = 'G-TEST12345';
const consentKey = 'aptyread.google-analytics.v1';
const attributionKey = 'aptyread.website-campaign.v1';
const campaign = variant => `?utm_source=instagram&utm_medium=paid_social&utm_campaign=kerala_ml_launch_202611&utm_content=${variant}`;

function fixture({ measurementId = id, hostname = 'www.aptyread.ai', pathname = '/download', search = '',
  choice, blockedStorage = false, tracker = 'available', savedAttribution, enabled = true } = {}) {
  const calls = [], local = new Map(), session = new Map(), listeners = new Map();
  let time = 1793943000000;
  if (choice) local.set(consentKey, choice);
  if (savedAttribution) session.set(attributionKey, JSON.stringify(savedAttribution));
  const storage = map => ({
    getItem(key) { if (blockedStorage) throw Error('Storage blocked'); return map.get(key) ?? null; },
    setItem(key, value) { if (blockedStorage) throw Error('Storage blocked'); map.set(key, value); },
    removeItem(key) { if (blockedStorage) throw Error('Storage blocked'); map.delete(key); },
  });
  const window = {
    location: {hostname, pathname, search},
    localStorage: storage(local), sessionStorage: storage(session),
    addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
    dispatchEvent(event) { listeners.get(event.type)?.forEach(fn => fn(event)); },
    ...(tracker === 'missing' ? {} : {gtag(...args) { if (tracker === 'throwing') throw Error('Tag blocked'); calls.push(args); }}),
  };
  const module = {exports:{}};
  const filename = path.join(root, 'lib/website-analytics.ts');
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {target:ts.ScriptTarget.ES2020, module:ts.ModuleKind.CommonJS},
  }).outputText;
  vm.runInNewContext(code, {
    module, exports:module.exports, window, URL, URLSearchParams, Event,
    Date: class extends Date { static now() { return time; } },
    process: {env:{NEXT_PUBLIC_GA4_MEASUREMENT_ID:measurementId}},
    require(name) { if (name === '@/lib/marketing-measurement') return {marketingMeasurementEnabled:() => enabled}; throw Error(name); },
  }, {filename});
  return {api:module.exports, window, local, session, calls,
    advance(ms) { time += ms; },
    events(name) { return calls.filter(call => call[0] === 'event' && call[1] === name).map(call => call[2]); },
  };
}

test('no GA4 configuration, cookies, or events before permission and after decline', () => {
  const f = fixture({search:campaign('poster')});
  f.api.syncWebsiteAnalytics();
  f.api.reportWebsiteStoreClick('android');
  assert.equal(f.calls.length, 0);
  assert.equal(f.window[`ga-disable-${id}`], true);
  assert.equal(f.session.size, 0);
  f.api.setAnalyticsChoice('denied');
  f.api.syncWebsiteAnalytics();
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.calls.length, 0);
});

for (const variant of ['poster', 'video']) for (const store of ['android', 'ios']) {
  test(`${variant} / ${store} reports a store tap to only the website stream`, () => {
    const f = fixture({search:campaign(variant) + '&email=parent@example.test&fbclid=private', choice:'granted'});
    f.api.syncWebsiteAnalytics();
    f.api.reportWebsiteStoreClick(store);
    assert.equal(f.calls.filter(c => c[0] === 'config').length, 1);
    const config = f.calls.find(c => c[0] === 'config')[2];
    assert.equal(config.send_page_view, false);
    assert.equal(config.allow_google_signals, false);
    assert.equal(config.allow_ad_personalization_signals, false);
    assert.equal(f.events('page_view').length, 1);
    const [event] = f.events('store_click');
    assert.equal(event.send_to, id);
    assert.equal(event.store, store);
    assert.equal(event.ad_variant, variant);
    assert.equal(event.campaign, 'kerala_ml_launch_202611');
    assert.equal(event.page_path, '/download');
    assert.equal(event.page_referrer, '');
    assert(!JSON.stringify(f.calls).includes('parent@example'));
    assert(!JSON.stringify(f.calls).includes('fbclid'));
    assert(!JSON.stringify(f.calls).includes('purchase'));
  });
}

test('acceptance, repeated rendering and Strict Mode re-runs do not duplicate a page view', () => {
  const f = fixture({search:campaign('video')});
  f.api.syncWebsiteAnalytics();
  f.api.setAnalyticsChoice('granted');
  f.api.disableWebsiteAnalytics(false);
  f.api.syncWebsiteAnalytics();
  f.api.syncWebsiteAnalytics();
  assert.equal(f.events('page_view').length, 1);
  assert.equal(f.calls.filter(c => c[0] === 'config').length, 1);
});

test('campaign attribution follows internal navigation and expires after 30 minutes', () => {
  const f = fixture({search:campaign('poster'), choice:'granted'});
  f.api.syncWebsiteAnalytics();
  f.window.location.pathname = '/about';
  f.window.location.search = '';
  f.api.syncWebsiteAnalytics();
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.events('store_click')[0].ad_variant, 'poster');
  assert.equal(f.events('store_click')[0].page_path, '/about');
  f.advance(30 * 60 * 1000 + 1);
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.events('store_click')[1].ad_variant, 'other');
  assert.equal(f.events('store_click')[1].campaign, 'other');
});

test('valid attribution survives a full-page visit within its session', () => {
  const first = fixture({search:campaign('video'), choice:'granted'});
  first.api.syncWebsiteAnalytics();
  const next = fixture({pathname:'/about', choice:'granted', savedAttribution:JSON.parse(first.session.get(attributionKey))});
  next.api.reportWebsiteStoreClick('android');
  assert.equal(next.events('store_click')[0].ad_variant, 'video');
});

test('leaving the original tagged tab open does not renew campaign attribution', () => {
  const f = fixture({search:campaign('poster'), choice:'granted'});
  f.api.syncWebsiteAnalytics();
  f.advance(20 * 60 * 1000);
  f.api.reportWebsiteStoreClick('android');
  assert.equal(f.events('store_click')[0].ad_variant, 'poster');
  f.advance(11 * 60 * 1000);
  f.api.reportWebsiteStoreClick('android');
  assert.equal(f.events('store_click')[1].ad_variant, 'other');
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.events('store_click')[2].ad_variant, 'other');
});

test('withdrawal stops collection immediately and clears stored attribution', () => {
  const f = fixture({search:campaign('poster'), choice:'granted'});
  f.api.syncWebsiteAnalytics();
  f.api.setAnalyticsChoice('denied');
  f.api.reportWebsiteStoreClick('android');
  f.api.syncWebsiteAnalytics();
  assert.equal(f.events('store_click').length, 0);
  assert.equal(f.window[`ga-disable-${id}`], true);
  assert.equal(f.session.size, 0);
});

test('cross-tab withdrawal applies without waiting for a page navigation', () => {
  const f = fixture({choice:'granted', search:campaign('poster')});
  const unsubscribe = f.api.subscribeAnalyticsChoice(() => {});
  f.api.syncWebsiteAnalytics();
  f.local.set(consentKey, 'denied');
  f.window.dispatchEvent({type:'storage', key:consentKey});
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.window[`ga-disable-${id}`], true);
  assert.equal(f.events('store_click').length, 0);
  assert.equal(f.session.size, 0);
  unsubscribe();
});

test('admin, auth, learning, unknown and app-policy routes remain excluded after public navigation', () => {
  for (const route of ['/admin','/admin/users/fixture','/__/auth/action','/english','/malayalam/dashboard','/hindi/lesson','/privacy','/terms','/delete-account','/privacy.html','/something-private','/reading-guide/unknown']) {
    const f = fixture({choice:'granted'});
    f.api.syncWebsiteAnalytics();
    const before = f.calls.length;
    f.window.location.pathname = route;
    f.window.location.search = '?email=private@example.test';
    f.api.syncWebsiteAnalytics();
    f.api.reportWebsiteStoreClick('android');
    assert.equal(f.calls.length, before, route);
    assert.equal(f.window[`ga-disable-${id}`], true, route);
    f.window.location.pathname = '/download';
    f.window.location.search = '';
    f.api.syncWebsiteAnalytics();
    assert.equal(f.events('page_view').length, 2, route);
  }
});

test('unknown, duplicated and malicious campaign values never become event parameters', () => {
  for (const search of ['?utm_content=poster', campaign('poster') + '&utm_content=video', '?utm_source=someone@example.test&utm_medium=paid_social&utm_campaign=secret&utm_content=private', campaign('<script>'), '?utm_source=instagram&utm_medium=paid_social&utm_campaign=wrong&utm_content=video']) {
    const f = fixture({search, choice:'granted'});
    f.api.reportWebsiteStoreClick('android');
    const event = f.events('store_click')[0];
    assert.equal(event.campaign, 'other');
    assert.equal(event.ad_variant, 'other');
    assert.equal(event.page_location, 'https://www.aptyread.ai/download');
  }
});

test('QA visits are identified separately and use DebugView', () => {
  const f = fixture({choice:'granted', search:'?utm_source=qa&utm_medium=test&utm_campaign=tracking_check&utm_content=video'});
  f.api.reportWebsiteStoreClick('ios');
  assert.equal(f.events('store_click')[0].campaign, 'tracking_check');
  assert.equal(f.events('store_click')[0].debug_mode, true);
});

test('local, preview and disabled builds cannot send production GA4 data', () => {
  for (const options of [{hostname:'localhost'}, {hostname:'127.0.0.1'}, {hostname:'preview.vercel.app'}, {enabled:false}, {measurementId:''}, {measurementId:"G-FOO');alert(1)"}]) {
    const f = fixture({...options, choice:'granted'});
    f.api.syncWebsiteAnalytics();
    f.api.reportWebsiteStoreClick('ios');
    assert.equal(f.calls.length, 0);
  }
});

test('blocked storage and a throwing tag never prevent clicking a store link', () => {
  const f = fixture({blockedStorage:true, tracker:'throwing', search:campaign('poster')});
  assert.doesNotThrow(() => f.api.setAnalyticsChoice('granted'));
  assert.doesNotThrow(() => f.api.syncWebsiteAnalytics());
  assert.doesNotThrow(() => f.api.reportWebsiteStoreClick('android'));
  assert.doesNotThrow(() => f.api.setAnalyticsChoice('denied'));
  assert.equal(f.api.getAnalyticsChoice(), 'denied');
});

test('events can queue before the existing Google tag finishes loading', () => {
  const f = fixture({choice:'granted', tracker:'missing'});
  f.api.reportWebsiteStoreClick('ios');
  const queued = f.window.dataLayer.map(args => Array.from(args));
  assert.equal(queued[0][0], 'config');
  assert.equal(queued[1][1], 'store_click');
  assert.equal(queued[1][2].store, 'ios');
});

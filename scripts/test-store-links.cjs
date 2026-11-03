/* Isolated regression checks. No browser tracking, network or real conversions. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const urls = {
  android: 'https://play.google.com/store/apps/details?id=ai.aptyread.app',
  ios: 'https://apps.apple.com/us/app/aptyread-learn-to-read/id6762043318',
};

function fixture({ tracker = 'queued', ua = 'Desktop', hostname = 'www.aptyread.ai', server = false } = {}) {
  const calls = [];
  const navigations = [];
  const location = { hostname, pathname: '/download', set href(value) { navigations.push(value); } };
  const window = {
    location, navigator: { userAgent: ua },
    open() { throw new Error('Store links must not use script-created popups'); },
    setTimeout() { throw new Error('Store navigation must not wait for a timer'); },
    ...(tracker === 'missing' ? {} : { gtag(...args) {
      if (tracker === 'throwing') throw new Error('Tracker blocked');
      calls.push(['gtag', ...args]);
      // Deliberately never complete an analytics callback.
    } }),
  };
  const cache = new Map();
  function load(relative) {
    if (cache.has(relative)) return cache.get(relative).exports;
    const filename = path.join(root, relative);
    const module = { exports: {} };
    cache.set(relative, module);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    const requireFixture = name => {
      if (name === '@vercel/analytics/react') return { track(...args) {
        if (tracker === 'throwing') throw new Error('Analytics blocked');
        calls.push(['track', ...args]);
      } };
      if (name.startsWith('@/')) return load(name.slice(2) + '.ts');
      return require(name);
    };
    vm.runInNewContext(code, {
      module, exports: module.exports, require: requireFixture,
      process: { env: { NODE_ENV: 'production', NEXT_PUBLIC_GOOGLE_ADS_PLAY_SEND_TO: 'fixture-android', NEXT_PUBLIC_GOOGLE_ADS_APP_STORE_SEND_TO: 'fixture-ios' } },
      ...(server ? {} : { window }),
    }, { filename });
    return module.exports;
  }
  const Link = load('components/public/PlayStoreLink.tsx').default;
  return { calls, navigations, link: props => Link({ children: 'Download', ...props }) };
}

function tap(overrides = {}) {
  return { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, prevented: false,
    preventDefault() { this.prevented = true; }, ...overrides };
}

for (const platform of ['android', 'ios']) {
  for (const tracker of ['queued', 'missing', 'throwing']) {
    test(`${platform}: normal link survives ${tracker} analytics without a popup or delayed callback`, () => {
      const f = fixture({ tracker });
      const link = f.link({ platform });
      const event = tap();
      assert.equal(link.type, 'a');
      assert.equal(link.props.href, urls[platform]);
      assert.doesNotThrow(() => link.props.onClick(event));
      assert.equal(event.prevented, false, 'The browser must retain the native link action');
      assert.equal(f.navigations.length, 0, 'Direct badges do not need JavaScript navigation');
      if (tracker === 'queued') {
        assert.equal(f.calls.filter(c => c[0] === 'track').length, 1);
        assert.equal(f.calls.filter(c => c[0] === 'gtag').length, 1);
        assert.equal(f.calls.find(c => c[0] === 'gtag')[3].event_callback, undefined);
      }
    });
    test(`auto ${platform}: navigates immediately with ${tracker} analytics`, () => {
      const f = fixture({ tracker, ua: platform === 'ios' ? 'Mozilla/5.0 (iPhone)' : 'Mozilla/5.0 (Android)' });
      const event = tap();
      assert.doesNotThrow(() => f.link({ platform: 'auto' }).props.onClick(event));
      assert.deepEqual(f.navigations, [urls[platform]]);
    });
  }
}

test('modified and middle clicks preserve browser behaviour without conversion events', () => {
  for (const overrides of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    const f = fixture();
    const event = tap(overrides);
    f.link({ platform: 'auto' }).props.onClick(event);
    assert.equal(event.prevented, false);
    assert.equal(f.calls.length, 0);
    assert.equal(f.navigations.length, 0);
  }
});

test('server-rendered badges work as links before JavaScript loads', () => {
  const f = fixture({ server: true });
  for (const platform of ['android', 'ios']) assert.equal(f.link({ platform }).props.href, urls[platform]);
  assert.equal(f.link({ platform: 'auto' }).props.href, '/download');
});

test('local previews never send measurement and desktop auto links reach download', () => {
  const f = fixture({ hostname: '127.0.0.1' });
  for (const platform of ['android', 'ios', 'auto']) f.link({ platform }).props.onClick(tap());
  assert.equal(f.calls.length, 0);
  assert.deepEqual(f.navigations, ['/download']);
});

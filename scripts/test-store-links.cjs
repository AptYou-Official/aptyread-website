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

function fixture({ tracker = 'queued', ua = 'Desktop', devicePlatform = '', maxTouchPoints = 0,
  hostname = 'www.aptyread.ai', server = false } = {}) {
  const calls = [];
  const navigations = [];
  const location = { hostname, pathname: '/download', set href(value) { navigations.push(value); } };
  const navigator = { userAgent: ua, platform: devicePlatform, maxTouchPoints };
  const window = {
    location, navigator,
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
      if (name === 'react') return {
        ...require('react'),
        useSyncExternalStore: (_subscribe, getSnapshot, getServerSnapshot) =>
          server ? getServerSnapshot() : getSnapshot(),
      };
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
      ...(server ? {} : { window, navigator }),
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
    test(`phone CTA opens the native ${platform} listing with ${tracker} analytics`, () => {
      const ua = platform === 'ios' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile'
        : 'Mozilla/5.0 (Linux; Android 16; Pixel 9) Chrome/141.0 Mobile Safari/537.36';
      const f = fixture({ tracker, ua });
      const link = f.link({ platform: 'auto', href: '#get-the-app' });
      const event = tap();
      assert.equal(link.type, 'a');
      assert.equal(link.props.href, urls[platform]);
      assert.equal(link.props.target, undefined);
      assert.equal(f.calls.length, 0, 'Rendering does not count as a click');
      assert.doesNotThrow(() => link.props.onClick(event));
      assert.equal(event.prevented, false);
      assert.equal(f.navigations.length, 0);
      if (tracker === 'queued') {
        const tracked = f.calls.filter(c => c[0] === 'track');
        const conversions = f.calls.filter(c => c[0] === 'gtag');
        assert.equal(tracked.length, 1);
        assert.equal(tracked[0][2].store, platform);
        assert.equal(tracked[0][2].destination, urls[platform]);
        assert.equal(conversions.length, 1);
        assert.equal(conversions[0][3].send_to, 'fixture-' + platform);
        assert.equal(conversions[0][3].event_callback, undefined);
      }
    });
  }
}

test('modified and middle clicks preserve browser behaviour without conversion events', () => {
  for (const overrides of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    const f = fixture({ ua: 'Mozilla/5.0 (iPhone)' });
    const event = tap(overrides);
    const link = f.link({ platform: 'auto', href: '#get-the-app' });
    assert.equal(link.props.href, urls.ios);
    link.props.onClick(event);
    assert.equal(event.prevented, false);
    assert.equal(f.calls.length, 0);
    assert.equal(f.navigations.length, 0);
  }
});

test('server-rendered badges work as links before JavaScript loads', () => {
  const f = fixture({ server: true });
  for (const platform of ['android', 'ios']) assert.equal(f.link({ platform }).props.href, urls[platform]);
  assert.equal(f.link({ platform: 'auto' }).props.href, '/download');
  for (const href of ['#get-the-app', '#about-get-the-app']) {
    const link = f.link({ platform: 'auto', href });
    assert.equal(link.props.href, href);
    assert.equal(link.props.target, undefined);
  }
});

test('tablet links respect iPadOS desktop mode and Android tablet user agents', () => {
  for (const [ua, devicePlatform, store] of [
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Version/18.0 Safari/605.1.15', 'MacIntel', 'ios'],
    ['Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 'iPad', 'ios'],
    ['Mozilla/5.0 (Linux; Android 15; Pixel Tablet) Chrome/135.0 Safari/537.36', 'Linux armv8l', 'android'],
  ]) {
    const f = fixture({ ua, devicePlatform, maxTouchPoints: 5 });
    assert.equal(f.link({ platform: 'auto', href: '#about-get-the-app' }).props.href, urls[store]);
  }
});

test('laptops, touchscreen PCs and unknown devices retain their page fallback without a conversion', () => {
  for (const device of [
    { ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', devicePlatform: 'MacIntel' },
    { ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', devicePlatform: 'Win32', maxTouchPoints: 10 },
    { ua: 'Unknown' },
  ]) {
    const f = fixture(device);
    for (const href of [undefined, '#get-the-app', '#about-get-the-app']) {
      const link = f.link({ platform: 'auto', href });
      const event = tap();
      assert.equal(link.props.href, href ?? '/download');
      assert.equal(link.props.target, undefined);
      link.props.onClick(event);
      assert.equal(event.prevented, false);
    }
    assert.equal(f.calls.length, 0);
    assert.equal(f.navigations.length, 0);
  }
});

test('local previews never send store measurement', () => {
  const f = fixture({ hostname: '127.0.0.1', ua: 'Mozilla/5.0 (iPhone)' });
  for (const platform of ['android', 'ios', 'auto']) f.link({ platform }).props.onClick(tap());
  assert.equal(f.calls.length, 0);
  assert.equal(f.navigations.length, 0);
});

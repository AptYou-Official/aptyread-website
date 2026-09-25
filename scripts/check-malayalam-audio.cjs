/* Audio lifecycle regression checks plus playback of the real Bunny recording. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.PREVIEW_URL || 'http://localhost:3100';
fs.mkdirSync('docs/malayalam/prototype-review', { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addInitScript(() => {
      window.__played = []; window.__active = []; window.__rejectAudio = false;
      window.Audio = class {
        constructor() { window.__media = this; this.src = ''; }
        play() {
          const id = this.src.split('/').pop();
          window.__played.push(id);
          if (window.__rejectAudio) { window.__rejectAudio = false; return Promise.reject(new DOMException('Blocked', 'NotAllowedError')); }
          window.__active = [id];
          queueMicrotask(() => this.onplaying?.());
          return Promise.resolve();
        }
        pause() { window.__active = []; }
        removeAttribute() { this.src = ''; }
        load() {}
      };
      window.__end = () => { window.__active = []; window.__media.onended?.(); };
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/malayalam/dashboard');
    const latest = () => page.evaluate(() => window.__played.at(-1));
    const active = () => page.evaluate(() => window.__active);
    await page.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    assert.equal(await latest(), 'F01.mp3');
    await page.evaluate(() => window.__end());
    assert.equal(await latest(), 'A16.mp3');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    assert.deepEqual(await active(), ['F02.mp3']);
    await page.getByRole('button', { name: 'Mute sound', exact: true }).click();
    assert.deepEqual(await active(), []);
    assert.equal(await page.getByRole('button', { name: 'Listen to the model again' }).isDisabled(), true);
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    assert.deepEqual(await active(), []);
    await page.getByRole('button', { name: 'Turn sound on', exact: true }).click();
    await page.getByRole('button', { name: 'Listen to the model again' }).click();
    assert.equal(await latest(), 'A19.mp3');
    await page.evaluate(() => window.__end());
    assert.equal(await latest(), 'J01.mp3');
    await page.evaluate(() => window.__end());
    assert.equal(await latest(), 'U05.mp3');
    await page.getByRole('button', { name: 'Repeat the instruction', exact: true }).click();
    assert.equal(await latest(), 'U05.mp3');
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    assert.equal(await latest(), 'A08.mp3');
    await page.evaluate(() => window.__end());
    assert.equal(await latest(), 'J01.mp3');
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    assert.equal(await latest(), 'A06.mp3');
    await page.keyboard.press('Escape');
    assert.deepEqual(await active(), []);
    await page.evaluate(() => window.__end());
    assert.deepEqual(await active(), []);
    await page.getByRole('button', { name: 'Open preview 3: മല', exact: true }).click();
    assert.equal(await latest(), 'F04.mp3');
    assert.equal(await page.evaluate(() => window.__played.includes('A25.mp3')), false);
    await page.evaluate(() => { window.__rejectAudio = true; });
    await page.getByRole('button', { name: 'Listen to the model again' }).click();
    await page.getByRole('button', { name: 'Retry audio', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Retry audio', exact: true }).click();
    assert.equal(await latest(), 'F04.mp3');
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
    assert.deepEqual(await active(), []);
    for (const width of [320, 390, 768]) {
      await page.setViewportSize({ width, height: 844 });
      assert.equal(await page.evaluate(() => { const d = document.querySelector('.ml-preview-dialog'); return d.scrollWidth > d.clientWidth; }), false);
    }
    assert.deepEqual(errors, []);
    await context.close();

    // No audio mock: exercise a failed network request, retry, decoding and sequence completion.
    const live = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await live.addInitScript(() => {
      const NativeAudio = window.Audio;
      window.__realMedia = [];
      window.Audio = function (...args) { const a = new NativeAudio(...args); window.__realMedia.push(a); return a; };
    });
    await live.route('**/level1/F01.mp3', route => route.fulfill({ status: 404, body: 'missing' }));
    const real = await live.newPage();
    await real.goto(base + '/malayalam/dashboard');
    await real.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    await real.getByRole('button', { name: 'Retry audio', exact: true }).waitFor();
    await live.unroute('**/level1/F01.mp3');
    await real.getByRole('button', { name: 'Retry audio', exact: true }).click();
    await real.waitForFunction(() => window.__realMedia.some(a => a.src.endsWith('/F01.mp3') && a.currentTime > 0 && !a.paused), null, { timeout: 20000 });
    await real.waitForFunction(() => window.__realMedia.some(a => a.src.endsWith('/A16.mp3') && a.currentTime > 0), null, { timeout: 20000 });
    await real.getByRole('button', { name: 'Next', exact: true }).click();
    await real.waitForFunction(() => window.__realMedia.some(a => a.src.endsWith('/F02.mp3') && a.currentTime > 0), null, { timeout: 20000 });
    await real.screenshot({ path: 'docs/malayalam/prototype-review/audio-mobile.png' });
    await real.keyboard.press('Escape');
    assert.equal(await real.evaluate(() => window.__realMedia.every(a => a.paused)), true);
    await live.close();
    const report = { result: 'passed', checks: ['exact Bunny filenames', 'form and joining sequences', 'neutral instruction replay', 'correct and incorrect matching feedback', 'rapid navigation cancels old sequence', 'mute persists across steps', 'stop on close and hidden tab', 'blocked playback retry', 'missing-file recovery', 'A25 not requested', '320/390/768px dialog layout', 'real Bunny MP3 decoding and playback'] };
    fs.writeFileSync('docs/malayalam/prototype-review/audio-checks.json', JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });

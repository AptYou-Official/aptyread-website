const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.PREVIEW_URL || 'http://localhost:3101';
const key = 'apty.malayalam.CL1-E01.v1';
const output = 'docs/malayalam/prototype-review';
fs.mkdirSync(output, { recursive: true });

async function mockMedia(context) {
  await context.addInitScript(() => {
    window.__clips = []; window.__failNext = false;
    window.Audio = class {
      constructor() { window.__audio = this; this.src = ''; this.paused = true; }
      play() {
        window.__clips.push(this.src.split('/').pop());
        if (window.__failNext) { window.__failNext = false; return Promise.reject(new Error('test unavailable')); }
        this.paused = false; queueMicrotask(() => this.onplaying?.()); return Promise.resolve();
      }
      pause() { this.paused = true; }
      load() {}
      removeAttribute() { this.src = ''; }
    };
    window.__end = () => { window.__audio.paused = true; window.__audio.onended?.(); };
  });
}
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await mockMedia(context);
    const page = await context.newPage();
    const errors = [], tracking = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (/googletagmanager|google-analytics|googleadservices|doubleclick|\/insights\//.test(r.url())) tracking.push(r.url()); });
    const read = () => page.evaluate(k => JSON.parse(localStorage.getItem(k)), key);
    const next = () => page.getByRole('button', { name: 'Continue lesson', exact: true }).click();
    const end = () => page.evaluate(() => window.__end());
    const step = () => page.locator('[data-step]').getAttribute('data-step');
    await page.goto(base + '/malayalam/dashboard');
    await page.getByRole('link', { name: 'തുടങ്ങാം', exact: true }).click();
    await page.getByRole('button', { name: 'Start first lesson', exact: true }).click();
    assert.equal(await step(), 'meaning');
    await page.screenshot({ path: `${output}/first-lesson-meaning-mobile.png`, fullPage: true });
    await end(); await next();
    assert.equal(await step(), 'ra');
    await end(); await end(); await next();
    assert.equal(await step(), 'match-ra');
    await page.getByRole('button', { name: 'Choose ○', exact: true }).click();
    let r = await read(); assert.equal(r.attempts['match-ra'].first, '○');
    assert.equal(r.attempts['match-ra'].responses[0].supported, false);
    await page.getByRole('button', { name: 'Try once more', exact: true }).click();
    await page.getByRole('button', { name: 'Choose റ', exact: true }).click();
    r = await read(); assert.equal(r.attempts['match-ra'].first, '○'); assert.equal(r.attempts['match-ra'].responses[1].supported, true);
    await next(); assert.equal(await step(), 'pause');
    await page.getByRole('link', { name: 'Stop lesson and save', exact: true }).click();
    assert.equal(await page.evaluate(() => window.__audio?.paused ?? true), true);
    await page.goto(base + '/malayalam/learn/first-word');
    await page.getByRole('button', { name: 'Start first lesson', exact: true }).click();
    assert.equal(await step(), 'pause');
    await next(); assert.equal(await step(), 'tha');
    await page.evaluate(() => { window.__failNext = true; });
    await next(); assert.equal(await step(), 'find-tha');
    await page.getByRole('button', { name: 'Retry lesson audio', exact: true }).waitFor();
    assert.equal(await page.getByRole('button', { name: 'Choose ത', exact: true }).isDisabled(), true);
    assert.equal((await read()).attempts['find-tha'].first, null);
    assert.equal((await read()).events.some(e => e.kind === 'audio_failed' && e.value === 'A18'), true);
    await page.getByRole('button', { name: 'Retry lesson audio', exact: true }).click();
    await end();
    await page.getByRole('button', { name: 'Choose ത', exact: true }).click();
    assert.equal((await read()).attempts['find-tha'].responses[0].supported, false);
    await next(); assert.equal(await step(), 'join');
    await end(); assert.equal(await page.evaluate(() => window.__clips.at(-1)), 'J01.mp3');
    await next(); assert.equal(await step(), 'build');
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    await page.reload();
    await page.getByRole('button', { name: 'Start first lesson', exact: true }).click();
    assert.deepEqual((await read()).attempts.build.built, ['റ']);
    await page.getByRole('button', { name: 'Undo last letter', exact: true }).click();
    assert.deepEqual((await read()).attempts.build.built, []);
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    assert.equal(await page.evaluate(() => window.__clips.at(-1)), 'U07.mp3');
    assert.equal((await read()).attempts.build.first, null, 'Only explicit submission is checked');
    await page.getByRole('button', { name: 'Check my word', exact: true }).click();
    await page.getByRole('button', { name: 'Try once more', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    await page.getByRole('button', { name: 'Check my word', exact: true }).click();
    r = await read(); assert.equal(r.attempts.build.first, 'റത'); assert.equal(r.attempts.build.responses.length, 2);
    await next(); assert.equal(await step(), 'meaning-choice');
    assert.equal(await page.getByRole('button', { name: 'Choose the floor picture', exact: true }).isDisabled(), true);
    await end();
    await page.getByRole('button', { name: 'Listen again', exact: true }).click();
    assert.equal(await page.evaluate(() => window.__clips.at(-1)), 'A20.mp3', 'Replay is neutral once the intended word input is heard');
    for (const width of [320, 390, 768, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (width === 390 || width === 1280) await page.screenshot({ path: `${output}/first-lesson-choice-${width}.png`, fullPage: true });
    }
    await page.getByRole('button', { name: 'Choose the head picture', exact: true }).click();
    await page.getByRole('button', { name: 'Try once more', exact: true }).click();
    await page.getByRole('button', { name: 'Choose the head picture', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Try once more', exact: true }).count(), 0);
    await next(); assert.equal(await step(), 'finish');
    r = await read(); assert.equal(r.reachedEnd, true); assert.equal(r.attempts['meaning-choice'].responses.every(v => v.supported), true);
    assert.equal(r.events.some(e => e.kind === 'audio_finished' && e.value === 'A18'), true);
    assert.equal('mastered' in r, false);
    assert.equal(await page.evaluate(() => window.__clips.includes('A25.mp3')), false);
    await page.getByRole('button', { name: 'Explore the lesson again', exact: true }).click();
    // Skipping activities is allowed and never invents a correct response.
    for (let i = 0; i < 9; i++) await next();
    r = await read(); assert.equal(Object.values(r.attempts).every(a => a.first === null), true);
    await page.evaluate(k => localStorage.setItem(k, JSON.stringify({ version: 1, step: 'find-tha', visited: [], events: [], attempts: { 'find-tha': {} }, reachedEnd: false })), key);
    await page.reload(); await page.getByRole('button', { name: 'Start first lesson', exact: true }).click();
    assert.equal(await step(), 'meaning');
    assert.deepEqual(errors, []); assert.deepEqual(tracking, []);
    await context.close();

    const blocked = await browser.newContext(); await mockMedia(blocked);
    await blocked.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }));
    const bp = await blocked.newPage(); await bp.goto(base + '/malayalam/learn/first-word');
    await bp.getByRole('button', { name: 'Start first lesson', exact: true }).click();
    await bp.getByRole('button', { name: 'Continue lesson', exact: true }).click();
    assert.equal(await bp.locator('[data-step]').getAttribute('data-step'), 'ra');
    assert.match(await bp.locator('.ml-storage-note').textContent(), /this visit only/);
    await blocked.close();
    const report = { result: 'passed', checks: ['dashboard entry', '10 reading states', 'first responses preserved', 'one optional supported retry', 'exact partial tile resume', 'explicit tile submit and undo', 'audio failure is not incorrect', 'intended audio input before choices', 'neutral repeat after word input', 'no forced correct-answer gate', 'skip does not award correctness', 'no mastery from finish', 'corrupt and blocked storage', 'no A25 request', 'no marketing requests', 'responsive 320/390/768/1280'] };
    fs.writeFileSync(`${output}/first-lesson-checks.json`, JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });

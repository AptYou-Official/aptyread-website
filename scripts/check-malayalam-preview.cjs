/* Local browser checks. Run with Node; PLAYWRIGHT_MODULE may point at a bundled runtime. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const base = process.env.PREVIEW_URL || 'http://localhost:3100';
const out = path.resolve('docs/malayalam/prototype-review');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [], tracking = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (/googletagmanager|google-analytics|googleadservices|doubleclick|\/insights\//.test(request.url())) tracking.push(request.url());
    });
    await page.goto(base + '/malayalam', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, nofollow');
    await page.screenshot({ path: path.join(out, 'homepage-desktop.png'), fullPage: true });
    await page.locator('summary').filter({ hasText: 'What can we try today?' }).click();
    assert.equal(await page.locator('details[open]').count(), 1);
    await page.locator('summary').filter({ hasText: 'What can we try today?' }).click();
    await page.getByRole('link', { name: 'Explore AptyMalayalam' }).click();
    await page.waitForURL('**/malayalam/dashboard');
    await page.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).waitFor();
    await page.screenshot({ path: path.join(out, 'dashboard-desktop.png'), fullPage: true });
    await page.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    await page.locator('dialog[open]').waitFor();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    assert.equal(await page.locator('.ml-model-letter').innerText(), 'ത');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('dialog[open]').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'തുടരാം');
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'തുടരാം', exact: true }).click();
    assert.equal(await page.locator('.ml-model-letter').innerText(), 'ത');
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    assert.match(await page.locator('.ml-feedback').innerText(), /try again/);
    await page.getByRole('button', { name: 'Try again', exact: true }).click();
    await page.getByRole('button', { name: 'Add ത', exact: true }).click();
    await page.getByRole('button', { name: 'Add റ', exact: true }).click();
    assert.equal(await page.locator('.ml-feedback').innerText(), 'You matched the word.');
    await page.screenshot({ path: path.join(out, 'word-preview.png') });
    await page.getByRole('button', { name: 'Back to my path', exact: true }).click();
    for (const i of [2, 3]) {
      await page.getByRole('button', { name: new RegExp(`Open preview ${i}:`) }).click();
      assert.match(await page.locator('.ml-preview-dialog header').innerText(), new RegExp(`WORD PREVIEW ${i}`));
      await page.getByRole('button', { name: 'Close preview and save position' }).click();
    }
    await page.getByRole('button', { name: 'വാക്കുകൾ Word corner', exact: true }).click();
    assert.equal(await page.locator('.ml-word-grid button').count(), 3);
    await page.locator('.ml-word-grid button').last().click();
    assert.equal(await page.locator('.ml-model-letter').innerText(), 'മ');
    await page.getByRole('button', { name: 'Stop here', exact: true }).click();
    await page.getByRole('button', { name: 'എന്റെ വഴി My path', exact: true }).click();
    const responsive = [];
    for (const width of [390, 320, 768]) {
      await page.setViewportSize({ width, height: 844 });
      for (const route of ['malayalam', 'malayalam/dashboard']) {
        await page.goto(base + '/' + route, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `${route} overflow at ${width}`);
        if (width === 390) await page.screenshot({ path: path.join(out, route.includes('dashboard') ? 'dashboard-mobile.png' : 'homepage-mobile.png'), fullPage: true });
        responsive.push({ route, width, overflow });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Open preview 1: തറ', exact: true }).click();
    await page.screenshot({ path: path.join(out, 'formation-mobile.png') });
    await page.keyboard.press('Escape');
    await page.evaluate(() => localStorage.setItem('apty.malayalam.preview.v1', '{bad json'));
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    await page.locator('dialog[open]').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(errors.length, 0, errors.join('\n'));
    assert.equal(tracking.length, 0, tracking.join('\n'));
    const unavailable = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await unavailable.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }));
    const blockedPage = await unavailable.newPage();
    await blockedPage.goto(base + '/malayalam/dashboard', { waitUntil: 'networkidle' });
    await blockedPage.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    await blockedPage.getByRole('button', { name: 'Stop here', exact: true }).click();
    assert.match(await blockedPage.locator('.ml-storage-note').innerText(), /this visit only/);
    const report = { result: 'passed', checks: ['homepage CTA to dashboard', 'FAQ expansion', 'three preview entry points', 'word corner navigation', 'correct and incorrect guided matching', 'stop, Escape and focus return', 'position survives reload', 'malformed storage recovery', 'blocked storage fallback', 'no marketing tracking requests on Malayalam routes', 'no uncaught browser errors'], responsive };
    fs.writeFileSync(path.join(out, 'checks.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

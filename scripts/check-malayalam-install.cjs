const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const base = process.env.PREVIEW_URL || 'http://localhost:3101';
const out = path.resolve('docs/malayalam/prototype-review');
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors = [], tracking = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (/googletagmanager|google-analytics|googleadservices|doubleclick|\/insights\//.test(r.url())) tracking.push(r.url()); });
    for (const route of ['/malayalam', '/malayalam/dashboard']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('link[rel="manifest"]').getAttribute('href'), '/malayalam/manifest.webmanifest');
      for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
        assert.equal(await page.locator(selector).getAttribute('content'), 'https://www.aptyread.ai/images/aptymalayalam-social-share-v1.jpg');
      }
      assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'), 'summary_large_image');
      assert.match(await page.locator('meta[name="viewport"]').getAttribute('content'), /viewport-fit=cover/);
      assert.equal(await page.locator('meta[name="apple-mobile-web-app-capable"]').getAttribute('content'), 'yes');
    }
    const manifestResponse = await context.request.get(base + '/malayalam/manifest.webmanifest');
    assert.equal(manifestResponse.status(), 200);
    const manifest = await manifestResponse.json();
    assert.equal(manifest.start_url, '/malayalam/dashboard');
    assert.equal(manifest.scope, '/malayalam');
    assert.equal(manifest.display, 'standalone');
    for (const icon of manifest.icons) {
      const r = await context.request.get(base + icon.src);
      assert.equal(r.status(), 200);
      const dimensions = await sharp(await r.body()).metadata();
      assert.equal(`${dimensions.width}x${dimensions.height}`, icon.sizes);
    }
    const imageResponse = await context.request.get(base + '/images/aptymalayalam-social-share-v1.jpg');
    const social = await sharp(await imageResponse.body()).metadata();
    assert.equal(social.width, 1200); assert.equal(social.height, 630);
    assert.equal(imageResponse.status(), 200);
    const cdp = await context.newCDPSession(page);
    const installability = await cdp.send('Page.getInstallabilityErrors');
    // Headless browser engagement/install-promotion policies can differ; record
    // native diagnostics separately from deterministic configuration checks.
    await page.getByRole('button', { name: 'Add to home screen', exact: true }).click();
    await page.locator('.ml-install-dialog[open]').waitFor();
    await page.screenshot({ path: path.join(out, 'install-help-mobile.png') });
    assert.match(await page.locator('.ml-install-dialog').innerText(), /aren’t available offline yet/);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.ml-install-dialog[open]').count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Add to home screen');

    async function dispatchInstall(outcome) {
      await page.evaluate(outcome => {
        window.installPromptCalls = 0;
        const event = new Event('beforeinstallprompt', { cancelable: true });
        event.prompt = async () => { window.installPromptCalls++; };
        event.userChoice = Promise.resolve({ outcome });
        window.dispatchEvent(event);
      }, outcome);
      await page.getByRole('button', { name: 'Install AptyMalayalam', exact: true }).click();
      assert.equal(await page.evaluate(() => window.installPromptCalls), 1);
    }
    await dispatchInstall('dismissed');
    await page.getByText('No problem. You can add it another time.', { exact: true }).waitFor();
    await dispatchInstall('accepted');
    await page.getByText('Follow your browser to finish adding AptyMalayalam.', { exact: true }).waitFor();
    await page.evaluate(() => window.dispatchEvent(new Event('appinstalled')));
    assert.equal(await page.locator('.ml-install-button').count(), 0);

    await context.setOffline(true);
    await page.locator('.ml-connection-notice').waitFor();
    await page.getByRole('button', { name: 'തുടങ്ങാം', exact: true }).click();
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await page.getByRole('button', { name: 'Stop here', exact: true }).click();
    await context.setOffline(false);
    await page.locator('.ml-connection-notice').waitFor({ state: 'hidden' });
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'തുടരാം', exact: true }).click();
    assert.equal(await page.locator('.ml-model-letter').innerText(), 'ത');
    await page.keyboard.press('Escape');

    const ios = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1' });
    const iosPage = await ios.newPage();
    await iosPage.goto(base + '/malayalam/dashboard', { waitUntil: 'networkidle' });
    await iosPage.getByRole('button', { name: 'Add to home screen', exact: true }).click();
    assert.match(await iosPage.locator('.ml-install-dialog').innerText(), /Open this page in Safari/);
    await iosPage.screenshot({ path: path.join(out, 'install-ios-guidance.png') });
    const standalone = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await standalone.addInitScript(() => Object.defineProperty(navigator, 'standalone', { get: () => true }));
    const installed = await standalone.newPage();
    await installed.goto(base + '/malayalam/dashboard', { waitUntil: 'networkidle' });
    assert.equal(await installed.locator('.ml-install-button').count(), 0);
    await installed.screenshot({ path: path.join(out, 'standalone-dashboard.png') });
    assert.equal(await installed.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);

    const root = await context.request.get(base + '/');
    const rootHtml = await root.text();
    assert.ok(rootHtml.includes('https://www.aptyread.ai/images/aptyread-social-share.png'));
    assert.ok(!rootHtml.includes('rel="manifest"'));
    assert.equal(errors.length, 0, errors.join('\n'));
    assert.equal(tracking.length, 0, tracking.join('\n'));
    const report = { result: 'passed', checks: ['both Malayalam OG/Twitter cards', 'scoped manifest and icon dimensions', 'standalone dashboard launch configuration', 'browser install prompt accepted/dismissed (simulated)', 'fallback dialog and focus', 'iOS instructions (user-agent simulation)', 'installed state hides prompt (simulation)', 'offline notice without navigation trap', 'saved preview survives reconnection', 'English sharing image and manifest isolation', 'no marketing requests'], chromiumInstallability: installability, limitations: 'Actual installation and OS safe-area rendering on physical iOS/Android devices still require device verification. Offline cold launch is not implemented.' };
    fs.writeFileSync(path.join(out, 'install-checks.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });

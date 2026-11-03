/* Isolated rendering fixtures only. No analytics requests, credentials or business records. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');

function load(file, mocks) {
  const module = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  vm.runInNewContext(source, { module, exports: module.exports, require: name => name in mocks ? mocks[name] : require(name), process: {env:{}}, console, URL }, {filename:file});
  return module.exports;
}

function renderMeasurement(pathname, enabled = true) {
  const calls = [];
  const component = load('components/SiteMeasurement.tsx', {
    react: {...React, useEffect() {}, useState: () => [enabled, () => {}]},
    'next/navigation': {usePathname: () => pathname},
    '@/lib/marketing-measurement': {marketingMeasurementEnabled: () => enabled},
    'next/script': {__esModule:true, default: props => { calls.push({kind:'advertising', id:props.id || props.src}); return null; }},
    'next/dynamic': {__esModule:true, default: () => props => { calls.push({kind:'analytics',beforeSend:props.beforeSend}); return null; }},
  }).default;
  renderToStaticMarkup(React.createElement(component));
  return calls;
}

test('admin base, login and nested records never render advertising or analytics', () => {
  for (const route of ['/admin','/admin/','/admin/login','/admin/users/fixture-user','/admin/purchases']) assert.deepEqual(renderMeasurement(route), [], route);
});

test('learning routes and disabled measurement remain excluded', () => {
  for (const route of ['/english','/english/dashboard','/malayalam','/hindi/lesson']) assert.deepEqual(renderMeasurement(route), [], route);
  assert.deepEqual(renderMeasurement('/reading-guide', false), []);
});

test('public marketing keeps existing measurement and app policies still exclude advertising', () => {
  const publicCalls = renderMeasurement('/reading-guide');
  assert(publicCalls.some(call => call.kind === 'analytics'));
  assert(publicCalls.some(call => call.kind === 'advertising'));
  for (const route of ['/privacy','/terms','/delete-account','/privacy.html']) {
    const calls = renderMeasurement(route);
    assert(calls.some(call => call.kind === 'analytics'), route);
    assert(!calls.some(call => call.kind === 'advertising'), route);
  }
});

test('an already loaded Analytics SDK rejects later private/learning pageviews', () => {
  const {beforeSend} = renderMeasurement('/reading-guide').find(call => call.kind === 'analytics');
  for (const pathname of ['/admin','/admin/users/fixture-user','/admin/purchases?orderId=fixture','/english/lesson']) {
    assert.equal(beforeSend({type:'pageview',url:`https://www.aptyread.ai${pathname}`}), null, pathname);
  }
  const publicEvent = {type:'pageview',url:'https://www.aptyread.ai/reading-guide?utm_source=fixture'};
  assert.equal(beforeSend(publicEvent), publicEvent);
  assert.equal(beforeSend({type:'pageview',url:'invalid-url'}), null);
});

test('payments withhold mixed totals and preserve each recorded amount/currency and count', async () => {
  const purchases = [
    {id:'one',userId:'fixture-one',level:'1',amount:1499,currency:'INR',status:'active'},
    {id:'two',userId:'fixture-two',level:'1',amount:29,currency:'USD',status:'completed'},
    {id:'three',userId:'fixture-three',level:'1',amount:35,currency:'',status:'refunded'},
    {id:'four',userId:'fixture-four',level:'1',amount:0,currency:'AED',status:'active'},
  ];
  let guardCalls = 0;
  const component = load('app/admin/payments/page.tsx', {
    '@/lib/auth': {requireAdminPage: async () => {guardCalls++;}},
    '@/lib/queries/payments': {getPurchases: async () => purchases, getRevenueStats: async () => ({purchaseCount:3,totalRevenue:1563,dailyRevenue:{},revenueByLevel:{1:1563}})},
    '@/components/admin/StatsCard': {__esModule:true, default: props => React.createElement('p', null, `${props.title}: ${props.value}`)},
  }).default;
  const html = renderToStaticMarkup(await component());
  assert.equal(guardCalls, 1);
  assert.match(html, /Recorded purchases: 3/);
  assert.match(html, /Revenue by currency: Not connected/);
  assert.match(html, /Average Purchase: Not connected/);
  assert.match(html, /1,499 INR/);
  assert.match(html, /29 USD/);
  assert.match(html, /35 \(currency not recorded\)/);
  assert.match(html, /0 AED/);
  assert(!html.includes('$'));
  assert(!html.includes('1,563'));
  assert(!html.includes('Revenue by Level'));
});

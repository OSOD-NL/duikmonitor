#!/usr/bin/env node
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) {
  console.error('Geen inline script gevonden in index.html.');
  process.exit(1);
}

class MockClassList {
  constructor(){ this.values = new Set(); }
  toggle(name, force){ if(force) this.values.add(name); else this.values.delete(name); return !!force; }
  add(...names){ names.forEach(n => this.values.add(n)); }
  remove(...names){ names.forEach(n => this.values.delete(n)); }
  contains(name){ return this.values.has(name); }
  toString(){ return [...this.values].join(' '); }
}

class MockElement {
  constructor(id=''){
    this.id = id;
    this.dataset = {};
    this.style = {};
    this.classList = new MockClassList();
    this.children = [];
    this.value = '';
    this.disabled = false;
    this.open = false;
    this.textContent = '';
    this._innerHTML = '';
  }
  set innerHTML(value){ this._innerHTML = String(value ?? ''); }
  get innerHTML(){ return this._innerHTML; }
  addEventListener(){ }
  removeEventListener(){ }
  querySelector(){ return null; }
  querySelectorAll(){ return []; }
  scrollIntoView(){ }
  focus(){ }
  click(){ }
  matches(){ return false; }
  setAttribute(name, value){ this[name] = value; }
  getAttribute(name){ return this[name]; }
  remove(){ }
}

const elements = new Map();
const screenIds = ['planScreen','liveScreen','dashboardScreen','registrationScreen','reportScreen','rulesScreen','selftestScreen','settingsScreen'];
for (const id of ['tabs','bottomnav','saveState','importFile', ...screenIds]) elements.set(id, new MockElement(id));

const document = {
  body: new MockElement('body'),
  documentElement: new MockElement('html'),
  activeElement: null,
  getElementById(id){
    if(!elements.has(id)) elements.set(id, new MockElement(id));
    return elements.get(id);
  },
  querySelector(selector){
    if(selector === 'style'){ const e = new MockElement('style'); e.textContent = (html.match(/<style>([\s\S]*?)<\/style>/i) || [,''])[1]; return e; }
    if(selector === '#bottomnav button.active') return null;
    return null;
  },
  querySelectorAll(selector){
    if(selector === '.screen') return screenIds.map(id => elements.get(id));
    return [];
  },
  addEventListener(){},
  removeEventListener(){},
  createElement(tag){ return new MockElement(tag); }
};

document.documentElement.classList = new MockClassList();
document.documentElement.style = {};

document.body.classList = new MockClassList();

const storage = new Map();
const localStorage = {
  getItem(k){ return storage.has(k) ? storage.get(k) : null; },
  setItem(k,v){ storage.set(k, String(v)); },
  removeItem(k){ storage.delete(k); },
  clear(){ storage.clear(); }
};

const context = {
  console,
  document,
  localStorage,
  window: {},
  navigator: { userAgent: 'node-selftest' },
  __DUIKMONITOR_CSS__: (html.match(/<style>([\s\S]*?)<\/style>/i) || [,''])[1],
  __DUIKMONITOR_VERSION_JSON__: (() => { try { return fs.readFileSync(path.join(root, 'version.json'), 'utf8'); } catch (e) { return ''; } })(),
  Blob: class Blob { constructor(parts, opts){ this.parts = parts; this.opts = opts; } },
  URL: { createObjectURL(){ return 'blob:mock'; }, revokeObjectURL(){} },
  setTimeout(fn){ return 0; },
  clearTimeout(){},
  setInterval(){ return 0; },
  clearInterval(){},
  alert(msg){ throw new Error(`alert: ${msg}`); },
  confirm(){ return true; },
  AudioContext: null,
  webkitAudioContext: null
};
context.window = context;

try {
  vm.runInNewContext(match[1], context, { filename: 'index.html' });
} catch (err) {
  console.error('App kon niet worden geladen:', err && err.stack ? err.stack : err);
  process.exit(1);
}

const run = context.window.DCIEM_MONITOR_SELFTEST;
if (typeof run !== 'function') {
  console.error('window.DCIEM_MONITOR_SELFTEST ontbreekt.');
  process.exit(1);
}

const tests = run('all');
const failed = tests.filter(t => !t.ok);
for (const t of failed) {
  console.error(`[FOUT] ${t.category} / ${t.name}\n  verwacht: ${t.expected}\n  werkelijk: ${t.actual}`);
}
console.log(`${tests.length - failed.length}/${tests.length} zelftests OK`);
process.exit(failed.length ? 1 : 0);

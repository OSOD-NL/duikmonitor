#!/usr/bin/env node
/*
 * OPTIONEEL. Niet vereist voor deze offline app en niet onderdeel van de standaard CI.
 *
 * De ingebouwde zelftest (categorie Schermthema) leest de themetokens uit de echte
 * stylesheet en is de primaire borging. Dit script is een extra, zwaardere controle
 * die de WERKELIJK gerenderde CSS in een echte browser meet via getComputedStyle.
 * Het vereist Playwright plus een Chromium-download, wat in een afgeschermde omgeving
 * niet altijd beschikbaar is. Draai het lokaal als je een volledige rendered check wilt:
 *
 *   npm i -D playwright
 *   npx playwright install chromium
 *   node scripts/check-rendered-contrast.js
 *
 * Het meet tekst tegen de samengestelde achtergrond (alle parent background-colors
 * gemengd). Gradients/achtergrondafbeeldingen worden niet pixel-perfect gemeten; in
 * Dag/Buiten zijn tekstdragende vlakken effen, dus daar speelt dat niet.
 */
const path = require("path");

let chromium;
try { ({ chromium } = require("playwright")); }
catch (e) {
  console.error("Playwright niet geinstalleerd. Dit script is optioneel; zie de kop van het bestand.");
  process.exit(2);
}

const indexPath = path.resolve(__dirname, "..", "index.html");
const url = `file://${indexPath}`;

function injected() {
  function parseRgb(value) {
    const s = String(value || "").trim();
    const m = s.match(/^rgba?\(([^)]+)\)$/i);
    if (!m) throw new Error(`Kan CSS-kleur niet lezen: ${value}`);
    const p = m[1].split(",").map((x) => x.trim());
    return { r: +p[0], g: +p[1], b: +p[2], a: p.length >= 4 ? +p[3] : 1 };
  }
  function blend(fg, bg) {
    const a = Number.isFinite(fg.a) ? fg.a : 1;
    return { r: Math.round(fg.r*a+bg.r*(1-a)), g: Math.round(fg.g*a+bg.g*(1-a)), b: Math.round(fg.b*a+bg.b*(1-a)), a: 1 };
  }
  function lin(c){ const v=c/255; return v<=0.04045? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }
  function lum(c){ return 0.2126*lin(c.r)+0.7152*lin(c.g)+0.0722*lin(c.b); }
  function contrast(a,b){ const l1=lum(a),l2=lum(b),hi=Math.max(l1,l2),lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); }
  function effectiveBg(el){
    let bg={r:255,g:255,b:255,a:1}; const chain=[]; let node=el;
    while(node && node.nodeType===1){ chain.push(node); node=node.parentElement; }
    chain.reverse().forEach((element)=>{ const st=getComputedStyle(element); const col=parseRgb(st.backgroundColor); if(col.a>0) bg=blend(col,bg); });
    return bg;
  }
  function elementContrast(selector){
    const el=document.querySelector(selector); if(!el) return null;
    const st=getComputedStyle(el); const fg=parseRgb(st.color); const bg=effectiveBg(el);
    return { selector, color: st.color, ratio: contrast(fg,bg) };
  }
  window.__duikContrast={ elementContrast };
}

const selectors = [
  ["kaartkop h2", ".card h2"], ["kaartkop h3", ".card h3"], ["label", "label"],
  ["notitie", ".note"], ["input", "input.user"], ["primaire knop", "button.primary"],
  ["startknop", "button.good"], ["opkomstknop", "button.warn"],
  ["status OK", ".pill.ok"], ["status waarschuwing", ".pill.warn"], ["status fout", ".pill.bad"],
  ["actieve tab", ".tab.active"], ["lokaal opgeslagen", "#saveState"],
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  await page.goto(url);
  await page.addScriptTag({ content: `(${injected.toString()})();` });
  const failures = [];
  for (const theme of ["night", "day"]) {
    await page.evaluate((t) => {
      document.documentElement.dataset.theme = t;
      document.documentElement.style.colorScheme = t === "night" ? "dark" : "light";
    }, theme);
    for (const [name, selector] of selectors) {
      const r = await page.evaluate((s) => window.__duikContrast.elementContrast(s), selector);
      if (r && r.ratio < 4.5) failures.push({ theme, name, ...r });
    }
  }
  await browser.close();
  if (failures.length) {
    console.error("Contrastfouten in gerenderde CSS:");
    failures.forEach((f) => console.error(`  ${f.theme} / ${f.name} (${f.selector}): ${f.ratio.toFixed(2)}:1, color=${f.color}`));
    process.exit(1);
  }
  console.log("Rendered contrast OK voor Nacht en Dag/Buiten.");
}
main().catch((err) => { console.error(err); process.exit(1); });

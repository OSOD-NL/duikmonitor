#!/usr/bin/env node
// Lint: geen ruwe kleurwaarden in component-CSS. Alle schermkleuren horen in het
// THEME TOKENS-blok of (voor papier) in de print-CSS. Faalt rood zodra iemand later
// weer een harde kleur in een componentregel zet. Geen volledige CSS-parser, wel een
// betrouwbaar vangnet.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (!styleMatch) {
  console.error("Geen <style>-blok gevonden in index.html");
  process.exit(1);
}
let css = styleMatch[1];

function removeMarkedBlock(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) return source;
  return source.slice(0, start) + source.slice(end + endMarker.length);
}

function removeAtRuleBlock(source, atRuleRegex) {
  let out = "";
  let i = 0;
  while (i < source.length) {
    atRuleRegex.lastIndex = i;
    const match = atRuleRegex.exec(source);
    if (!match) { out += source.slice(i); break; }
    out += source.slice(i, match.index);
    const open = source.indexOf("{", match.index);
    if (open === -1) { i = match.index + match[0].length; continue; }
    let depth = 0, j = open;
    for (; j < source.length; j++) {
      if (source[j] === "{") depth++;
      if (source[j] === "}") { depth--; if (depth === 0) { j++; break; } }
    }
    i = j;
  }
  return out;
}

css = removeMarkedBlock(css, "/* THEME TOKENS START", "/* THEME TOKENS END */");
css = removeAtRuleBlock(css, /@media\s+print\s*/gi);

// Toegestane ruwe waarden buiten tokens: volledig transparant en currentColor.
const allow = /^(transparent|currentcolor)$/i;
const colorRegex = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
const lines = css.split(/\r?\n/);
const offenders = [];

function lineNumberAt(source, offset) {
  return source.slice(0, offset).split(/\r?\n/).length;
}

function recordColorOffender(line, color, text, sourceLabel = "CSS") {
  offenders.push({ line, color, text: String(text).slice(0, 120), sourceLabel });
}

lines.forEach((line, index) => {
  const stripped = line.trim();
  if (!stripped || stripped.startsWith("/*") || stripped.startsWith("*")) return;
  const matches = stripped.match(colorRegex) || [];
  for (const color of matches) {
    if (allow.test(color)) continue;
    // rgba(...,0) volledig transparant toestaan
    const z = color.match(/rgba?\([^)]*,\s*0\s*\)$/i);
    if (z) continue;
    recordColorOffender(index + 1, color, stripped, "CSS");
  }
});

// Controleer ook inline style-attributen in HTML/JS-templates. De CSS-lint haalde
// eerder alleen het <style>-blok op; daardoor kon een harde kleur in een template
// ongemerkt groen blijven. Layoutwaarden zoals margin/display blijven toegestaan,
// maar kleurwaarden moeten via classes en themetokens lopen.
const inlineStyleRegex = /style\s*=\s*(["'`])([\s\S]*?)\1/g;
let inlineMatch;
while ((inlineMatch = inlineStyleRegex.exec(html))) {
  const styleText = inlineMatch[2];
  const matches = styleText.match(colorRegex) || [];
  for (const color of matches) {
    if (allow.test(color)) continue;
    const z = color.match(/rgba?\([^)]*,\s*0\s*\)$/i);
    if (z) continue;
    recordColorOffender(lineNumberAt(html, inlineMatch.index), color, styleText.trim(), "inline style");
  }
}

if (offenders.length) {
  console.error("Hardcoded schermkleuren gevonden buiten THEME TOKENS, print-CSS en veilige uitzonderingen:");
  offenders.slice(0, 100).forEach((o) => console.error(`  ${o.sourceLabel} regel ~${o.line}: ${o.color} | ${o.text}`));
  if (offenders.length > 100) console.error(`  ... plus ${offenders.length - 100} meer`);
  process.exit(1);
}

console.log("Lint OK: geen hardcoded schermkleuren buiten THEME TOKENS, print-CSS en veilige uitzonderingen.");

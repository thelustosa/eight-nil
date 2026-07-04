const fs = require('fs');

const replacements = [
  { val: 'rgb(43, 141, 232)', varName: '--color-accent-blue' },
  { val: 'rgb(129, 129, 129)', varName: '--color-text-grey' },
  { val: '#ffffff', varName: '--color-white' },
  { val: '#1d1d1b', varName: '--color-bg-black' },
  { val: '#1e1b18', varName: '--color-bg-dark' },
  { val: '#e0e0e0', varName: '--color-border-light' },
  { val: '#e74c3c', varName: '--color-loss' },
  { val: '#27ae60', varName: '--color-win' },
  { val: '#7a7363', varName: '--color-text-brown' },
  { val: '#000000', varName: '--color-black' },
  { val: '#4a4a4a', varName: '--color-dark-grey' },
  { val: '#fff', varName: '--color-white-short' },
  { val: '#000', varName: '--color-black-short' },
  { val: "'Hanken Grotesk', sans-serif", varName: '--font-primary' },
  { val: "'Anton', sans-serif", varName: '--font-secondary' },
  { val: "'Archivo Black', sans-serif", varName: '--font-tertiary' },
  { val: "'Impact', 'Archivo Black', sans-serif", varName: '--font-impact' }
];

let css = fs.readFileSync('css/style.css', 'utf8');

// Build the :root block
let rootBlock = ':root {\n';
for (const r of replacements) {
  rootBlock += `  ${r.varName}: ${r.val};\n`;
}
rootBlock += '}\n\n';

// Replace values with var(--varName)
for (const r of replacements) {
  // Escape regex special chars for RGB/fonts
  const escapedVal = r.val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Use negative lookahead/behind for hex colors to prevent matching #fff inside #ffffff
  let regexStr;
  if (r.val.startsWith('#')) {
    regexStr = escapedVal + '(?![a-fA-F0-9])';
  } else {
    regexStr = escapedVal;
  }
  const regex = new RegExp(regexStr, 'gi');
  css = css.replace(regex, `var(${r.varName})`);
}

fs.writeFileSync('css/style.css', rootBlock + css);
console.log('CSS refactored successfully.');

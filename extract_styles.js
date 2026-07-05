const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
let css = '';

let counter = 1;
// We will find tags with style="...", extract them, and if they have class="..." we append to it, otherwise add class="..."
html = html.replace(/<([a-zA-Z0-9\-]+)([^>]*)style="([^"]+)"([^>]*)>/g, (match, tag, before, styleContent, after) => {
  const className = `inline-style-${counter++}`;
  
  // Create CSS rule
  const cssRules = styleContent.split(';').map(s => s.trim()).filter(Boolean).join(';\n  ');
  css += `\n.${className} {\n  ${cssRules};\n}\n`;

  // Merge into existing class attribute if it exists in 'before' or 'after'
  let rest = before + after;
  if (rest.includes('class="')) {
    rest = rest.replace(/class="([^"]*)"/, `class="$1 ${className}"`);
  } else {
    rest = ` class="${className}"` + rest;
  }
  
  return `<${tag}${rest}>`;
});

fs.writeFileSync('index.html', html);
fs.appendFileSync('css/style.css', css);
console.log('Styles extracted:', counter - 1);

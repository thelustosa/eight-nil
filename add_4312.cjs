const fs = require('fs');

const formationsPath = './scripts/formations.json';
const jsFormationsPath = './js/formations.js';

let data = JSON.parse(fs.readFileSync(formationsPath, 'utf-8'));

// The SVG pitch background
const svgTemplate = "<svg class=\"pitch-markings\" viewBox=\"0 0 300 400\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><line x1=\"0\" y1=\"200\" x2=\"300\" y2=\"200\"></line><circle cx=\"150\" cy=\"200\" r=\"46\"></circle><circle cx=\"150\" cy=\"200\" r=\"2.4\" class=\"mk-fill\"></circle><path d=\"M62 0 V60 H238 V0\"></path><path d=\"M112 0 V22 H188 V0\"></path><circle cx=\"150\" cy=\"40\" r=\"2.4\" class=\"mk-fill\"></circle><path d=\"M110.8 60 A44 44 0 0 0 189.2 60\"></path><path d=\"M62 400 V340 H238 V400\"></path><path d=\"M112 400 V378 H188 V400\"></path><path d=\"M110.8 340 A44 44 0 0 1 189.2 340\"></path><path d=\"M0 9 A9 9 0 0 0 9 0\"></path><path d=\"M291 0 A9 9 0 0 0 300 9\"></path><path d=\"M300 391 A9 9 0 0 0 291 400\"></path><path d=\"M9 400 A9 9 0 0 0 0 391\"></path></svg>";

const f4312 = [
  {
    formation: "4-3-1-2",
    style: "Defensivo",
    svg: svgTemplate,
    positions: [
      { label: "GOL", x: 50, y: 90 },
      { label: "LD", x: 82, y: 77 },
      { label: "ZAG", x: 63, y: 78 },
      { label: "ZAG", x: 37, y: 78 },
      { label: "LE", x: 18, y: 77 },
      { label: "MC", x: 75, y: 60 },
      { label: "VOL", x: 50, y: 65 },
      { label: "MC", x: 25, y: 60 },
      { label: "MEI", x: 50, y: 45 },
      { label: "CA", x: 60, y: 30 },
      { label: "CA", x: 40, y: 30 }
    ]
  },
  {
    formation: "4-3-1-2",
    style: "Equilibrado",
    svg: svgTemplate,
    positions: [
      { label: "GOL", x: 50, y: 90 },
      { label: "LD", x: 82, y: 75 },
      { label: "ZAG", x: 63, y: 77 },
      { label: "ZAG", x: 37, y: 77 },
      { label: "LE", x: 18, y: 75 },
      { label: "MC", x: 75, y: 55 },
      { label: "MC", x: 50, y: 58 },
      { label: "MC", x: 25, y: 55 },
      { label: "MEI", x: 50, y: 40 },
      { label: "CA", x: 60, y: 22 },
      { label: "CA", x: 40, y: 22 }
    ]
  },
  {
    formation: "4-3-1-2",
    style: "Ofensivo",
    svg: svgTemplate,
    positions: [
      { label: "GOL", x: 50, y: 90 },
      { label: "LD", x: 85, y: 62 },
      { label: "ZAG", x: 63, y: 76 },
      { label: "ZAG", x: 37, y: 76 },
      { label: "LE", x: 15, y: 62 },
      { label: "MC", x: 75, y: 50 },
      { label: "MC", x: 50, y: 53 },
      { label: "MC", x: 25, y: 50 },
      { label: "MEI", x: 50, y: 35 },
      { label: "CA", x: 60, y: 17 },
      { label: "CA", x: 40, y: 17 }
    ]
  }
];

// Check if 4-3-1-2 already exists, if so filter it out to replace
data = data.filter(f => f.formation !== "4-3-1-2");

// Append new formations
data.push(...f4312);

// Save JSON
fs.writeFileSync(formationsPath, JSON.stringify(data, null, 2), 'utf-8');

// Save JS
const jsContent = "const FORMATIONS = " + JSON.stringify(data, null, 2) + ";\n";
fs.writeFileSync(jsFormationsPath, jsContent, 'utf-8');

console.log("Formações 4-3-1-2 inseridas com sucesso.");

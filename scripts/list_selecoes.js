import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

const result = data.map(s => ({
  selecao: s.selecao,
  copas: s.copas.map(c => c.ano)
}));

console.log(JSON.stringify(result, null, 2));

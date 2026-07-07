import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
const output = 'const DATA = ' + JSON.stringify(data, null, 2);
fs.writeFileSync('../js/data.js', output, 'utf-8');

console.log('✅ js/data.js atualizado com sucesso!');

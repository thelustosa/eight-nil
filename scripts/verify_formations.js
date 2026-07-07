import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Verifica alguns casos conhecidos
const checks = [
  ['Brasil', '1970', '4-3-3'],
  ['Brasil', '2002', '3-5-2'],
  ['Brasil', '1958', '4-2-4'],
  ['Alemanha', '1974', '4-3-3'],
  ['Alemanha', '1990', '5-3-2'],
  ['Alemanha', '2014', '4-2-3-1'],
  ['Argentina', '1986', '3-5-2'],
  ['Argentina', '2022', '4-3-3'],
  ['Espanha', '2010', '4-2-3-1'],
  ['França', '1998', '4-3-3'],
  ['Holanda', '1974', '4-3-3'],
  ['Itália', '1982', '4-4-2'],
  ['Uruguai', '1950', '4-2-4'],
];

console.log('=== VERIFICAÇÃO DE CASOS CONHECIDOS ===\n');
let ok = 0;
let falhou = 0;
for (const [sel, ano, esperado] of checks) {
  const s = data.find(d => d.selecao === sel);
  if (!s) { console.log(`❌ Seleção não encontrada: ${sel}`); falhou++; continue; }
  const copa = s.copas.find(c => c.ano === ano);
  if (!copa) { console.log(`❌ Copa não encontrada: ${sel} ${ano}`); falhou++; continue; }
  const status = copa.formacao === esperado ? '✅' : '❌';
  console.log(`${status} ${sel} ${ano}: ${copa.formacao} (esperado: ${esperado})`);
  if (copa.formacao === esperado) ok++; else falhou++;
}

console.log(`\n=== RESULTADO: ${ok}/${checks.length} corretos ===\n`);

// Lista todas as formações distintas usadas
const todas = new Set();
for (const s of data) {
  for (const c of s.copas) {
    if (c.formacao) todas.add(c.formacao);
  }
}
console.log('Formações distintas no banco:', [...todas].sort().join(', '));

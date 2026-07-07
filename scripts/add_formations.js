import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// ============================================================
// MAPA DE FORMAÇÕES HISTÓRICAS CURADAS
// Fonte: Wikipedia, livros de história do futebol, análises táticas
// Chave: "Seleção|Ano"
// ============================================================
const FORMACOES_CURADAS = {

  // ===================== ALEMANHA =====================
  'Alemanha|1954': '3-2-2-3', // WM system, usado por Sepp Herberger
  'Alemanha|1958': '3-2-2-3', // Ainda no WM
  'Alemanha|1962': '4-2-4',   // Transição para sistema moderno
  'Alemanha|1966': '4-3-3',   // Helmut Schön, alcançou a final
  'Alemanha|1970': '4-3-3',   // Semi-final histórica vs Itália
  'Alemanha|1974': '4-3-3',   // Campeão, Beckenbauer líbero
  'Alemanha|1982': '4-3-3',   // Vice-campeão
  'Alemanha|1986': '4-3-3',   // Vice-campeão, Rummenigge
  'Alemanha|1990': '5-3-2',   // Campeão, Franz Beckenbauer técnico
  'Alemanha|1994': '4-4-2',   // Eliminado nas quartas
  'Alemanha|1998': '4-4-2',   // Quartas de final
  'Alemanha|2002': '4-4-2',   // Vice-campeão, Kahn no gol
  'Alemanha|2006': '4-4-2',   // 3º lugar, Copa em casa
  'Alemanha|2010': '4-2-3-1', // Semi-final
  'Alemanha|2014': '4-2-3-1', // CAMPEÃO, 7x1 no Brasil
  'Alemanha|2026': '4-2-3-1', // Nagelsmann

  // ===================== ARGENTINA =====================
  'Argentina|1958': '4-2-4',
  'Argentina|1962': '4-3-3',
  'Argentina|1966': '4-3-3',
  'Argentina|1974': '4-3-3',
  'Argentina|1978': '4-3-3',   // Campeão, Menotti
  'Argentina|1982': '4-3-3',   // Maradona estreou
  'Argentina|1986': '3-5-2',   // CAMPEÃO, Maradona
  'Argentina|1990': '3-5-2',   // Vice-campeão, Maradona
  'Argentina|1994': '4-4-2',   // Maradona saiu por doping
  'Argentina|1998': '4-3-3',   // Batistuta, Ortega
  'Argentina|2002': '4-4-2',   // Eliminada na fase de grupos
  'Argentina|2006': '4-3-1-2', // Riquelme camisa 10
  'Argentina|2010': '4-3-3',   // Messi, Maradona técnico
  'Argentina|2014': '4-3-3',   // Vice-campeão, Messi
  'Argentina|2018': '4-3-3',   // Oitavas de final
  'Argentina|2022': '4-3-3',   // CAMPEÃO, Messi, Scaloni
  'Argentina|2026': '4-3-3',   // Scaloni

  // ===================== BRASIL =====================
  'Brasil|1950': '4-2-4',   // WM modificado, Barbosa no gol
  'Brasil|1954': '3-2-2-3', // WM, Zizinho
  'Brasil|1958': '4-2-4',   // CAMPEÃO, Pelé, Garrincha, Didí
  'Brasil|1962': '4-3-3',   // CAMPEÃO, Garrincha sem Pelé
  'Brasil|1966': '4-3-3',   // Eliminado na fase de grupos
  'Brasil|1970': '4-3-3',   // CAMPEÃO, Pelé, Jairzinho, Rivelino
  'Brasil|1974': '4-4-2',   // 4º lugar, Rivellino
  'Brasil|1978': '4-4-2',   // 3º lugar, Zico
  'Brasil|1982': '4-2-3-1', // Eliminado nas oitavas, melhor seleção sem título
  'Brasil|1986': '4-4-2',   // Quartas de final, Sócrates
  'Brasil|1990': '4-4-2',   // Oitavas, Maradona eliminou o Brasil
  'Brasil|1994': '4-4-2',   // CAMPEÃO, Romário, Bebeto
  'Brasil|1998': '4-4-2',   // Vice-campeão, Ronaldo
  'Brasil|2002': '3-5-2',   // CAMPEÃO, Ronaldo, Ronaldinho, Rivaldo
  'Brasil|2006': '4-4-2',   // Quartas de final
  'Brasil|2010': '4-2-3-1', // Quartas de final, Dunga
  'Brasil|2014': '4-2-3-1', // 4º lugar, 7x1 vs Alemanha
  'Brasil|2018': '4-3-3',   // Quartas de final, Tite
  'Brasil|2022': '4-2-3-1', // Quartas de final, Neymar
  'Brasil|2026': '4-3-3',   // Dorival Júnior

  // ===================== ESPANHA =====================
  'Espanha|1950': '4-2-4',
  'Espanha|1962': '4-3-3',
  'Espanha|1966': '4-4-2',
  'Espanha|1978': '4-4-2',
  'Espanha|1986': '4-3-3',
  'Espanha|2002': '4-4-2',
  'Espanha|2010': '4-2-3-1', // CAMPEÃO, Tiki-Taka, Del Bosque
  'Espanha|2018': '4-3-3',   // Oitavas, saída de Fernando Hierro
  'Espanha|2026': '4-3-3',   // De la Fuente

  // ===================== ITÁLIA =====================
  'Itália|1950': '4-2-4',
  'Itália|1954': '4-2-4',
  'Itália|1962': '4-4-2',
  'Itália|1966': '3-5-2',   // Eliminada por Coreia do Norte
  'Itália|1970': '5-3-2',   // Catenaccio, Vice-campeão
  'Itália|1974': '5-3-2',   // Fase de grupos
  'Itália|1978': '4-3-3',   // 4º lugar
  'Itália|1982': '4-4-2',   // CAMPEÃO, Paolo Rossi
  'Itália|1986': '4-4-2',   // Oitavas
  'Itália|1990': '5-3-2',   // 3º lugar, Schillaci
  'Itália|1994': '4-4-2',   // Vice-campeão
  'Itália|1998': '4-3-1-2', // Quartas, Del Piero
  'Itália|2002': '4-4-2',   // Oitavas (polêmico)
  'Itália|2006': '4-3-1-2', // CAMPEÃO, Cannavaro

  // ===================== FRANÇA =====================
  'França|1954': '4-2-4',
  'França|1958': '4-2-4',    // 3º lugar, Kopa, Fontaine
  'França|1966': '4-3-3',
  'França|1978': '4-3-3',
  'França|1982': '4-3-3',    // 4º lugar, Platini
  'França|1986': '4-3-3',    // 3º lugar, Platini
  'França|1998': '4-3-3',    // CAMPEÃO, Zidane
  'França|2002': '4-3-3',    // Eliminada na fase de grupos
  'França|2006': '4-2-3-1',  // Vice-campeão, Zidane
  'França|2014': '4-3-3',    // Quartas, Benzema
  'França|2018': '4-2-3-1',  // CAMPEÃO, Mbappé, Griezmann
  'França|2022': '4-2-3-1',  // Vice-campeão, Mbappé
  'França|2026': '4-3-3',    // Deschamps

  // ===================== HOLANDA =====================
  'Holanda|1974': '4-3-3',   // Vice-campeão, Futebol Total, Cruyff
  'Holanda|1978': '4-3-3',   // Vice-campeão
  'Holanda|1990': '4-3-3',   // Oitavas, Gullit, van Basten
  'Holanda|1994': '4-3-3',   // Quartas
  'Holanda|1998': '4-3-3',   // 4º lugar
  'Holanda|2006': '4-3-3',   // Oitavas
  'Holanda|2010': '4-3-3',   // Vice-campeão, van Persie
  'Holanda|2014': '3-5-2',   // 3º lugar, van Gaal
  'Holanda|2026': '4-3-3',

  // ===================== INGLATERRA =====================
  'Inglaterra|1950': '4-2-4',
  'Inglaterra|1954': '4-2-4',
  'Inglaterra|1958': '4-2-4',
  'Inglaterra|1962': '4-2-4',
  'Inglaterra|1966': '4-4-2',  // CAMPEÃO, Ramsey "Wingless Wonders"
  'Inglaterra|1970': '4-4-2',  // Quartas, Bobby Moore
  'Inglaterra|1982': '4-4-2',  // 2ª fase, Robson
  'Inglaterra|1986': '4-4-2',  // Quartas, Maradona eliminou
  'Inglaterra|1990': '4-4-2',  // 4º lugar, Gazza
  'Inglaterra|1998': '4-4-2',  // Oitavas, Beckham expulso
  'Inglaterra|2002': '4-4-2',  // Quartas, Beckham
  'Inglaterra|2006': '4-4-2',  // Quartas
  'Inglaterra|2010': '4-4-2',  // Oitavas
  'Inglaterra|2018': '3-5-2',  // 4º lugar, Southgate
  'Inglaterra|2026': '4-3-3',  // Southgate

  // ===================== URUGUAI =====================
  'Uruguai|1950': '4-2-4',   // CAMPEÃO, Maracanazo
  'Uruguai|1954': '4-2-4',   // 4º lugar
  'Uruguai|1970': '4-3-3',   // 4º lugar
  'Uruguai|1974': '4-3-3',   // Fase de grupos
  'Uruguai|1986': '4-4-2',   // Oitavas
  'Uruguai|2010': '4-4-2',   // 4º lugar, Suárez, Forlán
  'Uruguai|2014': '4-4-2',   // Oitavas, Suárez mordeu Chiellini
  'Uruguai|2018': '4-4-2',   // Quartas, Cavani

  // ===================== PORTUGAL =====================
  'Portugal|1966': '4-3-3',   // 3º lugar, Eusébio
  'Portugal|2002': '4-4-2',
  'Portugal|2006': '4-3-3',   // 4º lugar, Figo, Ronaldo
  'Portugal|2010': '4-3-3',   // Oitavas
  'Portugal|2018': '4-4-2',   // Oitavas
  'Portugal|2022': '4-3-3',   // Quartas, Ronaldo
  'Portugal|2026': '4-3-3',

  // ===================== POLÔNIA =====================
  'Polônia|1974': '4-3-3',   // 3º lugar, Lato artilheiro
  'Polônia|1978': '4-3-3',   // 5º lugar
  'Polônia|1982': '4-3-3',   // 3º lugar, Boniek
  'Polônia|1986': '4-3-3',   // Quartas

  // ===================== TCHECOSLOVÁQUIA =====================
  'Tchecoslováquia|1954': '4-2-4',
  'Tchecoslováquia|1962': '4-3-3', // Vice-campeão

  // ===================== HUNGRIA =====================
  'Hungria|1954': '4-2-4',   // Vice-campeão, Puskás, "Mágicos Magiares"
  'Hungria|1958': '4-2-4',
  'Hungria|1962': '4-2-4',
  'Hungria|1966': '4-3-3',

  // ===================== IUGOSLÁVIA =====================
  'Iugoslávia|1950': '4-2-4',
  'Iugoslávia|1954': '4-2-4',
  'Iugoslávia|1958': '4-3-3',
  'Iugoslávia|1962': '4-3-3',
  'Iugoslávia|1990': '4-4-2',
  'Iugoslávia|1998': '4-4-2',

  // ===================== SUÉCIA =====================
  'Suécia|1950': '4-2-4',
  'Suécia|1958': '4-2-4',   // Vice-campeão, Liedholm
  'Suécia|1974': '4-4-2',
  'Suécia|1994': '4-4-2',   // 3º lugar, Kennet Andersson
  'Suécia|2006': '4-4-2',   // Oitavas, Zlatan
  'Suécia|2018': '4-4-2',   // Quartas

  // ===================== ÁUSTRIA =====================
  'Áustria|1954': '4-2-4',   // 3º lugar
  'Áustria|1978': '4-3-3',
  'Áustria|1982': '4-3-3',

  // ===================== BÉLGICA =====================
  'Bélgica|1970': '4-4-2',
  'Bélgica|1982': '4-4-2',
  'Bélgica|1986': '4-3-3',  // 4º lugar
  'Bélgica|2014': '4-2-3-1', // Quartas, geração dourada
  'Bélgica|2018': '3-4-3',   // 3º lugar, De Bruyne, Hazard
  'Bélgica|2026': '4-3-3',

  // ===================== BULGÁRIA =====================
  'Bulgária|1970': '4-4-2',
  'Bulgária|1986': '4-4-2',
  'Bulgária|1994': '4-4-2',  // Semi-final, Stoichkov

  // ===================== CAMARÕES =====================
  'Camarões|1982': '4-4-2',
  'Camarões|1990': '4-4-2',  // Quartas, Roger Milla
  'Camarões|2002': '4-4-2',

  // ===================== CHILE =====================
  'Chile|1950': '4-2-4',
  'Chile|1962': '4-3-3',    // 3º lugar, Copa em casa
  'Chile|1974': '4-3-3',
  'Chile|1998': '4-4-2',
  'Chile|2010': '4-3-3',    // Oitavas, Bielsa
  'Chile|2014': '4-3-3',    // Oitavas, Sampaoli

  // ===================== COLÔMBIA =====================
  'Colômbia|1990': '4-4-2',  // Valderrama, Higuita
  'Colômbia|1994': '4-4-2',  // Andrés Escobar
  'Colômbia|1998': '4-4-2',
  'Colômbia|2014': '4-4-2',  // Quartas, James Rodríguez artilheiro
  'Colômbia|2018': '4-4-2',  // Oitavas

  // ===================== COREIA DO SUL =====================
  'Coreia do Sul|2002': '4-4-2', // Semi-final, sede do torneio
  'Coreia do Sul|2010': '4-4-2',
  'Coreia do Sul|2018': '4-4-2',
  'Coreia do Sul|2022': '4-2-3-1',

  // ===================== COSTA DO MARFIM =====================
  'Costa do Marfim|2006': '4-4-2',
  'Costa do Marfim|2010': '4-4-2',
  'Costa do Marfim|2014': '4-3-3',

  // ===================== COSTA RICA =====================
  'Costa Rica|2014': '5-4-1',   // Quartas, melhor participação histórica
  'Costa Rica|2022': '4-4-2',

  // ===================== CROÁCIA =====================
  'Croácia|1998': '4-4-2',   // 3º lugar, Suker artilheiro
  'Croácia|2018': '4-3-3',   // Vice-campeão, Modrić
  'Croácia|2022': '4-3-3',   // 3º lugar

  // ===================== DINAMARCA =====================
  'Dinamarca|1986': '4-3-3',
  'Dinamarca|1998': '4-3-3',  // Quartas, Laudrup
  'Dinamarca|2002': '4-4-2',

  // ===================== EGITO =====================
  'Egito|1990': '4-4-2',
  'Egito|2018': '4-3-3',

  // ===================== EQUADOR =====================
  'Equador|2006': '4-4-2',
  'Equador|2022': '4-3-3',
  'Equador|2026': '4-3-3',

  // ===================== ESCÓCIA =====================
  'Escócia|1954': '4-2-4',
  'Escócia|1974': '4-4-2',
  'Escócia|1978': '4-4-2',
  'Escócia|1982': '4-4-2',

  // ===================== ESTADOS UNIDOS =====================
  'Estados Unidos|1950': '4-2-4',
  'Estados Unidos|1994': '4-4-2',
  'Estados Unidos|2002': '4-4-2',  // Quartas

  // ===================== GANA =====================
  'Gana|2010': '4-4-2',   // Quartas, Luis Suárez "mão de deus"
  'Gana|2014': '4-4-2',

  // ===================== GRÉCIA =====================
  'Grécia|2010': '4-4-2',
  'Grécia|2014': '4-4-2',

  // ===================== IRLANDA =====================
  'Irlanda|1990': '4-4-2',  // Quartas, Jack Charlton
  'Irlanda|2002': '4-4-2',

  // ===================== IRLANDA DO NORTE =====================
  'Irlanda do Norte|1958': '4-2-4',

  // ===================== JAPÃO =====================
  'Japão|2002': '4-4-2',
  'Japão|2010': '4-4-2',
  'Japão|2018': '4-2-3-1',
  'Japão|2022': '4-2-3-1',  // Oitavas, eliminaram Alemanha e Espanha

  // ===================== MARROCOS =====================
  'Marrocos|1986': '4-4-2',
  'Marrocos|2018': '4-4-2',
  'Marrocos|2022': '4-2-3-1', // Semi-final, melhor africano da história

  // ===================== MÉXICO =====================
  'México|1950': '4-2-4',
  'México|1962': '4-3-3',
  'México|1966': '4-3-3',
  'México|1970': '4-3-3',
  'México|1978': '4-4-2',
  'México|1986': '4-4-2',   // Quartas, sede do torneio
  'México|1994': '4-4-2',
  'México|2002': '4-4-2',
  'México|2010': '4-4-2',
  'México|2014': '4-4-2',

  // ===================== NIGÉRIA =====================
  'Nigéria|1994': '4-4-2',  // Oitavas
  'Nigéria|1998': '4-4-2',  // Oitavas
  'Nigéria|2002': '4-4-2',
  'Nigéria|2014': '4-3-3',

  // ===================== PAÍS DE GALES =====================
  'País de Gales|1958': '4-2-4',  // Quartas, John Charles

  // ===================== PARAGUAI =====================
  'Paraguai|1950': '4-2-4',
  'Paraguai|1958': '4-2-4',
  'Paraguai|1986': '4-4-2',
  'Paraguai|1998': '4-4-2',
  'Paraguai|2010': '4-4-2',  // Quartas

  // ===================== PERU =====================
  'Peru|1970': '4-3-3',
  'Peru|1978': '4-3-3',

  // ===================== ROMÊNIA =====================
  'Romênia|1970': '4-3-3',
  'Romênia|1990': '4-4-2',
  'Romênia|1994': '4-4-2',  // Quartas, Hagi

  // ===================== RÚSSIA =====================
  'Rússia|2018': '4-5-1',   // Quartas, sede do torneio, Cheryshev

  // ===================== SENEGAL =====================
  'Senegal|2002': '4-4-2',  // Quartas, eliminaram a França
  'Senegal|2022': '4-3-3',

  // ===================== SÉRVIA =====================
  'Sérvia|2022': '3-4-3',

  // ===================== SUÍÇA =====================
  'Suíça|1950': '4-2-4',
  'Suíça|1954': '4-2-4',
  'Suíça|2006': '4-4-2',
  'Suíça|2014': '4-2-3-1',
  'Suíça|2018': '4-2-3-1',

  // ===================== TCHÉQUIA (ex-Tchecoslováquia pós-1993) =====================
  'Tchéquia|1990': '4-4-2',
  'Tchéquia|2006': '4-3-3',

  // ===================== TURQUIA =====================
  'Turquia|1954': '4-2-4',
  'Turquia|2002': '4-4-2',  // 3º lugar, Hakan Şükür gol mais rápido

  // ===================== UCRÂNIA =====================
  'Ucrânia|2006': '4-4-2',  // Quartas, Shevchenko

  // ===================== UNIÃO SOVIÉTICA =====================
  'União Soviética|1958': '4-2-4',  // Lev Yashin
  'União Soviética|1962': '4-3-3',
  'União Soviética|1966': '4-3-3',  // 4º lugar, Lev Yashin

  // ===================== ARGÉLIA =====================
  'Argélia|1982': '4-4-2',
  'Argélia|2014': '4-4-2',

  // ===================== AUSTRÁLIA =====================
  'Austrália|2006': '4-4-2',
  'Austrália|2022': '4-3-3',
};

// ============================================================
// FUNÇÃO DE INFERÊNCIA POR POSIÇÕES DOS JOGADORES
// Conta posições do elenco e determina formação provável
// ============================================================
function inferirFormacao(jogadores) {
  const contagem = {
    goleiros: 0,
    defensores: 0,  // Zagueiros + Laterais
    meios: 0,       // Volantes + Meio-campistas + Meias
    atacantes: 0,   // Pontas + Centroavantes
  };

  const posDefensivas = ['Goleiro'];
  const posZagLat = ['Zagueiro', 'Lateral-direito', 'Lateral-esquerdo', 'Zagueiro central'];
  const posMeio = ['Volante', 'Meio-campista', 'Meia', 'Meia-direita', 'Meia-esquerda'];
  const posAtaque = ['Ponta-direita', 'Ponta-esquerda', 'Centroavante'];

  // Conta só os primeiros 11 "titulares" aproximados (os de maior rating)
  const ordenados = [...jogadores].sort((a, b) => parseInt(b.rating) - parseInt(a.rating)).slice(0, 11);

  for (const j of ordenados) {
    const pos = j.posicao;
    if (posDefensivas.includes(pos)) contagem.goleiros++;
    else if (posZagLat.includes(pos)) contagem.defensores++;
    else if (posMeio.includes(pos)) contagem.meios++;
    else if (posAtaque.includes(pos)) contagem.atacantes++;
  }

  // Determina formação baseada na contagem
  const d = contagem.defensores;
  const m = contagem.meios;
  const a = contagem.atacantes;

  // Formações mais comuns no futebol histórico
  if (d === 4 && m === 4 && a === 2) return '4-4-2';
  if (d === 4 && m === 3 && a === 3) return '4-3-3';
  if (d === 4 && m === 2 && a === 4) return '4-2-4';
  if (d === 4 && m === 5 && a === 1) return '4-5-1';
  if (d === 4 && m === 1 && a === 5) return '4-1-5'; // raro, tratar como 4-2-4
  if (d === 3 && m === 5 && a === 2) return '3-5-2';
  if (d === 3 && m === 4 && a === 3) return '3-4-3';
  if (d === 5 && m === 3 && a === 2) return '5-3-2';
  if (d === 5 && m === 4 && a === 1) return '5-4-1';
  if (d === 4 && m === 6 && a === 0) return '4-4-2'; // fallback
  if (d === 3 && m === 6 && a === 1) return '3-5-2'; // fallback
  if (d === 4 && m === 2 && a === 3) return '4-2-3-1'; // aproximado

  // Fallback inteligente baseado na proporção
  if (a >= 3) return d >= 4 ? '4-3-3' : '3-4-3';
  if (a <= 1) return d >= 4 ? '4-5-1' : '5-4-1';
  if (m >= 5) return '4-5-1';
  if (d >= 5) return '5-3-2';

  return '4-4-2'; // fallback padrão histórico
}

// ============================================================
// MAIN: Processa todos os dados
// ============================================================
let totalCuradas = 0;
let totalInferidas = 0;
let totalEntradas = 0;

for (const selecao of data) {
  for (const copa of selecao.copas) {
    totalEntradas++;
    const chave = `${selecao.selecao}|${copa.ano}`;

    if (FORMACOES_CURADAS[chave]) {
      copa.formacao = FORMACOES_CURADAS[chave];
      totalCuradas++;
    } else {
      // Inferir pela composição do elenco
      copa.formacao = inferirFormacao(copa.jogadores || []);
      totalInferidas++;
      console.log(`  [INFERIDA] ${chave} → ${copa.formacao}`);
    }
  }
}

// Salva o JSON atualizado
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('\n========================================');
console.log(`✅ Processamento concluído!`);
console.log(`   Total de entradas: ${totalEntradas}`);
console.log(`   Formações curadas: ${totalCuradas}`);
console.log(`   Formações inferidas: ${totalInferidas}`);
console.log('========================================');
console.log('\nCampo "formacao" adicionado com sucesso ao data.json!');

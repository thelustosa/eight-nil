import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

// Mapeamento de posições secundárias comuns no futebol real
// Baseado em como jogadores tipicamente se movem entre posições
const POSITION_SECONDARY_MAP = {
  'Goleiro': [], // Goleiro é goleiro, não joga em outra posição
  'Zagueiro': ['Volante'], // Zagueiros frequentemente jogam de volante
  'Lateral-direito': ['Meia-direita', 'Ponta-direita'], // Laterais avançam como alas
  'Lateral-esquerdo': ['Meia-esquerda', 'Ponta-esquerda'],
  'Volante': ['Zagueiro', 'Meio-campista'], // Volantes recuam ou avançam
  'Meio-campista': ['Volante', 'Meia'], // Meias centrais são versáteis
  'Meia': ['Meio-campista', 'Meia-direita', 'Meia-esquerda'], // Meias jogam em vários lados
  'Meia-direita': ['Ponta-direita', 'Meia', 'Meio-campista'],
  'Meia-esquerda': ['Ponta-esquerda', 'Meia', 'Meio-campista'],
  'Ponta-direita': ['Meia-direita', 'Centroavante'],
  'Ponta-esquerda': ['Meia-esquerda', 'Centroavante'],
  'Centroavante': ['Ponta-direita', 'Ponta-esquerda'] // Atacantes jogam aberto também
};

// Mapeamento de jogadores famosos com suas posições secundárias REAIS
// Formato: "Nome|Seleção" ou "Nome|Seleção|Ano" para ser mais específico
const FAMOUS_PLAYERS = {
  // === BRASIL ===
  'Ronaldo|Brasil': [],
  'Ronaldinho|Brasil': ['Meia', 'Centroavante'],
  'Rivaldo|Brasil': ['Meia-esquerda', 'Centroavante'],
  'Kaká|Brasil': ['Meia-direita', 'Centroavante'],
  'Roberto Carlos|Brasil': ['Meia-esquerda'],
  'Cafu|Brasil': ['Meia-direita'],
  'Romário|Brasil': [],
  'Bebeto|Brasil': ['Ponta-esquerda', 'Meia-esquerda'],
  'Dunga|Brasil': ['Meio-campista'],
  'Neymar|Brasil': ['Meia-esquerda', 'Centroavante'],
  'Garrincha|Brasil': ['Meia-direita'],
  'Pelé|Brasil': ['Centroavante', 'Meia'],
  'Jairzinho|Brasil': ['Centroavante'],
  'Tostão|Brasil': ['Ponta-esquerda'],
  'Gérson|Brasil': ['Meia'],
  'Rivelino|Brasil': ['Meia'],
  'Zico|Brasil': ['Meia', 'Centroavante'],
  'Sócrates|Brasil': ['Centroavante'],
  'Falcão|Brasil': ['Meia'],
  'Cerezo|Brasil': ['Meio-campista'],
  'Juninho|Brasil': ['Meio-campista'],
  'Emerson|Brasil': ['Volante'],
  'Adriano|Brasil': [],
  'Robinho|Brasil': ['Ponta-esquerda', 'Centroavante'],
  'Luís Fabiano|Brasil': [],
  'Hulk|Brasil': ['Centroavante'],
  'Oscar|Brasil': ['Meia-direita', 'Meio-campista'],
  'Fernandinho|Brasil': ['Zagueiro'],
  'Marcelo|Brasil': ['Meia-esquerda'],
  'Daniel Alves|Brasil': ['Meia-direita'],
  'Dani Alves|Brasil': ['Meia-direita'],
  'Maicon|Brasil': ['Meia-direita'],
  'Thiago Silva|Brasil': [],
  'David Luiz|Brasil': ['Volante'],
  'Casemiro|Brasil': [],
  'Coutinho|Brasil': ['Ponta-esquerda', 'Meia'],
  'Firmino|Brasil': ['Meia', 'Ponta-esquerda'],
  'Willian|Brasil': ['Ponta-esquerda'],
  'Fred|Brasil': ['Meio-campista'],
  'Mazinho|Brasil': ['Zagueiro'],
  'Mauro Silva|Brasil': ['Meio-campista'],
  'Raí|Brasil': ['Centroavante'],
  'Branco|Brasil': ['Meia-esquerda'],
  'Jorginho|Brasil': ['Meia-direita'],
  'Gilberto Silva|Brasil': ['Zagueiro'],
  'Edmílson|Brasil': ['Zagueiro'],
  'Kléberson|Brasil': ['Meia-direita'],
  'Juninho Paulista|Brasil': ['Meia'],
  'Denílson|Brasil': ['Meia-esquerda'],
  'Vampeta|Brasil': ['Meio-campista'],
  'Lúcio|Brasil': ['Volante'],
  'Juan|Brasil': ['Volante'],
  'Ramires|Brasil': ['Meia-direita', 'Meio-campista'],
  'Paulinho|Brasil': ['Meio-campista'],
  'Luiz Gustavo|Brasil': ['Zagueiro'],
  'Bernard|Brasil': ['Ponta-esquerda'],
  'Raphinha|Brasil': ['Ponta-esquerda'],
  'Richarlison|Brasil': ['Ponta-esquerda', 'Ponta-direita'],
  'Vini Jr.|Brasil': ['Centroavante'],
  'Paquetá|Brasil': ['Meia-esquerda', 'Meio-campista'],
  'Militão|Brasil': ['Lateral-direito'],

  // === ARGENTINA ===
  'Maradona|Argentina': ['Meia-esquerda', 'Centroavante'],
  'Messi|Argentina': ['Centroavante', 'Meia-direita'],
  'Batistuta|Argentina': [],
  'Kempes|Argentina': ['Meia', 'Centroavante'],
  'Passarella|Argentina': ['Volante'],
  'Ardiles|Argentina': ['Meia'],
  'Valdano|Argentina': ['Ponta-esquerda'],
  'Burruchaga|Argentina': ['Meia', 'Ponta-direita'],
  'Caniggia|Argentina': ['Ponta-direita'],
  'Redondo|Argentina': ['Meio-campista'],
  'Simeone|Argentina': ['Meio-campista'],
  'Ortega|Argentina': ['Meia'],
  'Zanetti|Argentina': ['Meio-campista'],
  'Sorín|Argentina': ['Meia-esquerda'],
  'Verón|Argentina': ['Meia', 'Meia-direita'],
  'Riquelme|Argentina': ['Meia-esquerda'],
  'Saviola|Argentina': ['Ponta-direita'],
  'Crespo|Argentina': ['Ponta-esquerda'],
  'Tevez|Argentina': ['Ponta-esquerda', 'Ponta-direita'],
  'Agüero|Argentina': ['Ponta-direita'],
  'Higuaín|Argentina': ['Ponta-direita'],
  'Di María|Argentina': ['Meia-direita', 'Ponta-esquerda'],
  'Mascherano|Argentina': ['Zagueiro'],
  'Lavezzi|Argentina': ['Ponta-direita'],
  'Mac Allister|Argentina': ['Meia'],
  'Álvarez|Argentina': ['Ponta-esquerda', 'Ponta-direita'],
  'De Paul|Argentina': ['Meia-direita', 'Meio-campista'],
  'Enzo Fernández|Argentina': ['Meia'],
  'Molina|Argentina': ['Meia-direita'],

  // === ALEMANHA ===
  'Beckenbauer|Alemanha': ['Volante', 'Meia'],
  'Gerd Müller|Alemanha': ['Ponta-direita'],
  'Rummenigge|Alemanha': ['Ponta-direita'],
  'Matthäus|Alemanha': ['Volante', 'Meia'],
  'Klinsmann|Alemanha': ['Ponta-esquerda'],
  'Völler|Alemanha': ['Ponta-direita'],
  'Brehme|Alemanha': ['Meia-esquerda'],
  'Effenberg|Alemanha': ['Meia'],
  'Ballack|Alemanha': ['Meia', 'Centroavante'],
  'Klose|Alemanha': ['Ponta-esquerda'],
  'Schweinsteiger|Alemanha': ['Meia', 'Volante'],
  'Lahm|Alemanha': ['Lateral-esquerdo', 'Volante'],
  'Özil|Alemanha': ['Meia-direita', 'Ponta-esquerda'],
  'Müller|Alemanha': ['Centroavante', 'Ponta-direita'],
  'Kroos|Alemanha': ['Meia'],
  'Khedira|Alemanha': ['Meio-campista'],
  'Götze|Alemanha': ['Ponta-esquerda', 'Centroavante'],
  'Schürrle|Alemanha': ['Ponta-direita', 'Ponta-esquerda'],
  'Gnabry|Alemanha': ['Ponta-esquerda', 'Centroavante'],
  'Sané|Alemanha': ['Ponta-direita'],
  'Gündogan|Alemanha': ['Meia'],
  'Havertz|Alemanha': ['Centroavante', 'Meia'],
  'Musiala|Alemanha': ['Meia', 'Ponta-esquerda'],
  'Podolski|Alemanha': ['Ponta-esquerda'],
  'Bierhoff|Alemanha': ['Ponta-esquerda'],
  'Hässler|Alemanha': ['Meia-direita'],
  'Sammer|Alemanha': ['Volante'],
  'Overath|Alemanha': ['Meia'],
  'Breitner|Alemanha': ['Meia', 'Lateral-esquerdo'],
  'Seeler|Alemanha': ['Ponta-esquerda'],

  // === FRANÇA ===
  'Zidane|França': ['Meia', 'Centroavante'],
  'Platini|França': ['Meia', 'Centroavante'],
  'Henry|França': ['Ponta-esquerda', 'Centroavante'],
  'Trezeguet|França': ['Ponta-esquerda'],
  'Vieira|França': ['Meio-campista'],
  'Makélélé|França': ['Meio-campista'],
  'Thuram|França': ['Zagueiro'],
  'Desailly|França': ['Volante'],
  'Djorkaeff|França': ['Meia', 'Ponta-direita'],
  'Ribéry|França': ['Ponta-direita', 'Meia'],
  'Benzema|França': ['Ponta-esquerda'],
  'Griezmann|França': ['Meia', 'Ponta-esquerda'],
  'Mbappé|França': ['Centroavante', 'Ponta-direita'],
  'Pogba|França': ['Meia'],
  'Kanté|França': ['Meio-campista'],
  'Giroud|França': ['Ponta-esquerda'],
  'Dembélé|França': ['Ponta-esquerda', 'Ponta-direita'],
  'Matuidi|França': ['Meia-esquerda'],
  'Petit|França': ['Meia'],
  'Pirès|França': ['Meia'],
  'Wiltord|França': ['Ponta-direita'],
  'Anelka|França': ['Ponta-esquerda'],
  'Coman|França': ['Ponta-esquerda'],

  // === ITÁLIA ===
  'Baggio|Itália': ['Meia', 'Centroavante'],
  'Totti|Itália': ['Meia', 'Centroavante'],
  'Del Piero|Itália': ['Ponta-esquerda', 'Centroavante'],
  'Vieri|Itália': [],
  'Inzaghi|Itália': [],
  'Pirlo|Itália': ['Meia'],
  'Gattuso|Itália': ['Meio-campista'],
  'Buffon|Itália': [],
  'Maldini|Itália': ['Zagueiro'],
  'Nesta|Itália': [],
  'Cannavaro|Itália': [],
  'Materazzi|Itália': ['Volante'],
  'Zambrotta|Itália': ['Lateral-esquerdo'],
  'Camoranesi|Itália': ['Meia-direita'],
  'Toni|Itália': [],
  'De Rossi|Itália': ['Zagueiro'],
  'Marchisio|Itália': ['Meia'],
  'Balotelli|Itália': ['Ponta-esquerda'],
  'Baresi|Itália': ['Volante'],
  'Tardelli|Itália': ['Meio-campista'],
  'Rossi|Itália': [],
  'Conti|Itália': ['Meia-direita'],
  'Gentile|Itália': ['Lateral-direito'],
  'Cabrini|Itália': ['Meia-esquerda'],
  'Schillaci|Itália': [],
  'Donadoni|Itália': ['Meia'],
  'Albertini|Itália': ['Meia'],
  'Chiesa|Itália': ['Ponta-esquerda'],
  'Insigne|Itália': ['Centroavante'],
  'Verratti|Itália': ['Meia'],

  // === ESPANHA ===
  'Xavi|Espanha': ['Meia'],
  'Iniesta|Espanha': ['Meia-esquerda', 'Meia'],
  'Villa|Espanha': ['Ponta-esquerda'],
  'Torres|Espanha': [],
  'Raúl|Espanha': [],
  'Puyol|Espanha': ['Lateral-direito'],
  'Ramos|Espanha': ['Lateral-direito'],
  'Piqué|Espanha': [],
  'Busquets|Espanha': ['Zagueiro'],
  'Casillas|Espanha': [],
  'Alonso|Espanha': ['Meia'],
  'Pedro|Espanha': ['Ponta-direita'],
  'Silva|Espanha': ['Meia', 'Ponta-esquerda'],
  'Fàbregas|Espanha': ['Meia'],
  'Morata|Espanha': ['Ponta-esquerda'],
  'Pedri|Espanha': ['Meia'],
  'Gavi|Espanha': ['Meia'],

  // === INGLATERRA ===
  'Beckham|Inglaterra': ['Meia', 'Meio-campista'],
  'Owen|Inglaterra': [],
  'Rooney|Inglaterra': ['Meia', 'Ponta-esquerda'],
  'Gerrard|Inglaterra': ['Meia', 'Meia-direita'],
  'Lampard|Inglaterra': ['Meia'],
  'Scholes|Inglaterra': ['Meia'],
  'Terry|Inglaterra': [],
  'Ferdinand|Inglaterra': [],
  'Cole|Inglaterra': ['Meia-esquerda'],
  'Kane|Inglaterra': [],
  'Sterling|Inglaterra': ['Ponta-esquerda'],
  'Rashford|Inglaterra': ['Ponta-esquerda', 'Centroavante'],
  'Saka|Inglaterra': ['Ponta-esquerda'],
  'Bellingham|Inglaterra': ['Meia'],
  'Foden|Inglaterra': ['Ponta-esquerda', 'Meia'],
  'Lineker|Inglaterra': [],
  'Gascoigne|Inglaterra': ['Meia'],
  'Shearer|Inglaterra': [],
  'Campbell|Inglaterra': ['Volante'],

  // === HOLANDA ===
  'Cruyff|Holanda': ['Centroavante', 'Meia'],
  'Van Basten|Holanda': [],
  'Gullit|Holanda': ['Centroavante', 'Meia'],
  'Rijkaard|Holanda': ['Zagueiro'],
  'Bergkamp|Holanda': ['Meia', 'Ponta-direita'],
  'Kluivert|Holanda': [],
  'Davids|Holanda': ['Meio-campista'],
  'Seedorf|Holanda': ['Meia', 'Meia-esquerda'],
  'Sneijder|Holanda': ['Meia', 'Meia-direita'],
  'Robben|Holanda': ['Ponta-esquerda', 'Centroavante'],
  'Van Persie|Holanda': [],
  'De Jong|Holanda': ['Zagueiro'],
  'Depay|Holanda': ['Centroavante', 'Ponta-direita'],
  'Gakpo|Holanda': ['Centroavante'],
  'Neeskens|Holanda': ['Meia'],
  'Koeman|Holanda': ['Volante'],
  'F. de Boer|Holanda': ['Volante'],
  'Overmars|Holanda': ['Ponta-direita'],
  'Van der Sar|Holanda': [],
  'Van Nistelrooy|Holanda': [],

  // === PORTUGAL ===
  'Cristiano Ronaldo|Portugal': ['Centroavante', 'Ponta-direita'],
  'Figo|Portugal': ['Meia'],
  'Rui Costa|Portugal': ['Meia-esquerda'],
  'Deco|Portugal': ['Meia'],
  'Eusébio|Portugal': ['Ponta-direita'],
  'Pepe|Portugal': ['Volante'],
  'Bruno Fernandes|Portugal': ['Meia', 'Meia-direita'],
  'Bernardo Silva|Portugal': ['Meia', 'Ponta-esquerda'],
  'João Félix|Portugal': ['Ponta-esquerda', 'Centroavante'],
  'Nani|Portugal': ['Ponta-esquerda'],

  // === URUGUAI ===
  'Suárez|Uruguai': [],
  'Cavani|Uruguai': [],
  'Forlán|Uruguai': ['Ponta-esquerda', 'Meia'],
  'Recoba|Uruguai': ['Meia-esquerda'],
  'Francescoli|Uruguai': ['Centroavante'],
  'Valderrama|Colômbia': ['Meia', 'Ponta-direita'],
  'Asprilla|Colômbia': ['Ponta-direita'],
  'James Rodríguez|Colômbia': ['Meia', 'Ponta-direita'],
  'Falcao|Colômbia': [],
  'Cuadrado|Colômbia': ['Meia-direita', 'Lateral-direito'],

  // === MÉXICO ===
  'Hugo Sánchez|México': [],
  'Blanco|México': ['Meia'],
  'Hernández|México': [],
  'Chicharito|México': [],
  'Lozano|México': ['Ponta-esquerda', 'Centroavante'],
  'Guardado|México': ['Meia-esquerda'],
  'Márquez|México': ['Volante'],
  'Vela|México': ['Ponta-esquerda', 'Centroavante'],

  // === CROÁCIA ===
  'Modric|Croácia': ['Meia', 'Meia-direita'],
  'Rakitic|Croácia': ['Meia'],
  'Kovacic|Croácia': ['Meia'],
  'Mandzukic|Croácia': ['Ponta-esquerda'],
  'Perisic|Croácia': ['Ponta-direita', 'Meia-esquerda'],
  'Suker|Croácia': [],
  'Boban|Croácia': ['Meia'],
  'Prosinecki|Croácia': ['Meia'],
  'Brozovic|Croácia': ['Meia'],

  // === BÉLGICA ===
  'Hazard|Bélgica': ['Ponta-esquerda', 'Centroavante'],
  'De Bruyne|Bélgica': ['Meia', 'Meia-direita'],
  'Lukaku|Bélgica': [],
  'Mertens|Bélgica': ['Ponta-esquerda', 'Centroavante'],
  'Witsel|Bélgica': ['Meio-campista'],
  'Kompany|Bélgica': ['Volante'],
  'Courtois|Bélgica': [],
  'Alderweireld|Bélgica': ['Lateral-direito'],
  'Vertonghen|Bélgica': ['Lateral-esquerdo'],
  'Carrasco|Bélgica': ['Meia-esquerda'],

  // === JAPÃO ===
  'Nakata|Japão': ['Meia-direita'],
  'Nakamura|Japão': ['Meia-esquerda'],
  'Honda|Japão': ['Meia', 'Centroavante'],
  'Kagawa|Japão': ['Meia-esquerda'],

  // === COREIA DO SUL ===
  'Park Ji-Sung|Coreia do Sul': ['Meia-direita', 'Ponta-esquerda'],
  'Son Heung-min|Coreia do Sul': ['Centroavante', 'Ponta-esquerda'],

  // === CAMARÕES ===
  'Eto\'o|Camarões': [],
  'Mboma|Camarões': ['Meia'],
  'Song|Camarões': ['Meio-campista'],
  'Milla|Camarões': [],

  // === NIGÉRIA ===
  'Okocha|Nigéria': ['Meia'],
  'Kanu|Nigéria': ['Ponta-direita'],
  'Babangida|Nigéria': ['Ponta-direita'],
  'Yekini|Nigéria': [],
  'Amokachi|Nigéria': ['Ponta-direita'],

  // === GANA ===
  'Essien|Gana': ['Meio-campista', 'Lateral-direito'],
  'A. Gyan|Gana': [],
  'Muntari|Gana': ['Meio-campista'],

  // === COSTA DO MARFIM ===
  'Drogba|Costa do Marfim': [],
  'Touré|Costa do Marfim': ['Meia'],
  'Yaya Touré|Costa do Marfim': ['Meia'],
  'Gervinho|Costa do Marfim': ['Ponta-esquerda'],

  // === SÉRVIA ===
  'Stojkovic|Sérvia': ['Meia'],
  'Savicevic|Sérvia': ['Meia-esquerda'],
  'Mihajlovic|Sérvia': ['Lateral-esquerdo'],

  // === SUÉCIA ===
  'Ibrahimovic|Suécia': [],
  'Larsson|Suécia': ['Ponta-direita', 'Ponta-esquerda'],
  'Ljungberg|Suécia': ['Meia-direita'],
  'Forsberg|Suécia': ['Meia-esquerda'],

  // === DINAMARCA ===
  'Laudrup|Dinamarca': ['Meia', 'Ponta-esquerda'],
  'M. Laudrup|Dinamarca': ['Meia'],
  'B. Laudrup|Dinamarca': ['Ponta-esquerda', 'Centroavante'],
  'Eriksen|Dinamarca': ['Meia', 'Meia-direita'],
  'Schmeichel|Dinamarca': [],

  // === SUÍÇA ===
  'Shaqiri|Suíça': ['Ponta-esquerda', 'Meia'],
  'Xhaka|Suíça': ['Meia'],

  // === CHILE ===
  'Alexis|Chile': ['Ponta-esquerda', 'Centroavante'],
  'Vidal|Chile': ['Meio-campista', 'Meia'],
  'Salas|Chile': [],
  'Zamorano|Chile': [],

  // === PARAGUAI ===
  'Chilavert|Paraguai': [],
  'Santa Cruz|Paraguai': [],

  // === PERU ===
  'Cubillas|Peru': ['Meia', 'Centroavante'],

  // === AUSTRÁLIA ===
  'Viduka|Austrália': [],
  'Cahill|Austrália': ['Meia'],
  'Kewell|Austrália': ['Ponta-esquerda', 'Meia-esquerda'],

  // === TURQUIA ===
  'Hakan Şükür|Turquia': [],

  // === POLÔNIA ===
  'Lewandowski|Polônia': [],
  'Lato|Polônia': ['Meia-esquerda'],
  'Boniek|Polônia': ['Meia-direita', 'Ponta-direita'],
  'Deyna|Polônia': ['Meia'],

  // === RÚSSIA/URSS ===
  'Dasaev|União Soviética': [],
  'Blokhin|União Soviética': ['Ponta-esquerda'],
  'Arshavin|Rússia': ['Ponta-esquerda', 'Meia'],

  // === ROMÊNIA ===
  'Hagi|Romênia': ['Meia', 'Ponta-direita'],
  'Popescu|Romênia': ['Zagueiro'],

  // === SENEGAL ===
  'Mané|Senegal': ['Centroavante', 'Ponta-esquerda'],

  // === MARROCOS ===
  'Hakimi|Marrocos': ['Meia-direita'],
  'Ziyech|Marrocos': ['Meia-direita', 'Meia'],

  // === EQUADOR ===
  'Valencia|Equador': ['Ponta-direita'],

  // === ESTADOS UNIDOS ===
  'Pulisic|Estados Unidos': ['Meia', 'Ponta-esquerda'],
  'Dempsey|Estados Unidos': ['Meia', 'Centroavante'],
  'Donovan|Estados Unidos': ['Meia', 'Ponta-esquerda'],

  // === COSTA RICA ===
  'Navas|Costa Rica': [],

  // === UCRÂNIA ===
  'Shevchenko|Ucrânia': [],
  'Rebrov|Ucrânia': ['Meia'],

  // === REPÚBLICA TCHECA ===
  'Nedved|República Tcheca': ['Meia', 'Meia-esquerda'],
  'Rosicky|República Tcheca': ['Meia'],

  // === ESCÓCIA ===
  'Dalglish|Escócia': ['Meia'],

  // === HUNGRIA ===
  'Puskás|Hungria': ['Ponta-esquerda', 'Meia'],

  // === IRLANDA ===
  'Keane|Irlanda': ['Meio-campista'],
};

let updatedCount = 0;
let famousCount = 0;

data.forEach(team => {
  team.copas.forEach(cup => {
    cup.jogadores.forEach(player => {
      const pos = player.posicao;
      
      // Tenta encontrar no mapeamento de jogadores famosos
      const keyExact = `${player.nome}|${team.selecao}|${cup.ano}`;
      const keyGeneral = `${player.nome}|${team.selecao}`;
      
      let secondaryPositions = null;
      
      if (FAMOUS_PLAYERS[keyExact]) {
        secondaryPositions = FAMOUS_PLAYERS[keyExact];
        famousCount++;
      } else if (FAMOUS_PLAYERS[keyGeneral]) {
        secondaryPositions = FAMOUS_PLAYERS[keyGeneral];
        famousCount++;
      }
      
      if (secondaryPositions !== null) {
        // Filtrar para não incluir a posição principal
        const filtered = secondaryPositions.filter(p => p !== pos);
        if (filtered.length > 0) {
          player.posicoes_secundarias = filtered;
          updatedCount++;
        } else {
          // Garante que array seja vazio se não sobrar posições (ou se já era vazio)
          player.posicoes_secundarias = [];
        }
      } else {
        // Se não achou no mapeamento famoso, o jogador não tem posição secundária
        player.posicoes_secundarias = [];
      }
    });
  });
});

// Salva o arquivo atualizado
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2), 'utf-8');

// Atualiza o data.js também
const dataJs = `const DATA = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('./data.js', dataJs, 'utf-8');

console.log(`Atualização concluída!`);
console.log(`Total de jogadores atualizados: ${updatedCount}`);
console.log(`  - Jogadores famosos com posições reais: ${famousCount}`);

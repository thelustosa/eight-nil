let allData = [];
let formationsConfig = [];
let currentFormationName = null;
let currentStyleName = 'Equilibrado';
let rerollsLeft = 6;

const TROPHY_SVG = `<svg viewBox="0 0 100 150" class="trophy-icon" style="display:inline-block; width:12px; height:18px; vertical-align:middle; margin-left:4px; margin-bottom: 2px;">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3A7" />
      <stop offset="30%" stop-color="#DFBA42" />
      <stop offset="70%" stop-color="#C29B24" />
      <stop offset="100%" stop-color="#836512" />
    </linearGradient>
    <linearGradient id="green" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#004D20" />
      <stop offset="50%" stop-color="#008037" />
      <stop offset="100%" stop-color="#004D20" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="40" r="30" fill="url(#gold)" />
  <path d="M35 25 c 2 -5, 10 -2, 12 -5 c 2 -3, 8 -3, 10 2 c 2 5, -5 8, -2 12 c 3 4, 10 2, 12 8 c 2 6, -8 10, -12 6 c -4 -4, -4 -10, -10 -8 c -6 2, -8 -8, -10 -7 z" fill="#FFF3A7" opacity="0.4" />
  <path d="M28 62 C34 78, 38 100, 36 120 L64 120 C62 100, 66 78, 72 62 C64 52, 60 55, 50 62 C40 55, 36 52, 28 62 Z" fill="url(#gold)" />
  <path d="M50 62 C 45 75, 42 90, 42 120" stroke="#836512" stroke-width="2" fill="none" />
  <path d="M50 62 C 55 75, 58 90, 58 120" stroke="#836512" stroke-width="2" fill="none" />
  <path d="M28 62 C 34 50, 40 40, 42 32 C 44 40, 46 45, 46 56 Z" fill="url(#gold)" />
  <path d="M72 62 C 66 50, 60 40, 58 32 C 56 40, 54 45, 54 56 Z" fill="url(#gold)" />
  <path d="M32 120 L68 120 L73 145 L27 145 Z" fill="url(#gold)" />
  <path d="M30 125 L70 125 L71 131 L29 131 Z" fill="url(#green)" />
  <path d="M28 137 L72 137 L73 143 L27 143 Z" fill="url(#green)" />
</svg>`;

const JULES_RIMET_SVG = `<svg viewBox="0 0 100 200" class="trophy-icon" style="display:inline-block; width:9.5px; height:19px; vertical-align:middle; margin-left:4px; margin-bottom: 2px;">
  <defs>
    <linearGradient id="rimet-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3A7" />
      <stop offset="30%" stop-color="#DFBA42" />
      <stop offset="70%" stop-color="#C29B24" />
      <stop offset="100%" stop-color="#836512" />
    </linearGradient>
    <linearGradient id="rimet-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4B5E7B" />
      <stop offset="50%" stop-color="#324157" />
      <stop offset="100%" stop-color="#1B2533" />
    </linearGradient>
  </defs>
  <path d="M30 130 L70 130 L80 145 L80 185 L70 198 L30 198 L20 185 L20 145 Z" fill="url(#rimet-base)" />
  <rect x="38" y="145" width="24" height="45" fill="url(#rimet-gold)" rx="1" />
  <path d="M30 130 C30 110, 70 110, 70 130 Z" fill="url(#rimet-gold)" />
  <path d="M43 125 L57 125 L55 70 L45 70 Z" fill="url(#rimet-gold)" />
  <path d="M42 70 L58 70 L53 50 L47 50 Z" fill="url(#rimet-gold)" />
  <circle cx="50" cy="44" r="6" fill="url(#rimet-gold)" />
  <path d="M47 54 L30 30 L38 25 L47 48 Z" fill="url(#rimet-gold)" />
  <path d="M53 54 L70 30 L62 25 L53 48 Z" fill="url(#rimet-gold)" />
  <path d="M50 85 L10 10 L25 15 L50 65 L75 15 L90 10 Z" fill="url(#rimet-gold)" />
  <path d="M26 15 L74 15 L66 45 L34 45 Z" fill="url(#rimet-gold)" />
</svg>`;

function getTrophySVG(year) {
  const y = parseInt(year);
  if (y <= 1970) {
    return JULES_RIMET_SVG;
  }
  return TROPHY_SVG;
}

function didWinCup(country, year) {
  if (!country) return false;
  const c = country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const y = parseInt(year);

  const winners = {
    1930: ['uruguai'],
    1934: ['italia'],
    1938: ['italia'],
    1950: ['uruguai'],
    1954: ['alemanha', 'alemanha ocidental'],
    1958: ['brasil'],
    1962: ['brasil'],
    1966: ['inglaterra'],
    1970: ['brasil'],
    1974: ['alemanha', 'alemanha ocidental'],
    1978: ['argentina'],
    1982: ['italia'],
    1986: ['argentina'],
    1990: ['alemanha', 'alemanha ocidental'],
    1994: ['brasil'],
    1998: ['franca'],
    2002: ['brasil'],
    2006: ['italia'],
    2010: ['espanha'],
    2014: ['alemanha'],
    2018: ['franca'],
    2022: ['argentina']
  };

  if (winners[y]) {
    return winners[y].some(w => c.includes(w));
  }
  return false;
}

function isPositionAvailableOnPitch(pAbbrev) {
  return currentPlayers.some(pos => {
    if (pos.name) return false;
    if (pos.label === pAbbrev) return true;
    if ((pAbbrev === 'CA' || pAbbrev === 'ATA') && (pos.label === 'CA' || pos.label === 'ATA')) return true;
    return false;
  });
}
const COUNTRY_CODES = {
  'Alemanha': { code2: 'DE', code3: 'GER' },
  'Argélia': { code2: 'DZ', code3: 'ALG' },
  'Argentina': { code2: 'AR', code3: 'ARG' },
  'Austrália': { code2: 'AU', code3: 'AUS' },
  'Áustria': { code2: 'AT', code3: 'AUT' },
  'Bélgica': { code2: 'BE', code3: 'BEL' },
  'Brasil': { code2: 'BR', code3: 'BRA' },
  'Bulgária': { code2: 'BG', code3: 'BUL' },
  'Camarões': { code2: 'CM', code3: 'CMR' },
  'Chile': { code2: 'CL', code3: 'CHI' },
  'Colômbia': { code2: 'CO', code3: 'COL' },
  'Coreia do Sul': { code2: 'KR', code3: 'KOR' },
  'Costa do Marfim': { code2: 'CI', code3: 'CIV' },
  'Costa Rica': { code2: 'CR', code3: 'CRC' },
  'Croácia': { code2: 'HR', code3: 'CRO' },
  'Dinamarca': { code2: 'DK', code3: 'DEN' },
  'Egito': { code2: 'EG', code3: 'EGY' },
  'Equador': { code2: 'EC', code3: 'ECU' },
  'Escócia': { code2: 'SC', code3: 'SCO' },
  'Espanha': { code2: 'ES', code3: 'ESP' },
  'Estados Unidos': { code2: 'US', code3: 'USA' },
  'França': { code2: 'FR', code3: 'FRA' },
  'Gana': { code2: 'GH', code3: 'GHA' },
  'Grécia': { code2: 'GR', code3: 'GRE' },
  'Holanda': { code2: 'NL', code3: 'NED' },
  'Hungria': { code2: 'HU', code3: 'HUN' },
  'Inglaterra': { code2: 'EN', code3: 'ENG' },
  'Irlanda': { code2: 'IE', code3: 'IRL' },
  'Irlanda do Norte': { code2: 'NI', code3: 'NIR' },
  'Itália': { code2: 'IT', code3: 'ITA' },
  'Iugoslávia': { code2: 'YU', code3: 'YUG' },
  'Japão': { code2: 'JP', code3: 'JPN' },
  'Marrocos': { code2: 'MA', code3: 'MAR' },
  'México': { code2: 'MX', code3: 'MEX' },
  'Nigéria': { code2: 'NG', code3: 'NGA' },
  'País de Gales': { code2: 'WA', code3: 'WAL' },
  'Paraguai': { code2: 'PY', code3: 'PAR' },
  'Peru': { code2: 'PE', code3: 'PER' },
  'Polônia': { code2: 'PL', code3: 'POL' },
  'Portugal': { code2: 'PT', code3: 'POR' },
  'Romênia': { code2: 'RO', code3: 'ROU' },
  'Rússia': { code2: 'RU', code3: 'RUS' },
  'Senegal': { code2: 'SN', code3: 'SEN' },
  'Sérvia': { code2: 'RS', code3: 'SRB' },
  'Suécia': { code2: 'SE', code3: 'SWE' },
  'Suíça': { code2: 'CH', code3: 'SUI' },
  'Tchecoslováquia': { code2: 'CS', code3: 'TCH' },
  'Tchéquia': { code2: 'CZ', code3: 'CZE' },
  'Turquia': { code2: 'TR', code3: 'TUR' },
  'Ucrânia': { code2: 'UA', code3: 'UKR' },
  'União Soviética': { code2: 'SU', code3: 'URS' },
  'Uruguai': { code2: 'UY', code3: 'URU' }
};

function getCountryCodes(selecao) {
  const codes = COUNTRY_CODES[selecao] || {
    code2: (selecao || '').substring(0, 2).toUpperCase(),
    code3: (selecao || '').substring(0, 3).toUpperCase()
  };

  let flagCode = codes.code2.toLowerCase();
  if (selecao === 'Inglaterra') flagCode = 'gb-eng';
  else if (selecao === 'Escócia') flagCode = 'gb-sct';
  else if (selecao === 'País de Gales') flagCode = 'gb-wls';
  else if (selecao === 'Irlanda do Norte') flagCode = 'gb-nir';
  else if (selecao === 'Tchecoslováquia') flagCode = 'cz';
  else if (selecao === 'União Soviética') flagCode = 'ru';
  else if (selecao === 'Iugoslávia') flagCode = 'rs';

  return { ...codes, flagCode };
}

// Elements
const pitchWrap = document.querySelector('.pitch-wrap');
const pitchContainer = document.getElementById('players-container');
const rosterList = document.getElementById('roster-list');
const btnRoll = document.getElementById('btn-roll');

const formationBtns = document.querySelectorAll('.control-section:nth-child(1) .outline-btn');
const styleBtns = document.querySelectorAll('.control-section:nth-child(2) .outline-btn');

// State
let currentPlayers = []; // players currently on the pitch
window.simulationMode = 'auto'; // Default simulation mode

// Configura botões
formationBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    formationBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFormationName = btn.textContent.trim();

    const rollBtn = document.getElementById('btn-roll');
    if (rollBtn) rollBtn.disabled = false;

    updateFormation();
  });
});

styleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    styleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentStyleName = btn.textContent.trim();
    updateFormation();
  });
});

// Carregar dados (via variáveis globais em data.js e formations.js)
function loadData() {
  try {
    allData = window.allData || (typeof DATA !== 'undefined' ? DATA : []);
    formationsConfig = window.formationsConfig || [];

    // Extrair apenas a lenda de maior rating para cada ano de copa
    const legendsMap = new Map();
    allData.forEach(team => {
      team.copas.forEach(c => {
        if (c.lendas) {
          c.lendas.forEach(l => {
            const existing = legendsMap.get(c.ano);
            const currentRating = parseInt(l.rating);
            if (!existing || currentRating > parseInt(existing.rating)) {
              const normalize = str => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
              const normLegend = normalize(l.nome);
              const playerInCup = c.jogadores.find(p => normalize(p.nome) === normLegend);
              const numero = playerInCup ? playerInCup.numero : '?';
              const posicao = playerInCup ? window.t(playerInCup.posicao) : window.t('Jogador');

              legendsMap.set(c.ano, {
                nome: l.nome,
                rating: l.rating,
                ano: c.ano,
                selecao: team.selecao,
                numero: numero,
                posicao: posicao
              });
            }
          });
        }
      });
    });

    currentLegends = Array.from(legendsMap.values());

    // Ordenar as lendas globalmente do maior rating para o menor
    currentLegends.sort((a, b) => parseInt(b.rating) - parseInt(a.rating));

    // Não atualizar formação no início, para mostrar o SVG de estratégia
    renderRoster(); // Renderizar lista de lendas mesmo sem formação
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }
}

function updateFormation() {
  const config = formationsConfig.find(f => f.formation === currentFormationName && f.style === currentStyleName);
  if (!config) return;

  // Atualiza as marcações SVG (o código injetado de svg)
  const pitchElement = document.querySelector('.pitch');
  const existingSvg = pitchElement.querySelector('svg');
  if (existingSvg) existingSvg.remove();

  if (config.svg) {
    pitchElement.insertAdjacentHTML('afterbegin', config.svg);
  }

  // Refaz os slots na posição vazia se não tivermos time sorteado
  const oldPlayers = [...currentPlayers];
  currentPlayers = config.positions.map(pos => {
    // Tenta encontrar se já havia alguém com essa mesma label
    const prev = oldPlayers.find(p => p.label === pos.label && p.name);
    return {
      id: pos.label.toLowerCase(),
      label: pos.label,
      x: pos.x,
      y: pos.y,
      name: prev ? prev.name : '',
      rating: prev ? prev.rating : ''
    };
  });


  renderPitch();
  renderRoster();
  renderBoxScore();
  renderSquadList();
}

let currentRolledCup = null;
let selectedPlayerForDraft = null;

function renderPitch() {
  pitchContainer.innerHTML = '';

  const posMap = {
    'GOLEIRO': 'GOL', 'ZAGUEIRO': 'ZAG', 'VOLANTE': 'VOL', 'CENTROAVANTE': 'CA',
    'LATERAL-ESQUERDO': 'LE', 'LATERAL-DIREITO': 'LD', 'MEIO-CAMPISTA': 'MC',
    'MEIA-DIREITA': 'MD', 'MEIA-ESQUERDA': 'ME', 'MEIA': 'MEI',
    'PONTA-ESQUERDA': 'PE', 'PONTA-DIREITA': 'PD'
  };

  let abbrevs = [];
  if (selectedPlayerForDraft) {
    const posUpper = selectedPlayerForDraft.posicao ? selectedPlayerForDraft.posicao.toUpperCase() : '';
    abbrevs.push(posMap[posUpper] || posUpper);
    if (selectedPlayerForDraft.posicoes_secundarias) {
      selectedPlayerForDraft.posicoes_secundarias.forEach(sec => {
        const secUpper = sec.toUpperCase();
        abbrevs.push(posMap[secUpper] || secUpper);
      });
    }
  }

  currentPlayers.forEach((pos, idx) => {
    let isPulsing = false;
    if (selectedPlayerForDraft && !pos.name) {
      isPulsing = abbrevs.some(pAbbrev => {
        if (pos.label === pAbbrev) return true;
        if (pos.label.includes('/') && pos.label.split('/').includes(pAbbrev)) return true;
        if (pos.label.startsWith('ZAG') && pAbbrev === 'ZAG') return true;
        if ((pAbbrev === 'CA' || pAbbrev === 'ATA') && (pos.label === 'CA' || pos.label === 'ATA')) return true;
        return false;
      });
    }

    const el = document.createElement('div');
    el.className = `disc ${pos.name ? 'filled' : 'empty'} ${isPulsing ? 'pulsing' : ''}`;
    el.style.left = `${pos.x}%`;
    el.style.top = `${pos.y}%`;

    const circle = document.createElement('div');
    circle.className = 'disc-circle';
    circle.innerText = pos.name ? (pos.numero || '-') : window.t(pos.label);

    el.appendChild(circle);

    if (pos.name) {
      const nameLabel = document.createElement('div');
      nameLabel.className = 'disc-name';
      let dName = pos.name;
      if (dName.length > 10) dName = dName.substring(0, 8) + '...';
      const isWinner = currentRolledTeam && currentRolledCup && didWinCup(currentRolledTeam.selecao, currentRolledCup.ano);
      nameLabel.innerHTML = window.t(dName);
      el.appendChild(nameLabel);
    }

    el.addEventListener('click', () => {
      // If position already has a player, lock it (cannot be changed)
      if (pos.name) return;

      // Only allow assigning to valid (pulsing) slots
      if (selectedPlayerForDraft && isPulsing) {
        // Remove from any previous position they were assigned to
        currentPlayers.forEach(cp => {
          if (cp.name === selectedPlayerForDraft.nome) {
            cp.name = '';
            cp.rating = '';
            cp.numero = '';
          }
        });

        // Determine player number
        let pNum = selectedPlayerForDraft.numero;
        if (!pNum && currentRolledCup) {
          const sorted = [...currentRolledCup.jogadores].sort((a, b) => b.rating - a.rating);
          const sIdx = sorted.indexOf(selectedPlayerForDraft);
          pNum = sIdx !== -1 ? (sIdx + 1) : '-';
        }

        // Assign to new position
        pos.name = selectedPlayerForDraft.nome;
        pos.rating = selectedPlayerForDraft.rating;
        pos.numero = pNum;
        pos.country = currentRolledTeam ? currentRolledTeam.selecao : '';
        pos.posicao_original = selectedPlayerForDraft.posicao || '';
        pos.ano = currentRolledCup ? currentRolledCup.ano : '';
        pos.lenda = selectedPlayerForDraft.lenda || false;

        selectedPlayerForDraft = null;
        renderPitch();
        renderSquadList();
        renderBoxScore();
        renderDraftedCountries();

        const preRollPanel = document.getElementById('pre-roll-panel');
        const midRollPanel = document.getElementById('mid-roll-panel');
        const postRollPanel = document.getElementById('post-roll-panel');
        const completedPanel = document.getElementById('completed-panel');

        const isComplete = currentPlayers.every(p => p.name);

        if (preRollPanel) preRollPanel.style.display = 'none';
        if (postRollPanel) postRollPanel.style.display = 'none';

        if (isComplete) {
          if (midRollPanel) midRollPanel.style.display = 'none';
          if (completedPanel) completedPanel.style.display = 'flex';
        } else {
          if (midRollPanel) midRollPanel.style.display = 'flex';
          if (completedPanel) completedPanel.style.display = 'none';
        }
      }
    });

    pitchContainer.appendChild(el);
  });
}

function renderDraftedCountries() {
  const card = document.getElementById('drafted-countries-card');
  if (!card) return;

  const countryCounts = {};
  currentPlayers.forEach(pos => {
    if (pos.name && pos.country) {
      countryCounts[pos.country] = (countryCounts[pos.country] || 0) + 1;
    }
  });

  const countries = Object.keys(countryCounts);
  if (countries.length === 0) {
    const text = window.i18nTranslations[window.currentLang]?.nenhum_pais_selecionado || 'Nenhum país selecionado';
    card.innerHTML = `<div style="text-align: center; color: #b0b0b0; padding: 10px;" data-i18n="nenhum_pais_selecionado">${text}</div>`;
    return;
  }

  let html = '<h3 style="font-size: 11px; margin-bottom: 8px; color: #7a7363; text-transform: uppercase; letter-spacing: 2.42px; font-family: \'Hanken Grotesk\', sans-serif; font-weight: 800;">PAÍSES SELECIONADOS</h3>';
  html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';

  countries.forEach(country => {
    const flagInfo = getCountryCodes(country);
    html += `
      <img src="https://flagcdn.com/w160/${flagInfo.flagCode}.png" style="width: 40px; height: 26px; object-fit: cover;" alt="${country}" title="${country}" onerror="this.style.display='none'">
    `;
  });

  html += '</div>';
  card.innerHTML = html;
}

let currentLegends = []; // legends of the selected team
let currentLegendsPage = 0;
const ITEMS_PER_PAGE = 5;

function renderRoster() {
  const rosterList = document.getElementById('roster-list');
  const counterEl = document.getElementById('legend-counter');
  if (!rosterList) return;
  rosterList.innerHTML = '';

  if (currentLegends.length === 0) {
    const text = window.i18nTranslations[window.currentLang]?.nenhuma_lenda_encontrada || 'Nenhuma lenda encontrada';
    const row = document.createElement('div');
    row.className = 'roster-row empty';
    row.innerHTML = `<span class="roster-empty" data-i18n="nenhuma_lenda_encontrada">${text}</span>`;
    rosterList.appendChild(row);
    if (counterEl) counterEl.innerText = '0/0';
    return;
  }

  const totalPages = Math.ceil(currentLegends.length / ITEMS_PER_PAGE);
  if (currentLegendsPage >= totalPages) currentLegendsPage = 0;

  const start = currentLegendsPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageLegends = currentLegends.slice(start, end);

  pageLegends.forEach(legend => {
    const row = document.createElement('div');
    row.className = 'legend-card';

    const codes = getCountryCodes(legend.selecao);
    const nameWithTrophy = legend.nome;
    const translatedPos = legend.posicao ? window.t(legend.posicao) : window.t('JOGADOR');

    row.innerHTML = `
        <div class="legend-card-top">
          <span class="legend-card-name">${nameWithTrophy}</span>
          <div class="legend-rating-badge">${legend.rating}</div>
        </div>
        <div class="legend-card-bottom">
          <span class="legend-info-text">${translatedPos.toUpperCase()} &middot; ${codes.code3} &middot; ${legend.ano}</span>
          <img src="https://flagcdn.com/w160/${codes.flagCode}.png" class="legend-card-flag" alt="${codes.code2}" onerror="this.style.display='none';">
        </div>
        
      `;
    rosterList.appendChild(row);
  });

  if (counterEl) {
    counterEl.innerText = `${currentLegendsPage + 1}/${totalPages}`;
  }
}

function renderBoxScore() {
  const boxScoreList = document.getElementById('box-score-list');
  if (!boxScoreList) return;
  boxScoreList.innerHTML = '';

  let draftedCount = 0;
  let totalRating = 0;

  // Função para obter pesos de ataque e defesa baseado na posição
  function getWeights(label) {
    switch (label) {
      case 'CA': case 'PE': case 'PD': return { atk: 1.0, def: 0.0 };
      case 'MEI': return { atk: 0.8, def: 0.2 };
      case 'ME': case 'MD': return { atk: 0.7, def: 0.3 };
      case 'MC': return { atk: 0.5, def: 0.5 };
      case 'VOL': return { atk: 0.2, def: 0.8 };
      case 'LE': case 'LD': return { atk: 0.2, def: 0.8 };
      case 'ZAG': case 'GOL': return { atk: 0.0, def: 1.0 };
      default: return { atk: 0.5, def: 0.5 };
    }
  }

  let totalAtkWeight = 0;
  let totalDefWeight = 0;

  // Calcula o peso total da formação escolhida
  currentPlayers.forEach((pos, idx) => {
    const w = getWeights(pos.label);
    totalAtkWeight += w.atk;
    totalDefWeight += w.def;
  });

  let attackScore = 0;
  let defenseScore = 0;

  currentPlayers.forEach((pos, idx) => {
    if (pos.name) {
      draftedCount++;
      const rating = parseInt(pos.rating) || 0;
      totalRating += rating;

      const w = getWeights(pos.label);

      // Distribui a nota proporcionalmente ao peso na formação
      if (totalAtkWeight > 0) {
        attackScore += rating * (w.atk / totalAtkWeight);
      }
      if (totalDefWeight > 0) {
        defenseScore += rating * (w.def / totalDefWeight);
      }
    }

    const row = document.createElement('div');
    row.className = `roster-row ${pos.name ? '' : 'empty'}`;

    const posEl = document.createElement('div');
    posEl.className = 'roster-pos';
    posEl.innerText = window.t(pos.label);

    const nameEl = document.createElement('div');
    nameEl.className = 'roster-name';
    nameEl.innerHTML = pos.name ? pos.name : '—';

    const ratingEl = document.createElement('div');
    ratingEl.className = 'roster-rating';
    ratingEl.innerText = pos.name ? pos.rating : '';

    row.appendChild(posEl);
    row.appendChild(nameEl);
    row.appendChild(ratingEl);


    row.addEventListener('mouseenter', () => {
      const discs = document.querySelectorAll('#players-container .disc');
      if (discs[idx]) {
        discs[idx].classList.add('hover-highlight');
      }
    });
    row.addEventListener('mouseleave', () => {
      const discs = document.querySelectorAll('#players-container .disc');
      if (discs[idx]) {
        discs[idx].classList.remove('hover-highlight');
      }
    });

    boxScoreList.appendChild(row);
  });



  const avgRating = draftedCount > 0 ? Math.round(totalRating / draftedCount) : 0;

  const draftCountEl = document.getElementById('draft-count');
  if (draftCountEl) draftCountEl.innerText = `${draftedCount}/11`;

  // Toggle completed UI
  if (draftedCount === 11) {
    const preRoll = document.getElementById('pre-roll-left');
    const midRoll = document.getElementById('mid-roll-panel');
    const postRoll = document.getElementById('post-roll-panel');
    const completedPanel = document.getElementById('completed-panel');

    if (preRoll) preRoll.style.display = 'none';
    if (midRoll) midRoll.style.display = 'none';
    if (postRoll) postRoll.style.display = 'none';
    if (completedPanel) completedPanel.style.display = 'flex';
  }

  const teamRatingEl = document.getElementById('team-rating');
  if (teamRatingEl) teamRatingEl.innerText = avgRating;

  // Update Attack and Defense stats in HTML
  const ataqueStatEl = document.getElementById('ataque-stat');
  if (ataqueStatEl) ataqueStatEl.innerText = attackScore > 0 ? Math.round(attackScore) : '—';

  const defenseStatEl = document.getElementById('defense-stat');
  if (defenseStatEl) defenseStatEl.innerText = defenseScore > 0 ? Math.round(defenseScore) : '—';
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let currentRolledTeam = null;

function renderSquadList() {
  const squadList = document.getElementById('squad-list');
  if (!squadList || !currentRolledCup) return;

  squadList.innerHTML = '';
  const posMap = {
    'GOLEIRO': 'GOL',
    'ZAGUEIRO': 'ZAG',
    'VOLANTE': 'VOL',
    'CENTROAVANTE': 'CA',
    'LATERAL-ESQUERDO': 'LE',
    'LATERAL-DIREITO': 'LD',
    'MEIO-CAMPISTA': 'MC',
    'MEIA-DIREITA': 'MD',
    'MEIA-ESQUERDA': 'ME',
    'MEIA': 'MEI',
    'PONTA-ESQUERDA': 'PE',
    'PONTA-DIREITA': 'PD'
  };

  let mappedPlayers = currentRolledCup.jogadores.map(p => {
    const posUpper = p.posicao ? p.posicao.toUpperCase() : '';
    const rawAbbrev = posMap[posUpper] || posUpper;
    const abbrev = window.t(rawAbbrev);
    let hasSlot = isPositionAvailableOnPitch(rawAbbrev);
    if (!hasSlot && p.posicoes_secundarias && p.posicoes_secundarias.length > 0) {
      hasSlot = p.posicoes_secundarias.some(sec => {
        const secUpper = sec.toUpperCase();
        return isPositionAvailableOnPitch(posMap[secUpper] || secUpper);
      });
    }

    const isDrafted = currentPlayers.some(cp => cp.name === p.nome);
    const isAvailable = hasSlot && !isDrafted;

    if (typeof p._rand === 'undefined') {
      p._rand = Math.random();
    }
    return { player: p, abbrev, hasSlot, isDrafted, isAvailable, rand: p._rand };
  });

  mappedPlayers.sort((a, b) => {
    if (a.isAvailable !== b.isAvailable) {
      return a.isAvailable ? -1 : 1;
    }
    return a.rand - b.rand;
  });

  mappedPlayers.forEach((item, idx) => {
    const p = item.player;
    const num = p.numero || (idx + 1);
    const abbrev = item.abbrev;
    const hasSlot = item.hasSlot;
    const isDrafted = item.isDrafted;

    const isSelected = selectedPlayerForDraft && selectedPlayerForDraft.nome === p.nome;

    let displayPos = abbrev;
    let posFontSize = "12px";
    if (p.posicoes_secundarias && p.posicoes_secundarias.length > 0) {
      const secAbbrevs = p.posicoes_secundarias.map(sec => {
        const secUpper = sec.toUpperCase();
        return window.t(posMap[secUpper] || secUpper);
      });
      displayPos += '/' + secAbbrevs.join('/');
      posFontSize = "10px";
    }

    const el = document.createElement('div');
    el.className = `squad-item ${isDrafted ? 'drafted' : ''} ${isSelected ? 'selected' : ''} ${!hasSlot ? 'disabled' : ''}`;
    const atqTxt = window.i18nTranslations[window.currentLang]?.ataque_abbr || 'Atq';
    const defTxt = window.i18nTranslations[window.currentLang]?.defesa_abbr || 'Def';

    el.innerHTML = `
      <div class="squad-item-content">
        <div class="squad-name">${p.nome}</div>
        <div class="squad-pos">${p.posicao ? window.t(p.posicao).toUpperCase() : ''}</div>
        <div class="squad-open">${displayPos.includes('/') ? window.t('POSIÇÕES') : window.t('POSIÇÃO')}: ${displayPos}</div>
      </div>
      <div class="squad-rating-wrapper">
        <div class="squad-rating">${p.rating}</div>
      </div>
    `;

    el.addEventListener('click', () => {
      if (!hasSlot && !isDrafted) return; // Prevent selection of player with unavailable position
      if (isDrafted) {
        return; // Once drafted, cannot be removed
      }

      if (isSelected) {
        selectedPlayerForDraft = null;
      } else {
        // Select or toggle selection
        if (selectedPlayerForDraft && selectedPlayerForDraft.nome === p.nome) {
          selectedPlayerForDraft = null;
        } else {
          selectedPlayerForDraft = p;
        }
      }
      renderPitch();
      renderSquadList();
    });

    squadList.appendChild(el);
  });
}

function rollTeam(keepTeam = false) {
  if (!allData || allData.length === 0 || !formationsConfig) return;

  if (!currentFormationName) {
    currentFormationName = '4-4-2';
    const firstBtn = document.querySelector('.btn-grid-3 .outline-btn');
    if (firstBtn) firstBtn.classList.add('active');
    updateFormation();
  }

  // Desabilitar botões durante o sorteio
  const rollBtns = [document.getElementById('btn-roll'), document.getElementById('btn-roll-next'), document.getElementById('btn-reroll-team'), document.getElementById('btn-reroll-cup')];
  rollBtns.forEach(btn => { if (btn) btn.disabled = true; });

  const preRollPanel = document.getElementById('pre-roll-panel');
  const midRollPanel = document.getElementById('mid-roll-panel');
  const postRollPanel = document.getElementById('post-roll-panel');
  if (preRollPanel) preRollPanel.style.display = 'none';
  if (midRollPanel) midRollPanel.style.display = 'none';
  if (postRollPanel) postRollPanel.style.display = 'flex';

  // Esconder apenas a lista de jogadores
  const elementsToHide = document.querySelectorAll('.players-header, .players-list-card');
  elementsToHide.forEach(el => el.style.display = 'none');

  const preRollRight = document.getElementById('pre-roll-right');
  const postRollRight = document.getElementById('post-roll-right');
  if (preRollRight) preRollRight.style.display = 'none';
  if (postRollRight) postRollRight.style.display = 'flex'; // manter visível durante o sorteio

  const resCountry = document.getElementById('result-country');
  const resCup = document.getElementById('result-cup');
  const resPrefix = document.querySelector('.result-prefix');

  let elapsed = 0;
  const duration = 1500; // tempo total da animação em ms
  const intervalTime = 100; // velocidade de troca

  const rollInterval = setInterval(() => {
    let tempTeam = keepTeam && currentRolledTeam ? currentRolledTeam : getRandomItem(allData);
    let tempCup = keepTeam && currentRolledTeam ? getRandomItem(currentRolledTeam.copas) : getRandomItem(tempTeam.copas);

    if (resCountry) {
      const translatedCountry = window.t(tempTeam.selecao);
      resCountry.innerText = translatedCountry;
      resCountry.style.fontSize = translatedCountry.length > 12 ? '18px' : (translatedCountry.length > 8 ? '24px' : '32px');
    }
    if (resCup) resCup.innerText = tempCup.ano;
    if (resPrefix) {
      const codes = getCountryCodes(tempTeam.selecao);
      resPrefix.innerHTML = `<img src="https://flagcdn.com/w160/${codes.flagCode}.png" class="result-flag" alt="${codes.code2}" onerror="this.outerHTML='DE '">`;
    }

    elapsed += intervalTime;
    if (elapsed >= duration) {
      clearInterval(rollInterval);
      finalizeRoll(keepTeam);
    }
  }, intervalTime);
}

function finalizeRoll(keepTeam) {
  let team, cup;

  const posMap = {
    'GOLEIRO': 'GOL', 'ZAGUEIRO': 'ZAG', 'VOLANTE': 'VOL', 'CENTROAVANTE': 'CA',
    'LATERAL-ESQUERDO': 'LE', 'LATERAL-DIREITO': 'LD', 'MEIO-CAMPISTA': 'MC',
    'MEIA-DIREITA': 'MD', 'MEIA-ESQUERDA': 'ME', 'MEIA': 'MEI',
    'PONTA-ESQUERDA': 'PE', 'PONTA-DIREITA': 'PD'
  };

  const hasUsefulPlayer = (c) => {
    return c.jogadores.some(p => {
      const posUpper = p.posicao ? p.posicao.toUpperCase() : '';
      const abbrev = posMap[posUpper] || posUpper;
      if (isPositionAvailableOnPitch(abbrev)) return true;

      if (p.posicoes_secundarias && p.posicoes_secundarias.length > 0) {
        return p.posicoes_secundarias.some(sec => {
          const secUpper = sec.toUpperCase();
          return isPositionAvailableOnPitch(posMap[secUpper] || secUpper);
        });
      }
      return false;
    });
  };

  if (keepTeam && currentRolledTeam) {
    team = currentRolledTeam;
    const validCups = team.copas.filter(hasUsefulPlayer);
    cup = validCups.length > 0 ? getRandomItem(validCups) : getRandomItem(team.copas);
  } else {
    const validTeams = allData.filter(t => t.copas.some(hasUsefulPlayer));
    team = validTeams.length > 0 ? getRandomItem(validTeams) : getRandomItem(allData);

    const validCups = team.copas.filter(hasUsefulPlayer);
    cup = validCups.length > 0 ? getRandomItem(validCups) : getRandomItem(team.copas);
    currentRolledTeam = team;
  }

  currentRolledCup = cup;
  selectedPlayerForDraft = null;

  const resCountry = document.getElementById('result-country');
  const resCup = document.getElementById('result-cup');
  const resPrefix = document.querySelector('.result-prefix');

  if (resCountry) {
    const translatedCountry = window.t(team.selecao);
    resCountry.innerText = translatedCountry;
    resCountry.style.fontSize = translatedCountry.length > 12 ? '20px' : (translatedCountry.length > 8 ? '24px' : '32px');
  }
  if (resCup) resCup.innerText = cup.ano;
  if (resPrefix) {
    const codes = getCountryCodes(team.selecao);
    resPrefix.innerHTML = `<img src="https://flagcdn.com/w160/${codes.flagCode}.png" class="result-flag" alt="${codes.code2}" onerror="this.outerHTML='DE '">`;
  }

  // Mostrar os elementos que estavam escondidos
  const elementsToHide = document.querySelectorAll('.reroll-header, .reroll-buttons, .players-header, .players-list-card');
  elementsToHide.forEach(el => {
    if (el.classList.contains('reroll-buttons')) {
      el.style.display = 'grid';
    } else {
      el.style.display = 'block';
    }
  });

  const postRollRight = document.getElementById('post-roll-right');
  if (postRollRight) postRollRight.style.display = 'flex';

  // Habilitar botões
  const rollBtns = [document.getElementById('btn-roll'), document.getElementById('btn-roll-next'), document.getElementById('btn-reroll-team'), document.getElementById('btn-reroll-cup')];
  rollBtns.forEach(btn => {
    if (btn) {
      if ((btn.id === 'btn-reroll-team' || btn.id === 'btn-reroll-cup') && typeof rerollsLeft !== 'undefined' && rerollsLeft <= 0) {
        btn.disabled = true;
      } else if (btn.id === 'btn-reroll-cup' && team.copas.filter(hasUsefulPlayer).length <= 1) {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    }
  });

  renderSquadList();

  const rollBox = document.querySelector('.roll-box');
  if (rollBox) {
    const copaDeTxt = window.i18nTranslations[window.currentLang]?.copa_de || 'Copa de';
    const forcaTxt = window.i18nTranslations[window.currentLang]?.forca || 'Força';
    rollBox.innerHTML = `<strong>${window.t(team.selecao).toUpperCase()}</strong><br>${copaDeTxt} ${cup.ano}<br>${forcaTxt}: ${cup.rating_selecao}`;
    rollBox.style.borderColor = '#1d1d1b';
    rollBox.style.color = '#1d1d1b';
  }

  renderPitch();
}

function updateRerollUI() {
  const countEl = document.getElementById('reroll-count');
  if (countEl) countEl.innerText = rerollsLeft;

  if (rerollsLeft <= 0) {
    if (btnRerollTeam) btnRerollTeam.disabled = true;
    if (btnRerollCup) btnRerollCup.disabled = true;
  }
}

btnRoll.addEventListener('click', () => {
  rerollsLeft = 6;
  updateRerollUI();
  rollTeam(false);
});

const btnRollNext = document.getElementById('btn-roll-next');
if (btnRollNext) {
  btnRollNext.addEventListener('click', () => {
    rollTeam(false);
  });
}

const btnRerollTeam = document.getElementById('btn-reroll-team');
const btnRerollCup = document.getElementById('btn-reroll-cup');

if (btnRerollTeam) {
  btnRerollTeam.addEventListener('click', () => {
    if (rerollsLeft > 0) {
      rerollsLeft--;
      updateRerollUI();
      rollTeam(false);
    }
  });
}

if (btnRerollCup) {
  btnRerollCup.addEventListener('click', () => {
    if (rerollsLeft > 0) {
      rerollsLeft--;
      updateRerollUI();
      rollTeam(true);
    }
  });
}

// Controles do Carrossel de Lendas
const btnPrevLegend = document.getElementById('btn-prev-legend');
const btnNextLegend = document.getElementById('btn-next-legend');

if (btnPrevLegend) {
  btnPrevLegend.addEventListener('click', () => {
    if (currentLegends.length === 0) return;
    const totalPages = Math.ceil(currentLegends.length / ITEMS_PER_PAGE);
    currentLegendsPage = (currentLegendsPage - 1 + totalPages) % totalPages;
    renderRoster();
  });
}

if (btnNextLegend) {
  btnNextLegend.addEventListener('click', () => {
    if (currentLegends.length === 0) return;
    const totalPages = Math.ceil(currentLegends.length / ITEMS_PER_PAGE);
    currentLegendsPage = (currentLegendsPage + 1) % totalPages;
    renderRoster();
  });
}

// Init
loadData();
// Setup btn-simular
const btnSimular = document.getElementById('btn-simular');
if (btnSimular) {
  btnSimular.addEventListener('click', () => {
    // Hide main container
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) mainContainer.style.display = 'none';

    const tState = document.getElementById('tournament-state');
    if (tState) tState.style.display = 'block';

    if (typeof simulateGroupStage === 'function') {
      simulateGroupStage();
    }
  });
}
// Next Game / Reset Button
const btnNextGame = document.getElementById('btn-next-game');
if (btnNextGame) {
  btnNextGame.addEventListener('click', () => {
    btnNextGame.style.display = 'none';
    document.querySelectorAll('.tournament-match-card.expanded').forEach(c => c.classList.remove('expanded'));

    if (!state.simulation.isKnockout) {
      if (state.simulation.phase < 2) {
        state.simulation.phase++;
        animateMatch(state.simulation.phase);
      } else {
        // Group stage ended
        const sortedGroup = [...state.simulation.groupTeams].sort((a, b) => {
          if (b.pts !== a.pts) return b.pts - a.pts;
          if (b.gd !== a.gd) return b.gd - a.gd;
          return b.gf - a.gf;
        });
        const userPos = sortedGroup.findIndex(t => t.isUser) + 1;
        if (userPos <= 2) {
          // Enter knockout stage
          state.simulation.isKnockout = true;
          state.simulation.phase = 3;
          state.simulation.knockoutPhaseLabel = 'phase_round32';
          document.getElementById('group-stage-container').style.display = 'none';
          document.getElementById('group-table-container').style.display = 'none';
          const simBtns = document.querySelector('.simulation-mode-buttons');
          if (simBtns) simBtns.style.display = 'none';
          document.querySelectorAll('.simulation-summary-banner').forEach(el => el.remove());
          document.getElementById('knockout-stage-container').style.display = 'flex';

          document.querySelector('.tournament-left-col').appendChild(btnNextGame);
          simulateKnockoutMatch();
        } else {
          location.reload();
        }
      }
    } else {
      // Knockout match finished
      if (state.simulation.knockoutMatch && state.simulation.knockoutMatch.userWon) {
        if (state.simulation.phase === 3) {
          state.simulation.phase = 4;
          state.simulation.knockoutPhaseLabel = 'phase_round16';
          simulateKnockoutMatch();
        } else if (state.simulation.phase === 4) {
          state.simulation.phase = 5;
          state.simulation.knockoutPhaseLabel = 'phase_quarter';
          simulateKnockoutMatch();
        } else if (state.simulation.phase === 5) {
          state.simulation.phase = 6;
          state.simulation.knockoutPhaseLabel = 'phase_semi';
          simulateKnockoutMatch();
        } else if (state.simulation.phase === 6) {
          state.simulation.phase = 7;
          state.simulation.knockoutPhaseLabel = 'phase_final';
          simulateKnockoutMatch();
        } else {
          // Won the final!
          location.reload();
        }
      } else {
        location.reload();
      }
    }
  });
}

// Simulation Mode Toggles
const btnModeJogoJogo = document.getElementById('btn-mode-jogo-jogo');
const btnModeAuto = document.getElementById('btn-mode-manual');

if (btnModeJogoJogo && btnModeAuto) {
  btnModeJogoJogo.addEventListener('click', () => {
    btnModeJogoJogo.classList.add('active');
    btnModeAuto.classList.remove('active');
    window.simulationMode = 'jogo-a-jogo';
  });
  
  btnModeAuto.addEventListener('click', () => {
    btnModeAuto.classList.add('active');
    btnModeJogoJogo.classList.remove('active');
    window.simulationMode = 'auto';
  });
}

window.simulationSpeed = 1;
const btnModeSpeed = document.getElementById('btn-mode-speed');
if (btnModeSpeed) {
  btnModeSpeed.addEventListener('click', () => {
    const lang = window.currentLang || 'PT';
    const dict = window.i18nTranslations[lang] || window.i18nTranslations['PT'];

    if (window.simulationSpeed === 1) {
      window.simulationSpeed = 2;
      btnModeSpeed.setAttribute('data-i18n', 'velocidade_2x');
      btnModeSpeed.textContent = dict['velocidade_2x'] || 'VELOC. 2X';
    } else if (window.simulationSpeed === 2) {
      window.simulationSpeed = 3;
      btnModeSpeed.setAttribute('data-i18n', 'velocidade_3x');
      btnModeSpeed.textContent = dict['velocidade_3x'] || 'VELOC. 3X';
    } else {
      window.simulationSpeed = 1;
      btnModeSpeed.setAttribute('data-i18n', 'velocidade_1x');
      btnModeSpeed.textContent = dict['velocidade_1x'] || 'VELOC. 1X';
    }
  });
}

// i18n Logic
window.translateUI = function(lang) {
  if (!window.i18nTranslations || !window.i18nTranslations[lang]) return;
  const dict = window.i18nTranslations[lang];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Re-translate dynamic country/roll texts
  if (typeof currentRolledTeam !== 'undefined' && currentRolledTeam) {
    const resCountry = document.getElementById('result-country');
    if (resCountry) {
      const translatedCountry = window.t(currentRolledTeam.selecao);
      resCountry.innerText = translatedCountry;
      resCountry.style.fontSize = translatedCountry.length > 12 ? '20px' : (translatedCountry.length > 8 ? '24px' : '32px');
    }
    const rollBox = document.querySelector('.roll-box');
    if (rollBox && typeof currentRolledCup !== 'undefined' && currentRolledCup) {
      const copaDeTxt = window.i18nTranslations[lang]?.copa_de || 'Copa de';
      const forcaTxt = window.i18nTranslations[lang]?.forca || 'Força';
      rollBox.innerHTML = `<strong>${window.t(currentRolledTeam.selecao).toUpperCase()}</strong><br>${copaDeTxt} ${currentRolledCup.ano}<br>${forcaTxt}: ${currentRolledCup.rating_selecao}`;
    }
  }

  // Re-render the pitch and player lists so positions get translated
  if (typeof updateFormation === 'function') {
    updateFormation();
  }
  if (typeof renderRoster === 'function') {
    renderRoster();
  }
  if (typeof renderSquadList === 'function') {
    renderSquadList();
  }
};

function initLanguage() {
  // Detect language
  let userLang = localStorage.getItem('userLang');
  if (!userLang) {
    userLang = (navigator.language || navigator.userLanguage).split('-')[0].toUpperCase();
  }
  if (!window.i18nTranslations || !window.i18nTranslations[userLang]) {
    userLang = 'EN';
  }
  window.currentLang = userLang;
  
  // Set initial active button
  const langOpts = document.querySelectorAll('.lang-opt-btn');
  langOpts.forEach(btn => {
    if (btn.textContent.trim() === userLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  window.translateUI(userLang);
}

// Language Dropdown Logic
const langBtn = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');
if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.style.display = langDropdown.style.display === 'none' ? 'block' : 'none';
  });
  
  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target) && e.target !== langBtn) {
      langDropdown.style.display = 'none';
    }
  });

  const langOpts = langDropdown.querySelectorAll('.lang-opt-btn');
  langOpts.forEach(btn => {
    btn.addEventListener('click', (e) => {
      langOpts.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const selectedLang = e.target.textContent.trim();
      window.currentLang = selectedLang;
      localStorage.setItem('userLang', selectedLang);
      window.translateUI(selectedLang);
      langDropdown.style.display = 'none';
    });
  });
}

// Initialize on DOM load (or right away since script is at the bottom)
initLanguage();

// Start Screen Logic
document.addEventListener('DOMContentLoaded', () => {
  const btnStartGame = document.getElementById('btn-start-game');
  const startScreen = document.getElementById('start-screen');
  const mainApp = document.getElementById('main-app');
  const headerLogo = document.getElementById('header-logo');

  if (btnStartGame) {
    btnStartGame.addEventListener('click', () => {
      startScreen.style.display = 'none';
      mainApp.style.display = 'grid';
      headerLogo.style.display = 'flex';
      
      const mainHeader = document.getElementById('main-header');
      if (mainHeader) mainHeader.style.display = 'block';
    });
  }

  const btnHowTo = document.getElementById('btn-how-to');
  const howToContent = document.getElementById('how-to-content');
  if (btnHowTo) {
    btnHowTo.addEventListener('click', () => {
      btnHowTo.classList.toggle('active');
      if (howToContent.style.display === 'none') {
        howToContent.style.display = 'block';
      } else {
        howToContent.style.display = 'none';
      }
    });
  }
});

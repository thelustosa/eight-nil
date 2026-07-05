const TRANSLATIONS = new Proxy({}, {
  get: function(target, prop) {
    // prop is language, like "pt", "en". window.i18nTranslations has "PT", "EN"
    return window.i18nTranslations[prop.toUpperCase()] || window.i18nTranslations['EN'];
  }
});

const state = { simulation: null, get lang() { return (window.currentLang || "PT").toLowerCase(); } };

const F7_LOGO_SVG = `<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1545 1165" style="height: 1.2em; width: auto; vertical-align: middle;"><path fill="#fff" d="m157 561l79-77 63-177 66-98 90-76 148-69 119-24 146 1 113 28 130 81 89 92 88 155 26 102 95 76 2 214 105 71-28 180-117 68-71 19-1081 3-163-111-35-161 129-97-26-44z"/><path fill="#2b8fe8" d="m101 801l-70 62 20 140 112 96 194 36 960 3 138-90 64-188-92-65-9 205-92 42-1141 17-104-81z"/><path fill="#000" d="m730 6c-69.8 5-144.3 25.4-206 56.6-37.3 18.8-71.1 40.8-105.8 68.7-42.5 34.2-82.5 78.8-118.4 132.1-18.4 27.2-38.8 65.4-53.2 99.6-13.6 32-28.4 80.3-35.4 115.5l-1.8 9-13 10c-7.2 5.5-20.9 16.3-30.5 24-9.6 7.8-21.4 17.2-26.4 21-4.9 3.8-9.3 7.1-9.8 7.5-0.4 0.3-1.8 8-3.2 17.1-1.3 9-4.7 31.9-7.5 50.9-6.2 41.7-12.1 82.7-15.1 105l-2.2 16.5 9.3 8.7c5.3 5 9 9.2 8.4 9.6-7.7 6.6-14.4 12-21.4 17.2-4.7 3.6-16.1 12.7-25.5 20.3-9.3 7.6-21 17.1-25.9 21-4.9 4-15.2 12.5-22.9 19-7.7 6.5-15.2 12.8-16.8 14-1.6 1.1-2.9 3-2.9 4.1 0 1.2 1.4 10.4 3 20.6 1.7 10.2 4.6 28.8 6.6 41.5 5 32.3 17.2 92.1 24.8 121.9 9.8 37.8 7.3 32.9 20.1 39.8 52.5 28.3 109.1 55.7 165 79.8 13.8 5.9 1091.2 2.9 1097.5 0.2 57.4-24.7 134.8-61.6 155.4-74 3.3-2.1 8.3-4.8 10.9-6.2 9.3-4.9 9.7-5.4 12.8-19.1 3.9-16.7 9.7-44.8 16-76.9 6-31 5.7-29 10.8-58.5 2.2-12.7 5.5-31.6 7.4-42 1.9-10.5 3.8-21.3 4.2-24l0.6-5-17.8-15.2c-9.8-8.3-32.2-27.2-49.9-42-17.6-14.7-33.9-28.4-36.2-30.3l-4.2-3.5-1-9.5c-0.5-5.2-1.4-26.8-2-48-0.5-21.2-1.2-44.6-1.5-52-0.3-7.4-0.7-26.3-1-42-0.3-15.7-0.8-34.4-1.1-41.6l-0.6-13.2-17.1-12.8c-9.5-7.1-25-19-34.7-26.5-9.6-7.4-23.1-17.8-30-23.1l-12.5-9.5-1.8-10.9c-8.7-51.6-34.8-122.8-64.1-174.9-2.5-4.4-4.9-8.7-5.3-9.5-2.5-5.1-27-42.5-34.7-53-16.7-22.5-38.8-47.9-60.3-69-22.9-22.7-29-28.1-46.8-41.9-54.4-42.3-103.3-68.7-167.3-90.5-33.6-11.4-72.7-20-114.7-25.2-15-1.8-85.2-2.8-104.5-1.4zm-101.7 76.4c-11.6 14.9-18 23.8-24.4 34l-7.6 12.1-27 13.5c-43.6 21.8-78 46-110.2 77.5l-17.7 17.3-12.4 2.6c-17.5 3.7-33.1 7.9-46 12.5-6 2.2-11 3.7-11 3.4 0-1.2 15.5-19.7 26.3-31.5 49.7-53.8 109.8-96.2 177.7-125.2 10.9-4.7 50-18.4 52.8-18.5 1-0.1 0.8 0.6-0.5 2.3zm311.8 5.7c20.9 6.9 34.8 12.8 59.9 25.4 57.7 29.1 107.2 66.9 150 114.6 10.6 11.7 22.6 26.9 21.3 26.9-0.4 0-5.3-1.6-10.8-3.6-14.4-5.1-28.1-8.9-43-11.9l-13-2.6-14-13.8c-7.7-7.5-16.8-16.3-20.3-19.4-14.4-13-50-38.1-70.9-50-9.2-5.3-34.6-17.9-43.8-21.8-5.6-2.4-6.4-3.1-10.4-10-7-11.8-19.8-30.4-24.9-36l-4.6-5.1 3.4 0.7c1.9 0.4 11.4 3.4 21.1 6.6zm13.9 67.4c24.8 10.9 62.2 34.1 87 54 13.2 10.5 43.8 39.8 47 45 2.3 3.8 6.4 28.1 8.5 50.4 1.7 18.5 1.9 47.5 0.5 62.6-1.5 15.7-3.1 28.1-3.9 29.3-0.4 0.6-8.1 3.2-17.1 5.7-25.8 7.2-51.8 14.9-72.5 21.5-10.4 3.3-27 8.5-36.7 11.6l-17.7 5.6-18.8-15.5c-25.1-20.6-34.4-27.8-57.9-44.8-24.5-17.6-35.7-24.9-64.1-41.8l-22.3-13.2v-68.5-68.5l4.3-1.8c8.8-3.8 41.7-15.1 55.5-19.1 29.3-8.4 65.2-16.4 87.2-19.3 3-0.3 9.5 1.8 21 6.8zm-325.5-4.5c21.8 3.6 45.5 9.2 72 17.2 19.8 6 53.5 17.9 57.1 20.2l2.4 1.6v67.9 67.9l-13.2 7.8c-48.2 28.2-84.1 53.5-127.6 89.6-11.8 9.8-22 17.8-22.7 17.8-0.7 0-11.3-3.2-23.6-7.2-48.4-15.4-57.5-18.2-87.3-26.8-17-4.9-31.3-9.3-31.7-9.7-1.3-1.3-3.7-21.5-4.9-41.9-1.5-25 1.2-69.3 5.5-92.2 1.7-8.9 3-10.6 20.2-27.2 22.6-21.8 49.5-42.6 75.8-58.5 11.1-6.7 38.9-21 48.8-25.1 9.7-4 12.8-4.1 29.2-1.4zm496.1 291.4c10.5 10.5 22.8 23.5 27.3 28.8l8.2 9.8h-40.5-40.5l-21.1 17.7c-11.7 9.8-22.2 18.5-23.4 19.3-1.1 0.8-2.5 2-2.9 2.7-0.4 0.7-1.3 1.3-1.9 1.3-0.6 0-2.3 1.3-3.7 2.9-2.9 3.2-25.5 23.1-31.3 27.4-3.5 2.7-3.7 3.2-4.2 10-0.3 4-1.1 31.3-1.7 60.7-0.6 29.4-1.2 55.1-1.3 57l-0.3 3.5-29.4 0.5c-16.2 0.3-31 0.4-32.9 0.2-3.2-0.4-4.3-1.5-12-12.3-13.9-19.5-17-24.2-17-25.8 0-0.9 2.3-7 5.1-13.6 16.8-39.5 35.7-93.4 49-140 4-13.8 7.6-25.6 8.2-26.3 1.6-2 83-27.9 128.2-40.7 11.6-3.3 15.4-4 17-3.2 1.1 0.5 10.5 9.6 21.1 20.1zm-671.8-18.8c35.1 10 118.6 36.1 132.9 41.6 2.9 1.1 3.3 1.8 5.3 9.7 3.1 12.7 13.6 48.8 18.2 63.1 7.7 23.8 18.1 50.8 37.7 98.3 2.3 5.5 3.8 10.4 3.4 11-0.3 0.7-6.5 9.2-13.6 19l-13 17.7-42.9-0.2-42.8-0.2v-3.1c0-3.1 4.9-47.1 7.5-67.5 0.8-6.3 2.6-21.6 3.9-34l2.5-22.5-5.8-6c-3.1-3.3-8.1-8.7-11.1-12-10.3-11.5-19.5-21.1-37.2-39.3l-17.8-18.2-35.3-0.1c-19.3 0-40.3 0-46.6 0.1-9.4 0.1-11.3-0.1-10.5-1.2 16.6-21.8 52.4-57.8 57.5-57.8 1.2 0 4.6 0.7 7.7 1.6zm-77.3 100.4h82l22.3 24 22.2 23.9-1.5 11.3c-0.8 6.2-4 30.9-7 54.8-10.8 84.8-11.9 92.2-14.1 93.6-6.7 4.5-45 32.7-45.2 33.3-0.2 0.6 20.4 19.1 36.1 32.2l2.8 2.4-2 15c-1.1 8.3-5.4 41.5-9.5 74-8.7 68.7-10 77.3-11.2 78.4-3.3 2.9-60.6 48.2-62.5 49.4-2.1 1.3-17.1 1.5-113.4 2l-111 0.6-24.4-25-24.3-24.9 5.6-35.3c7.2-45.4 12.1-75.4 14.5-89.2 1.1-6.1 3.1-18.7 4.6-28 1.4-9.4 2.9-17.3 3.3-17.6 0.4-0.3 11.4-8.6 24.6-18.5l23.8-17.8-7.3-7.1c-4.1-3.8-12.5-11.8-18.8-17.6l-11.4-10.5 1.2-8.5c1.2-8.4 6.3-42 14.6-96.4 2.4-16 5-32.9 5.6-37.7 1.4-10.3-1-7.7 26.9-29.4 31-24.2 40.3-31.1 42.5-31.8 1.1-0.3 12.6-0.3 25.5-0.1 12.9 0.3 60.4 0.5 105.5 0.5zm962.1 25.1c18.1 13.8 33.5 25.6 34.2 26.3 1.2 1.2 2.1 50.8 5.2 287.6 0.5 42.6 1.2 82.7 1.5 89.1l0.5 11.7-31.9 26.6-31.9 26.6h-114.9-114.8l-19-16.6c-10.4-9.2-24-21.1-30.1-26.5l-11-9.8 0.3-8.3c0.1-4.6 0.8-25 1.3-45.3 1.2-42 3.5-116.6 5-161 1.1-31.4 3.4-109.5 4.6-151.7l0.7-24.7 15.1-12.4c8.3-6.8 21.6-17.9 29.6-24.5l14.5-12.2h104.1 104.1zm-631.6 112.9c49 2 70.1 2.2 101 1.1 17.3-0.6 39.6-1.4 49.5-1.7l18-0.5 7.7 11.4c8.7 13.1 8.8 12.7-3.1 12.7-6 0-203.5-1-203.5-1h-9.9c-7.6 0-9.6-0.3-9.1-1.3 0.5-0.6 4.1-6 8.1-11.9l7.4-10.7 4.7 0.5c2.6 0.2 15.7 0.8 29.2 1.4zm211 67.2c0 3-5.8 77.6-6.6 85l-0.6 5.8h-160.4-160.4v-2.3c0-1.2 2-21.3 4.5-44.7 2.5-23.4 4.5-43.3 4.5-44.3 0-1.6 8.3-1.7 159.5-1.7h159.5zm539.2 119c20.7 14.8 32.5 23.5 33.2 24.6 0.6 0.9 0.4 3-3.4 35.2-1.1 9.6-2.9 25.4-4 35-2 16.7-6.3 41-8 43.9-0.4 0.8-1.2-1.3-1.9-5.5-6.8-38-11.6-63.3-15.7-82.4-4.3-20.2-8.6-38.2-11.9-49.8-1.8-6.1-3.1-11.2-2.9-11.2 0.2 0 6.8 4.6 14.6 10.2zm-1376.1 6.4c-3.8 11.3-13 56.1-16.3 78.6-1.7 12.6-3.5 22.8-3.9 22.8-0.8 0-1-1.8-4.8-32.5-3.8-30.6-5.4-48.1-4.8-49.8 0.7-1.9 30.8-26 31.5-25.3 0.2 0.2-0.6 3-1.7 6.2zm1208.4 220c45.7 0.4 82.3 0.9 81.5 1.1-0.8 0.3-10.9 3.5-22.5 7.3-11.5 3.8-25 8.1-29.9 9.5l-8.8 2.5h-84.8c-46.7 0-85.5 0.3-86.4 0.6-1.4 0.6-738.4 0.3-738.7 0-0.3-0.4-35.3-0.6-77.7-0.6h-77.1l-13.8-3.6c-13.1-3.3-30.3-8.3-47.8-13.8l-8-2.5 61.5-0.3c133-0.7 974.3-0.8 1052.5-0.2z"/><path fill="#000" d="m275.7 616.2c-0.3 1.3-3.1 19.4-6.2 40.3-3.1 20.9-6.2 41.7-6.9 46.2-0.7 4.6-1 8.5-0.8 8.8 0.3 0.3 26.5 0.5 58.3 0.5 54.1 0 57.8-0.1 58.3-1.8 0.5-1.5 2-12.3 10.2-71.7 1.3-9.9 2.7-19.5 3-21.3l0.6-3.2h-58-58z"/><path fill="#000" d="m269.5 805.7l-22.1 0.3-4.3 27.3c-2.4 14.9-5.6 36.4-7.2 47.7-1.5 11.3-3.5 24.5-4.3 29.4-0.9 4.9-1.6 9.7-1.6 10.7 0 1.8 1.4 1.9 32.3 1.8 17.7-0.1 44.6-0.4 59.7-0.8l27.5-0.6 1.2-9c0.7-5 4.2-30.3 7.8-56.3 3.6-26 6.5-48.1 6.5-49.2 0-2-0.7-2-36.7-1.8-20.3 0.2-46.7 0.4-58.8 0.5z"/><path fill="#000" d="m1140.6 633.2c-1.2 40.7-3.6 148.9-4.6 206.8-0.5 33.3-1.2 64.4-1.4 69.2l-0.5 8.8h67.5 67.4v-152-152h-63.9-63.9z"/></svg>`;
function formatScorers(scorersArr) {
  const counts = {};
  scorersArr.forEach(name => {
    counts[name] = (counts[name] || 0) + 1;
  });
  return Object.keys(counts).map(name => {
    return counts[name] > 1 ? `${name} (${counts[name]})` : name;
  }).join(', ');
}

// ═════ MATCH SIMULATION ══════════════════════════════
function playMatch(teamA, teamB, isUserMatch = false, phase = 0) {
  const overallA = teamA.overall / 100;
  const overallB = teamB.overall / 100;
  
  // Phase-based win probability for user team
  // phase: 0,1,2 = groups, 3 = round32, 4 = round16, 5 = quarters, 6 = semi, 7 = final
  let targetWinRate = null;
  if (isUserMatch && teamA.isUser) {
    const rating = teamA.overall;
    // Interpolação linear: Time mediano (80) = factor 0. Time forte (90) = factor 1.
    const factor = Math.max(0, Math.min(1, (rating - 80) / 10));
    
    if (phase <= 2) {
      // Grupos: 70% (média de 60-80) a 90%
      targetWinRate = 0.70 + factor * (0.90 - 0.70);
    } else if (phase === 3) {
      // 16 avos: 62% a 89% (média entre grupos e oitavas)
      targetWinRate = 0.62 + factor * (0.89 - 0.62);
    } else if (phase === 4) {
      // Oitavas: 54% a 88%
      targetWinRate = 0.54 + factor * (0.88 - 0.54);
    } else if (phase === 5) {
      // Quartas: 38% a 76%
      targetWinRate = 0.38 + factor * (0.76 - 0.38);
    } else if (phase === 6) {
      // Semifinal: 24% a 62%
      targetWinRate = 0.24 + factor * (0.62 - 0.24);
    } else {
      // Final: 12% a 46%
      targetWinRate = 0.12 + factor * (0.46 - 0.12);
    }
  }

  const totalExpectedGoals = 1.5 + Math.random() * 1.5; // Média mais realista de futebol (1.5 a 3.0)
  
  let shareA;
  if (targetWinRate !== null) {
    // Bias the goal share so user wins at roughly the target rate
    shareA = 0.40 + targetWinRate * 0.30; 
  } else {
    shareA = overallA / (overallA + overallB);
  }
  
  const expGoalsA = totalExpectedGoals * shareA;
  const expGoalsB = totalExpectedGoals * (1 - shareA);

  const poissonSample = (lambda) => {
    let L = Math.exp(-lambda), k = 0, p = 1;
    do { k++; p *= Math.random(); } while (p > L);
    return k - 1;
  };

  let goalsA = Math.min(poissonSample(expGoalsA), 6);
  let goalsB = Math.min(poissonSample(expGoalsB), 6);

  // Apply win probability correction for user matches without inflating scores
  if (targetWinRate !== null) {
    const roll = Math.random();
    if (roll < targetWinRate) {
      // User should win
      if (goalsA <= goalsB) {
        if (goalsB > goalsA) {
          let temp = goalsA; goalsA = goalsB; goalsB = temp; // Swap to keep total goals low
        }
        if (goalsA === goalsB) goalsA++; // Break tie
        if (Math.random() < 0.15) goalsA++; // Occasional extra goal
      }
    } else {
      // User should lose or draw
      if (goalsA > goalsB) {
        let temp = goalsA; goalsA = goalsB; goalsB = temp; // Swap to keep total goals low
      }
      if (goalsA === goalsB && Math.random() > 0.4) {
        goalsB++; // Break tie to make it a loss
        if (Math.random() < 0.15) goalsB++; // Occasional extra goal
      }
    }
  }

  const matchGoals = [];
  const usedMinutes = new Set();

  const getUniqueMinute = () => {
    let min;
    let attempts = 0;
    do {
      min = Math.floor(Math.random() * 88) + 2;
      attempts++;
      if (attempts > 100) break;
    } while (usedMinutes.has(min) || usedMinutes.has(min - 1) || usedMinutes.has(min + 1) || usedMinutes.has(min - 2) || usedMinutes.has(min + 2));
    usedMinutes.add(min);
    usedMinutes.add(min - 1);
    usedMinutes.add(min + 1);
    usedMinutes.add(min - 2);
    usedMinutes.add(min + 2);
    return min;
  };

  const getScorer = (squad) => {
    // Weighted probabilities: 
    // Atacante: 65%
    // Meia: 25%
    // Defensor: 10%
    const rand = Math.random() * 100;
    let targetType = 'atk';
    if (rand > 90) targetType = 'def';
    else if (rand > 65) targetType = 'mid';

    const atacantes = squad.filter(p => ['Centroavante', 'Ponta-direita', 'Ponta-esquerda', 'Atacante', 'Segundo Atacante'].includes(p.posicao) || ['CA', 'ATA', 'PE', 'PD'].includes(p.label));
    const meias = squad.filter(p => ['Meio-campista', 'Meia', 'Meia-direita', 'Meia-esquerda', 'Volante', 'Meia Ofensivo'].includes(p.posicao) || ['MC', 'MEI', 'MD', 'ME', 'VOL'].includes(p.label));
    const defensores = squad.filter(p => ['Zagueiro', 'Lateral-esquerdo', 'Lateral-direito', 'Líbero', 'Defensor'].includes(p.posicao) || ['ZAG', 'LE', 'LD'].includes(p.label));

    let pool = atacantes;
    if (targetType === 'def' && defensores.length > 0) pool = defensores;
    else if (targetType === 'mid' && meias.length > 0) pool = meias;

    // Se falhar, tenta pegar qualquer jogador de linha, excluindo o Goleiro
    if (!pool || pool.length === 0) {
      pool = squad.filter(p => p.posicao !== 'Goleiro' && p.posicao !== 'GK' && p.label !== 'GOL');
    }
    // Fallback extremo (caso o time por algum bug só tenha goleiro)
    if (!pool || pool.length === 0) {
      pool = squad;
    }

    pool.sort((a, b) => Number(b.rating) - Number(a.rating));
    const idx = Math.floor(Math.random() * Math.min(pool.length, 3));
    return pool[idx] || pool[0];
  };

  for (let i = 0; i < goalsA; i++) {
    const min = getUniqueMinute();
    const scorer = getScorer(teamA.squad);
    const name = (scorer?.nome || scorer?.name || 'Desconhecido').split(' ').pop();
    matchGoals.push({ min, name, team: 'A' });
  }

  for (let i = 0; i < goalsB; i++) {
    const min = getUniqueMinute();
    const scorer = getScorer(teamB.squad);
    const name = (scorer?.nome || scorer?.name || 'Desconhecido').split(' ').pop();
    matchGoals.push({ min, name, team: 'B' });
  }

  matchGoals.sort((a, b) => a.min - b.min);

  return { goalsA, goalsB, events: matchGoals, teamA, teamB };
}

function getLiveGroupTeams(currentMatchIndex, currentMinute) {
  const liveTeams = JSON.parse(JSON.stringify(state.simulation.groupTeams));

  const applyLiveMatch = (match, isLive, minute) => {
    let gA = 0, gB = 0;
    if (!isLive) {
      gA = match.goalsA;
      gB = match.goalsB;
    } else {
      gA = match.events.filter(e => e.team === 'A' && e.min <= minute).length;
      gB = match.events.filter(e => e.team === 'B' && e.min <= minute).length;
    }

    const tA = liveTeams.find(t => t.code === match.teamA.code);
    const tB = liveTeams.find(t => t.code === match.teamB.code);
    
    tA.gf += gA;
    tA.ga += gB;
    tA.gd = tA.gf - tA.ga;
    
    tB.gf += gB;
    tB.ga += gA;
    tB.gd = tB.gf - tB.ga;
    
    if (gA > gB) {
      tA.pts += 3; tA.won += 1; tB.lost += 1;
    } else if (gB > gA) {
      tB.pts += 3; tB.won += 1; tA.lost += 1;
    } else {
      tA.pts += 1; tB.pts += 1; tA.drawn += 1; tB.drawn += 1;
    }
  };

  applyLiveMatch(state.simulation.userMatches[currentMatchIndex], true, currentMinute);
  applyLiveMatch(state.simulation.oppMatches[currentMatchIndex], true, currentMinute);

  return liveTeams;
}

function simulateGroupStage() {
  let userRatingSum = 0;
  let userCount = 0;
  let legendCount = 0;
  if (typeof currentPlayers !== 'undefined') {
    currentPlayers.forEach(p => {
      if (p.name) {
        userRatingSum += (parseInt(p.rating) || 0);
        userCount++;
        if (p.lenda) legendCount++;
      }
    });
  }
  let userOverall = userCount > 0 ? Math.round(userRatingSum / userCount) : 50;
  
  // Vantagem para o time que tiver lenda(s)
  if (legendCount > 0) {
    userOverall += (legendCount * 3); // +3 pontos de overall por lenda
    if (userOverall > 99) userOverall = 99; // Máximo de 99
  }

  let availableTeams = typeof DATA !== 'undefined' ? [...DATA] : [];
  
  if (availableTeams.length < 3) return;

  const opponents = [];
  for (let i = 0; i < 3; i++) {
    const oppTeamIdx = Math.floor(Math.random() * availableTeams.length);
    const oppTeam = availableTeams[oppTeamIdx];
    const oppCup = oppTeam.copas[Math.floor(Math.random() * oppTeam.copas.length)];
    
    const oppTeamObj = {
      id: 'opp' + i,
      isUser: false,
      code: oppTeam.selecao,
      name: window.t(oppTeam.selecao),
      year: oppCup.ano,
      overall: parseInt(oppCup.rating_selecao) || 50,
      squad: oppCup.jogadores,
      pts: 0, gf: 0, ga: 0, gd: 0, won: 0, drawn: 0, lost: 0
    };
    opponents.push(oppTeamObj);
    availableTeams.splice(oppTeamIdx, 1);
  }

  const userTeam = {
    id: 'user',
    isUser: true,
    code: 'LENDAS',
    name: 'SUA SELEÇÃO',
    year: 'LENDAS',
    overall: userOverall,
    squad: typeof currentPlayers !== 'undefined' ? currentPlayers : [],
    pts: 0, gf: 0, ga: 0, gd: 0, won: 0, drawn: 0, lost: 0
  };

  const groupTeams = [userTeam, ...opponents];

  // Pre-calculate all matches
  // Round 1
  const m1User = playMatch(userTeam, opponents[0], true, 0);
  m1User.opponent = opponents[0];
  const m1Opp = playMatch(opponents[1], opponents[2], false);
  
  // Round 2
  const m2User = playMatch(userTeam, opponents[1], true, 1);
  m2User.opponent = opponents[1];
  const m2Opp = playMatch(opponents[0], opponents[2], false);
  
  // Round 3
  const m3User = playMatch(userTeam, opponents[2], true, 2);
  m3User.opponent = opponents[2];
  const m3Opp = playMatch(opponents[0], opponents[1], false);

  state.simulation = {
    active: true,
    phase: 0, // 0: Match 1, 1: Match 2, 2: Match 3
    groupTeams,
    userMatches: [m1User, m2User, m3User],
    oppMatches: [m1Opp, m2Opp, m3Opp]
  };

  // UI Setup
  const hideIds = ['initial-state', 'drawn-state', 'roll-next-state', 'complete-state', 'radar-state'];
  hideIds.forEach(id => document.getElementById(id)?.classList.add('hidden'));

  document.body.classList.add('simulation-active');
  const tournamentEl = document.getElementById('tournament-state');
  tournamentEl.classList.remove('hidden');

  const container = document.getElementById('group-stage-container');
  container.innerHTML = '';
  
  const koContainer = document.getElementById('knockout-stage-container');
  if (koContainer) koContainer.innerHTML = '';
  
  const nextBtn = document.getElementById('btn-next-game');
  if (nextBtn) nextBtn.style.display = 'none';

  const tableContainer = document.getElementById('group-table-container');
  if (tableContainer) {
    tableContainer.innerHTML = '';
    tableContainer.appendChild(renderGroupTable());
    tableContainer.style.display = 'block';
  }

  // Start Match 1
  animateMatch(0);
}
let matchInterval = null;

function renderGroupTable(liveTeams, showStatus = false) {
  try {
    const groupTeams = liveTeams || state.simulation.groupTeams;
    
    // Create a copy to sort
    const sortedTeams = [...groupTeams].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });

    const tableDiv = document.createElement('div');
    tableDiv.className = 't-group-standings';
    
    const classificacao = TRANSLATIONS[state.lang].tabela_classificacao || 'CLASSIFICAÇÃO';
    let tableHtml = `<div class="t-group-header" data-i18n="tabela_classificacao">${classificacao}</div>`;
    
    sortedTeams.forEach((team, tIdx) => {
      const pos = tIdx + 1;
      const isUser = team.isUser;
      const suaSelecao = TRANSLATIONS[state.lang].sua_selecao || 'SUA SELEÇÃO';
      const tName = isUser ? `<span data-i18n="sua_selecao">${suaSelecao}</span>` : getTranslatedCountry(team.name, state.lang);
      const tFlag = isUser ? getFlagsApiUrl(team.code) : getFlagsApiUrl(team.code);
      const rowClass = team.isUser ? 't-group-row user-team' : 't-group-row';
      const sign = team.gd > 0 ? '+' : '';
      
      tableHtml += `
        <div class="${rowClass}">
          <span class="t-group-pos">${pos}º</span>
          ${team.isUser
            ? `<span class="t-group-f7" style="display:flex;align-items:center;">
                 ${F7_LOGO_SVG}
               </span>`
            : `<img class="t-group-flag" src="${getFlagsApiUrl(team.code)}" alt="${team.name}">`
          }
          <span class="t-group-name">${tName}</span>
          <span class="t-group-pts">${team.pts} pts</span>
          <span class="t-group-gd">${sign}${team.gd}</span>
        </div>
      `;
    });

    if (showStatus) {
      const userPos = sortedTeams.findIndex(t => t.isUser) + 1;
      let statusClass = 't-status-eliminated';
      let statusText;
      const classificado = TRANSLATIONS[state.lang].classificado || 'CLASSIFICADO';
      const avancou = TRANSLATIONS[state.lang].avancou_de_fase || 'AVANÇOU DE FASE';
      const eliminado = TRANSLATIONS[state.lang].eliminado || 'ELIMINADO';
      
      if (userPos <= 2) {
        statusClass = 't-status-advance';
        statusText = `<span data-i18n="classificado">${classificado}</span> ${userPos}º ➔ <span data-i18n="avancou_de_fase">${avancou}</span>`;
      } else {
        statusText = `<span data-i18n="eliminado">${eliminado}</span> ${userPos}º`;
      }
      tableHtml += `<div class="t-classification-status ${statusClass}">${statusText}</div>`;
    }

    tableDiv.innerHTML = tableHtml;
    return tableDiv;
  } catch (e) {
    const errDiv = document.createElement('div');
    errDiv.innerHTML = 'ERROR IN TABLE: ' + e.message;
    return errDiv;
  }
}
function animateMatch(index) {
  if (matchInterval) clearTimeout(matchInterval);

  const container = document.getElementById('group-stage-container');
  const matchData = state.simulation.userMatches[index];
  const oppMatchData = state.simulation.oppMatches[index]; // The other match in this round
  
  const oppName = getTranslatedCountry(matchData.opponent.name, state.lang);
  const flagUrl = getFlagsApiUrl(matchData.opponent.code);
  
  const card = document.createElement('div');
  card.className = 'tournament-match-card active-match';
  card.id = `match-card-${index}`;

  // Header with progress bar
  const header = document.createElement('div');
  header.className = 't-match-header';
  header.innerHTML = `
    <div class="t-match-stage" data-i18n="fase_de_grupos">${TRANSLATIONS[state.lang].fase_de_grupos || 'FASE DE GRUPOS'}</div>
    <div class="t-match-opponent-info">
      <span class="t-group-f7">${F7_LOGO_SVG}</span>
      <span class="t-match-vs">vs</span>
      <img class="t-match-flag" src="${flagUrl}" alt="flag">
      <span class="t-match-opponent">${oppName} ${matchData.opponent.year}</span>
    </div>
    <div class="t-match-result">
      <span class="t-match-loading">
        <span class="square-dot"></span>
        <span class="square-dot"></span>
        <span class="square-dot"></span>
      </span>
      <span class="t-match-score" style="display:none;">0 - 0</span>
      <span class="t-match-timer" style="display:none;">0'</span>
      <span class="t-match-chevron">&#9662;</span>
    </div>
  `;
  
  const summary = document.createElement('div');
  summary.className = 't-match-summary';
  summary.textContent = 'Simulando...';

  const expanded = document.createElement('div');
  expanded.className = 't-match-expanded-content';
  
  const goalsList = document.createElement('div');
  goalsList.className = 't-match-goals-list';
  expanded.appendChild(goalsList);

  card.appendChild(header);
  card.appendChild(summary);
  card.appendChild(expanded);
  container.appendChild(card);

  header.addEventListener('click', () => {
    if (matchInterval) return;
    const isExpanded = card.classList.contains('expanded');
    document.querySelectorAll('.tournament-match-card').forEach(c => c.classList.remove('expanded'));
    if (!isExpanded) card.classList.add('expanded');
  });

  // Collapse any previously opened cards and auto expand the active match
  document.querySelectorAll('.tournament-match-card').forEach(c => c.classList.remove('expanded'));
  card.classList.add('expanded');

  // Pre-calculate injury times (random 1–6)
  const injuryTime1 = Math.floor(Math.random() * 4) + 1; // after 45'
  const injuryTime2 = Math.floor(Math.random() * 5) + 2; // after 90'

  // Total logical minutes = 45 + injuryTime1 + 45 + injuryTime2
  const totalMinutes = 45 + injuryTime1 + 45 + injuryTime2;
  // Match lasts 15 seconds → interval = 15000ms / totalMinutes
  let intervalMs = Math.round(15000 / totalMinutes);
  if (window.simulationSpeed === 2) intervalMs = Math.round(intervalMs * 0.66);
  else if (window.simulationSpeed === 3) intervalMs = Math.round(intervalMs * 0.33);

  let currentMinute = 0;
  let userGoals = 0;
  let oppGoals = 0;
  let goalIndex = 0;

  const scoreEl = header.querySelector('.t-match-score');
  const timerEl = header.querySelector('.t-match-timer');

  // Helper: convert logical minute to display string
  function getTimerDisplay(min) {
    if (min <= 45) return `${min}'`;
    if (min <= 45 + injuryTime1) return `45+${min - 45}'`;
    const secondHalfMin = min - 45 - injuryTime1;
    if (secondHalfMin <= 45) return `${secondHalfMin + 45}'`;
    return `90+${secondHalfMin - 45}'`;
  }

  let isHalfTime = false;

  setTimeout(() => {
    header.querySelector('.t-match-loading').style.display = 'none';
    scoreEl.style.display = 'inline';
    timerEl.style.display = 'inline';

    function step() {
      if (isHalfTime) {
        matchInterval = setTimeout(step, 100);
        return;
      }

      currentMinute += 1;

      if (currentMinute === 45 + injuryTime1) {
        isHalfTime = true;
        timerEl.textContent = 'INT';
        setTimeout(() => {
          isHalfTime = false;
        }, 1500);
      }

      while (goalIndex < matchData.events.length && matchData.events[goalIndex].min <= currentMinute) {
        const e = matchData.events[goalIndex];
        const isOpponent = e.team === 'B';
        
        if (isOpponent) oppGoals++; else userGoals++;
        
        const row = document.createElement('div');
        row.className = 't-goal-row' + (isOpponent ? ' opponent' : '');
        row.innerHTML = `
          <span class="t-goal-min">${e.min}'</span>
          <span class="t-goal-dot"></span>
          <span class="t-goal-name">${e.name}</span>
        `;
        goalsList.appendChild(row);
        goalIndex++;
      }

      const newScore = `${userGoals} - ${oppGoals}`;
      if (scoreEl.textContent !== newScore) {
        scoreEl.textContent = newScore;
        scoreEl.classList.remove('pulse-score');
        void scoreEl.offsetWidth; // Trigger reflow to restart animation
        scoreEl.classList.add('pulse-score');
      }
      if (!isHalfTime) {
        timerEl.textContent = getTimerDisplay(currentMinute);
      }

      const liveTeams = getLiveGroupTeams(index, currentMinute);
      const tableContainer = document.getElementById('group-table-container');
      if (tableContainer) {
        tableContainer.innerHTML = '';
        tableContainer.appendChild(renderGroupTable(liveTeams));
      }

      if (currentMinute >= totalMinutes) {
        clearTimeout(matchInterval);
        matchInterval = null;

        let resultClass = 'score-draw';
        let icon = '—';
        if (userGoals > oppGoals) {
          resultClass = 'score-win';
          icon = '✓';
        } else if (userGoals < oppGoals) {
          resultClass = 'score-loss';
          icon = '✗';
        }
        
        // Finish match UI
        timerEl.textContent = icon;
        timerEl.style.border = 'none';
        timerEl.style.background = 'none';
        timerEl.style.color = 'inherit';
        timerEl.style.fontSize = '16px';
        timerEl.style.fontWeight = 'bold';
        
        scoreEl.className = `t-match-score ${resultClass}`;
        if (resultClass === 'score-loss') {
          timerEl.style.color = '#E74C3C'; // Make the X red
        } else if (resultClass === 'score-win') {
          timerEl.style.color = '#27AE60'; // Make the ✓ green
        }

        card.classList.remove('active-match');
        if (userGoals > oppGoals) card.classList.add('win');
        else if (userGoals < oppGoals) card.classList.add('loss');
        else card.classList.add('draw');

        let summaryHTML = '';
        if (matchData.events.length > 0) {
          const userScorers = matchData.events.filter(e => e.team === 'A').map(e => e.name);
          const oppScorers = matchData.events.filter(e => e.team === 'B').map(e => e.name);
          const userStr = userScorers.length > 0 ? `<span class="t-summary-label" data-i18n="${userScorers.length === 1 ? 'gol_scored' : 'gols_scored'}">${userScorers.length === 1 ? (TRANSLATIONS[state.lang].gol_scored || 'GOL') : (TRANSLATIONS[state.lang].gols_scored || 'GOLS')}</span> <span class="t-summary-names">${formatScorers(userScorers)}</span>` : '';
          const oppStr = oppScorers.length > 0 ? `<span class="t-summary-label" data-i18n="sofreu_goals">${TRANSLATIONS[state.lang].sofreu_goals || 'SOFREU'}</span> <span class="t-summary-names">${formatScorers(oppScorers)}</span>` : '';
          summaryHTML = [userStr, oppStr].filter(s => s).join(' <span class="t-summary-dot">&#8226;</span> ');
        } else {
          summaryHTML = `<span class="t-summary-label" data-i18n="no_goals">${TRANSLATIONS[state.lang]['no_goals']}</span>`;
          goalsList.innerHTML = `<div style="padding-left:20px; font-size:13px; color:#A69C90;" data-i18n="no_goals_desc">${TRANSLATIONS[state.lang]['no_goals_desc']}</div>`;
        }
        summary.innerHTML = summaryHTML;

        // Update actual group state with results of this round permanently
        state.simulation.groupTeams = getLiveGroupTeams(index, 999);
        
        // Always collapse match card when finished
        card.classList.remove('expanded');

        const tableContainer = document.getElementById('group-table-container');
        if (tableContainer) {
          tableContainer.innerHTML = '';
          tableContainer.appendChild(renderGroupTable(null, index === 2));
          tableContainer.style.display = 'block';
        }

        const nextBtn = document.getElementById('btn-next-game');
        if (nextBtn) {
          nextBtn.style.display = 'block';
          let autoDelay = null;
          if (index === 2) {
            const sortedGroup = [...state.simulation.groupTeams].sort((a, b) => {
              if (b.pts !== a.pts) return b.pts - a.pts;
              if (b.gd !== a.gd) return b.gd - a.gd;
              return b.gf - a.gf;
            });
            const userPos = sortedGroup.findIndex(t => t.isUser) + 1;
            if (userPos <= 2) {
              nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game_knockout');
              nextBtn.querySelector('span').textContent = TRANSLATIONS[state.lang]['next_game_knockout'];
              const isAuto = document.getElementById('btn-mode-manual') && document.getElementById('btn-mode-manual').classList.contains('active');
              if (isAuto) autoDelay = 2500;
            } else {
              nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game_new');
              nextBtn.querySelector('span').textContent = TRANSLATIONS[state.lang]['next_game_new'];
              const userTeam = state.simulation.groupTeams.find(t => t.isUser);
              if (userTeam && !document.querySelector('.simulation-summary-banner')) {
                renderSummaryBanner(userTeam, 'eliminated');
                document.querySelector('.tournament-left-col').appendChild(nextBtn);
              }
            }
          } else {
            nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game');
            const isAuto = document.getElementById('btn-mode-manual') && document.getElementById('btn-mode-manual').classList.contains('active');
            if (isAuto) autoDelay = 1000;
          }
          // Chamada applyLanguage removida pois estava quebrando o script
          
          if (autoDelay !== null) {
            nextBtn.style.display = 'none';
            setTimeout(() => {
              nextBtn.click();
            }, autoDelay);
          }
        }
        return;
      }
      let currentIntervalMs = Math.round(15000 / totalMinutes);
      if (window.simulationSpeed === 2) currentIntervalMs = Math.round(currentIntervalMs * 0.66);
      else if (window.simulationSpeed === 3) currentIntervalMs = Math.round(currentIntervalMs * 0.33);
      
      matchInterval = setTimeout(step, currentIntervalMs);
    }
    step();
  }, 800); // 800ms loading delay
}

function renderSummaryBanner(userTeam, resultStatus) {
  const wins = userTeam.won;
  const draws = userTeam.drawn;
  const losses = userTeam.lost;
  
  const recordStr = `${wins} - ${losses}`;
  const vitoriasKey = wins === 1 ? 'wins_single' : 'wins_plural';
  const vitoriasLabel = TRANSLATIONS[state.lang][vitoriasKey];
  
  let statsHtml = `
    <div class="sim-stat">
      <span class="sim-stat-val">${userTeam.gf}</span>
      <span class="sim-stat-lbl" data-i18n="goals_for">${TRANSLATIONS[state.lang]['goals_for']}</span>
    </div>
    <div class="sim-stat">
      <span class="sim-stat-val">${userTeam.ga}</span>
      <span class="sim-stat-lbl" data-i18n="goals_against">${TRANSLATIONS[state.lang]['goals_against']}</span>
    </div>
    <div class="sim-stat">
      <span class="sim-stat-val">${wins}</span>
      <span class="sim-stat-lbl" data-i18n="${wins === 1 ? 'wins_single' : 'wins_plural'}">${wins === 1 ? TRANSLATIONS[state.lang]['wins_single'] : TRANSLATIONS[state.lang]['wins_plural']}</span>
    </div>
  `;
  
  if (draws > 0) {
    statsHtml += `
      <div class="sim-stat">
        <span class="sim-stat-val">${draws}</span>
        <span class="sim-stat-lbl" data-i18n="draws_label">${TRANSLATIONS[state.lang]['draws_label']}</span>
      </div>
    `;
  }

  if (losses > 0) {
    statsHtml += `
      <div class="sim-stat">
        <span class="sim-stat-val">${losses}</span>
        <span class="sim-stat-lbl" data-i18n="losses_label">${TRANSLATIONS[state.lang]['losses_label']}</span>
      </div>
    `;
  }
  
  const banner = document.createElement('div');
  banner.className = 'simulation-summary-banner';
  
  let badgeHtml = '';
  if (resultStatus === 'eliminated') {
    badgeHtml = `<div class="sim-summary-badge badge-eliminated" data-i18n="eliminated">${TRANSLATIONS[state.lang]['eliminated']}</div>`;
  } else if (resultStatus === 'champion') {
    badgeHtml = `<div class="sim-summary-badge badge-champion" data-i18n="next_game_champion">${TRANSLATIONS[state.lang]['next_game_champion']}</div>`;
  }

  banner.innerHTML = `
    <div class="sim-summary-left">
      <span class="sim-summary-record-large">${recordStr}</span>
    </div>
    <div class="sim-summary-divider"></div>
    <div class="sim-summary-right">
      <div class="sim-summary-title">${wins} <span data-i18n="${vitoriasKey}">${vitoriasLabel}</span></div>
      <div class="sim-summary-stats">
        ${statsHtml}
      </div>
    </div>
    ${badgeHtml}
  `;
  document.querySelector('.tournament-left-col').appendChild(banner);
}

function simulateKnockoutMatch() {
  const userTeam = state.simulation.groupTeams.find(t => t.isUser);
  
  const groupOppNames = state.simulation.groupTeams.map(t => t.name);
  let availableTeams = typeof DATA !== 'undefined' ? [...DATA] : [];
  availableTeams = availableTeams.filter(t => !groupOppNames.includes(t.selecao));
  
  if (availableTeams.length === 0) availableTeams = typeof DATA !== 'undefined' ? [...DATA] : [];

  const oppTeamRaw = availableTeams[Math.floor(Math.random() * availableTeams.length)];
  const randomCopa = oppTeamRaw.copas[Math.floor(Math.random() * oppTeamRaw.copas.length)];
  
  const oppTeam = {
    id: 'opp_ko',
    isUser: false,
    code: oppTeamRaw.selecao,
    name: window.t(oppTeamRaw.selecao),
    year: randomCopa.ano,
    overall: parseInt(randomCopa.rating_selecao) || 50,
    squad: randomCopa.jogadores
  };

  const matchData = playMatch(userTeam, oppTeam, true, state.simulation.phase);
  
  let pensUser = 0;
  let pensOpp = 0;
  let userWon = matchData.goalsA > matchData.goalsB;
  let penaltyKicks = null; // { regular: [], suddenDeath: [], pensUser, pensOpp }
  
  if (matchData.goalsA === matchData.goalsB) {
    // Build penalty kicker pools from squads (use last names)
    const getKickerName = (player) => {
      const name = player?.nome || player?.name || 'Jogador';
      const parts = name.split(' ');
      return parts[parts.length - 1].toUpperCase();
    };
    
    const userSquad = userTeam.squad && userTeam.squad.length > 0 ? userTeam.squad : [{ nome: 'Jogador 1' }, { nome: 'Jogador 2' }, { nome: 'Jogador 3' }, { nome: 'Jogador 4' }, { nome: 'Jogador 5' }];
    const oppSquadPen = oppTeam.squad && oppTeam.squad.length > 0 ? oppTeam.squad : [{ nome: 'Jogador 1' }, { nome: 'Jogador 2' }, { nome: 'Jogador 3' }, { nome: 'Jogador 4' }, { nome: 'Jogador 5' }];
    
    // Sort by rating for kicker order (best first)
    const userKickers = [...userSquad].sort((a, b) => 
      (Number(b?.rating) || 0) - (Number(a?.rating) || 0)
    );
    const oppKickers = [...oppSquadPen].sort((a, b) => 
      (Number(b?.rating) || 0) - (Number(a?.rating) || 0)
    );
    
    pensUser = 0;
    pensOpp = 0;
    const regularKicks = []; // { round, userKicker, userScored, oppKicker, oppScored }
    const suddenDeathKicks = [];
    
    // First 5 rounds
    let kickerIdxUser = 0;
    let kickerIdxOpp = 0;
    
    for (let i = 0; i < 5; i++) {
      const uScored = Math.random() < 0.75;
      if (uScored) pensUser++;
      const uName = getKickerName(userKickers[kickerIdxUser % userKickers.length]);
      kickerIdxUser++;
      
      // Check if mathematically decided after user kick
      const remainingOppShots = 5 - i - (regularKicks.length > 0 || i > 0 ? 0 : 0);
      
      const oScored = Math.random() < 0.75;
      if (oScored) pensOpp++;
      const oName = getKickerName(oppKickers[kickerIdxOpp % oppKickers.length]);
      kickerIdxOpp++;
      
      regularKicks.push({
        round: i + 1,
        userKicker: uName,
        userScored: uScored,
        oppKicker: oName,
        oppScored: oScored
      });
      
      // Check if mathematically impossible to catch up
      const remainingRounds = 4 - i;
      if (pensUser > pensOpp + remainingRounds || pensOpp > pensUser + remainingRounds) {
        break;
      }
    }
    
    // Sudden death if tied after 5
    while (pensUser === pensOpp) {
      const uScored = Math.random() < 0.75;
      if (uScored) pensUser++;
      const uName = getKickerName(userKickers[kickerIdxUser % userKickers.length]);
      kickerIdxUser++;
      
      const oScored = Math.random() < 0.75;
      if (oScored) pensOpp++;
      const oName = getKickerName(oppKickers[kickerIdxOpp % oppKickers.length]);
      kickerIdxOpp++;
      
      suddenDeathKicks.push({
        round: suddenDeathKicks.length + 1,
        userKicker: uName,
        userScored: uScored,
        oppKicker: oName,
        oppScored: oScored
      });
    }
    
    userWon = pensUser > pensOpp;
    penaltyKicks = { regular: regularKicks, suddenDeath: suddenDeathKicks, pensUser, pensOpp };
  }
  
  state.simulation.knockoutMatch = {
    ...matchData,
    opponent: oppTeam,
    pensUser,
    pensOpp,
    userWon,
    penaltyKicks
  };

  // Update user stats
  userTeam.gf += matchData.goalsA;
  userTeam.ga += matchData.goalsB;
  if (userWon) {
    userTeam.won += 1;
  } else {
    userTeam.lost += 1;
  }

  animateKnockoutMatch();
}

function animateKnockoutMatch() {
  const container = document.getElementById('knockout-stage-container');
  // Collapse any previous knockout match cards
  container.querySelectorAll('.tournament-match-card').forEach(c => c.classList.remove('expanded'));
  
  const matchData = state.simulation.knockoutMatch;
  const oppName = getTranslatedCountry(matchData.opponent.name, state.lang);
  const flagUrl = getFlagsApiUrl(matchData.opponent.code);

  // No separate phaseHeader anymore
  
  const card = document.createElement('div');
  card.className = 'tournament-match-card active-match';
  if (state.simulation.phase === 7) {
    card.classList.add('final-match');
  }
  
  const header = document.createElement('div');
  header.className = 't-match-header';
  header.innerHTML = `
    <div class="t-match-stage" data-i18n="${state.simulation.knockoutPhaseLabel}">${TRANSLATIONS[state.lang][state.simulation.knockoutPhaseLabel]}</div>
    <div class="t-match-opponent-info">
      <span class="t-group-f7">${F7_LOGO_SVG}</span>
      <span class="t-match-vs">vs</span>
      <img class="t-match-flag" src="${flagUrl}" alt="flag">
      <span class="t-match-opponent">${oppName} ${matchData.opponent.year}</span>
    </div>
    <div class="t-match-result">
      <span class="t-match-loading">
        <span class="square-dot"></span>
        <span class="square-dot"></span>
        <span class="square-dot"></span>
      </span>
      <span class="t-match-score" style="display:none;">0 - 0</span>
      <span class="t-match-timer" style="display:none;">0'</span>
      <span class="t-match-chevron">&#9662;</span>
    </div>
  `;
  
  const summary = document.createElement('div');
  summary.className = 't-match-summary';
  summary.textContent = 'Simulando...';

  const expanded = document.createElement('div');
  expanded.className = 't-match-expanded-content';
  const goalsList = document.createElement('div');
  goalsList.className = 't-match-goals-list';
  expanded.appendChild(goalsList);

  card.appendChild(header);
  card.appendChild(summary);
  card.appendChild(expanded);
  container.appendChild(card);

  card.classList.add('expanded');
  
  header.addEventListener('click', () => {
    if (!card.classList.contains('active-match') && !document.querySelector('.tournament-match-card.active-match')) {
      card.classList.toggle('expanded');
    }
  });

  const timerEl = header.querySelector('.t-match-timer');
  const scoreEl = header.querySelector('.t-match-score');
  
  const totalMinutes = 90;
  const injuryTime1 = Math.floor(Math.random() * 4) + 1;
  const injuryTime2 = Math.floor(Math.random() * 6) + 2;
  let currentMinute = 0;
  let isHalfTime = false;
  let goalIndex = 0;
  
  const userScorers = [];
  const oppScorers = [];

  const getTimerDisplay = (min) => {
    if (min <= 45) return `${min}'`;
    if (min <= 45 + injuryTime1) return `45+${min - 45}'`;
    if (min <= 90 + injuryTime1) return `${min - injuryTime1}'`;
    return `90+${min - 90 - injuryTime1}'`;
  };

  const getLogDisplay = (min) => {
    if (min <= 45) return `${min}'`;
    if (min <= 45 + injuryTime1) return `45+${min - 45}'`;
    let m2 = min - injuryTime1;
    if (m2 <= 90) return `${m2}'`;
    return `90+${m2 - 90}'`;
  };

  if (matchInterval) clearTimeout(matchInterval);

  setTimeout(() => {
    header.querySelector('.t-match-loading').style.display = 'none';
    scoreEl.style.display = 'inline';
    timerEl.style.display = 'inline';

    function step() {
      if (isHalfTime) {
        matchInterval = setTimeout(step, 100);
        return;
      }
      
      currentMinute++;

      if (currentMinute === 45 + injuryTime1) {
        isHalfTime = true;
        timerEl.textContent = 'INT';
        setTimeout(() => {
          isHalfTime = false;
        }, 1500);
      }
      
      if (currentMinute <= totalMinutes + injuryTime1 + injuryTime2) {
        let hasEvent = false;
        
        while (goalIndex < matchData.events.length && matchData.events[goalIndex].min <= currentMinute) {
          hasEvent = true;
          const ev = matchData.events[goalIndex];
          const displayMin = getLogDisplay(ev.min);
          const row = document.createElement('div');
          const isOpponent = ev.team === 'B';
          row.className = 't-goal-row' + (isOpponent ? ' opponent' : '');
          row.innerHTML = `
            <span class="t-goal-min">${displayMin}</span>
            <span class="t-goal-dot"></span>
            <span class="t-goal-name">${ev.name}</span>
          `;
          if (ev.team === 'A') {
            userScorers.push(ev.name);
          } else {
            oppScorers.push(ev.name);
          }
          goalsList.appendChild(row);
          goalIndex++;
        }

        if (hasEvent) {
          scoreEl.innerHTML = `${userScorers.length} - ${oppScorers.length}`;
          const userStr = userScorers.length > 0 ? `<span class="t-summary-label" data-i18n="${userScorers.length === 1 ? 'gol_scored' : 'gols_scored'}">${userScorers.length === 1 ? (TRANSLATIONS[state.lang].gol_scored || 'GOL') : (TRANSLATIONS[state.lang].gols_scored || 'GOLS')}</span> <span class="t-summary-names">${formatScorers(userScorers)}</span>` : '';
          const oppStr = oppScorers.length > 0 ? `<span class="t-summary-label" data-i18n="sofreu_goals">${TRANSLATIONS[state.lang].sofreu_goals || 'SOFREU'}</span> <span class="t-summary-names">${formatScorers(oppScorers)}</span>` : '';
          summary.innerHTML = [userStr, oppStr].filter(s => s).join(' <span class="t-summary-dot">&#8226;</span> ');
        }
        
        if (!isHalfTime) {
          timerEl.textContent = getTimerDisplay(currentMinute);
        }

      } else {
        clearTimeout(matchInterval);
        timerEl.textContent = matchData.userWon ? '✓' : '✗';
        timerEl.removeAttribute('data-i18n');
        timerEl.style.border = 'none';
        timerEl.style.background = 'none';
        timerEl.style.fontSize = '16px';
        timerEl.style.fontWeight = 'bold';
        
        card.classList.remove('active-match');
        if (matchData.userWon) {
          card.classList.add('win');
          timerEl.style.color = '#27AE60';
          scoreEl.style.color = '#27AE60';
        } else {
          card.classList.add('loss');
          timerEl.style.color = '#E74C3C';
          scoreEl.style.color = '#E74C3C';
        }


        let summaryHTML = summary.innerHTML;
        if (matchData.events.length === 0) {
          summaryHTML = `<span class="t-summary-label" data-i18n="no_goals">${TRANSLATIONS[state.lang]["no_goals"]}</span>`;
          goalsList.innerHTML = `<div style="padding-left:20px; font-size:13px; color:#A69C90;" data-i18n="no_goals_desc">${TRANSLATIONS[state.lang]["no_goals_desc"]}</div>`;
        }
        summary.innerHTML = summaryHTML;
        
        if (matchData.goalsA === matchData.goalsB && matchData.penaltyKicks) {
          // Reset colors during shootout
          scoreEl.style.color = '';
          timerEl.style.color = '';
          timerEl.textContent = 'P'; // Or hide it? Wait, let's just leave it empty or default
          card.classList.remove('win', 'loss');

          const penText = TRANSLATIONS[state.lang]["pen_indicator"];
          const penIndicatorFinal = matchData.userWon 
            ? `<span style="color:#27AE60;"> <span data-i18n="pen_indicator">${penText}</span> (${matchData.penaltyKicks.pensUser} - ${matchData.penaltyKicks.pensOpp})</span>` 
            : `<span style="color:#E74C3C;"> <span data-i18n="pen_indicator">${penText}</span> (${matchData.penaltyKicks.pensUser} - ${matchData.penaltyKicks.pensOpp})</span>`;
          
          // During shootout show only the score and PENALTIES in default color
          timerEl.textContent = '...';
          scoreEl.innerHTML = `${matchData.goalsA} - ${matchData.goalsB} <span> <span data-i18n="pen_indicator">${penText}</span></span>`;
          
          const pk = matchData.penaltyKicks;
          const penBox = document.createElement('div');
          penBox.className = 'penalty-shootout-box';
          
          const titleDiv = document.createElement('div');
          titleDiv.className = 'pen-title';
          titleDiv.innerHTML = `<span data-i18n="penalties_best_of_5">${TRANSLATIONS[state.lang]["penalties_best_of_5"] || "penalties_best_of_5"}</span>`;
          penBox.appendChild(titleDiv);
          
          const kicksGrid = document.createElement('div');
          kicksGrid.className = 'pen-kicks-grid';
          penBox.appendChild(kicksGrid);
          
          expanded.appendChild(penBox);

          // Hide next button during shootout simulation
          const nextBtn = document.getElementById('btn-next-game');
          if (nextBtn) nextBtn.style.display = 'none';

          // Prepare animation steps
          const steps = [];
          
          pk.regular.forEach(kick => {
            let row;
            steps.push({
              run: () => {
                row = document.createElement('div');
                row.className = 'pen-kick-row';
                row.innerHTML = `
                  <div class="pen-kick-user">
                    <span class="pen-icon ${kick.userScored ? 'scored' : 'missed'}"></span>
                    <span class="pen-kicker-name">${kick.userKicker}</span>
                  </div>
                  <div class="pen-kick-opp" style="visibility: hidden;"></div>
                `;
                kicksGrid.appendChild(row);
              }
            });
            steps.push({
              run: () => {
                const oppDiv = row.querySelector('.pen-kick-opp');
                oppDiv.style.visibility = 'visible';
                oppDiv.innerHTML = `
                  <span class="pen-kicker-name">${kick.oppKicker}</span>
                  <span class="pen-icon ${kick.oppScored ? 'scored' : 'missed'}"></span>
                `;
              }
            });
          });

          let sdTitle = null;
          let sdGrid = null;

          if (pk.suddenDeath && pk.suddenDeath.length > 0) {
            steps.push({
              run: () => {
                sdTitle = document.createElement('div');
                sdTitle.className = 'pen-title pen-sd-title';
                sdTitle.innerHTML = `<span data-i18n="penalties_sudden_death">${TRANSLATIONS[state.lang]["penalties_sudden_death"] || "penalties_sudden_death"}</span>`;
                penBox.appendChild(sdTitle);
                
                sdGrid = document.createElement('div');
                sdGrid.className = 'pen-kicks-grid';
                penBox.appendChild(sdGrid);
              }
            });

            pk.suddenDeath.forEach(kick => {
              let row;
              steps.push({
                run: () => {
                  row = document.createElement('div');
                  row.className = 'pen-kick-row';
                  row.innerHTML = `
                    <div class="pen-kick-user">
                      <span class="pen-icon ${kick.userScored ? 'scored' : 'missed'}"></span>
                      <span class="pen-kicker-name">${kick.userKicker}</span>
                    </div>
                    <div class="pen-kick-opp" style="visibility: hidden;"></div>
                  `;
                  sdGrid.appendChild(row);
                }
              });
              steps.push({
                run: () => {
                  const oppDiv = row.querySelector('.pen-kick-opp');
                  oppDiv.style.visibility = 'visible';
                  oppDiv.innerHTML = `
                    <span class="pen-kicker-name">${kick.oppKicker}</span>
                    <span class="pen-icon ${kick.oppScored ? 'scored' : 'missed'}"></span>
                  `;
                }
              });
            });
          }

          steps.push({
            run: () => {
              const resultDiv = document.createElement('div');
              resultDiv.className = 'pen-result ' + (matchData.userWon ? 'pen-win' : 'pen-loss');
              const resultLabel = matchData.userWon ? "advanced" : "eliminated";
              const resultKey = matchData.userWon ? 'advanced' : 'eliminated';
              resultDiv.innerHTML = `${pk.pensUser}-${pk.pensOpp} - <span data-i18n="${resultKey}">${TRANSLATIONS[state.lang][resultKey] || resultLabel}</span>`;
              penBox.appendChild(resultDiv);
              
              // Show pen result in the header after shootout
              scoreEl.innerHTML = `${matchData.goalsA} - ${matchData.goalsB}${penIndicatorFinal}`;
              scoreEl.style.color = matchData.userWon ? '#27AE60' : '#E74C3C';
              timerEl.style.color = matchData.userWon ? '#27AE60' : '#E74C3C';
              timerEl.textContent = matchData.userWon ? '✓' : '✗';
              if (matchData.userWon) card.classList.add('win');
              else card.classList.add('loss');
              
              showNextBtnKnockout(matchData);
            }
          });

          let stepIdx = 0;
          const interval = setInterval(() => {
            if (stepIdx < steps.length) {
              steps[stepIdx].run();
              stepIdx++;
            } else {
              clearInterval(interval);
            }
          }, 1000);
          return;

        } else {
          showNextBtnKnockout(matchData);
          return;
        }
      }
      let currentIntervalMs = 20000 / totalMinutes;
      if (window.simulationSpeed === 2) currentIntervalMs = currentIntervalMs * 0.66;
      else if (window.simulationSpeed === 3) currentIntervalMs = currentIntervalMs * 0.33;
      
      matchInterval = setTimeout(step, currentIntervalMs);
    }
    step();
  }, 800); // loading delay
}

function showNextBtnKnockout(matchData) {
  const nextBtn = document.getElementById('btn-next-game');
  if (nextBtn) {
    nextBtn.style.display = 'block';
    let autoDelay = null;
    if (matchData.userWon) {
      if (state.simulation.phase < 7) {
        nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game_next_phase');
        nextBtn.querySelector('span').textContent = TRANSLATIONS[state.lang]['next_game_next_phase'];
        const isAuto = document.getElementById('btn-mode-manual') && document.getElementById('btn-mode-manual').classList.contains('active');
        if (isAuto) autoDelay = 1500;
      } else {
        nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game_champion');
        nextBtn.querySelector('span').textContent = TRANSLATIONS[state.lang]['next_game_champion'];
        const userTeam = state.simulation.groupTeams.find(t => t.isUser);
        renderSummaryBanner(userTeam, 'champion');
        document.querySelector('.tournament-left-col').appendChild(nextBtn);
        document.querySelectorAll('.tournament-match-card.expanded').forEach(c => c.classList.remove('expanded'));
      }
    } else {
      nextBtn.querySelector('span').setAttribute('data-i18n', 'next_game_eliminated');
      nextBtn.querySelector('span').textContent = TRANSLATIONS[state.lang]['next_game_eliminated'];
      const userTeam = state.simulation.groupTeams.find(t => t.isUser);
      renderSummaryBanner(userTeam, 'eliminated');
      document.querySelector('.tournament-left-col').appendChild(nextBtn);
      document.querySelectorAll('.tournament-match-card.expanded').forEach(c => c.classList.remove('expanded'));
    }
    
    if (autoDelay !== null) {
      nextBtn.style.display = 'none';
      setTimeout(() => {
        nextBtn.click();
      }, autoDelay);
    }
  }
}

// â•â•â• COUNTRY TRANSLATIONS & FLAGS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const COUNTRY_TRANSLATIONS = {
  'Angola': 'Angola', 'Argentina': 'Argentina', 'Australia': 'AustrÃ¡lia', 'Austria': 'Ãustria',
  'Belgium': 'BÃ©lgica', 'Bulgaria': 'BulgÃ¡ria', 'Bosnia and Herzegovina': 'BÃ³snia e Herc.',
  'Bolivia': 'BolÃ­via', 'Brazil': 'Brasil', 'Canada': 'CanadÃ¡', 'Switzerland': 'SuÃ­Ã§a',
  'Chile': 'Chile', 'China': 'China', 'Ivory Coast': 'Costa do Marfim', 'Cameroon': 'CamarÃµes',
  'Zaire': 'Zaire', 'Colombia': 'ColÃ´mbia', 'Costa Rica': 'Costa Rica', 'Czechoslovakia': 'TchecoslovÃ¡quia',
  'Cuba': 'Cuba', 'Czech Republic': 'RepÃºblica Tcheca', 'East Germany': 'Alemanha Oriental',
  'Germany': 'Alemanha', 'West Germany': 'Alemanha Ocidental', 'Denmark': 'Dinamarca',
  'Algeria': 'ArgÃ©lia', 'Ecuador': 'Equador', 'Egypt': 'Egito', 'England': 'Inglaterra',
  'Spain': 'Espanha', 'France': 'FranÃ§a', 'Ghana': 'Gana', 'Equatorial Guinea': 'GuinÃ© Equatorial',
  'Greece': 'GrÃ©cia', 'Honduras': 'Honduras', 'Croatia': 'CroÃ¡cia', 'Haiti': 'Haiti',
  'Hungary': 'Hungria', 'Dutch East Indies': 'IndonÃ©sias Holandesas', 'Republic of Ireland': 'Irlanda',
  'Iran': 'IrÃ£', 'Iraq': 'Iraque', 'Iceland': 'IslÃ¢ndia', 'Israel': 'Israel', 'Italy': 'ItÃ¡lia',
  'Jamaica': 'Jamaica', 'Japan': 'JapÃ£o', 'South Korea': 'Coreia do Sul', 'Kuwait': 'Kuwait',
  'Morocco': 'Marrocos', 'Mexico': 'MÃ©xico', 'Nigeria': 'NigÃ©ria', 'Northern Ireland': 'Irlanda do Norte',
  'Netherlands': 'Holanda', 'Norway': 'Noruega', 'New Zealand': 'Nova ZelÃ¢ndia', 'Panama': 'PanamÃ¡',
  'Peru': 'Peru', 'Poland': 'PolÃ´nia', 'North Korea': 'Coreia do Norte', 'Portugal': 'Portugal',
  'Paraguay': 'Paraguai', 'Qatar': 'Catar', 'Romania': 'RomÃªnia', 'Russia': 'RÃºssia',
  'Saudi Arabia': 'ArÃ¡bia Saudita', 'Serbia and Montenegro': 'SÃ©rvia e Montenegro',
  'Scotland': 'EscÃ³cia', 'Senegal': 'Senegal', 'El Salvador': 'El Salvador', 'Serbia': 'SÃ©rvia',
  'Soviet Union': 'UniÃ£o SoviÃ©tica', 'Slovakia': 'EslovÃ¡quia', 'Slovenia': 'EslovÃªnia',
  'Sweden': 'SuÃ©cia', 'Togo': 'Togo', 'Thailand': 'TailÃ¢ndia', 'Trinidad and Tobago': 'Trinidad e Tobago',
  'Tunisia': 'TunÃ­sia', 'Turkey': 'Turquia', 'Chinese Taipei': 'TaipÃ© Chinesa', 'Ukraine': 'UcrÃ¢nia',
  'Uruguay': 'Uruguai', 'United States': 'Estados Unidos', 'Wales': 'PaÃ­s de Gales',
  'Yugoslavia': 'IugoslÃ¡via', 'South Africa': 'Ãfrica do Sul'
};


function getFlagsApiUrl(teamCode) {
  if (teamCode === 'LENDAS') return 'https://flagcdn.com/w160/un.png'; // Example placeholder
  const cc = getCountryCodes ? getCountryCodes(teamCode) : { flagCode: 'un' };
  return `https://flagcdn.com/w160/${cc.flagCode}.png`;
}



function getTranslatedCountry(countryName, lang) {
  return window.t ? window.t(countryName) : countryName;
}


// Helpers for biased random selection (75% probability for year >= 2000)
function getBiasedRandomTeam(teams) {
  const post2000Teams = teams.filter(t => t.years.some(y => y >= 2000));
  const pre2000Teams = teams.filter(t => !t.years.some(y => y >= 2000));
  
  if (post2000Teams.length > 0 && pre2000Teams.length > 0) {
    if (Math.random() < 0.75) {
      return post2000Teams[Math.floor(Math.random() * post2000Teams.length)];
    } else {
      return pre2000Teams[Math.floor(Math.random() * pre2000Teams.length)];
    }
  }
  return teams[Math.floor(Math.random() * teams.length)];
}

function getBiasedRandomYear(years) {
  const post2000 = years.filter(y => y >= 2000);
  const pre2000 = years.filter(y => y < 2000);
  
  if (post2000.length > 0 && pre2000.length > 0) {
    if (Math.random() < 0.75) {
      return post2000[Math.floor(Math.random() * post2000.length)];
    } else {
      return pre2000[Math.floor(Math.random() * pre2000.length)];
    }
  }
  return years[Math.floor(Math.random() * years.length)];
}

// â•â•â• ROLL & DRAWN STATE LOGIC â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function performRoll(newTeam = true, newYear = true) {
  if (state.drawnState.rollsLeft <= 0 && state.drawnState.active) return;
  
  // Disable buttons during draw animation
  const btnRoll = document.getElementById('btn-roll');
  const btnTeam = document.getElementById('btn-reroll-team');
  const btnYear = document.getElementById('btn-reroll-year');
  
  if (btnRoll) btnRoll.disabled = true;
  if (btnTeam) btnTeam.disabled = true;
  if (btnYear) btnYear.disabled = true;

  const isFirstRoll = !state.drawnState.active;

  if (state.drawnState.active) {
    state.drawnState.rollsLeft--;
  } else {
    state.drawnState.active = true;
    // Don't reset rollsLeft! It's persistent across the draft phase
  }

  // Pre-reveal drawn state panel (so the user sees the raffle spinning)
  document.getElementById('initial-state').classList.add('hidden');
  document.getElementById('drawn-state').classList.remove('hidden');
  document.getElementById('radar-state')?.classList.add('hidden'); // Hide radar during spin

  // Hide reroll controls and player list ONLY on the very first roll
  const rerollCtrlEl = document.querySelector('.reroll-controls');
  const playerSelEl = document.querySelector('.player-selection');
  console.log("performRoll starting: rollsLeft =", state.drawnState.rollsLeft, "isFirstRoll =", isFirstRoll);
  if (isFirstRoll) {
    if (rerollCtrlEl) {
      rerollCtrlEl.classList.add('hidden');
      rerollCtrlEl.style.display = 'none';
    }
    if (playerSelEl) {
      playerSelEl.classList.add('hidden');
      playerSelEl.style.display = 'none';
    }
  }

  // Determine final targets
  let finalTeamCode, finalTeamName, finalYear;

  if (newTeam) {
    const slots = getTacticalSlots(state.formation, state.style);
    const vacantPositions = slots.filter((slot, idx) => state.players[idx] === null).map(slot => slot.pos);

    let prioritizedTeams = state.uniqueTeams;
    if (vacantPositions.length > 0 && vacantPositions.length < 11) {
      const validTeamsAndYears = state.ratingsData.filter(p => {
        const playerPositions = getPlayerPositions(p);
        return playerPositions.some(pos => vacantPositions.includes(pos));
      });
      
      const matchingTeamCodes = new Set(validTeamsAndYears.map(p => p.team_code));
      if (matchingTeamCodes.size > 0) {
        prioritizedTeams = state.uniqueTeams.filter(t => matchingTeamCodes.has(t.code));
      }
    }

    const selectedTeam = getBiasedRandomTeam(prioritizedTeams);
    finalTeamCode = selectedTeam.code;
    finalTeamName = selectedTeam.name;
    
    if (newYear) {
      const matchingYears = state.ratingsData.filter(p => {
        if (p.team_code !== selectedTeam.code) return false;
        const playerPositions = getPlayerPositions(p);
        return playerPositions.some(pos => vacantPositions.includes(pos));
      }).map(p => p.tournament_year);
      
      const uniqueMatchingYears = Array.from(new Set(matchingYears));
      if (uniqueMatchingYears.length > 0) {
        finalYear = getBiasedRandomYear(uniqueMatchingYears);
      } else {
        finalYear = getBiasedRandomYear(selectedTeam.years);
      }
    }
  } else {
    finalTeamCode = state.drawnState.teamCode;
    finalTeamName = state.drawnState.teamName;
    if (newYear) {
      const currentTeamData = state.uniqueTeams.find(t => t.code === finalTeamCode);
      const slots = getTacticalSlots(state.formation, state.style);
      const vacantPositions = slots.filter((slot, idx) => state.players[idx] === null).map(slot => slot.pos);
      
      const matchingYears = state.ratingsData.filter(p => {
        if (p.team_code !== finalTeamCode) return false;
        const playerPositions = getPlayerPositions(p);
        return playerPositions.some(pos => vacantPositions.includes(pos));
      }).map(p => p.tournament_year);
      
      const uniqueMatchingYears = Array.from(new Set(matchingYears));
      if (uniqueMatchingYears.length > 0) {
        finalYear = getBiasedRandomYear(uniqueMatchingYears);
      } else {
        finalYear = getBiasedRandomYear(currentTeamData.years);
      }
    }
  }

  // RAFFLE ANIMATION
  let duration = 1200; // total duration in ms
  let intervalTime = 60; // initial speed
  let elapsed = 0;
  
  const tempSquads = state.uniqueTeams;
  
  const timer = setInterval(() => {
    elapsed += intervalTime;
    
    // Pick random items to display during the raffle
    if (newTeam) {
      const randT = tempSquads[Math.floor(Math.random() * tempSquads.length)];
      const randY = randT.years[Math.floor(Math.random() * randT.years.length)];
      
      document.getElementById('drawn-flag').src = getFlagsApiUrl(randT.code);
      document.getElementById('drawn-country').textContent = getTranslatedCountry(randT.name, state.lang);
      document.getElementById('drawn-year').textContent = getTranslatedYear(randY, state.lang);
    } else {
      // Just raffle years
      const currentTeamData = tempSquads.find(t => t.code === finalTeamCode);
      const randY = currentTeamData.years[Math.floor(Math.random() * currentTeamData.years.length)];
      document.getElementById('drawn-year').textContent = getTranslatedYear(randY, state.lang);
    }
    
    // Gradual deceleration
    if (elapsed > duration * 0.7) {
      clearInterval(timer);
      // Run a few slower steps to simulate stopping
      setTimeout(() => {
        // Slow step 1
        if (newTeam) {
          const randT = tempSquads[Math.floor(Math.random() * tempSquads.length)];
          const randY = randT.years[Math.floor(Math.random() * randT.years.length)];
          document.getElementById('drawn-flag').src = getFlagsApiUrl(randT.code);
          document.getElementById('drawn-country').textContent = getTranslatedCountry(randT.name, state.lang);
          document.getElementById('drawn-year').textContent = getTranslatedYear(randY, state.lang);
        }
        
        setTimeout(() => {
          // Final landing
          state.drawnState.teamCode = finalTeamCode;
          state.drawnState.teamName = finalTeamName;
          state.drawnState.year = finalYear;
          
          renderDrawnState();
          renderPlayerList(true);

          // Show reroll controls and player selection after landing
          if (rerollCtrlEl) {
            rerollCtrlEl.classList.remove('hidden');
            rerollCtrlEl.style.display = '';
          }
          if (playerSelEl) {
            playerSelEl.classList.remove('hidden');
            playerSelEl.style.display = '';
          }
          
          // Re-enable controls
          if (btnRoll) btnRoll.disabled = false;
        }, 200);
      }, 150);
    }
  }, intervalTime);
}

function renderDrawnState() {
  document.getElementById('initial-state').classList.add('hidden');
  document.getElementById('drawn-state').classList.remove('hidden');

  // Update card
  document.getElementById('drawn-flag').src = getFlagsApiUrl(state.drawnState.teamCode);
  const countryEl = document.getElementById('drawn-country');
  const countryName = getTranslatedCountry(state.drawnState.teamName, state.lang);
  countryEl.textContent = countryName;
  
  // Auto-shrink font for long country names
  if (countryName.length > 14) {
    countryEl.style.fontSize = '24px';
  } else if (countryName.length > 10) {
    countryEl.style.fontSize = '30px';
  } else {
    countryEl.style.fontSize = '38px';
  }
  
  document.getElementById('drawn-year').textContent = getTranslatedYear(state.drawnState.year, state.lang);

  // Update re-roll controls
  document.getElementById('rerolls-left').textContent = state.drawnState.rollsLeft;
  
  const btnTeam = document.getElementById('btn-reroll-team');
  const btnYear = document.getElementById('btn-reroll-year');
  
  if (state.drawnState.rollsLeft === 0) {
    btnTeam.disabled = true;
    btnYear.disabled = true;
  } else {
    btnTeam.disabled = false;
    btnYear.disabled = false;
  }
}

function renderPlayerList(resetScroll = false) {
  const container = document.getElementById('player-list');
  container.innerHTML = '';
  if (resetScroll) {
    container.scrollTop = 0;
  }

  // Filter players by selected team and year
  let squad = state.ratingsData.filter(p => 
    p.team_code === state.drawnState.teamCode && 
    p.tournament_year === state.drawnState.year
  );

  const slots = getTacticalSlots(state.formation, state.style);

  // Helper to determine if a player is unavailable
  const getUnavailableScore = (player) => {
    const playerPositions = getPlayerPositions(player);
    const isSelected = state.players.some(p => p && p.data.player_id === player.player_id);
    const hasVacantPosition = slots.some((slot, slotIdx) => {
      return playerPositions.includes(slot.pos) && state.players[slotIdx] === null;
    });
    return (isSelected || !hasVacantPosition) ? 1 : 0;
  };

  // Sort: Available first, then Goalkeepers first, then Defenders, Midfielders, Forwards, then by Rating
  const posOrder = { 'GK': 1, 'DF': 2, 'MF': 3, 'FW': 4 };
  squad.sort((a, b) => {
    const unavailA = getUnavailableScore(a);
    const unavailB = getUnavailableScore(b);
    if (unavailA !== unavailB) return unavailA - unavailB;

    const orderA = posOrder[a.position_code] || 5;
    const orderB = posOrder[b.position_code] || 5;
    if (orderA !== orderB) return orderA - orderB;
    return b.overall_rating - a.overall_rating;
  });

  squad.forEach((player, index) => {
    const playerPositions = getPlayerPositions(player);
    const validPositions = playerPositions.filter(pos => slots.some(slot => slot.pos === pos));
    const displayPos = validPositions.length > 0 ? validPositions.join('/') : player.position_code;

    const isSelected = state.players.some(p => p && p.data.player_id === player.player_id);
    const hasVacantPosition = slots.some((slot, slotIdx) => {
      return playerPositions.includes(slot.pos) && state.players[slotIdx] === null;
    });

    const isUnavailable = isSelected || !hasVacantPosition;
    const isSelectedInList = state.selectedListPlayer && state.selectedListPlayer.player_id === player.player_id;
    
    const li = document.createElement('li');
    li.className = 'player-item' + (isUnavailable ? ' already-placed' : '') + (isSelectedInList ? ' active-selection' : '');
    
    const playerNum = player.shirt_number ? `#${player.shirt_number}` : `#${index + 1}`;

    li.innerHTML = `
      <span class="player-num">${playerNum}</span>
      <span class="player-name">${player.player_name}</span>
      <span class="player-pos">${displayPos}</span>
      <span class="player-rating">${player.overall_rating}</span>
    `;

    li.addEventListener('click', () => {
      if (isUnavailable) return;
      if (state.selectedListPlayer && state.selectedListPlayer.player_id === player.player_id) {
          state.selectedListPlayer = null;
          state.selectedListPlayerNumber = null;
      } else {
          state.selectedListPlayer = player;
          state.selectedListPlayerNumber = player.shirt_number || (index + 1);
      }
      renderPlayerList();
      renderFormation();
    });

    container.appendChild(li);
  });
}

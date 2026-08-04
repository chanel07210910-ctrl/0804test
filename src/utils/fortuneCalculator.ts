import { OracleCard, FortuneResult, FiveElement } from '../types';
import { HEALTH_CARDS, WEALTH_CARDS, MARRIAGE_CARDS } from '../data/fortuneCards';

/**
 * Simple string hash algorithm for deterministic card calculation
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Calculate fortune cards based on Name + BirthDate + Today's date
 */
export function calculateBaziFortune(
  userName: string,
  birthDate: string,
  birthTime: string,
  gender: string
): FortuneResult {
  const todayStr = new Date().toISOString().split('T')[0];
  const combinedSeedStr = `${userName}-${birthDate}-${birthTime}-${gender}-${todayStr}`;
  const seed = hashString(combinedSeedStr);

  const healthIndex = seed % HEALTH_CARDS.length;
  const wealthIndex = (seed * 3 + 7) % WEALTH_CARDS.length;
  const marriageIndex = (seed * 7 + 13) % MARRIAGE_CARDS.length;

  const healthCard = { ...HEALTH_CARDS[healthIndex] };
  const wealthCard = { ...WEALTH_CARDS[wealthIndex] };
  const marriageCard = { ...MARRIAGE_CARDS[marriageIndex] };

  // Dynamically adjust score slightly based on date variance so daily luck changes logically
  const dayOffset = (seed % 15) - 7; // -7 to +7
  healthCard.score = Math.min(99, Math.max(60, healthCard.score + dayOffset));
  wealthCard.score = Math.min(99, Math.max(60, wealthCard.score + ((dayOffset * 2) % 9)));
  marriageCard.score = Math.min(99, Math.max(60, marriageCard.score + ((dayOffset * -1) % 8)));

  const overallScore = Math.round((healthCard.score + wealthCard.score + marriageCard.score) / 3);

  // Five Elements Balance calculation based on cards
  const elementsCount: Record<FiveElement, number> = {
    '木': 20,
    '火': 20,
    '土': 20,
    '金': 20,
    '水': 20,
  };

  [healthCard.element, wealthCard.element, marriageCard.element].forEach(elem => {
    elementsCount[elem] = (elementsCount[elem] || 20) + 15;
  });

  return {
    id: `res_${Date.now()}`,
    timestamp: new Date().toLocaleString('zh-TW', { hour12: false }),
    userName: userName || '緣主',
    birthDate,
    birthTime,
    mode: 'bazi',
    healthCard,
    wealthCard,
    marriageCard,
    overallScore,
    fiveElementsBalance: {
      wood: elementsCount['木'],
      fire: elementsCount['火'],
      earth: elementsCount['土'],
      metal: elementsCount['金'],
      water: elementsCount['水'],
    },
  };
}

/**
 * Draw 3 random oracle cards from the deck
 */
export function drawRandomCards(userName: string = '緣主'): FortuneResult {
  const hIdx = Math.floor(Math.random() * HEALTH_CARDS.length);
  const wIdx = Math.floor(Math.random() * WEALTH_CARDS.length);
  const mIdx = Math.floor(Math.random() * MARRIAGE_CARDS.length);

  const healthCard = HEALTH_CARDS[hIdx];
  const wealthCard = WEALTH_CARDS[wIdx];
  const marriageCard = MARRIAGE_CARDS[mIdx];

  const overallScore = Math.round((healthCard.score + wealthCard.score + marriageCard.score) / 3);

  const elementsCount: Record<FiveElement, number> = {
    '木': 20,
    '火': 20,
    '土': 20,
    '金': 20,
    '水': 20,
  };

  [healthCard.element, wealthCard.element, marriageCard.element].forEach(elem => {
    elementsCount[elem] = (elementsCount[elem] || 20) + 15;
  });

  return {
    id: `draw_${Date.now()}`,
    timestamp: new Date().toLocaleString('zh-TW', { hour12: false }),
    userName,
    mode: 'draw',
    healthCard,
    wealthCard,
    marriageCard,
    overallScore,
    fiveElementsBalance: {
      wood: elementsCount['木'],
      fire: elementsCount['火'],
      earth: elementsCount['土'],
      metal: elementsCount['金'],
      water: elementsCount['水'],
    },
  };
}

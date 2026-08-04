export type FortuneCategory = 'health' | 'wealth' | 'marriage';

export type FiveElement = '木' | '火' | '土' | '金' | '水';

export interface OracleCard {
  id: string;
  category: FortuneCategory;
  name: string;
  subtitle: string;
  score: number; // 0 - 100
  element: FiveElement;
  statusLabel: string;
  auraColor: string; // TailWind color or hex
  bgGradient: string;
  iconName: string;
  hexagram: string; // 易經卦象或關鍵字
  summary: string;
  detailAdvice: string[];
  luckyFactors: {
    color: string;
    number: string;
    timeWindow: string;
    direction: string;
  };
}

export interface FortuneResult {
  id: string;
  timestamp: string;
  userName: string;
  birthDate?: string;
  birthTime?: string;
  mode: 'draw' | 'bazi';
  healthCard: OracleCard;
  wealthCard: OracleCard;
  marriageCard: OracleCard;
  overallScore: number;
  fiveElementsBalance: {
    wood: number;
    fire: number;
    earth: number;
    metal: number;
    water: number;
  };
  aiAnalysis?: MasterAiAnalysis;
}

export interface MasterAiAnalysis {
  masterSummary: string;
  healthAdvice: string;
  wealthAdvice: string;
  marriageAdvice: string;
  luckyCharms: {
    color: string;
    number: string;
    direction: string;
    item: string;
  };
  dailyAffirmation: string;
}

export interface UserBirthInfo {
  name: string;
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female' | 'other';
  solarOrLunar: 'solar' | 'lunar';
  question: string;
}

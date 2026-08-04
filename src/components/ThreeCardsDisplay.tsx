import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OracleCard, FortuneResult } from '../types';
import { 
  Activity, Coins, Heart, Sparkles, ChevronRight, Eye, 
  RotateCw, ArrowUpRight, Shield, Flame, Info
} from 'lucide-react';

interface ThreeCardsDisplayProps {
  fortuneResult: FortuneResult;
  onSelectCardDetail: (card: OracleCard) => void;
  onAskAiForCard: () => void;
}

export const ThreeCardsDisplay: React.FC<ThreeCardsDisplayProps> = ({
  fortuneResult,
  onSelectCardDetail,
  onAskAiForCard
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({
    health: true,
    wealth: true,
    marriage: true,
  });

  const toggleFlip = (key: 'health' | 'wealth' | 'marriage') => {
    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      key: 'health' as const,
      title: '健康運',
      subTitle: '元氣與體質平衡',
      card: fortuneResult.healthCard,
      accentColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      badgeGradient: 'from-emerald-500 to-teal-700',
      ringColor: '#10b981',
      icon: Activity,
    },
    {
      key: 'wealth' as const,
      title: '財運',
      subTitle: '金錢與事業進展',
      card: fortuneResult.wealthCard,
      accentColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
      badgeGradient: 'from-amber-500 to-yellow-600',
      ringColor: '#f59e0b',
      icon: Coins,
    },
    {
      key: 'marriage' as const,
      title: '婚姻與感情運',
      subTitle: '姻緣與親密和睦',
      card: fortuneResult.marriageCard,
      accentColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
      badgeGradient: 'from-rose-500 to-pink-700',
      ringColor: '#f43f5e',
      icon: Heart,
    },
  ];

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto space-y-10">
      
      {/* Overall Score Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>今日易經神諭綜測結果</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-100 font-serif tracking-wide">
              緣主：<span className="text-amber-300">{fortuneResult.userName}</span> 的【三卡運勢靈籤】
            </h2>
            <p className="text-sm text-stone-400">
              測算時間：{fortuneResult.timestamp} ✦ 涵蓋健康、財運、婚姻三大人生樞紐
            </p>
          </div>

          <div className="flex items-center space-x-6 bg-stone-950/60 p-4 sm:p-5 rounded-2xl border border-amber-500/20">
            <div className="text-center">
              <div className="text-xs text-amber-300/80 mb-1">綜合氣運指數</div>
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent font-serif">
                {fortuneResult.overallScore}
                <span className="text-base text-amber-400/80 font-sans font-normal ml-1">/ 100</span>
              </div>
            </div>

            <div className="h-12 w-px bg-amber-500/20" />

            <div className="space-y-1 text-xs text-stone-300">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>健康指數：<strong className="text-emerald-400">{fortuneResult.healthCard.score}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>財運指數：<strong className="text-amber-400">{fortuneResult.wealthCard.score}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>婚姻指數：<strong className="text-rose-400">{fortuneResult.marriageCard.score}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {categories.map((cat, idx) => {
          const isFlipped = flippedCards[cat.key];
          const card = cat.card;
          const IconComp = cat.icon;

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col h-full"
            >
              {/* Category Top Banner */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center space-x-2">
                  <div className={`p-1.5 rounded-xl ${cat.accentColor}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-200 text-lg font-serif tracking-wide">{cat.title}</h3>
                    <p className="text-xs text-stone-400">{cat.subTitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFlip(cat.key)}
                  className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition"
                  title="翻轉卡片"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Card Container */}
              <div className="relative group flex-1">
                <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-b ${cat.badgeGradient} opacity-30 group-hover:opacity-60 transition duration-500 blur-lg pointer-events-none`} />

                <div className="relative h-full rounded-3xl bg-stone-900/90 border border-amber-500/20 p-6 flex flex-col justify-between shadow-xl backdrop-blur-md overflow-hidden">
                  
                  {/* Background Aura Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${cat.badgeGradient} opacity-10 blur-2xl pointer-events-none`} />

                  {/* Card Front Content */}
                  <div className="space-y-5">
                    {/* Top Row: Hexagram & Five Element Tag */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-stone-800 text-amber-300/90 border border-stone-700 font-serif">
                        {card.hexagram}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                        五行【{card.element}】
                      </span>
                    </div>

                    {/* Card Title & Icon */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-2xl font-bold text-amber-100 font-serif tracking-wide">
                          {card.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                          {card.statusLabel}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 italic font-serif">{card.subtitle}</p>
                    </div>

                    {/* Score Ring / Bar Meter */}
                    <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-400">運勢指數強度</span>
                        <span className="font-bold text-amber-300 text-sm font-serif">{card.score} / 100</span>
                      </div>
                      
                      <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden p-0.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${card.score}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${cat.badgeGradient}`}
                        />
                      </div>
                    </div>

                    {/* Summary Text */}
                    <div className="text-xs text-stone-300 leading-relaxed bg-stone-950/40 p-3 rounded-xl border border-stone-800/60 font-sans">
                      {card.summary}
                    </div>

                    {/* Detail Bullets */}
                    <div className="space-y-1.5 text-xs text-stone-400">
                      {card.detailAdvice.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <span className="text-amber-400 font-bold mt-0.5">•</span>
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Lucky Factors Grid */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
                      <div>
                        <span className="text-stone-500 block">幸運顏色</span>
                        <span className="text-stone-200 font-medium">{card.luckyFactors.color}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">吉利數字</span>
                        <span className="text-stone-200 font-medium">{card.luckyFactors.number}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">吉利方位</span>
                        <span className="text-stone-200 font-medium">{card.luckyFactors.direction}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">最佳時辰</span>
                        <span className="text-stone-200 font-medium">{card.luckyFactors.timeWindow}</span>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectCardDetail(card)}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium transition border border-stone-700"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>查看卡片詳解</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Master Deep Analysis Banner Trigger */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-950/60 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-amber-200 font-serif">需要更深入的易經八字加持？</h4>
            <p className="text-xs text-stone-400">呼叫 AI 大師根據您這三張健康、財運、婚姻卡進行全方位深度開光解盤。</p>
          </div>
        </div>

        <button
          onClick={onAskAiForCard}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
        >
          <span>請 AI 大師開光解盤</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </section>
  );
};

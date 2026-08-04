import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { FortuneResult } from '../types';
import { drawRandomCards } from '../utils/fortuneCalculator';

interface CardDrawerProps {
  onCardsRevealed: (result: FortuneResult) => void;
}

export const CardDrawer: React.FC<CardDrawerProps> = ({ onCardsRevealed }) => {
  const [step, setStep] = useState<'idle' | 'shuffling' | 'picking' | 'revealed'>('idle');
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>('緣主');

  const categories = ['健康運卡', '財運卡', '婚姻運卡'];

  const handleStartShuffle = () => {
    setStep('shuffling');
    setSelectedIndices([]);
    setCurrentCategoryIndex(0);

    setTimeout(() => {
      setStep('picking');
    }, 1200);
  };

  const handleSelectCardIndex = (cardIdx: number) => {
    if (step !== 'picking') return;
    if (selectedIndices.includes(cardIdx)) return;

    const nextSelected = [...selectedIndices, cardIdx];
    setSelectedIndices(nextSelected);

    if (nextSelected.length < 3) {
      setCurrentCategoryIndex(nextSelected.length);
    } else {
      // All 3 cards selected!
      setTimeout(() => {
        const result = drawRandomCards(userName || '緣主');
        setStep('revealed');
        onCardsRevealed(result);
      }, 800);
    }
  };

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto space-y-8 text-stone-100">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>靈擺抽籤 ✦ 神諭應驗</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-200">
          三卡神諭隨機抽牌
        </h2>
        <p className="text-sm text-stone-400 max-w-md mx-auto">
          誠心靜氣，專注於您的健康、財運與婚姻期待。自神諭塔羅牌陣中隨機抽取三張牌。
        </p>
      </div>

      {/* User Name Input Optional */}
      <div className="max-w-xs mx-auto flex items-center space-x-2 bg-stone-900/80 p-2 rounded-2xl border border-stone-800">
        <span className="text-xs text-stone-400 pl-2">祈福者暱稱：</span>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="例如：王小明"
          className="bg-transparent text-sm text-amber-200 outline-none w-full"
        />
      </div>

      {/* Card Drawing Stage */}
      <div className="relative min-h-[380px] bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950 rounded-3xl border border-amber-500/20 p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden">
        
        {/* Background Velvet Texture Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Step Indicator */}
        <div className="w-full flex items-center justify-between border-b border-stone-800 pb-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-medium text-amber-300">
              {step === 'idle' && '請點擊「洗牌祈福」開始抽籤'}
              {step === 'shuffling' && '大師正在為牌陣開光洗牌...'}
              {step === 'picking' && `請抽取第 ${selectedIndices.length + 1} 張卡：【${categories[currentCategoryIndex]}】`}
              {step === 'revealed' && '三卡神諭已全數揭曉！'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-stone-400 font-serif">
            <span className={selectedIndices.length >= 1 ? 'text-emerald-400 font-bold' : ''}>1.健康卡</span>
            <span>➔</span>
            <span className={selectedIndices.length >= 2 ? 'text-amber-400 font-bold' : ''}>2.財運卡</span>
            <span>➔</span>
            <span className={selectedIndices.length >= 3 ? 'text-rose-400 font-bold' : ''}>3.婚姻卡</span>
          </div>
        </div>

        {/* Interactive Cards Spread / Fan */}
        <div className="my-8 w-full flex items-center justify-center min-h-[220px]">
          {step === 'idle' && (
            <div className="text-center space-y-4">
              <div className="flex justify-center -space-x-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: (i - 2) * 8, y: Math.abs(i - 2) * 4 }}
                    className="w-24 h-36 rounded-2xl bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 border-2 border-amber-500/40 shadow-xl flex items-center justify-center text-amber-400 font-serif"
                  >
                    ✦
                  </motion.div>
                ))}
              </div>
              <button
                onClick={handleStartShuffle}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                <span>洗牌祈福，開始抽卡</span>
              </button>
            </div>
          )}

          {step === 'shuffling' && (
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-20 h-20 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300"
              >
                <Layers className="w-10 h-10" />
              </motion.div>
              <p className="text-sm text-amber-300 font-serif animate-pulse">正在誠心洗牌，凝聚靈氣中...</p>
            </div>
          )}

          {step === 'picking' && (
            <div className="w-full flex flex-wrap items-center justify-center gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((cardIdx) => {
                const isSelected = selectedIndices.includes(cardIdx);

                return (
                  <motion.button
                    key={cardIdx}
                    onClick={() => handleSelectCardIndex(cardIdx)}
                    disabled={isSelected}
                    whileHover={{ y: isSelected ? 0 : -12, scale: isSelected ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 sm:w-24 h-32 sm:h-36 rounded-2xl border-2 transition-all flex flex-col items-center justify-between p-3 ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 opacity-40 cursor-not-allowed'
                        : 'bg-gradient-to-br from-stone-900 via-amber-950/60 to-stone-900 border-amber-500/40 shadow-xl cursor-pointer hover:border-amber-400'
                    }`}
                  >
                    <span className="text-xs text-amber-300 font-serif">神諭卡</span>
                    <div className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-400 text-xs font-serif">
                      {isSelected ? '✓' : '☯️'}
                    </div>
                    <span className="text-[10px] text-stone-400">{isSelected ? '已抽取' : '點擊翻牌'}</span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {step === 'revealed' && (
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-amber-200 font-serif">三卡抽籤成功！</h3>
              <p className="text-xs text-stone-400">已自動為您生成健康、財運與婚姻運神諭，請查看上方運勢卡區。</p>
              <button
                onClick={handleStartShuffle}
                className="px-6 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-sm font-medium transition"
              >
                再抽一次
              </button>
            </div>
          )}
        </div>

        {/* Bottom Hint */}
        <div className="text-xs text-stone-500 font-serif">
          靈籤神諭無形，心誠則靈 ✦ 三卡全方位指引
        </div>

      </div>

    </section>
  );
};

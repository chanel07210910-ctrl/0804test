import React, { useState } from 'react';
import { FortuneResult, MasterAiAnalysis, UserBirthInfo } from '../types';
import { Bot, Sparkles, RefreshCcw, ShieldAlert, CheckCircle2, Heart, Coins, Activity, Wand2 } from 'lucide-react';

interface AiMasterInterpretationProps {
  fortuneResult: FortuneResult;
  userBirthInfo?: UserBirthInfo;
  onAnalysisUpdated: (analysis: MasterAiAnalysis) => void;
}

export const AiMasterInterpretation: React.FC<AiMasterInterpretationProps> = ({
  fortuneResult,
  userBirthInfo,
  onAnalysisUpdated,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<MasterAiAnalysis | null>(
    fortuneResult.aiAnalysis || null
  );

  const handleFetchAiMaster = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/fortune/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fortuneResult.userName || userBirthInfo?.name,
          birthDate: userBirthInfo?.birthDate || '國曆/農曆吉日',
          birthTime: userBirthInfo?.birthTime || '吉時',
          gender: userBirthInfo?.gender || '未指定',
          userQuestion: userBirthInfo?.question || '全方位健康財運婚姻測算',
          cardsData: {
            health: {
              score: fortuneResult.healthCard.score,
              element: fortuneResult.healthCard.element,
              status: fortuneResult.healthCard.statusLabel,
              oracleName: fortuneResult.healthCard.name,
            },
            wealth: {
              score: fortuneResult.wealthCard.score,
              element: fortuneResult.wealthCard.element,
              status: fortuneResult.wealthCard.statusLabel,
              oracleName: fortuneResult.wealthCard.name,
            },
            marriage: {
              score: fortuneResult.marriageCard.score,
              element: fortuneResult.marriageCard.element,
              status: fortuneResult.marriageCard.statusLabel,
              oracleName: fortuneResult.marriageCard.name,
            },
          },
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'AI 大師開光失敗，請檢查金鑰或網路連線。');
      }

      setAnalysis(data.data);
      onAnalysisUpdated(data.data);
    } catch (err: any) {
      setError(err.message || '發生未預期錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <Bot className="w-3.5 h-3.5" />
          <span>Gemini 3.6 Flash ✦ 玄學大師智慧加持</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-200">
          AI 易經大師三卡深度解盤
        </h2>
        <p className="text-xs text-stone-400 max-w-lg mx-auto">
          由 AI 靈性玄學大師針對您的【健康卡】、【財運卡】、【婚姻卡】進行整體命盤開光指引與趨吉避凶良方。
        </p>
      </div>

      {/* Action trigger if no analysis yet */}
      {!analysis && !loading && (
        <div className="bg-gradient-to-b from-stone-900 to-amber-950/40 border border-amber-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Wand2 className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-stone-100 font-serif">準備為【{fortuneResult.userName}】開光解盤</h3>
            <p className="text-xs text-stone-400">
              點擊下方按鈕，AI 大師將整合當前健康({fortuneResult.healthCard.score})、財運({fortuneResult.wealthCard.score})與婚姻({fortuneResult.marriageCard.score})進行一對一靈性批註。
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs rounded-2xl flex items-center justify-center space-x-2 max-w-md mx-auto">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleFetchAiMaster}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 font-bold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
          >
            請 AI 大師開光解盤
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-12 text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
            <div className="absolute inset-2 rounded-full bg-stone-950 flex items-center justify-center text-amber-300 font-serif text-lg">
              ☯️
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-amber-200 font-serif animate-pulse">
              大師正調閱天地五行易經天機...
            </h3>
            <p className="text-xs text-stone-400">
              正在深入運算健康氣血、財庫盈虧與婚姻姻緣紅線平衡點，請誠心稍候。
            </p>
          </div>
        </div>
      )}

      {/* Result Display */}
      {analysis && !loading && (
        <div className="space-y-6">
          
          {/* Master Summary Header */}
          <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-amber-100 font-serif">大師批註總結</h3>
                  <p className="text-xs text-amber-300/80">緣主：{fortuneResult.userName} ✦ 運勢總開光</p>
                </div>
              </div>

              <button
                onClick={handleFetchAiMaster}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 hover:text-amber-200 text-xs border border-stone-700 transition"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>重新解析</span>
              </button>
            </div>

            <p className="text-sm sm:text-base text-amber-200/90 font-serif leading-relaxed italic bg-stone-950/60 p-4 rounded-2xl border border-amber-500/20">
              「{analysis.masterSummary}」
            </p>
          </div>

          {/* Three Cards Deep Advices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Health Advice */}
            <div className="bg-stone-900/90 border border-emerald-500/30 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold font-serif border-b border-emerald-500/20 pb-3">
                <Activity className="w-5 h-5" />
                <span>健康運開示與養生</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {analysis.healthAdvice}
              </p>
            </div>

            {/* Wealth Advice */}
            <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center space-x-2 text-amber-400 font-bold font-serif border-b border-amber-500/20 pb-3">
                <Coins className="w-5 h-5" />
                <span>財運開示與理財</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {analysis.wealthAdvice}
              </p>
            </div>

            {/* Marriage Advice */}
            <div className="bg-stone-900/90 border border-rose-500/30 rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center space-x-2 text-rose-400 font-bold font-serif border-b border-rose-500/20 pb-3">
                <Heart className="w-5 h-5" />
                <span>婚姻感情開示</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {analysis.marriageAdvice}
              </p>
            </div>

          </div>

          {/* Lucky Charms & Affirmation Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Lucky Charms */}
            <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-amber-300 font-serif flex items-center space-x-2">
                <span>🔮 開運加持方位與物件</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block">幸運色彩</span>
                  <span className="text-amber-200 font-medium">{analysis.luckyCharms.color}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block">幸運數字</span>
                  <span className="text-amber-200 font-medium">{analysis.luckyCharms.number}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block">開運吉方</span>
                  <span className="text-amber-200 font-medium">{analysis.luckyCharms.direction}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block">開運隨身物</span>
                  <span className="text-amber-200 font-medium">{analysis.luckyCharms.item}</span>
                </div>
              </div>
            </div>

            {/* Daily Affirmation */}
            <div className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-amber-300 font-serif mb-2">
                  ✨ 專屬開運金句
                </h4>
                <p className="text-sm text-stone-200 font-serif leading-relaxed italic bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
                  「{analysis.dailyAffirmation}」
                </p>
              </div>
              <p className="text-[11px] text-stone-500 text-right">
                大師開光時間：{new Date().toLocaleDateString('zh-TW')}
              </p>
            </div>

          </div>

        </div>
      )}

    </section>
  );
};

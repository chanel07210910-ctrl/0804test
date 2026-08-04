import React from 'react';
import { FortuneResult } from '../types';
import { History, Trash2, Calendar, Sparkles, Share2, Check } from 'lucide-react';

interface FortuneHistoryProps {
  history: FortuneResult[];
  onSelectHistoryItem: (item: FortuneResult) => void;
  onClearHistory: () => void;
}

export const FortuneHistory: React.FC<FortuneHistoryProps> = ({
  history,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleShareResult = (item: FortuneResult) => {
    const text = `【三卡運勢靈籤】緣主：${item.userName}
綜合評分：${item.overallScore}分
🟢 健康運卡：${item.healthCard.name} (${item.healthCard.score}分) - ${item.healthCard.statusLabel}
🟡 財運卡：${item.wealthCard.name} (${item.wealthCard.score}分) - ${item.wealthCard.statusLabel}
🔴 婚姻運卡：${item.marriageCard.name} (${item.marriageCard.score}分) - ${item.marriageCard.statusLabel}
測算時間：${item.timestamp}`;

    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-amber-200 flex items-center space-x-2">
            <History className="w-6 h-6 text-amber-400" />
            <span>三卡運勢歷程與日誌</span>
          </h2>
          <p className="text-xs text-stone-400">
            記錄每次求籤與八字算命結果，隨時回顧健康、財運與婚姻趨勢變化。
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs border border-rose-500/30 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>清空記錄</span>
          </button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-12 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-stone-600 mx-auto" />
          <p className="text-stone-400 text-sm">尚無存檔紀錄</p>
          <p className="text-stone-500 text-xs">進行三卡抽牌或八字測算後，系統將自動為您備份運勢日誌。</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-stone-900/90 border border-amber-500/20 hover:border-amber-500/40 rounded-3xl p-5 sm:p-6 transition shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-black text-amber-300 font-serif">
                    {item.overallScore}
                    <span className="text-xs text-stone-500 font-normal ml-0.5">分</span>
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-stone-200 text-base font-serif">緣主：{item.userName}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {item.mode === 'bazi' ? '八字算命' : '隨機抽牌'}
                      </span>
                    </div>
                    <span className="text-xs text-stone-500 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.timestamp}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleShareResult(item)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs border border-stone-700 transition"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">已複製報告</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>分享運勢</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onSelectHistoryItem(item)}
                    className="px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40 transition"
                  >
                    調閱三卡詳情
                  </button>
                </div>
              </div>

              {/* Three Cards Mini Summary Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                {/* Health */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-400 font-bold block">健康運卡</span>
                    <span className="text-stone-300">{item.healthCard.name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-serif text-sm">{item.healthCard.score}分</span>
                </div>

                {/* Wealth */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-amber-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-bold block">財運卡</span>
                    <span className="text-stone-300">{item.wealthCard.name}</span>
                  </div>
                  <span className="text-amber-400 font-bold font-serif text-sm">{item.wealthCard.score}分</span>
                </div>

                {/* Marriage */}
                <div className="p-3 rounded-2xl bg-stone-950/80 border border-rose-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-rose-400 font-bold block">婚姻運卡</span>
                    <span className="text-stone-300">{item.marriageCard.name}</span>
                  </div>
                  <span className="text-rose-400 font-bold font-serif text-sm">{item.marriageCard.score}分</span>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};

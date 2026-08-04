import React from 'react';
import { OracleCard } from '../types';
import { X, Sparkles, Check, Share2, Compass } from 'lucide-react';

interface CardDetailModalProps {
  card: OracleCard | null;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!card) return null;

  const categoryTitle =
    card.category === 'health'
      ? '健康運'
      : card.category === 'wealth'
      ? '財運'
      : '婚姻與感情運';

  const categoryColor =
    card.category === 'health'
      ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10'
      : card.category === 'wealth'
      ? 'text-amber-400 border-amber-500/40 bg-amber-500/10'
      : 'text-rose-400 border-rose-500/40 bg-rose-500/10';

  const handleShare = () => {
    const text = `【三卡運勢靈籤 - ${categoryTitle}詳解】
神諭牌名：${card.name} (${card.subtitle})
分數：${card.score} / 100
五行：${card.element} ✦ 卦象：${card.hexagram}
總評：${card.summary}
開運指引：
${card.detailAdvice.map(a => '• ' + a).join('\n')}
幸運顏色：${card.luckyFactors.color} | 數字：${card.luckyFactors.number} | 方位：${card.luckyFactors.direction}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-stone-100 overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${categoryColor}`}>
            {categoryTitle}卡
          </span>
          <span className="text-xs text-amber-400 font-serif">
            五行【{card.element}】✦ {card.hexagram}
          </span>
        </div>

        {/* Title & Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold font-serif text-amber-100 tracking-wide">
              {card.name}
            </h3>
            <span className="text-2xl font-black text-amber-300 font-serif">
              {card.score}
              <span className="text-xs text-stone-500 font-normal">/100</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 italic font-serif">{card.subtitle}</p>
        </div>

        {/* Summary Box */}
        <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800 text-xs text-stone-200 leading-relaxed font-sans">
          {card.summary}
        </div>

        {/* Advice Points */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-300 font-serif">✦ 易經大師趨吉避凶指引：</h4>
          <ul className="space-y-2 text-xs text-stone-300">
            {card.detailAdvice.map((point, i) => (
              <li key={i} className="flex items-start space-x-2 bg-stone-950/40 p-2.5 rounded-xl border border-stone-800/60">
                <span className="text-amber-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lucky Factors */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-stone-950/90 p-4 rounded-2xl border border-amber-500/20">
          <div>
            <span className="text-stone-500 text-[11px] block">幸運顏色</span>
            <span className="text-amber-200 font-medium">{card.luckyFactors.color}</span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">吉利數字</span>
            <span className="text-amber-200 font-medium">{card.luckyFactors.number}</span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">開運方位</span>
            <span className="text-amber-200 font-medium">{card.luckyFactors.direction}</span>
          </div>
          <div>
            <span className="text-stone-500 text-[11px] block">最佳時辰</span>
            <span className="text-amber-200 font-medium">{card.luckyFactors.timeWindow}</span>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex items-center space-x-3 pt-2">
          <button
            onClick={handleShare}
            className="flex-1 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition flex items-center justify-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? '已複製卡片詳解' : '複製卡片開運報告'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition"
          >
            關閉
          </button>
        </div>

      </div>

    </div>
  );
};

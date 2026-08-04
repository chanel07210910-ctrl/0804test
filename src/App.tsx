import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ThreeCardsDisplay } from './components/ThreeCardsDisplay';
import { CardDrawer } from './components/CardDrawer';
import { BaziForm } from './components/BaziForm';
import { AiMasterInterpretation } from './components/AiMasterInterpretation';
import { FortuneHistory } from './components/FortuneHistory';
import { CardDetailModal } from './components/CardDetailModal';
import { FortuneResult, OracleCard, UserBirthInfo, MasterAiAnalysis } from './types';
import { drawRandomCards } from './utils/fortuneCalculator';
import { Sparkles, Compass, Heart, ShieldCheck, Coins } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'cards' | 'bazi' | 'ai' | 'history'>('cards');
  
  // Initial fortune result
  const [fortuneResult, setFortuneResult] = useState<FortuneResult>(() => {
    return drawRandomCards('緣主');
  });

  const [userBirthInfo, setUserBirthInfo] = useState<UserBirthInfo | undefined>(undefined);
  const [selectedCardModal, setSelectedCardModal] = useState<OracleCard | null>(null);

  // LocalStorage History
  const [history, setHistory] = useState<FortuneResult[]>(() => {
    try {
      const saved = localStorage.getItem('three_cards_fortune_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('three_cards_fortune_history', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Save new result to history
  const saveToHistory = (result: FortuneResult) => {
    setHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)].slice(0, 20));
  };

  // Quick redraw cards
  const handleQuickRedraw = () => {
    const newResult = drawRandomCards(userBirthInfo?.name || '緣主');
    setFortuneResult(newResult);
    saveToHistory(newResult);
    setActiveTab('cards');
  };

  // When cards drawn from CardDrawer
  const handleCardsRevealed = (result: FortuneResult) => {
    setFortuneResult(result);
    saveToHistory(result);
  };

  // When Bazi calculated from BaziForm
  const handleBaziCalculated = (result: FortuneResult, birthInfo: UserBirthInfo) => {
    setFortuneResult(result);
    setUserBirthInfo(birthInfo);
    saveToHistory(result);
    setActiveTab('cards');
  };

  // When AI Master analysis updated
  const handleAnalysisUpdated = (analysis: MasterAiAnalysis) => {
    const updatedResult = { ...fortuneResult, aiAnalysis: analysis };
    setFortuneResult(updatedResult);
    saveToHistory(updatedResult);
  };

  // Select history item
  const handleSelectHistoryItem = (item: FortuneResult) => {
    setFortuneResult(item);
    setActiveTab('cards');
  };

  // Clear history
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('three_cards_fortune_history');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickRedraw={handleQuickRedraw}
      />

      {/* Main Container */}
      <main className="pb-16">
        
        {/* Tab: Cards View (Top 3 Cards + Quick Card Drawer below) */}
        {activeTab === 'cards' && (
          <div className="space-y-12">
            <ThreeCardsDisplay
              fortuneResult={fortuneResult}
              onSelectCardDetail={(card) => setSelectedCardModal(card)}
              onAskAiForCard={() => setActiveTab('ai')}
            />

            <div className="border-t border-stone-800/80 pt-8">
              <CardDrawer onCardsRevealed={handleCardsRevealed} />
            </div>
          </div>
        )}

        {/* Tab: 八字測算 (Bazi Form) */}
        {activeTab === 'bazi' && (
          <BaziForm onBaziCalculated={handleBaziCalculated} />
        )}

        {/* Tab: AI 大師開光 (Gemini 3.6 Flash) */}
        {activeTab === 'ai' && (
          <AiMasterInterpretation
            fortuneResult={fortuneResult}
            userBirthInfo={userBirthInfo}
            onAnalysisUpdated={handleAnalysisUpdated}
          />
        )}

        {/* Tab: 運勢日誌 (History Log) */}
        {activeTab === 'history' && (
          <FortuneHistory
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

      </main>

      {/* Card Detail Popup Modal */}
      <CardDetailModal
        card={selectedCardModal}
        onClose={() => setSelectedCardModal(null)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950 py-8 text-center text-xs text-stone-500 space-y-2">
        <div className="flex items-center justify-center space-x-2 text-amber-400/80 font-serif">
          <span>☯️ 三卡運勢算命工具</span>
          <span>✦</span>
          <span>健康 ． 財運 ． 婚姻</span>
        </div>
        <p className="max-w-md mx-auto px-4 font-light leading-relaxed">
          命由天定，運由己造。本靈籤工具結合易經八字與現代心靈指引，供養生健身、理財規劃與情感溝通參考。
        </p>
        <p className="text-[10px] text-stone-600">
          © {new Date().getFullYear()} Three Cards Fortune Studio. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

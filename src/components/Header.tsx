import React from 'react';
import { Sparkles, Compass, UserCheck, Bot, History, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'cards' | 'bazi' | 'ai' | 'history';
  setActiveTab: (tab: 'cards' | 'bazi' | 'ai' | 'history') => void;
  onQuickRedraw: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onQuickRedraw }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/85 backdrop-blur-md border-b border-amber-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('cards')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-700 to-red-900 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center border border-amber-400/30">
                <Compass className="w-6 h-6 text-amber-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent tracking-wide font-serif">
                  三卡運勢靈籤
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  健康．財運．婚姻
                </span>
              </div>
              <p className="text-xs text-amber-200/60 font-light">
                易經八字神諭 ✦ 三卡全方位預測
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-stone-900/80 p-1.5 rounded-2xl border border-stone-800">
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'cards'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-900/40 border border-amber-400/30'
                  : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>🎴 三卡翻牌</span>
            </button>

            <button
              onClick={() => setActiveTab('bazi')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'bazi'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-900/40 border border-amber-400/30'
                  : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>八字測算</span>
            </button>

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-900/40 border border-amber-400/30'
                  : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>AI 大師開光</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-900/40 border border-amber-400/30'
                  : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <History className="w-4 h-4 text-amber-400" />
              <span>運勢日誌</span>
            </button>
          </nav>

          {/* Quick Redraw Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onQuickRedraw}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all active:scale-95"
              title="重新抽取三卡"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">重新求籤</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Tabs Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-800/80 text-xs">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${
              activeTab === 'cards' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-stone-400'
            }`}
          >
            <span>🎴 抽牌</span>
          </button>
          <button
            onClick={() => setActiveTab('bazi')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${
              activeTab === 'bazi' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-stone-400'
            }`}
          >
            <span>八字</span>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${
              activeTab === 'ai' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-stone-400'
            }`}
          >
            <span>AI 大師</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${
              activeTab === 'history' ? 'bg-amber-600/30 text-amber-300 font-semibold' : 'text-stone-400'
            }`}
          >
            <span>日誌</span>
          </button>
        </div>

      </div>
    </header>
  );
};

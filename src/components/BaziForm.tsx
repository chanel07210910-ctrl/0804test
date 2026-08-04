import React, { useState } from 'react';
import { UserBirthInfo, FortuneResult } from '../types';
import { calculateBaziFortune } from '../utils/fortuneCalculator';
import { Sparkles, Compass, User, Calendar, Clock, HelpCircle, ArrowRight } from 'lucide-react';

interface BaziFormProps {
  onBaziCalculated: (result: FortuneResult, birthInfo: UserBirthInfo) => void;
}

export const BaziForm: React.FC<BaziFormProps> = ({ onBaziCalculated }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('1995-08-18');
  const [birthTime, setBirthTime] = useState('午時 (11:00-13:00)');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [solarOrLunar, setSolarOrLunar] = useState<'solar' | 'lunar'>('solar');
  const [question, setQuestion] = useState('');

  const shichenOptions = [
    '子時 (23:00-01:00)',
    '丑時 (01:00-03:00)',
    '寅時 (03:00-05:00)',
    '卯時 (05:00-07:00)',
    '辰時 (07:00-09:00)',
    '巳時 (09:00-11:00)',
    '午時 (11:00-13:00)',
    '未時 (13:00-15:00)',
    '申時 (15:00-17:00)',
    '酉時 (17:00-19:00)',
    '戌時 (19:00-21:00)',
    '亥時 (21:00-23:00)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || '緣主';
    const result = calculateBaziFortune(finalName, birthDate, birthTime, gender);
    const birthInfo: UserBirthInfo = {
      name: finalName,
      birthDate,
      birthTime,
      gender,
      solarOrLunar,
      question,
    };
    onBaziCalculated(result, birthInfo);
  };

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium">
          <Compass className="w-3.5 h-3.5" />
          <span>八字與紫微命盤數據運算</span>
        </div>
        <h2 className="text-3xl font-bold font-serif text-amber-200">
          個人八字三卡運勢算命
        </h2>
        <p className="text-xs text-stone-400">
          輸入生辰八字資訊，精準算出屬於您的【健康卡】、【財運卡】與【婚姻卡】五行磁場與當前運勢。
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Name Input */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-medium text-amber-300">
              <User className="w-4 h-4 text-amber-400" />
              <span>緣主姓名 / 暱稱</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="請輸入姓名（預設：緣主）"
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/80 transition"
            />
          </div>

          {/* Gender & Calendar Type */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-medium text-amber-300">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>性別與歷法</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="bg-stone-950 border border-stone-800 rounded-2xl px-3 py-3 text-sm text-stone-200 outline-none focus:border-amber-500"
              >
                <option value="female">乾造 / 女性</option>
                <option value="male">坤造 / 男性</option>
                <option value="other">未指定</option>
              </select>

              <select
                value={solarOrLunar}
                onChange={(e) => setSolarOrLunar(e.target.value as any)}
                className="bg-stone-950 border border-stone-800 rounded-2xl px-3 py-3 text-sm text-stone-200 outline-none focus:border-amber-500"
              >
                <option value="solar">國曆 (陽曆)</option>
                <option value="lunar">農曆 (陰曆)</option>
              </select>
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-medium text-amber-300">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>出生年月日</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 outline-none focus:border-amber-500/80 transition"
            />
          </div>

          {/* Birth Time */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-xs font-medium text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>出生時辰 (十二時辰)</span>
            </label>
            <select
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 outline-none focus:border-amber-500 transition"
            >
              {shichenOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Specific Question Focus */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-xs font-medium text-amber-300">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>近期特別關注提問 (可選，提供給AI大師參考)</span>
          </label>
          <textarea
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例如：今年適合換工作嗎？或是健康上有何需要注意？"
            className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/80 transition resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-stone-950 font-bold text-base shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>開啟八字計算 ➔ 推算健康．財運．婚姻三卡</span>
        </button>

      </form>

    </section>
  );
};

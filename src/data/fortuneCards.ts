import { OracleCard } from '../types';

export const HEALTH_CARDS: OracleCard[] = [
  {
    id: 'h_1',
    category: 'health',
    name: '太極養元卡',
    subtitle: '陰陽調理 氣血雙盈',
    score: 95,
    element: '木',
    statusLabel: '生機勃勃',
    auraColor: 'emerald',
    bgGradient: 'from-emerald-950 via-teal-900 to-stone-900',
    iconName: 'Activity',
    hexagram: '【震為雷】生機蓬勃',
    summary: '身體元氣充足，五臟六腑陰陽平衡，適宜多接觸自然與保持規律作息。',
    detailAdvice: [
      '宜早睡早起，清晨可進行吐納或太極拉筋運動。',
      '多食用青色蔬果，養肝明目，維持心情舒暢。',
      '注意眼睛休息，避免長時間盯看電子螢幕。'
    ],
    luckyFactors: {
      color: '青翠綠、森林綠',
      number: '3, 8',
      timeWindow: '卯時 (05:00-07:00)',
      direction: '東方'
    }
  },
  {
    id: 'h_2',
    category: 'health',
    name: '長青青松卡',
    subtitle: '木氣清華 筋骨強健',
    score: 88,
    element: '水',
    statusLabel: '水木清華',
    auraColor: 'teal',
    bgGradient: 'from-teal-950 via-cyan-900 to-slate-900',
    iconName: 'ShieldCheck',
    hexagram: '【巽為風】和風潤物',
    summary: '體質基礎良好，免疫力強，唯需注意水分補充與關節保健。',
    detailAdvice: [
      '每日補足 2000c.c. 溫開水，維持身體循環暢通。',
      '適合有氧快走或游泳，有助於活絡筋骨。',
      '晚餐宜清淡，減少重油重鹽對腸胃的負擔。'
    ],
    luckyFactors: {
      color: '湖水藍、墨黑',
      number: '1, 6',
      timeWindow: '子時 (23:00-01:00)',
      direction: '北方'
    }
  },
  {
    id: 'h_3',
    category: 'health',
    name: '丹鳳朝陽卡',
    subtitle: '心火旺盛 精力充沛',
    score: 92,
    element: '火',
    statusLabel: '熱情滿格',
    auraColor: 'rose',
    bgGradient: 'from-rose-950 via-red-900 to-zinc-900',
    iconName: 'Sun',
    hexagram: '【離為火】光明普照',
    summary: '體力與精神皆處於巔峰，注意避免心火過旺引發睡眠品質下降。',
    detailAdvice: [
      '午後適度放慢步調，避免過度攝取含咖啡因飲料。',
      '睡前可浸泡足部，幫助引火歸元、安神助眠。',
      '保持平和心境，情緒穩定是最佳的養生良藥。'
    ],
    luckyFactors: {
      color: '朱砂紅、琥珀橙',
      number: '2, 7',
      timeWindow: '午時 (11:00-13:00)',
      direction: '南方'
    }
  },
  {
    id: 'h_4',
    category: 'health',
    name: '玄武固本卡',
    subtitle: '脾胃和合 沉穩安泰',
    score: 82,
    element: '土',
    statusLabel: '穩如泰山',
    auraColor: 'amber',
    bgGradient: 'from-amber-950 via-yellow-900 to-neutral-900',
    iconName: 'HeartPulse',
    hexagram: '【坤為地】厚德載物',
    summary: '身體根基紮實，但近期消化系統可能較為敏感，宜多吃溫和甘淡之物。',
    detailAdvice: [
      '飲食宜定時定量，細嚼慢嚥以保護脾胃。',
      '多補充黃色食物如山藥、南瓜與黃豆製品。',
      '適當散步促進腸胃蠕動，減少積食胸悶。'
    ],
    luckyFactors: {
      color: '暖黃、土褐色',
      number: '5, 10',
      timeWindow: '辰時 (07:00-09:00)',
      direction: '中央與西南'
    }
  },
  {
    id: 'h_5',
    category: 'health',
    name: '白虎調理卡',
    subtitle: '金氣肅殺 需防勞累',
    score: 76,
    element: '金',
    statusLabel: '微恙提醒',
    auraColor: 'slate',
    bgGradient: 'from-slate-900 via-gray-800 to-zinc-950',
    iconName: 'Smile',
    hexagram: '【乾為天】順天應時',
    summary: '工作壓力或氣候變遷可能導致呼吸道與皮膚較乾澀，需加強保濕與舒壓。',
    detailAdvice: [
      '多補充水梨、白木耳等潤肺潤燥食材。',
      '安排充足睡眠，給予身體自我修復的時間。',
      '練習深呼吸冥想，釋放長期積累的緊繃情緒。'
    ],
    luckyFactors: {
      color: '米白、亮銀',
      number: '4, 9',
      timeWindow: '申時 (15:00-17:00)',
      direction: '西方'
    }
  }
];

export const WEALTH_CARDS: OracleCard[] = [
  {
    id: 'w_1',
    category: 'wealth',
    name: '聚寶財庫卡',
    subtitle: '金玉滿堂 財源廣進',
    score: 96,
    element: '金',
    statusLabel: '財庫豐盈',
    auraColor: 'amber',
    bgGradient: 'from-amber-950 via-yellow-900 to-stone-900',
    iconName: 'Coins',
    hexagram: '【大有卦】順天依時',
    summary: '正財與偏財運勢均佳，有機會獲得意外收益、績效獎金或優質合作項目。',
    detailAdvice: [
      '適合進攻型理財佈局，但仍應嚴格控制風險比例。',
      '身邊貴人運旺盛，多參加業界交流可收穫商業契機。',
      '適當回饋社會做公益，能讓財庫能量循環更廣。'
    ],
    luckyFactors: {
      color: '帝王金、香檳金',
      number: '8, 9',
      timeWindow: '巳時 (09:00-11:00)',
      direction: '西南部'
    }
  },
  {
    id: 'w_2',
    category: 'wealth',
    name: '紫氣東來卡',
    subtitle: '事業扶搖 貴人引路',
    score: 92,
    element: '木',
    statusLabel: '鴻圖大展',
    auraColor: 'purple',
    bgGradient: 'from-purple-950 via-indigo-900 to-zinc-900',
    iconName: 'TrendingUp',
    hexagram: '【漸卦】循序漸進',
    summary: '專業能力受到上司與市場認可，升遷加薪或創業拓展指日可待。',
    detailAdvice: [
      '專注於個人核心技能提升，投資自己是最高回報。',
      '善用團隊合作與人際資源，切忌獨打獨鬥。',
      '簽署合約或投資文書時，務必仔細審視條款。'
    ],
    luckyFactors: {
      color: '尊貴紫、暗羅蘭',
      number: '3, 6',
      timeWindow: '寅時 (03:00-05:00)',
      direction: '東南方'
    }
  },
  {
    id: 'w_3',
    category: 'wealth',
    name: '利路通達卡',
    subtitle: '水聚財川 靈活應變',
    score: 85,
    element: '水',
    statusLabel: '靈活進財',
    auraColor: 'blue',
    bgGradient: 'from-blue-950 via-slate-900 to-neutral-900',
    iconName: 'Briefcase',
    hexagram: '【井卦】井養不窮',
    summary: '財運如流水般源源不絕，適合多角化投資或開啟副業斜槓模式。',
    detailAdvice: [
      '保持資金流動性，切勿過度押注單一高風險商品。',
      '學習新領域知識，靈活把握數位轉型財富浪潮。',
      '妥善管理日常開支，留存緊急備用金。'
    ],
    luckyFactors: {
      color: '寶藍、深海藍',
      number: '1, 7',
      timeWindow: '亥時 (21:00-23:00)',
      direction: '北方'
    }
  },
  {
    id: 'w_4',
    category: 'wealth',
    name: '赤龍吐珠卡',
    subtitle: '熱情投注 創業發跡',
    score: 89,
    element: '火',
    statusLabel: '開創新局',
    auraColor: 'orange',
    bgGradient: 'from-orange-950 via-red-900 to-stone-900',
    iconName: 'Flame',
    hexagram: '【豐卦】日中見斗',
    summary: '個人影響力激增，利於進行市場推廣、品牌建立與行銷突破。',
    detailAdvice: [
      '展現自信與專業度，容易吸引創投或合作夥伴。',
      '情緒激動時切勿做大筆金錢決策，冷靜審視現金流。',
      '注意名利雙收後的低調謙遜，防範小人嫉妒。'
    ],
    luckyFactors: {
      color: '烈焰紅、橘金',
      number: '2, 5',
      timeWindow: '午時 (11:00-13:00)',
      direction: '南方'
    }
  },
  {
    id: 'w_5',
    category: 'wealth',
    name: '積少成多卡',
    subtitle: '穩紮穩打 守成防漏',
    score: 78,
    element: '土',
    statusLabel: '守成有餘',
    auraColor: 'yellow',
    bgGradient: 'from-yellow-950 via-stone-900 to-zinc-950',
    iconName: 'PiggyBank',
    hexagram: '【謙卦】尊光光大',
    summary: '財運平穩無波，此時期以「守財」與「穩健儲蓄」為第一要務。',
    detailAdvice: [
      '暫緩衝動型購物，落實記帳與預算控管。',
      '優先選擇低風險定期定額或定存作為資金避風港。',
      '累積能量與專業底氣，等待下一次市場大好時機。'
    ],
    luckyFactors: {
      color: '卡其黃、駝色',
      number: '5, 0',
      timeWindow: '戌時 (19:00-21:00)',
      direction: '東北方'
    }
  }
];

export const MARRIAGE_CARDS: OracleCard[] = [
  {
    id: 'm_1',
    category: 'marriage',
    name: '月老紅線卡',
    subtitle: '天作之合 姻緣天成',
    score: 98,
    element: '火',
    statusLabel: '紅欒星照',
    auraColor: 'rose',
    bgGradient: 'from-rose-950 via-pink-900 to-zinc-900',
    iconName: 'Heart',
    hexagram: '【咸卦】感應相相',
    summary: '婚姻感情運勢極為圓滿！單身者易遇到心儀對象，有伴者感情升溫蜜裡調油。',
    detailAdvice: [
      '單身者多參加社交活動或親友介紹，主動跨出第一步。',
      '有伴者可安排雙人浪漫小旅行，重溫熱戀美好時光。',
      '坦誠溝通心聲，彼此尊重理解是婚姻幸福長久的密碼。'
    ],
    luckyFactors: {
      color: '珊瑚粉、胭脂紅',
      number: '6, 9',
      timeWindow: '酉時 (17:00-19:00)',
      direction: '西北方'
    }
  },
  {
    id: 'm_2',
    category: 'marriage',
    name: '比翼雙飛卡',
    subtitle: '琴瑟和鳴 相濡以沫',
    score: 94,
    element: '木',
    statusLabel: '心有靈犀',
    auraColor: 'pink',
    bgGradient: 'from-pink-950 via-purple-900 to-stone-900',
    iconName: 'Sparkles',
    hexagram: '【恒卦】立不易方',
    summary: '感情關係穩如磐石，雙方互相尊重扶持，充滿共同目標與家庭溫馨感。',
    detailAdvice: [
      '多給予伴侶真誠讚美與肢體擁抱，增加生活儀式感。',
      '共同規劃未來的理財與家庭願景，加深心理連結。',
      '尊重彼此獨立空間，愛是陪伴也是相互成就。'
    ],
    luckyFactors: {
      color: '嫩粉綠、紫羅蘭',
      number: '2, 8',
      timeWindow: '未時 (13:00-15:00)',
      direction: '東南方'
    }
  },
  {
    id: 'm_3',
    category: 'marriage',
    name: '同心結緣卡',
    subtitle: '包容理解 溫情長存',
    score: 88,
    element: '水',
    statusLabel: '柔情似水',
    auraColor: 'indigo',
    bgGradient: 'from-indigo-950 via-sky-900 to-zinc-900',
    iconName: 'Users',
    hexagram: '【漸卦】女歸吉也',
    summary: '感情如涓涓細流，雖然沒有驚天動地的轟烈，卻有深刻細緻的關懷與體貼。',
    detailAdvice: [
      '遇到意見分歧時，多站在對方立場傾聽感受。',
      '一起準備晚餐或居家整理，共享簡單踏實的幸福。',
      '表達感謝永遠不嫌多，小禮物能帶來大驚喜。'
    ],
    luckyFactors: {
      color: '紫藍、霧灰藍',
      number: '1, 4',
      timeWindow: '亥時 (21:00-23:00)',
      direction: '北方'
    }
  },
  {
    id: 'm_4',
    category: 'marriage',
    name: '春暖花開卡',
    subtitle: '桃花漸旺 迎接曙光',
    score: 83,
    element: '木',
    statusLabel: '情竇初開',
    auraColor: 'emerald',
    bgGradient: 'from-emerald-950 via-rose-950 to-neutral-900',
    iconName: 'Flower2',
    hexagram: '【益卦】風雷益',
    summary: '感情磁場逐漸轉好，過去的誤會或陰霾將散去，迎來全新的交流與溫暖。',
    detailAdvice: [
      '放下過去情傷包袱，保持開放正面心態擁抱愛情。',
      '換個新髮型或著裝風格，提升個人內外吸引力。',
      '多微笑示人，親和力是最好的桃花催化劑。'
    ],
    luckyFactors: {
      color: '桃紅、淡綠',
      number: '3, 7',
      timeWindow: '卯時 (05:00-07:00)',
      direction: '東方'
    }
  },
  {
    id: 'm_5',
    category: 'marriage',
    name: '磨合溝通卡',
    subtitle: '換位思考 智慧化解',
    score: 75,
    element: '土',
    statusLabel: '靜心磨合',
    auraColor: 'amber',
    bgGradient: 'from-amber-950 via-stone-900 to-zinc-950',
    iconName: 'MessageSquareHeart',
    hexagram: '【解卦】夙夜解難',
    summary: '近期感情需要更多耐心與溝通，避免因生活瑣事或情緒化語言引發摩擦。',
    detailAdvice: [
      '爭執時先深呼吸停頓 10 秒，避免說出傷害感情的傷人話。',
      '定期安排「心靈對話時間」，坦承彼此的期望與壓力。',
      '把專注力放回照顧自己，成熟獨立才能帶來好的關係。'
    ],
    luckyFactors: {
      color: '暖米色、淺橙',
      number: '5, 10',
      timeWindow: '戌時 (19:00-21:00)',
      direction: '西南方'
    }
  }
];

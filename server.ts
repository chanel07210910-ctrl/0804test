import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: "5mb" }));

  // Initialize Gemini AI Client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Route: Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Route: Gemini Deep Fortune Interpretation
  app.post("/api/fortune/interpret", async (req, res) => {
    try {
      const { name, birthDate, birthTime, gender, cardsData, userQuestion } = req.body;

      const ai = getAiClient();
      if (!ai) {
        return res.status(500).json({
          error: "Gemini API key is missing. Please set GEMINI_API_KEY in Secrets.",
        });
      }

      const prompt = `
你是一位精通東方易經八字、紫微斗數與現代心靈運勢指引的「玄學運勢大師」。
請針對使用者輸入的資料與三張運勢卡（健康運、財運、婚姻運）進行深度開光指引與解盤。

【使用者資料】
- 姓名/暱稱：${name || "未具名緣主"}
- 出生日期：${birthDate || "未提供"}
- 出生時辰：${birthTime || "未提供"}
- 性別：${gender || "未指定"}
- 特別關注提問：${userQuestion || "無特別提問，請給予全方位解盤"}

【三張卡片運勢數據】
1. 健康運卡 (Health Card):
   - 分數: ${cardsData?.health?.score || 85} / 100
   - 五行屬性: ${cardsData?.health?.element || "木"}
   - 狀態標籤: ${cardsData?.health?.status || "元氣充沛"}
   - 抽出神諭牌: ${cardsData?.health?.oracleName || "長青青松牌"}

2. 財運卡 (Wealth Card):
   - 分數: ${cardsData?.wealth?.score || 88} / 100
   - 五行屬性: ${cardsData?.wealth?.element || "金"}
   - 狀態標籤: ${cardsData?.wealth?.status || "財庫豐盈"}
   - 抽出神諭牌: ${cardsData?.wealth?.oracleName || "金玉滿堂牌"}

3. 婚姻與感情運卡 (Marriage Card):
   - 分數: ${cardsData?.marriage?.score || 90} / 100
   - 五行屬性: ${cardsData?.marriage?.element || "火"}
   - 狀態標籤: ${cardsData?.marriage?.status || "紅欒星照"}
   - 抽出神諭牌: ${cardsData?.marriage?.oracleName || "月老紅線牌"}

請生成一份高度專業、溫暖且富有建設性的運勢分析，包含以下欄位：
1. masterSummary: 大師一言簡評（一句話點出整體運勢核心，約30字）
2. healthAdvice: 健康運深度開示與保養良方（約100字，針對養生、飲食或情緒建議）
3. wealthAdvice: 財運深度開示與理財契機（約100字，針對開財庫、理財方向或防坑提示）
4. marriageAdvice: 婚姻感情深度開示與相處之道（約100字，針對桃花、夫妻和睦或擇偶心法）
5. luckyCharms: 幸運加持清單（含幸運顏色、幸運數字、幸運方位、開運配件/植物）
6. dailyAffirmation: 專屬開運金句/祈福語（一句溫暖有力量的祝福）
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "你是一位和藹、權威且具備極高EQ的東方命理大師。請使用繁體中文（台灣習慣用語）回答，語氣優雅、有智慧且充滿正能量。",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              masterSummary: { type: Type.STRING, description: "大師總評" },
              healthAdvice: { type: Type.STRING, description: "健康運深度指引" },
              wealthAdvice: { type: Type.STRING, description: "財運深度指引" },
              marriageAdvice: { type: Type.STRING, description: "婚姻感情深度指引" },
              luckyCharms: {
                type: Type.OBJECT,
                properties: {
                  color: { type: Type.STRING, description: "幸運顏色" },
                  number: { type: Type.STRING, description: "幸運數字" },
                  direction: { type: Type.STRING, description: "幸運方位" },
                  item: { type: Type.STRING, description: "開運物" },
                },
                required: ["color", "number", "direction", "item"],
              },
              dailyAffirmation: { type: Type.STRING, description: "開運祝福語" },
            },
            required: [
              "masterSummary",
              "healthAdvice",
              "wealthAdvice",
              "marriageAdvice",
              "luckyCharms",
              "dailyAffirmation",
            ],
          },
        },
      });

      const resultText = response.text || "{}";
      const parsedData = JSON.parse(resultText);

      return res.json({ success: true, data: parsedData });
    } catch (err: any) {
      console.error("Gemini Fortune Error:", err);
      return res.status(500).json({
        error: "運勢解析發生錯誤：" + (err.message || "請稍後再試"),
      });
    }
  });

  // Vite Middleware or Static Delivery
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

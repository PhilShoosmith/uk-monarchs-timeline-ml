import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const terms = [
  "Whig",
  "Tory",
  "Conservative",
  "Labour",
  "Liberal",
  "National Labour",
  "Federalist",
  "Democratic-Republican",
  "Democrat",
  "Republican",
  "House of Capet",
  "House of Valois",
  "House of Bourbon",
  "House of Bonaparte",
  "House of Orléans",
  "First Republic",
  "Second Republic",
  "Third Republic",
  "Fourth Republic",
  "Fifth Republic",
  "Vichy France",
  "Provisional Government",
  "King of France",
  "King of the French",
  "Emperor of the French",
  "President of France",
  "President of the French Republic",
  "President of the United States",
  "Prime Minister of the United Kingdom",
  "Prime Minister",
  "Son (acknowledged)",
  "Daughter (acknowledged)",
  "Eldest son",
  "Second son",
  "Third son",
  "Fourth son",
  "Fifth son",
  "Eldest daughter",
  "Second daughter",
  "Youngest daughter",
  "Youngest son",
  "Illegitimate son",
  "Illegitimate daughter",
  "Adopted son",
  "Adopted daughter",
  "m.",
  "Married",
  "c.",
  "d.",
  "b."
];

const targetLangs = [
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese (Simplified)" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "ja", name: "Japanese" }
];

async function run() {
  const translations = {};
  translations["en"] = Object.fromEntries(terms.map(k => [k, k]));

  for (const { code, name } of targetLangs) {
    const prompt = `Translate the values of the following JSON into ${name}.
The JSON keys MUST remain identical in English.
Translate ONLY the values into accurate, fluent, natural ${name}.
Return ONLY valid JSON without markdown formatting.

${JSON.stringify(translations["en"], null, 2)}`;

    const res = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    try {
      translations[code] = JSON.parse(res.text.trim());
      console.log(`Terms done for ${code}`);
    } catch (e) {
      console.error(`Error for ${code}:`, e);
    }
  }

  let i18nContent = fs.readFileSync('i18n.ts', 'utf8');

  for (const lang of ['en', 'fr', 'es', 'zh', 'ar', 'hi', 'ja']) {
    if (!translations[lang]) continue;
    const entries = translations[lang];
    const regex = new RegExp(`(${lang}:\\s*\\{\\s*translation:\\s*\\{)`);
    if (regex.test(i18nContent)) {
      const additions = Object.entries(entries)
        .map(([k, v]) => `      ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
        .join('\n');
      i18nContent = i18nContent.replace(regex, `$1\n${additions}`);
      console.log(`Merged terms into ${lang}`);
    }
  }

  fs.writeFileSync('i18n.ts', i18nContent);
  console.log("Terms merged successfully!");
}

run().catch(console.error);

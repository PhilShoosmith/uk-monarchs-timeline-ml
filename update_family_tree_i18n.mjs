import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key");
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey });

const uiKeys = [
  "Monarch Family Tree",
  "Dynasty Lineage Overview",
  "Showing all spouses & known children",
  "Click any monarch node to view family",
  "Royal Lineage Tree",
  "Drag to pan, scroll to zoom • Click a monarch for family details",
  "Click to view spouses & children",
  "Click to view family tree",
  "Previous Monarch",
  "Next Monarch",
  "Monarch",
  "Parents",
  "Father",
  "Mother",
  "Father not recorded",
  "Mother not recorded",
  "Spouses",
  "Spouse",
  "Never married / No spouses",
  "This monarch never married and had no spouse.",
  "Wife {{num}}",
  "Known Children",
  "Gold cards indicate monarchs who succeeded to the throne",
  "Children with {{name}}",
  "Other Notable Known Children",
  "No known children",
  "This monarch had no known surviving legitimate children to inherit the crown.",
  "Child",
  "Son",
  "Daughter",
  "Son (acknowledged)",
  "Daughter (acknowledged)",
  "Eldest son",
  "Second son",
  "Third son",
  "Fourth son",
  "Fifth son",
  "Eldest daughter",
  "Illegitimate son",
  "Illegitimate daughter",
  "Tenure Highlights",
  "Key historical events during this reign and contemporary leaders across the UK, US, and France",
  "Collapse",
  "Expand",
  "Key Highlights During Reign",
  "Who Was in Power at That Time",
  "All Leaders",
  "UK PMs",
  "US Presidents",
  "French Rulers",
  "UK Prime Minister",
  "US President",
  "French Ruler",
  "UK Prime Ministers",
  "The office of UK Prime Minister had not yet been created (established in 1721 with Sir Robert Walpole).",
  "The United States had not yet been established as an independent nation (US Presidency established in 1789 with George Washington).",
  "No contemporary French rulers recorded for this period.",
  "Explore the Full Timelines in Dedicated Apps",
  "Dive deeper into UK PMs, French Rulers, and US Presidents on the Apple App Store & Google Play.",
  "UK Monarchs",
  "Select monarch to view family tree"
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
  translations["en"] = Object.fromEntries(uiKeys.map(k => [k, k]));

  for (const { code, name } of targetLangs) {
    console.log(`Translating for ${name} (${code})...`);
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
      const parsed = JSON.parse(res.text.trim());
      translations[code] = parsed;
      console.log(`Done ${code}`);
    } catch (e) {
      console.error(`Error parsing JSON for ${code}:`, e.message, res.text);
    }
  }

  // Now read i18n.ts and merge the new keys into each language section
  let i18nContent = fs.readFileSync('i18n.ts', 'utf8');

  for (const lang of ['en', 'fr', 'es', 'zh', 'ar', 'hi', 'ja']) {
    if (!translations[lang]) continue;
    const entries = translations[lang];

    // Find the language section in i18n.ts
    // E.g. "  en: {\n    translation: {"
    const regex = new RegExp(`(${lang}:\\s*\\{\\s*translation:\\s*\\{)`);
    if (regex.test(i18nContent)) {
      const additions = Object.entries(entries)
        .map(([k, v]) => `      ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
        .join('\n');
      i18nContent = i18nContent.replace(regex, `$1\n${additions}`);
      console.log(`Merged ${Object.keys(entries).length} keys into ${lang}`);
    } else {
      console.warn(`Could not find section for ${lang}`);
    }
  }

  fs.writeFileSync('i18n.ts', i18nContent);
  console.log("i18n.ts successfully updated!");
}

run().catch(console.error);

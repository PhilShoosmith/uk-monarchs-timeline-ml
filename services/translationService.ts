import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from '@google/genai';
import { MonarchFamily } from '../data/monarchFamilies';
import { TenureHighlightsData } from '../data/tenureHighlights';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
let aiInstance: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!aiInstance && apiKey) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const memoryCache: Record<string, Record<string, string>> = {};

function getCacheKey(text: string): string {
  // Simple hash or short slice for localStorage key
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return `ft_tr_${Math.abs(hash)}`;
}

export function getCachedTranslation(text: string, lang: string): string | null {
  if (!text || lang === 'en') return text;
  if (memoryCache[lang]?.[text]) {
    return memoryCache[lang][text];
  }
  try {
    const key = `${lang}_${getCacheKey(text)}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      if (!memoryCache[lang]) memoryCache[lang] = {};
      memoryCache[lang][text] = stored;
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

export function saveCachedTranslation(text: string, lang: string, translation: string): void {
  if (!text || !translation) return;
  if (!memoryCache[lang]) memoryCache[lang] = {};
  memoryCache[lang][text] = translation;
  try {
    const key = `${lang}_${getCacheKey(text)}`;
    localStorage.setItem(key, translation);
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Translates an array of English texts into the target language in a single batch request
 */
export async function batchTranslateTexts(
  texts: string[],
  targetLangCode: string
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  if (!texts || texts.length === 0) return result;

  if (targetLangCode === 'en') {
    texts.forEach((t) => (result[t] = t));
    return result;
  }

  const langNames: Record<string, string> = {
    fr: 'French',
    es: 'Spanish',
    zh: 'Chinese (Simplified)',
    ar: 'Arabic',
    hi: 'Hindi',
    ja: 'Japanese',
  };

  const targetLangName = langNames[targetLangCode];
  if (!targetLangName) {
    texts.forEach((t) => (result[t] = t));
    return result;
  }

  // Find strings needing translation
  const needed: string[] = [];
  texts.forEach((t) => {
    const cached = getCachedTranslation(t, targetLangCode);
    if (cached) {
      result[t] = cached;
    } else {
      needed.push(t);
    }
  });

  if (needed.length === 0) {
    return result;
  }

  const ai = getAI();
  if (!ai) {
    needed.forEach((t) => (result[t] = t));
    return result;
  }

  try {
    const prompt = `You are a professional historical translator.
Translate each of the following historical statements or notes into natural, elegant, and grammatically accurate ${targetLangName}.
Preserve historical names and dates accurately.
Input is a JSON array of English strings.
Output MUST be a valid JSON object mapping each exact English string key to its ${targetLangName} translated value.

${JSON.stringify(needed, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text.trim());
    if (parsed && typeof parsed === 'object') {
      if (Array.isArray(parsed)) {
        needed.forEach((orig, idx) => {
          if (parsed[idx]) {
            const val = String(parsed[idx]);
            saveCachedTranslation(orig, targetLangCode, val);
            result[orig] = val;
          }
        });
      } else {
        Object.entries(parsed).forEach(([k, v]) => {
          const val = String(v);
          saveCachedTranslation(k, targetLangCode, val);
          result[k] = val;
        });
      }
    }
  } catch (err) {
    console.error('Error translating texts batch:', err);
  }

  // Fallback for any remaining un-translated
  needed.forEach((t) => {
    if (!result[t]) {
      result[t] = getCachedTranslation(t, targetLangCode) || t;
    }
  });

  return result;
}

/**
 * Hook to translate a dynamic text string on screen, falling back to i18n dictionary, local cache, or live translation
 */
export function useAutoTranslate(text: string | undefined): string {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [translated, setTranslated] = useState<string>(() => {
    if (!text) return '';
    if (currentLang === 'en') return text;
    const fromI18n = t(text);
    if (fromI18n !== text) return fromI18n;
    const cached = getCachedTranslation(text, currentLang);
    return cached || text;
  });

  useEffect(() => {
    if (!text) {
      setTranslated('');
      return;
    }

    if (currentLang === 'en') {
      setTranslated(text);
      return;
    }

    const fromI18n = t(text);
    if (fromI18n !== text) {
      setTranslated(fromI18n);
      return;
    }

    const cached = getCachedTranslation(text, currentLang);
    if (cached) {
      setTranslated(cached);
      return;
    }

    let isMounted = true;
    batchTranslateTexts([text], currentLang).then((res) => {
      if (isMounted && res[text]) {
        setTranslated(res[text]);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [text, currentLang, t]);

  return translated;
}

/**
 * Hook to auto-translate all information content on the Monarch Family Tree screen for the active monarch
 */
export function useMonarchScreenAutoTranslate(
  family: MonarchFamily | undefined,
  tenure: TenureHighlightsData | undefined
) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const [, setVersion] = useState(0);
  const activeBatchRef = useRef<string>('');

  useEffect(() => {
    if (currentLang === 'en') return;

    // Collect all information texts on screen
    const textsToTranslate: string[] = [];

    if (family?.notes) textsToTranslate.push(family.notes);
    if (family?.parents?.father?.notes) textsToTranslate.push(family.parents.father.notes);
    if (family?.parents?.mother?.notes) textsToTranslate.push(family.parents.mother.notes);

    family?.spouses?.forEach((sg) => {
      if (sg.spouse?.notes) textsToTranslate.push(sg.spouse.notes);
      sg.children?.forEach((c) => {
        if (c.notes) textsToTranslate.push(c.notes);
      });
    });

    family?.otherChildren?.forEach((c) => {
      if (c.notes) textsToTranslate.push(c.notes);
    });

    if (tenure?.contemporaryContext) textsToTranslate.push(tenure.contemporaryContext);
    tenure?.keyHighlights?.forEach((kh) => textsToTranslate.push(kh));

    const leaders = [
      ...(tenure?.ukPrimeMinisters || []),
      ...(tenure?.usPresidents || []),
      ...(tenure?.frenchRulers || []),
    ];
    leaders.forEach((l) => {
      if (l.title) textsToTranslate.push(l.title);
      if (l.partyOrDynasty) textsToTranslate.push(l.partyOrDynasty);
      if (l.note) textsToTranslate.push(l.note);
    });

    // Filter out texts that already have an i18n dictionary entry or cache entry
    const unTranslated = textsToTranslate.filter((txt) => {
      if (!txt) return false;
      const dict = t(txt);
      if (dict !== txt) return false;
      return !getCachedTranslation(txt, currentLang);
    });

    if (unTranslated.length === 0) return;

    const batchKey = `${currentLang}_${unTranslated.join('|||')}`;
    if (activeBatchRef.current === batchKey) return;
    activeBatchRef.current = batchKey;

    let isMounted = true;
    batchTranslateTexts(unTranslated, currentLang).then(() => {
      if (isMounted) {
        setVersion((v) => v + 1);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [family, tenure, currentLang, t]);

  // Helper function to get the translated version of any text
  const tr = (text: string | undefined): string => {
    if (!text) return '';
    if (currentLang === 'en') return text;
    const fromI18n = t(text);
    if (fromI18n !== text) return fromI18n;
    return getCachedTranslation(text, currentLang) || text;
  };

  return { tr };
}

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Monarch, GameState, AnyLastGuess, GameMode } from './types';
import { getGameMonarchs, allMonarchs, getSuccessorGameMonarchs } from './services/gameService';
import { ROUNDS_PER_GAME, YEAR_TOLERANCE, ROUND_DURATION_SECONDS, HISTORICAL_PERIODS } from './constants';
import StartScreen from './components/StartScreen';
import Scoreboard from './components/Scoreboard';
import MonarchCard from './components/MonarchCard';
import Timeline from './components/Timeline';
import Feedback from './components/Feedback';
import EndScreen from './components/EndScreen';
import { GoogleGenAI } from '@google/genai';
import RAGModal from './components/RAGModal';
import Confetti from './components/Confetti';
import NextMonarchGuesser from './components/NextMonarchGuesser';
import MonarchGuesser from './components/MonarchGuesser';
import ReviewScreen from './components/ReviewScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import HallOfFame from './components/HallOfFame';
import FamilyTree from './components/FamilyTree';

interface GroundingSource {
  uri: string;
  title: string;
}

const periodToGradientMap: { [key: string]: string } = {
  'Norman & Plantagenet': 'from-red-800',
  'Tudor': 'from-green-800',
  'Stuart': 'from-sky-800',
  'Hanover & Windsor': 'from-purple-800',
};

const DynamicBackground: React.FC<{ period: (typeof HISTORICAL_PERIODS)[0] | null }> = ({ period }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-900">
      {HISTORICAL_PERIODS.map(p => (
        <div 
          key={p.name} 
          className={
            `absolute inset-0 bg-gradient-to-br ${periodToGradientMap[p.name]} to-slate-900 transition-opacity duration-1000 ease-in-out
             ${period?.name === p.name ? 'opacity-30' : 'opacity-0'}`
          } 
        />
      ))}
    </div>
  );
};


const parseMonarchsFromFile = (content: string): Monarch[] | null => {
  try {
    const regex = /export const allMonarchs: Monarch\[\] = (\[[\s\S]*?\]);/;
    const match = content.match(regex);
    if (!match || !match[1]) {
      console.error("Could not find monarch data in the file.");
      return null;
    }
    const arrayString = match[1];
    
    const parsedData: Monarch[] = new Function(`return ${arrayString}`)();

    if (!Array.isArray(parsedData) || (parsedData.length > 0 && (!('id' in parsedData[0]) || !('name' in parsedData[0])))) {
      console.error("Parsed data is not in the expected Monarch[] format.");
      return null;
    }
    return parsedData;
  } catch (error) {
    console.error("Error parsing monarch data file:", error);
    return null;
  }
};

import { useTranslation } from 'react-i18next';

const InstructionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-modal-title"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <h2 id="instructions-modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            {t("How to Play UK Monarchs Timeline")}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto text-slate-300 space-y-4">
           <div>
            <h3 className="font-bold text-lg text-white mb-2">{t("The Goal")}</h3>
            <p>{t("Your goal is to test your knowledge of British monarchs. The game consists of {{rounds}} rounds.", { rounds: ROUNDS_PER_GAME })}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white mb-2">{t("Game Modes")}</h3>
             <ul className="list-disc list-inside space-y-3">
              <li>
                <strong className="bg-blue-600 text-white px-1.5 py-0.5 rounded">{t("Guess the Year")}:</strong> {t("Guess the Year description")}
              </li>
              <li>
                <strong className="bg-blue-600 text-white px-1.5 py-0.5 rounded">{t("Guess the Successor")}:</strong> {t("Guess the Successor description")}
              </li>
              <li>
                <strong className="bg-blue-600 text-white px-1.5 py-0.5 rounded">{t("Guess the Monarch")}:</strong> {t("Guess from Fact description")}
              </li>
            </ul>
             <p className="mt-4">{t("Timer description", { duration: ROUND_DURATION_SECONDS })}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white mb-2">{t("Scoring")}</h3>
            <p>
              {t("Scoring description", { tolerance: YEAR_TOLERANCE })}
            </p>
          </div>
           <div>
            <h3 className="font-bold text-lg text-white mb-2">{t("Learn More")}</h3>
            <p>{t("Learn More description")}</p>
          </div>
        </div>
         <footer className="p-4 flex justify-end border-t border-slate-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            >
              {t("Got it!")}
            </button>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    document.documentElement.dir = i18n.language?.startsWith('ar') ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const [gameState, setGameState] = useState<GameState>('start');
  const [gameMode, setGameMode] = useState<GameMode>('year');
  const [allMonarchsData, setAllMonarchsData] = useState<Monarch[]>(allMonarchs);
  const [gameMonarchIds, setGameMonarchIds] = useState<number[]>([]);
  
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [totalTimeLeft, setTotalTimeLeft] = useState<number>(0);
  const [lastGuess, setLastGuess] = useState<AnyLastGuess | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(ROUND_DURATION_SECONDS);
  const [typedYear, setTypedYear] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminViewIndex, setAdminViewIndex] = useState<number>(0);
  const timerIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timeLeftRef = useRef<number>(timeLeft);

  const [stagedPortraitChanges, setStagedPortraitChanges] = useState<Record<number, string>>({});
  const [stagedCoatOfArmsChanges, setStagedCoatOfArmsChanges] = useState<Record<number, string>>({});
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [uploadMessage, setUploadMessage] = useState<string>('');
  
  // RAG Modal State
  const [isRagModalOpen, setIsRagModalOpen] = useState<boolean>(false);
  const [ragContent, setRagContent] = useState<{ title: string; text: string; imageUrl?: string; } | null>(null);
  const [ragSources, setRagSources] = useState<GroundingSource[]>([]);
  const [isRagLoading, setIsRagLoading] = useState<boolean>(false);
  const [isRagTranslating, setIsRagTranslating] = useState<boolean>(false);

  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const monarchs = useMemo(() =>
    gameMonarchIds
      .map(id => allMonarchsData.find(m => m.id === id))
      .filter((m): m is Monarch => m !== undefined),
    [gameMonarchIds, allMonarchsData]
  );

  const clearTimer = useCallback(() => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, []);

  const startGame = useCallback((mode: GameMode) => {
    setShowConfetti(false);
    setGameMode(mode);
    const gameMonarchs = mode === 'monarch' 
      ? getSuccessorGameMonarchs(allMonarchsData)
      : getGameMonarchs(allMonarchsData);
    setGameMonarchIds(gameMonarchs.map(m => m.id));
    setCurrentRound(0);
    setScore(0);
    setTotalTimeLeft(0);
    setLastGuess(null);
    setTypedYear('');
    setGameState('playing');
  }, [allMonarchsData]);

  const openInstructions = useCallback(() => setIsInstructionsOpen(true), []);
  const closeInstructions = useCallback(() => setIsInstructionsOpen(false), []);

  const handleReview = useCallback(() => {
    setGameState('review');
  }, []);

  const handlePrivacy = useCallback(() => {
    setGameState('privacy');
  }, []);

  const handleTerms = useCallback(() => {
    setGameState('terms');
  }, []);

  const handleHallOfFame = useCallback(() => {
    setGameState('hall-of-fame');
  }, []);

  const [familyTreeMonarchId, setFamilyTreeMonarchId] = useState<number>(1);

  const handleFamilyTree = useCallback((monarchId?: number) => {
    if (typeof monarchId === 'number') {
      setFamilyTreeMonarchId(monarchId);
    }
    setGameState('family-tree');
  }, []);

  const handleExitReview = useCallback(() => {
    setGameState('start');
  }, []);

  const handleYearGuess = useCallback((guessedYear: number) => {
    if (gameState !== 'playing' || !monarchs[currentRound]) return;
    clearTimer();
    const correctYear = monarchs[currentRound].reignStart;
    const timedOut = guessedYear === 0;
    const isCorrect = !timedOut && Math.abs(guessedYear - correctYear) <= YEAR_TOLERANCE;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setShowConfetti(true);
    }

    setLastGuess({ type: 'year', isCorrect, guessedYear, correctYear, timedOut });
  }, [monarchs, currentRound, clearTimer, gameState]);

  const handleMonarchGuess = useCallback((guessedMonarchId: number) => {
    if (gameState !== 'playing' || !monarchs[currentRound]) return;
    clearTimer();

    const currentMonarchInFullList = allMonarchsData.findIndex(m => m.id === monarchs[currentRound].id);
    const correctSuccessor = allMonarchsData[currentMonarchInFullList + 1];
    
    if (!correctSuccessor) {
      console.error("Could not find a successor for the current monarch.");
      return;
    }
    
    const correctMonarchId = correctSuccessor.id;
    const timedOut = guessedMonarchId === 0;
    const isCorrect = !timedOut && guessedMonarchId === correctMonarchId;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setShowConfetti(true);
    }

    setLastGuess({ type: 'monarch', isCorrect, guessedMonarchId, correctMonarchId, timedOut });
  }, [monarchs, currentRound, clearTimer, allMonarchsData, gameState]);
  
  const handleFactGuess = useCallback((guessedMonarchId: number) => {
    if (gameState !== 'playing' || !monarchs[currentRound]) return;
    clearTimer();
    const correctMonarchId = monarchs[currentRound].id;
    const timedOut = guessedMonarchId === 0;
    const isCorrect = !timedOut && guessedMonarchId === correctMonarchId;
  
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setTotalTimeLeft(prev => prev + timeLeftRef.current);
      setShowConfetti(true);
    }
  
    setLastGuess({ type: 'fact', isCorrect, guessedMonarchId, correctMonarchId, timedOut });
  }, [monarchs, currentRound, clearTimer, gameState]);

  // Handle the transition to the feedback screen after a short delay
  useEffect(() => {
    if (lastGuess) {
      const timer = setTimeout(() => {
        setGameState('feedback');
      }, 1500); // 1.5 second delay to show visual feedback

      return () => clearTimeout(timer);
    }
  }, [lastGuess]);

  useEffect(() => {
    if (gameState === 'playing' && !isAdmin) {
      setTimeLeft(ROUND_DURATION_SECONDS);
      timerIdRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if(gameMode === 'year') {
              handleYearGuess(0);
            } else if (gameMode === 'monarch') {
              handleMonarchGuess(0);
            } else { // 'fact'
              handleFactGuess(0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
      if (gameState === 'playing') {
        setTimeLeft(ROUND_DURATION_SECONDS);
      }
    }

    return clearTimer;
  }, [gameState, currentRound, isAdmin, gameMode, handleYearGuess, handleMonarchGuess, handleFactGuess, clearTimer]);

  const nextRound = useCallback(() => {
    setShowConfetti(false);
    if (currentRound + 1 < ROUNDS_PER_GAME) {
      setCurrentRound(prev => prev + 1);
      setLastGuess(null);
      setTypedYear('');
      setGameState('playing');
      window.scrollTo(0, 0);
    } else {
      setGameState('end');
    }
  }, [currentRound]);

  const handleStopGame = useCallback(() => {
    setGameState('start');
  }, []);

  const handleTypedGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing' || !typedYear.trim()) return;

    if (typedYear === '568082') {
      setIsAdmin(true);
      const currentMonarchInGame = monarchs[currentRound];
      if (currentMonarchInGame) {
        const indexInAll = allMonarchsData.findIndex(m => m.id === currentMonarchInGame.id);
        setAdminViewIndex(indexInAll >= 0 ? indexInAll : 0);
      } else {
        setAdminViewIndex(0);
      }
      setTypedYear('');
      return;
    }

    if (typedYear === '000000') {
      setIsAdmin(false);
      setTypedYear('');
      return;
    }
    
    const year = parseInt(typedYear, 10);
    if (!isNaN(year)) {
      handleYearGuess(year);
    }
  };

  const handleAdminViewChange = useCallback((newIndexValue: string) => {
    const newIndex = parseInt(newIndexValue, 10);
    if (isNaN(newIndex)) return;

    setAdminViewIndex(newIndex);
    setLastGuess(null);
    setTypedYear('');
    setSaveMessage('');
    if (gameState === 'start' || gameState === 'end') {
        setGameState('playing');
    }
  }, [gameState]);
  
  const handleAdminNav = useCallback((direction: 'next' | 'prev') => {
    if (!isAdmin) return;
    setAdminViewIndex(prevIndex => (direction === 'next' ? (prevIndex + 1) % allMonarchsData.length : (prevIndex - 1 + allMonarchsData.length) % allMonarchsData.length));
    setLastGuess(null);
    setTypedYear('');
    setSaveMessage('');
    if (gameState === 'start' || gameState === 'end') {
        setGameState('playing');
    }
  }, [isAdmin, gameState, allMonarchsData]);

  const handlePortraitUpload = useCallback((monarchId: number, newImageUrl: string) => {
    if (!isAdmin) return;
    setStagedPortraitChanges(prev => ({ ...prev, [monarchId]: newImageUrl }));
  }, [isAdmin]);

  const handleCoatOfArmsUpload = useCallback((monarchId: number, newImageUrl: string) => {
    if (!isAdmin) return;
    setStagedCoatOfArmsChanges(prev => ({ ...prev, [monarchId]: newImageUrl }));
  }, [isAdmin]);

  const handleSaveChanges = useCallback(() => {
    const changesExist = Object.keys(stagedPortraitChanges).length > 0 || Object.keys(stagedCoatOfArmsChanges).length > 0;
    if (!isAdmin || !changesExist) return;
    
    const updatedMonarchsData = allMonarchsData.map(monarch => {
      const updatedMonarch = { ...monarch };
      if (stagedPortraitChanges[monarch.id]) {
        updatedMonarch.imageUrl = stagedPortraitChanges[monarch.id];
      }
      if (stagedCoatOfArmsChanges[monarch.id]) {
        updatedMonarch.coatOfArmsUrl = stagedCoatOfArmsChanges[monarch.id];
      }
      return updatedMonarch;
    });

    const fileContent = `import { Monarch } from '../types';
import { ROUNDS_PER_GAME } from '../constants';

// This file can be updated via the in-game admin panel.
export const allMonarchs: Monarch[] = ${JSON.stringify(updatedMonarchsData, null, 2)};

export const getGameMonarchs = (sourceMonarchs: Monarch[]): Monarch[] => {
  const shuffled = [...sourceMonarchs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, ROUNDS_PER_GAME);
};`;

    const blob = new Blob([fileContent], { type: 'application/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameService.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setAllMonarchsData(updatedMonarchsData);
    setStagedPortraitChanges({});
    setStagedCoatOfArmsChanges({});
    setSaveMessage('File downloaded! Replace services/gameService.ts in your project folder to save changes.');
    setTimeout(() => setSaveMessage(''), 8000);
  }, [isAdmin, allMonarchsData, stagedPortraitChanges, stagedCoatOfArmsChanges]);

  const handleDataUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadMessage(`Reading ${file.name}...`);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        const parsedMonarchs = parseMonarchsFromFile(content);
        if (parsedMonarchs) {
          setAllMonarchsData(parsedMonarchs);
          setUploadMessage(`Success! Loaded ${parsedMonarchs.length} monarchs from ${file.name}. Changes are for the current session only.`);
          setAdminViewIndex(0); // Reset index to avoid out-of-bounds
        } else {
          setUploadMessage(`Failed to parse ${file.name}. Please ensure it's a valid gameService.ts file.`);
        }
      } else {
        setUploadMessage(`File ${file.name} appears to be empty.`);
      }
      setTimeout(() => setUploadMessage(''), 8000);
    };
    reader.onerror = () => {
      setUploadMessage(`Error reading file ${file.name}.`);
      setTimeout(() => setUploadMessage(''), 8000);
    };
    reader.readAsText(file);

    event.target.value = '';
  }, []);

  const handlePreviousMonarch = useCallback(() => handleAdminNav('prev'), [handleAdminNav]);
  const handleNextMonarch = useCallback(() => handleAdminNav('next'), [handleAdminNav]);

  const handleLearnMore = useCallback(async (monarch: Monarch) => {
    setIsRagModalOpen(true);
    setIsRagLoading(true);
    setRagContent({ title: monarch.name, text: '', imageUrl: monarch.imageUrl });
    setRagSources([]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API_KEY environment variable not set");
      }
      const ai = new GoogleGenAI({ apiKey });
      const translatedName = t(monarch.name);
      const targetLanguage = i18n.language?.startsWith('zh') ? 'Chinese' : i18n.language?.startsWith('ar') ? 'Arabic' : i18n.language?.startsWith('es') ? 'Spanish' : i18n.language?.startsWith('hi') ? 'Hindi' : i18n.language?.startsWith('ja') ? 'Japanese' : i18n.language?.startsWith('fr') ? 'French' : 'English';
      
      const prompt = `Search the internet for information about the British monarch ${monarch.name}. 
      Write a brief history about them in an engaging and accessible tone. Focus on their rise to power, key events during their reign, and their legacy. Keep it concise, around 3-4 paragraphs.
      
      CRITICAL INSTRUCTION: You must translate the information you find on the internet on the fly and write your ENTIRE final response in ${targetLanguage}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{googleSearch: {}}],
        },
      });

      setRagContent({ title: monarch.name, text: response.text, imageUrl: monarch.imageUrl });
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = (groundingChunks as any[] || [])
        .map(chunk => chunk.web)
        .filter((web): web is GroundingSource => !!(web?.uri && web.title));
      
      const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
      setRagSources(uniqueSources);

    } catch (error) {
      console.error("Error fetching data from Gemini API", error);
      setRagContent({ title: monarch.name, text: t("Sorry, I couldn't fetch more information at this time. Please check your API key and network connection."), imageUrl: monarch.imageUrl });
    } finally {
      setIsRagLoading(false);
    }
  }, [t, i18n.language]);

  const closeRagModal = () => setIsRagModalOpen(false);

  const handleTranslateRag = useCallback(async () => {
    if (!ragContent || !ragContent.text) return;
    setIsRagTranslating(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API_KEY environment variable not set");
      const ai = new GoogleGenAI({ apiKey });
      const targetLanguage = i18n.language?.startsWith('zh') ? 'Chinese' : i18n.language?.startsWith('ar') ? 'Arabic' : i18n.language?.startsWith('es') ? 'Spanish' : i18n.language?.startsWith('hi') ? 'Hindi' : i18n.language?.startsWith('ja') ? 'Japanese' : i18n.language?.startsWith('fr') ? 'French' : 'English';
      
      const prompt = `Translate the following text into ${targetLanguage}. Maintain the original formatting and tone.\n\n${ragContent.text}`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setRagContent(prev => prev ? { ...prev, text: response.text } : null);
    } catch (error) {
      console.error("Error translating content", error);
    } finally {
      setIsRagTranslating(false);
    }
  }, [ragContent, i18n.language]);

  const getPeriodForMonarch = (monarch: Monarch | undefined): (typeof HISTORICAL_PERIODS)[0] | null => {
    if (!monarch) return null;
    return HISTORICAL_PERIODS.find(p => monarch.reignStart >= p.start && monarch.reignStart <= p.end) || null;
  };
  
  const currentMonarch = isAdmin ? allMonarchsData[adminViewIndex] : monarchs[currentRound];
  const currentPeriod = useMemo(() => getPeriodForMonarch(currentMonarch), [currentMonarch]);
  const stagedChangesCount = Object.keys(stagedPortraitChanges).length + Object.keys(stagedCoatOfArmsChanges).length;

  const factGuesserOptions = useMemo(() => {
      if (gameMode !== 'fact' || !currentMonarch) return [];
      
      const correct = currentMonarch;
      const distractors = allMonarchsData
          .filter(m => m.id !== correct.id && Math.abs(m.reignStart - correct.reignStart) < 100) // distractors from a 100-year window
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
      
      if (distractors.length < 3) {
          const randomDistractors = allMonarchsData
              .filter(m => m.id !== correct.id && !distractors.some(d => d.id === m.id))
              .sort(() => 0.5 - Math.random())
              .slice(0, 3 - distractors.length);
          distractors.push(...randomDistractors);
      }

      return [correct, ...distractors].sort(() => 0.5 - Math.random());
  }, [gameMode, currentMonarch, allMonarchsData]);

  const renderGameScreen = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStart={startGame} monarchs={allMonarchsData} onShowInstructions={openInstructions} onReview={handleReview} onPrivacy={handlePrivacy} onTerms={handleTerms} onShowHallOfFame={handleHallOfFame} onShowFamilyTree={handleFamilyTree} />;
      case 'review':
        return <ReviewScreen monarchs={allMonarchsData} onExit={handleExitReview} onLearnMore={handleLearnMore} onShowFamilyTree={(m) => handleFamilyTree(m.id)} />;
      case 'family-tree':
        return <FamilyTree monarchs={allMonarchsData} onBack={handleExitReview} initialMonarchId={familyTreeMonarchId} />;
      case 'privacy':
        return <PrivacyPolicy onBack={handleExitReview} />;
      case 'terms':
        return <TermsOfService onBack={handleExitReview} />;
      case 'hall-of-fame':
        return <HallOfFame onBack={handleExitReview} />;
      case 'end':
        return <EndScreen score={score} timeLeft={totalTimeLeft} gameMode={gameMode} onRestart={() => setGameState('start')} onShowHallOfFame={handleHallOfFame} />;
      case 'playing':
      case 'feedback':
        if (!currentMonarch) return null;
        const incorrectAnswers = currentRound - score;
        return (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start min-h-screen py-8">
            {isAdmin && (
              <div className="fixed top-24 right-4 bg-purple-900/80 p-2 rounded border border-purple-600 z-50 shadow-lg flex flex-col items-center gap-2 w-48">
                <p className="font-mono text-sm text-yellow-300">Admin: {currentMonarch.reignStart}</p>
                 <select
                  value={adminViewIndex}
                  onChange={(e) => handleAdminViewChange(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Select monarch to view"
                >
                  {allMonarchsData.map((monarch, index) => (
                    <option key={monarch.id} value={index}>
                      {monarch.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <button onClick={handlePreviousMonarch} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors" aria-label="Previous Monarch">&lt; Prev</button>
                  <button onClick={handleNextMonarch} className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors" aria-label="Next Monarch">Next &gt;</button>
                </div>

                {stagedChangesCount > 0 && (
                  <div className="flex flex-col gap-2 w-full mt-2 pt-2 border-t border-purple-700">
                    <p className="text-xs font-bold text-slate-200 text-center">Pending Changes</p>
                    <p className="text-xs text-slate-300 text-center">{stagedChangesCount} pending change{stagedChangesCount > 1 ? 's' : ''}</p>
                    <button onClick={handleSaveChanges} className="px-2 py-1 text-xs bg-green-600 hover:bg-green-500 rounded text-white font-bold transition-colors" aria-label="Download updated data file">Download File</button>
                    <button onClick={() => { setStagedPortraitChanges({}); setStagedCoatOfArmsChanges({}); setSaveMessage(''); }} className="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded text-slate-200 transition-colors" aria-label="Discard all pending changes">Discard All</button>
                  </div>
                )}
                {saveMessage && (
                  <div className="w-full mt-2 p-2 bg-slate-700 border border-slate-600 rounded text-center text-xs text-slate-200">
                      <p className="font-bold mb-1">Data Saved!</p>
                      <p>{saveMessage}</p>
                  </div>
                )}
                
                <div className="flex flex-col gap-2 w-full mt-2 pt-2 border-t border-purple-700">
                  <p className="text-xs font-bold text-slate-200 text-center">Game Data</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors"
                    aria-label="Import monarch data file"
                  >
                    Import `gameService.ts`
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleDataUpload}
                    className="hidden"
                    accept=".ts,application/typescript"
                  />
                </div>
                {uploadMessage && (
                    <div className="w-full mt-2 p-2 bg-slate-700 border border-slate-600 rounded text-center text-xs text-slate-200">
                        <p>{uploadMessage}</p>
                    </div>
                )}
              </div>
            )}
            <Scoreboard score={score} incorrect={incorrectAnswers} round={currentRound + 1} totalRounds={ROUNDS_PER_GAME} timeLeft={timeLeft} isAdmin={isAdmin} />
            
            <div className="mt-16 md:mt-24 w-full flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-8">
              <div className="w-full max-w-sm mx-auto lg:mx-0 flex-shrink-0">
                {gameMode === 'fact' && gameState === 'playing' ? (
                   <div className="p-8 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 w-full min-h-[500px] flex flex-col justify-center text-center animate-fade-in-up">
                      <p className="text-xl text-slate-400 font-light mb-4">{t("Which monarch...")}</p>
                      <blockquote className="text-3xl text-white font-serif italic leading-snug">
                          "{t(currentMonarch.context)}"
                      </blockquote>
                  </div>
                ) : (
                  <MonarchCard
                    monarch={currentMonarch}
                    showReign={gameState === 'feedback' || isAdmin}
                    isAdmin={isAdmin}
                    onPortraitUpload={handlePortraitUpload}
                    stagedPortraitUrl={stagedPortraitChanges[currentMonarch?.id]}
                    onCoatOfArmsUpload={handleCoatOfArmsUpload}
                    stagedCoatOfArmsUrl={stagedCoatOfArmsChanges[currentMonarch?.id]}
                  />
                )}
              </div>

              <div className="w-full lg:max-w-md mt-8 lg:mt-0">
                {gameState === 'feedback' ? (
                  <Feedback lastGuess={lastGuess!} onNext={nextRound} monarch={currentMonarch} onLearnMore={handleLearnMore} allMonarchs={allMonarchsData} onStop={handleStopGame} />
                ) : (
                   <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 animate-fade-in-up">
                    {gameMode === 'year' ? (
                       <>
                        <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">{t("Place {{name}} on the timeline, or enter the year below.", { name: t(currentMonarch.name) })}</p>
                        <form onSubmit={handleTypedGuess} className="flex flex-col sm:flex-row items-center gap-4 w-full">
                            <input type="number" value={typedYear} onChange={(e) => setTypedYear(e.target.value)} disabled={gameState !== 'playing'} placeholder={t("e.g., 1603")} className="bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white text-lg w-full sm:flex-grow text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50" aria-label="Enter reign start year" />
                            <button type="submit" disabled={gameState !== 'playing' || !typedYear.trim()} className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-500/50">{t("Submit")}</button>
                        </form>
                       </>
                    ) : gameMode === 'monarch' ? (
                       <>
                        <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">{t("Who was the successor to {{name}}?", { name: t(currentMonarch.name) })}</p>
                         <NextMonarchGuesser monarchs={allMonarchsData} onSubmit={handleMonarchGuess} disabled={gameState !== 'playing'} lastGuess={lastGuess} />
                       </>
                    ) : (
                       <>
                        <p className="text-lg md:text-xl text-slate-300 font-light mb-4 text-center">{t("Who is it?")}</p>
                        <MonarchGuesser options={factGuesserOptions} onSubmit={handleFactGuess} disabled={gameState !== 'playing'} lastGuess={lastGuess} />
                       </>
                    )}
                   </div>
                )}
              </div>
            </div>
            
            {gameMode === 'year' && (
              <div className="w-full mt-8">
                 <Timeline onGuess={handleYearGuess} disabled={gameState !== 'playing'} lastGuess={lastGuess?.type === 'year' ? lastGuess : null} allMonarchs={monarchs} />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen w-full text-white font-sans flex items-center justify-center">
      <DynamicBackground period={gameState === 'start' || gameState === 'end' ? null : currentPeriod} />
      {showConfetti && <Confetti />}
      {renderGameScreen()}
      <RAGModal
        isOpen={isRagModalOpen}
        isLoading={isRagLoading}
        isTranslating={isRagTranslating}
        content={ragContent}
        sources={ragSources}
        onClose={closeRagModal}
        onTranslate={handleTranslateRag}
      />
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={closeInstructions}
      />
    </main>
  );
};

export default App;

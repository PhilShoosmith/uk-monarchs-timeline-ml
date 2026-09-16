import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Monarch, GameMode } from '../types';
import { useTranslation } from 'react-i18next';

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FranceFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="3" height="2" fill="#ED2939"/>
    <rect width="2" height="2" fill="#fff"/>
    <rect width="1" height="2" fill="#002395"/>
  </svg>
);

const JapanFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="900" height="600" fill="#fff"/>
    <circle cx="450" cy="300" r="180" fill="#bc002d"/>
  </svg>
);

const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 150" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="225" height="150" fill="#f93"/>
    <rect width="225" height="100" y="50" fill="#fff"/>
    <rect width="225" height="50" y="100" fill="#128807"/>
    <circle cx="112.5" cy="75" r="20" fill="#000088"/>
    <circle cx="112.5" cy="75" r="17.5" fill="#fff"/>
    <circle cx="112.5" cy="75" r="3.5" fill="#000088"/>
    <g id="d">
      <g id="c">
        <g id="b">
          <g id="a">
            <polygon points="112.5,55 111,71.5 112.5,71.5" fill="#000088"/>
            <polygon points="112.5,55 114,71.5 112.5,71.5" fill="#000088"/>
          </g>
          <use href="#a" transform="rotate(15 112.5 75)"/>
        </g>
        <use href="#b" transform="rotate(30 112.5 75)"/>
      </g>
      <use href="#c" transform="rotate(60 112.5 75)"/>
    </g>
    <use href="#d" transform="rotate(120 112.5 75)"/>
    <use href="#d" transform="rotate(-120 112.5 75)"/>
  </svg>
);

const SpainFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="3" height="2" fill="#c60b1e"/>
    <rect width="3" height="1" y="0.5" fill="#ffc400"/>
  </svg>
);

const UAEFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="6" height="3" fill="#fff"/>
    <rect width="6" height="1" fill="#00732f"/>
    <rect width="6" height="1" y="2" fill="#000"/>
    <rect width="1.5" height="3" fill="#ff0000"/>
  </svg>
);

const ChinaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shadow-sm object-cover">
    <rect width="30" height="20" fill="#ee1c25"/>
    <g fill="#ffce00" transform="translate(5,5) scale(3)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
    <g fill="#ffce00" transform="translate(10,2) rotate(23) scale(1)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
    <g fill="#ffce00" transform="translate(12,4) rotate(46) scale(1)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
    <g fill="#ffce00" transform="translate(12,7) rotate(70) scale(1)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
    <g fill="#ffce00" transform="translate(10,9) rotate(93) scale(1)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
  </svg>
);

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
  monarchs: Monarch[];
  onShowInstructions: () => void;
  onReview: () => void;
  onPrivacy: () => void;
  onTerms: () => void;
  onShowHallOfFame: () => void;
  onShowFamilyTree: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, monarchs, onShowInstructions, onReview, onPrivacy, onTerms, onShowHallOfFame, onShowFamilyTree }) => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English', icon: <UKFlag /> },
    { code: 'zh', label: '中文', icon: <ChinaFlag /> },
    { code: 'hi', label: 'हिन्दी', icon: <IndiaFlag /> },
    { code: 'es', label: 'Español', icon: <SpainFlag /> },
    { code: 'ar', label: 'العربية', icon: <UAEFlag /> },
    { code: 'fr', label: 'Français', icon: <FranceFlag /> },
    { code: 'ja', label: '日本語', icon: <JapanFlag /> }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  // Get all available portraits for the carousel
  const allPortraits = monarchs
    .map(monarch => ({
      id: monarch.id,
      name: monarch.name,
      url: monarch.imageUrl,
    }))
    .filter(p => p.url); // Filter out any monarchs that might be missing a portrait URL

  // Calculate a dynamic duration to keep the scroll speed consistent
  const animationDuration = allPortraits.length * 5; // 5 seconds per portrait for a slow, ambient scroll

  const dailyMonarchIndex = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return daysSinceEpoch % monarchs.length;
  }, [monarchs.length]);
  
  const dailyFactMonarch = monarchs[dailyMonarchIndex];

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Portrait Carousel */}
      <div className="absolute inset-0 flex items-center opacity-20 scale-110 blur-sm">
        <div 
          className="flex-shrink-0 flex items-center"
          style={{ animation: `scroll ${animationDuration}s linear infinite` }}
        >
          {/* Render the list of portraits twice for a seamless infinite loop */}
          {[...allPortraits, ...allPortraits].map((portrait, index) => (
            <div key={`${portrait.id}-${index}`} className="w-48 h-64 md:w-64 md:h-80 flex-shrink-0 mx-2">
              <img 
                src={portrait.url} 
                alt={portrait.name} 
                className="w-full h-full object-cover rounded-lg shadow-lg" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-50" ref={langRef}>
        <button 
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-2 bg-slate-800 text-white border border-slate-600 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-700 transition-colors"
        >
          {currentLang.icon}
          <span>{currentLang.label}</span>
          <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        
        {isLangOpen && (
          <div className="absolute right-0 mt-1 w-full min-w-[120px] bg-slate-800 border border-slate-600 rounded-md shadow-lg overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${i18n.language === lang.code ? 'bg-slate-700/50' : ''}`}
              >
                {lang.icon}
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-4 mt-8 md:mt-0">
        {/* Main Content Card */}
        <div className="relative text-center p-6 bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 w-full max-w-lg mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 animate-fade-in-up">
            {t("UK Monarchs Timeline")}
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-4 animate-fade-in-up animation-delay-200">
            {t("How well do you know your British monarchs?")}<br />
            {t("Choose your challenge to begin!")}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            {/* Column 1: Info & Review */}
            <div className="flex flex-col gap-3 w-full sm:w-48">
              <h2 className="text-lg font-bold text-yellow-400 mb-1 border-b border-slate-600 pb-1">{t("Learn")}</h2>
              <button
                onClick={onShowInstructions}
                className="w-full px-4 py-2 text-sm bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
                aria-label="Show game instructions"
              >
                {t("How to Play")}
              </button>
              <button
                onClick={onReview}
                className="w-full px-4 py-2 text-sm bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
                aria-label="Review all monarchs"
              >
                {t("Review Monarchs")}
              </button>
              <button
                onClick={onShowFamilyTree}
                className="w-full px-4 py-2 text-sm bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
              >
                {t("Family Tree")}
              </button>
            </div>

            {/* Column 2: Game Modes */}
            <div className="flex flex-col gap-3 w-full sm:w-48">
              <h2 className="text-lg font-bold text-blue-400 mb-1 border-b border-slate-600 pb-1">{t("Play")}</h2>
               <button
                onClick={() => onStart('fact')}
                className="w-full px-4 py-2 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                {t("Guess the Monarch")}
              </button>
              <button
                onClick={() => onStart('year')}
                className="w-full px-4 py-2 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                {t("Guess the Year")}
              </button>
              <button
                onClick={() => onStart('monarch')}
                className="w-full px-4 py-2 text-sm bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              >
                {t("Guess the Successor")}
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center animate-fade-in-up animation-delay-500">
            <button 
              onClick={onShowHallOfFame}
              className="flex items-center gap-2 transition-transform duration-200 ease-in-out hover:scale-105 text-white hover:text-slate-200 font-bold"
              title="Hall of Fame"
              aria-label="View Hall of Fame"
            >
              <span>{t("Hall of Fame")} &rarr;</span>
              <span className="text-2xl drop-shadow-md" role="img" aria-label="Gold Medal">🥇</span>
            </button>
          </div>
        </div>

        {/* Daily Historical Fact Banner */}
        {dailyFactMonarch && (
          <div className="relative w-full max-w-lg mx-auto p-4 bg-slate-800/90 backdrop-blur-md rounded-xl border border-amber-500/30 shadow-2xl animate-fade-in-up animation-delay-600">
            <div className="flex items-start gap-4">
              <div className="text-3xl pt-1 drop-shadow-md">👑</div>
              <div className="text-left flex-1">
                <h3 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  {t("Daily Historical Fact")}
                </h3>
                <p className="text-slate-200 text-sm italic leading-relaxed">
                  "{t(dailyFactMonarch.context)}"
                </p>
                <p className="text-slate-400 text-xs font-semibold mt-2 text-right">
                  — {t(dailyFactMonarch.name)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links at the bottom of the screen */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 text-xs text-slate-500 font-medium animate-fade-in-up animation-delay-600 z-20 px-4 flex-wrap">
        <button onClick={onPrivacy} className="hover:text-slate-300 transition-colors hover:underline">{t("Privacy Policy")}</button>
        <span>&bull;</span>
        <button onClick={onTerms} className="hover:text-slate-300 transition-colors hover:underline">{t("Terms of Service")}</button>
        <span>&bull;</span>
        <div className="flex items-center gap-2">
          <a 
            href="mailto:historicaltimelines4@gmail.com?subject=UK%20Monarchs%20Timeline&body=BODY" 
            className="hover:text-slate-300 transition-colors hover:underline"
          >
            {t("Feedback")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
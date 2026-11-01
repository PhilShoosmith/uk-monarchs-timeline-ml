import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <clipPath id="ls-s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="ls-t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#ls-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#ls-t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

export const FranceFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="3" height="2" fill="#ED2939"/>
    <rect width="2" height="2" fill="#fff"/>
    <rect width="1" height="2" fill="#002395"/>
  </svg>
);

export const JapanFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="900" height="600" fill="#fff"/>
    <circle cx="450" cy="300" r="180" fill="#bc002d"/>
  </svg>
);

export const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 150" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="225" height="150" fill="#f93"/>
    <rect width="225" height="100" y="50" fill="#fff"/>
    <rect width="225" height="50" y="100" fill="#128807"/>
    <circle cx="112.5" cy="75" r="20" fill="#000088"/>
    <circle cx="112.5" cy="75" r="17.5" fill="#fff"/>
    <circle cx="112.5" cy="75" r="3.5" fill="#000088"/>
  </svg>
);

export const SpainFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="3" height="2" fill="#c60b1e"/>
    <rect width="3" height="1" y="0.5" fill="#ffc400"/>
  </svg>
);

export const UAEFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="6" height="3" fill="#fff"/>
    <rect width="6" height="1" fill="#00732f"/>
    <rect width="6" height="1" y="2" fill="#000"/>
    <rect width="1.5" height="3" fill="#ff0000"/>
  </svg>
);

export const ChinaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shadow-sm object-cover flex-shrink-0">
    <rect width="30" height="20" fill="#ee1c25"/>
    <g fill="#ffce00" transform="translate(5,5) scale(3)">
      <polygon points="0,-1 0.588,0.809 -0.951,-0.309 0.951,-0.309 -0.588,0.809"/>
    </g>
  </svg>
);

export const languages = [
  { code: 'en', label: 'English', icon: <UKFlag /> },
  { code: 'zh', label: '中文', icon: <ChinaFlag /> },
  { code: 'hi', label: 'हिन्दी', icon: <IndiaFlag /> },
  { code: 'es', label: 'Español', icon: <SpainFlag /> },
  { code: 'ar', label: 'العربية', icon: <UAEFlag /> },
  { code: 'fr', label: 'Français', icon: <FranceFlag /> },
  { code: 'ja', label: '日本語', icon: <JapanFlag /> }
];

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 text-white border border-slate-700 hover:border-slate-600 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-slate-700 transition-all cursor-pointer shadow"
        aria-label="Change language"
      >
        {currentLang.icon}
        <span className="truncate max-w-[80px] sm:max-w-none">{currentLang.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 py-1 backdrop-blur-md">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm text-left hover:bg-slate-700/80 transition-colors ${
                i18n.language === lang.code ? 'bg-amber-500/10 text-amber-300 font-semibold' : 'text-slate-200'
              }`}
            >
              {lang.icon}
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

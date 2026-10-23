import React from 'react';
import { ROUND_DURATION_SECONDS } from '../constants';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX } from 'lucide-react';

interface ScoreboardProps {
  score: number;
  incorrect: number;
  round: number;
  totalRounds: number;
  timeLeft: number;
  isAdmin: boolean;
  isMuted?: boolean;
  onToggleMute?: () => void;
  title?: string;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, incorrect, round, totalRounds, timeLeft, isAdmin, isMuted, onToggleMute, title }) => {
  const { t } = useTranslation();
  const isLowTime = timeLeft <= 5;
  const timerColor = isLowTime ? 'text-red-500' : 'text-yellow-300';
  
  // SVG Circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / ROUND_DURATION_SECONDS;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md py-1 sm:py-1.5 px-2.5 sm:px-6 z-40 border-b border-slate-700/80 shadow-md flex-shrink-0">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left Section: Score */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-6 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[8px] xs:text-[9px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">{t("Correct")}</span>
            <span className="text-green-400 font-bold text-sm xs:text-base sm:text-xl leading-tight">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[8px] xs:text-[9px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">{t("Wrong")}</span>
            <span className="text-red-400 font-bold text-sm xs:text-base sm:text-xl leading-tight">{incorrect}</span>
          </div>
        </div>

        {/* Middle Section: Title & Stopwatch Timer */}
        <div className="flex flex-col items-center justify-center">
          {title && (
            <div className="text-center mb-0.5 leading-tight">
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-400 font-semibold hidden xs:block">{t("UK Monarchs Timeline")}</span>
              <h1 className="text-[11px] sm:text-xs font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 line-clamp-1">
                {t(title)}
              </h1>
            </div>
          )}
          <div className="relative flex items-center justify-center w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11">
            {/* Background Circle */}
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                className="text-slate-800"
              />
              {/* Progress Circle */}
              {!isAdmin && (
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{ 
                    strokeDashoffset: isNaN(strokeDashoffset) ? 0 : strokeDashoffset,
                    transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease'
                  }}
                  strokeLinecap="round"
                  className={`${timerColor}`}
                />
              )}
            </svg>
            
            {/* Timer Text */}
            <div className={`relative z-10 text-sm xs:text-base sm:text-lg font-bold font-mono tracking-tighter transition-colors duration-300 ${isAdmin ? 'text-cyan-400' : timerColor} ${isLowTime && !isAdmin ? 'animate-pulse' : ''}`}>
              {isAdmin ? '∞' : timeLeft}
            </div>
          </div>
        </div>

        {/* Right Section: Round Info & Audio Control */}
        <div className="flex items-center justify-end gap-2 xs:gap-3 sm:gap-4 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-[8px] xs:text-[9px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold">{t("Progress")}</span>
            <div className="text-center leading-tight">
              <span className="text-white font-bold text-sm xs:text-base sm:text-xl">{round}</span>
              <span className="text-slate-500 text-[10px] sm:text-xs ml-0.5 sm:ml-1">/{totalRounds}</span>
            </div>
          </div>
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className={`p-1 sm:p-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                isMuted
                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-700'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
              }`}
              title={isMuted ? t("Unmute sound", "Unmute sound") : t("Mute sound", "Mute sound")}
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
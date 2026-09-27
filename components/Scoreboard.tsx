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
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, incorrect, round, totalRounds, timeLeft, isAdmin, isMuted, onToggleMute }) => {
  const { t } = useTranslation();
  const isLowTime = timeLeft <= 5;
  const timerColor = isLowTime ? 'text-red-500' : 'text-yellow-300';
  
  // SVG Circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / ROUND_DURATION_SECONDS;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md p-4 z-50 border-b border-slate-700 shadow-xl">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        {/* Left Section: Score */}
        <div className="flex items-center gap-6 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t("Correct")}</span>
            <span className="text-green-400 font-bold text-2xl">{score}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t("Wrong")}</span>
            <span className="text-red-400 font-bold text-2xl">{incorrect}</span>
          </div>
        </div>

        {/* Middle Section: Stopwatch Timer */}
        <div className="flex justify-center">
          <div className="relative flex items-center justify-center w-20 h-20">
            {/* Background Circle */}
            <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="currentColor"
                strokeWidth="6"
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
                  strokeWidth="6"
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
            <div className={`relative z-10 text-3xl font-bold font-mono tracking-tighter transition-colors duration-300 ${isAdmin ? 'text-cyan-400' : timerColor} ${isLowTime && !isAdmin ? 'animate-pulse' : ''}`}>
              {isAdmin ? '∞' : timeLeft}
            </div>
          </div>
        </div>

        {/* Right Section: Round Info & Audio Control */}
        <div className="flex items-center justify-end gap-4 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t("Progress")}</span>
            <div className="text-center">
              <span className="text-white font-bold text-2xl">{round}</span>
              <span className="text-slate-500 text-sm ml-1">/ {totalRounds}</span>
            </div>
          </div>
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                isMuted
                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-700'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
              }`}
              title={isMuted ? t("Unmute sound", "Unmute sound") : t("Mute sound", "Mute sound")}
              aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
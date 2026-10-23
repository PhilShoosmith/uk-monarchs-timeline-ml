import React, { useState, useRef } from "react";
// FIX: The type 'LastGuess' is not an exported member of '../types'. Replaced with 'LastYearGuess' which is the correct type for this component's props.
import { LastYearGuess, Monarch } from "../types";
import {
  TIMELINE_START_YEAR,
  TIMELINE_END_YEAR,
  YEAR_TOLERANCE,
  HISTORICAL_PERIODS,
} from "../constants";
import HouseIcon from "./HouseIcon";
import { useTranslation } from "react-i18next";

interface TimelineProps {
  onGuess: (year: number) => void;
  disabled: boolean;
  lastGuess: LastYearGuess | null;
  allMonarchs: Monarch[];
}

const periodToHouseMap: { [key: string]: string } = {
  "Norman & Plantagenet": "Plantagenet",
  Tudor: "Tudor",
  Stuart: "Stuart",
  "Hanover & Windsor": "Windsor",
};

const Timeline: React.FC<TimelineProps> = ({
  onGuess,
  disabled,
  lastGuess,
  allMonarchs,
}) => {
  const { t } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [hoverYear, setHoverYear] = useState<number | null>(null);
  const [hoveredMonarch, setHoveredMonarch] = useState<Monarch | null>(null);

  const totalYears = TIMELINE_END_YEAR - TIMELINE_START_YEAR;

  const calculateYearFromX = (x: number) => {
    if (!timelineRef.current) return 0;
    const rect = timelineRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
    return Math.round(TIMELINE_START_YEAR + percentage * totalYears);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.clientX));
  };

  const handleMouseLeave = () => {
    setHoverYear(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const year = calculateYearFromX(e.clientX);
    onGuess(year);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (disabled) return;
    setHoverYear(calculateYearFromX(e.touches[0].clientX));
  };

  const handleTouchEnd = () => {
    if (disabled || hoverYear === null) return;
    onGuess(hoverYear);
    setHoverYear(null);
  };

  const yearToPercentage = (year: number) => {
    const boundedYear = Math.max(
      TIMELINE_START_YEAR,
      Math.min(TIMELINE_END_YEAR, year),
    );
    return ((boundedYear - TIMELINE_START_YEAR) / totalYears) * 100;
  };

  const centuryMarkers = [];
  for (let year = TIMELINE_START_YEAR; year <= TIMELINE_END_YEAR; year += 100) {
    if (year % 100 === 0) centuryMarkers.push(year);
  }

  return (
    <div className="w-full py-1 sm:py-3 px-1 sm:px-4 relative">
      {/* Historical Periods Background */}
      <div className="relative mb-1.5 sm:mb-2.5 w-full h-6 xs:h-7 sm:h-9 flex items-center rounded-lg overflow-hidden border border-slate-700">
        {HISTORICAL_PERIODS.map((period) => (
          <div
            key={period.name}
            className={`h-full flex items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-2 overflow-hidden ${period.color}`}
            style={{
              position: "absolute",
              left: `${yearToPercentage(period.start)}%`,
              width: `${yearToPercentage(period.end) - yearToPercentage(period.start)}%`,
            }}
          >
            <HouseIcon
              house={periodToHouseMap[period.name]}
              className={`shrink-0 h-2.5 w-2.5 sm:h-4 sm:w-4 opacity-80 ${period.textColor}`}
            />
            <span
              className={`text-[9px] xs:text-[10px] sm:text-xs font-semibold opacity-80 select-none truncate ${period.textColor}`}
            >
              {t(period.name)}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={timelineRef}
        className="w-full h-3 bg-slate-700 rounded-full cursor-pointer relative touch-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Wrapper for color segments to enforce rounded corners */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {HISTORICAL_PERIODS.map((period) => (
            <div
              key={period.name}
              aria-hidden="true"
              className={`absolute top-0 bottom-0 h-full ${period.timelineColor}`}
              style={{
                left: `${yearToPercentage(period.start)}%`,
                width: `${yearToPercentage(period.end) - yearToPercentage(period.start)}%`,
              }}
            />
          ))}
        </div>

        {/* Hover Details (Triggered if set somehow, though dots are removed) */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          onMouseLeave={() => setHoveredMonarch(null)}
        >
          {hoveredMonarch && (
            <div
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-30 transition-all duration-75"
              style={{
                left: `${yearToPercentage(hoveredMonarch.reignStart)}%`,
                width: `${Math.max(0.5, yearToPercentage(hoveredMonarch.reignEnd ?? new Date().getFullYear()) - yearToPercentage(hoveredMonarch.reignStart))}%`,
              }}
            >
              {/* Reign Duration Bar */}
              <div className="absolute top-1/2 -translate-y-1/2 h-3 bg-yellow-400/50 rounded-full w-full animate-fade-in"></div>

              {/* Portrait and Info Box */}
              <div className="absolute bottom-full mb-3 left-0 -translate-x-1/2 ml-1">
                <div className="p-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg flex items-center gap-3 w-max max-w-xs animate-fade-in-up">
                  {hoveredMonarch.imageUrl ? (
                    <img
                      src={hoveredMonarch.imageUrl}
                      alt={hoveredMonarch.name}
                      className="w-14 h-14 object-cover rounded-md border-2 border-slate-600"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-slate-700 rounded-md flex items-center justify-center">
                      <span className="text-2xl">👑</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white whitespace-nowrap">
                      {t(hoveredMonarch.name)}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {t("Reign: {{start}} - {{end}}", {
                        start: hoveredMonarch.reignStart,
                        end: hoveredMonarch.reignEnd ?? t("Present"),
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {hoverYear && !disabled && (
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
            style={{ left: `${yearToPercentage(hoverYear)}%` }}
          >
            <div className="h-8 w-1 bg-yellow-400 transform -translate-y-1/2 top-1/2 absolute"></div>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-sm text-yellow-300 whitespace-nowrap">
              {hoverYear}
            </div>
          </div>
        )}

        {lastGuess && (
          <>
            {/* Correct Range Highlight */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-5 bg-green-500/30 rounded-full animate-pop-in-marker border border-green-500/50"
              style={{
                left: `${yearToPercentage(lastGuess.correctYear - YEAR_TOLERANCE)}%`,
                width: `${((YEAR_TOLERANCE * 2) / totalYears) * 100}%`,
              }}
            />

            {/* Correct Answer Marker */}
            <div
              className="absolute top-1/2 -translate-y-1/2 animate-pop-in-marker animation-delay-200"
              style={{ left: `${yearToPercentage(lastGuess.correctYear)}%` }}
            >
              <div className="h-8 w-1 bg-green-400 transform -translate-y-1/2 top-1/2 absolute animate-pulse"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500/20 border border-green-500 px-2 py-1 rounded text-sm text-green-300 whitespace-nowrap">
                {t("Correct: {{year}}", { year: lastGuess.correctYear })}
              </div>
            </div>

            {/* User Guess Marker */}
            {!lastGuess.isCorrect && !lastGuess.timedOut && (
              <div
                className="absolute top-1/2 -translate-y-1/2 animate-pop-in-marker animation-delay-400"
                style={{ left: `${yearToPercentage(lastGuess.guessedYear)}%` }}
              >
                <div className="h-8 w-1 bg-red-500 transform -translate-y-1/2 top-1/2 absolute"></div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500 px-2 py-1 rounded text-sm text-red-300 whitespace-nowrap">
                  {t("Your Guess: {{year}}", { year: lastGuess.guessedYear })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Century Markers */}
      <div className="mt-1.5 sm:mt-3 w-full h-4 sm:h-5 relative">
        {centuryMarkers.map((year) => (
          <div
            key={year}
            className="absolute top-0"
            style={{
              left: `${yearToPercentage(year)}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-px h-1.5 sm:h-2 bg-slate-600"></div>
            <span className="text-[8px] xs:text-[9px] sm:text-xs text-slate-500 select-none">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

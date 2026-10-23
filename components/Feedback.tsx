

import React from 'react';
import { AnyLastGuess, Monarch } from '../types';
import { useTranslation, Trans } from 'react-i18next';

interface FeedbackProps {
  lastGuess: AnyLastGuess;
  onNext: () => void;
  monarch: Monarch;
  allMonarchs: Monarch[];
  onLearnMore: (monarch: Monarch) => void;
  onStop: () => void;
  compact?: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ lastGuess, onNext, monarch, onLearnMore, allMonarchs, onStop, compact }) => {
  const { t } = useTranslation();

  const renderFeedbackContent = () => {
    if (lastGuess.type === 'year') {
      const { isCorrect, correctYear, guessedYear, timedOut } = lastGuess;
      if (timedOut) {
        return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Time's Up!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              <Trans i18nKey="The correct year was <1>{{correctYear}}</1>." values={{ correctYear }}>
                The correct year was <span className="font-bold text-white">{{correctYear}}</span>.
              </Trans>
            </p>
          </div>
        );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-green-400 mb-1`}>{t("Correct!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              {t("You were right on the money! The reign began in {{correctYear}}.", { correctYear })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Not Quite!")}</h3>
          <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
            <Trans i18nKey="You guessed {{guessedYear}}, but the correct year was <1>{{correctYear}}</1>." values={{ guessedYear, correctYear }}>
              You guessed {{guessedYear}}, but the correct year was <span className="font-bold text-white">{{correctYear}}</span>.
            </Trans>
          </p>
        </div>
      );
    }
    
    if (lastGuess.type === 'monarch') {
      const { isCorrect, correctMonarchId, guessedMonarchId, timedOut } = lastGuess;
      const correctMonarch = allMonarchs.find(m => m.id === correctMonarchId);
      const guessedMonarch = allMonarchs.find(m => m.id === guessedMonarchId);

      if (timedOut) {
         return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Time's Up!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              <Trans i18nKey="The correct successor was <1>{{name}}</1>." values={{ name: correctMonarch?.name || 'Unknown' }}>
                The correct successor was <span className="font-bold text-white">{{name: correctMonarch?.name || 'Unknown'}}</span>.
              </Trans>
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-green-400 mb-1`}>{t("Correct!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              {t("{{name}} was indeed the next monarch.", { name: correctMonarch?.name })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Not Quite!")}</h3>
          <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
            <Trans i18nKey="You guessed {{guessedName}}, but the correct successor was <1>{{correctName}}</1>." values={{ guessedName: guessedMonarch?.name || 'an unknown monarch', correctName: correctMonarch?.name || 'Unknown' }}>
              You guessed {{guessedName: guessedMonarch?.name || 'an unknown monarch'}}, but the correct successor was <span className="font-bold text-white">{{correctName: correctMonarch?.name || 'Unknown'}}</span>.
            </Trans>
          </p>
        </div>
      );
    }

    if (lastGuess.type === 'fact') {
      const { isCorrect, correctMonarchId, guessedMonarchId, timedOut } = lastGuess;
      const correctMonarch = allMonarchs.find(m => m.id === correctMonarchId);
      const guessedMonarch = allMonarchs.find(m => m.id === guessedMonarchId);

      if (timedOut) {
         return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Time's Up!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              <Trans i18nKey="The correct monarch was <1>{{name}}</1>." values={{ name: correctMonarch?.name || 'Unknown' }}>
                The correct monarch was <span className="font-bold text-white">{{name: correctMonarch?.name || 'Unknown'}}</span>.
              </Trans>
            </p>
          </div>
         );
      }
      if (isCorrect) {
        return (
          <div>
            <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-green-400 mb-1`}>{t("Correct!")}</h3>
            <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
              {t("{{name}} is the right answer. Well done!", { name: correctMonarch?.name })}
            </p>
          </div>
        );
      }
      return (
        <div>
          <h3 className={`${compact ? 'text-lg sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold text-red-400 mb-1`}>{t("Not Quite!")}</h3>
          <p className={`${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'} text-slate-300`}>
            <Trans i18nKey="You guessed {{guessedName}}, but the correct monarch was <1>{{correctName}}</1>." values={{ guessedName: guessedMonarch?.name || 'an unknown monarch', correctName: correctMonarch?.name || 'Unknown' }}>
              You guessed {{guessedName: guessedMonarch?.name || 'an unknown monarch'}}, but the correct monarch was <span className="font-bold text-white">{{correctName: correctMonarch?.name || 'Unknown'}}</span>.
            </Trans>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`w-full mx-auto ${compact ? 'p-2.5 sm:p-5' : 'p-4 sm:p-6'} bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 text-center animate-fade-in-up`}>
      {renderFeedbackContent()}

      <div className={`${compact ? 'mt-1.5 p-2' : 'mt-3 sm:mt-4 p-3'} bg-slate-900/50 border border-slate-700/80 rounded-lg text-left`}>
        <p className={`${compact ? 'text-[11px] sm:text-xs line-clamp-2 sm:line-clamp-3' : 'text-xs sm:text-sm'} text-slate-300 leading-relaxed`}>
          <span className="font-bold text-amber-400">{t("Did you know?")}</span> {t(monarch.context)}
        </p>
      </div>

      <div className={`${compact ? 'mt-2.5 gap-1.5 sm:gap-3' : 'mt-4 sm:mt-6 gap-3 sm:gap-4'} flex flex-wrap items-center justify-center`}>
        <button
          onClick={onNext}
          className={`${compact ? 'px-3.5 py-1.5 text-xs sm:text-sm' : 'w-full sm:w-auto px-6 py-2 text-sm sm:text-base'} bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transform hover:scale-105 transition-all shadow-md`}
        >
          {t("Next Monarch")}
        </button>
        <button
          onClick={() => onLearnMore(monarch)}
          className={`${compact ? 'px-2.5 py-1.5 text-xs' : 'w-full sm:w-auto px-5 py-2 text-sm sm:text-base'} bg-green-400 text-black font-bold rounded-lg hover:bg-green-300 transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1.5`}
          aria-label={t("Learn More")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`${compact ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          {t("Learn More")}
        </button>
        <button
          onClick={onStop}
          className={`${compact ? 'px-2.5 py-1.5 text-xs' : 'w-full sm:w-auto px-5 py-2 text-sm sm:text-base'} bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1`}
          aria-label={t("Stop Game")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={`${compact ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.293 6.293a1 1 0 011.414 0L12 7.586l1.293-1.293a1 1 0 111.414 1.414L13.414 9l1.293 1.293a1 1 0 01-1.414 1.414L12 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L10.586 9 9.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {t("Stop Game")}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
import React from 'react';
import { Monarch, AnyLastGuess } from '../types';
import { useTranslation } from 'react-i18next';

interface MonarchGuesserProps {
  options: Monarch[];
  onSubmit: (monarchId: number) => void;
  disabled: boolean;
  lastGuess: AnyLastGuess | null;
}

const MonarchGuesser: React.FC<MonarchGuesserProps> = ({ options, onSubmit, disabled, lastGuess }) => {
  const { t } = useTranslation();
  const getButtonClass = (monarchId: number) => {
    if (lastGuess?.type === 'fact') {
      const { isCorrect, guessedMonarchId, correctMonarchId } = lastGuess;
      if (monarchId === correctMonarchId) {
        // Always highlight the correct answer in green
        return 'bg-green-600 ring-2 ring-green-400 scale-105';
      }
      if (monarchId === guessedMonarchId && !isCorrect) {
        // Highlight the user's wrong answer in red
        return 'bg-red-600 ring-2 ring-red-400 scale-105';
      }
      // Fade out other non-selected options
      return 'opacity-50';
    }
    // Default interactive style
    return 'bg-slate-700 hover:bg-slate-600 focus:ring-2 focus:ring-blue-500';
  };

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3.5 w-full">
      {options.map((monarch) => (
        <button
          key={monarch.id}
          onClick={() => onSubmit(monarch.id)}
          disabled={disabled}
          className={`px-2.5 py-2 sm:px-4 sm:py-3 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md disabled:cursor-not-allowed text-xs sm:text-base truncate ${getButtonClass(monarch.id)}`}
          aria-label={t("Select {{name}}", { name: t(monarch.name) })}
        >
          {t(monarch.name)}
        </button>
      ))}
    </div>
  );
};

export default MonarchGuesser;

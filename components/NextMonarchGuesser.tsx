import React, { useState, useMemo, useRef, useEffect } from "react";
import { Monarch, AnyLastGuess } from "../types";
import { useTranslation } from "react-i18next";

interface NextMonarchGuesserProps {
  monarchs: Monarch[];
  onSubmit: (monarchId: number) => void;
  disabled: boolean;
  lastGuess: AnyLastGuess | null;
}

const NextMonarchGuesser: React.FC<NextMonarchGuesserProps> = ({
  monarchs,
  onSubmit,
  disabled,
  lastGuess,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortedMonarchs = useMemo(
    () => [...monarchs].sort((a, b) => t(a.name).localeCompare(t(b.name))),
    [monarchs, t],
  );

  const filteredMonarchs = useMemo(() => {
    if (!searchTerm) return sortedMonarchs;
    const lowerSearch = searchTerm.toLowerCase();
    return sortedMonarchs.filter((m) =>
      t(m.name).toLowerCase().includes(lowerSearch),
    );
  }, [searchTerm, sortedMonarchs, t]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !selectedId) return;
    onSubmit(parseInt(selectedId, 10));
    setSearchTerm("");
    setSelectedId("");
  };

  const handleSelect = (monarch: Monarch) => {
    setSelectedId(monarch.id.toString());
    setSearchTerm(t(monarch.name));
    setShowDropdown(false);
  };

  const feedbackClass = useMemo(() => {
    if (lastGuess?.type === "monarch") {
      return lastGuess.isCorrect
        ? "bg-green-600 hover:bg-green-700 ring-2 ring-green-400 scale-105"
        : "bg-red-600 hover:bg-red-700 ring-2 ring-red-400 scale-105";
    }
    return "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50";
  }, [lastGuess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 w-full"
      ref={dropdownRef}
    >
      <div className="relative flex-1 min-w-0">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedId("");
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          disabled={disabled}
          placeholder={t("Select a monarch...")}
          className="bg-slate-700/60 border border-slate-600 rounded-lg px-2.5 py-1.5 text-white text-xs sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50"
          aria-label={t("Select the next monarch")}
        />
        {showDropdown && !disabled && (
          <ul className="absolute z-50 left-0 right-0 mt-1 max-h-40 sm:max-h-56 overflow-y-auto bg-slate-800 border border-slate-600 rounded-lg shadow-2xl text-left scrollbar-thin scrollbar-thumb-slate-600">
            {filteredMonarchs.length === 0 ? (
              <li className="px-3 py-2 text-xs sm:text-sm text-slate-400">
                {t("No monarchs found")}
              </li>
            ) : (
              filteredMonarchs.map((monarch) => (
                <li
                  key={monarch.id}
                  onClick={() => handleSelect(monarch)}
                  className="px-3 py-1.5 text-xs sm:text-sm text-white hover:bg-purple-600/50 cursor-pointer transition-colors"
                >
                  {t(monarch.name)}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <button
        type="submit"
        disabled={disabled || !selectedId}
        className={`px-3.5 py-1.5 text-xs sm:text-sm text-white font-bold rounded-lg transform transition-all duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none flex-shrink-0 ${feedbackClass}`}
      >
        {t("Submit")}
      </button>
    </form>
  );
};

export default NextMonarchGuesser;

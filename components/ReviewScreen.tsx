
import React, { useState, useMemo } from 'react';
import { Monarch } from '../types';
import SearchModal from './SearchModal';
import { HISTORICAL_PERIODS } from '../constants';
import { useTranslation } from 'react-i18next';

interface ReviewScreenProps {
  monarchs: Monarch[];
  onExit: () => void;
  onLearnMore: (monarch: Monarch) => void;
  onShowFamilyTree: (monarch: Monarch) => void;
}

// Helper to find a monarch's period. Iterates backwards to handle overlapping start/end dates in constants correctly.
const getPeriodForMonarch = (monarch: Monarch): string | null => {
    const reversedPeriods = [...HISTORICAL_PERIODS].reverse();
    const period = reversedPeriods.find(p => monarch.reignStart >= p.start);
    return period ? period.name : null;
};

const ReviewScreen: React.FC<ReviewScreenProps> = ({ monarchs, onExit, onLearnMore, onShowFamilyTree }) => {
  const { t } = useTranslation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    startYear: '',
    endYear: '',
    period: '',
  });

  const filteredMonarchs = useMemo(() => {
    const nameQuery = filters.name.trim().toLowerCase();
    const startY = filters.startYear ? parseInt(filters.startYear, 10) : -Infinity;
    const endY = filters.endYear ? parseInt(filters.endYear, 10) : Infinity;
    const periodQuery = filters.period;
    
    const isFiltering = nameQuery || filters.startYear || filters.endYear || periodQuery;

    if (!isFiltering) {
      return monarchs;
    }

    return monarchs.filter(monarch => {
      const englishName = monarch.name.toLowerCase();
      const translatedName = t(monarch.name).toLowerCase();
      const nameMatch = nameQuery ? (englishName.includes(nameQuery) || translatedName.includes(nameQuery)) : true;
      
      const reignStart = monarch.reignStart;
      const reignEnd = monarch.reignEnd ?? new Date().getFullYear();
      const dateMatch = !isNaN(startY) && !isNaN(endY) ? (reignStart <= endY && reignEnd >= startY) : true;
      
      const periodMatch = periodQuery ? getPeriodForMonarch(monarch) === periodQuery : true;

      return nameMatch && dateMatch && periodMatch;
    });
  }, [monarchs, filters, t]);

  const groupedMonarchs = useMemo(() => {
    const map = new Map<string, Monarch[]>();
    filteredMonarchs.forEach(m => {
      if (!map.has(m.house)) {
        map.set(m.house, []);
      }
      map.get(m.house)!.push(m);
    });
    return Array.from(map.entries()).map(([house, houseMonarchs]) => ({ house, monarchs: houseMonarchs }));
  }, [filteredMonarchs]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsSearchModalOpen(false);
  };
  
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const isFiltering = activeFilterCount > 0;

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start py-8 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"></div>

        <header className="relative z-20 px-4 w-full max-w-7xl mx-auto flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onExit}
              className="px-4 py-2 bg-slate-700/50 text-white font-bold rounded-lg hover:bg-slate-600 transition-all duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/50 flex items-center gap-2 flex-shrink-0"
              aria-label="Back to main menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">{t("Back to Menu")}</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center whitespace-nowrap">
              {t("Monarch Review")}
            </h1>
            
            <div className="relative w-full max-w-[16rem]">
              <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-between"
                  aria-label="Open advanced search"
              >
                <span className={isFiltering ? 'text-white' : 'text-slate-400'}>
                    {isFiltering ? t("{{count}} filter(s) active", { count: activeFilterCount }) : t("Search...")}
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </span>
              </button>
            </div>
          </div>
           <p className="text-slate-300 text-center mt-4">
                {isFiltering ? t("Found {{count}} monarch(s). Click a card to learn more.", { count: filteredMonarchs.length }) : t("Scroll to explore the monarchs by house. Click a card to learn more.")}
          </p>
        </header>
        
        <div className="w-full flex-grow flex flex-col justify-start overflow-y-auto mt-6 z-10">
          {filteredMonarchs.length > 0 ? (
            <div className="w-full max-w-7xl mx-auto px-4 pb-12 animate-fade-in-up space-y-12">
              {groupedMonarchs.map(({ house, monarchs: houseMonarchs }) => (
                <div key={house} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-amber-500/50"></div>
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 uppercase tracking-widest drop-shadow-sm text-center">
                      {t("House of {{house}}", { house: t(house) })}
                    </h2>
                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-amber-500/50"></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    {houseMonarchs.map(monarch => (
                      <div 
                        key={monarch.id} 
                        onClick={() => onLearnMore(monarch)}
                        className="w-72 flex-shrink-0 p-4 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700 flex flex-col transition-all duration-300 hover:!scale-105 hover:!border-blue-500 cursor-pointer"
                      >
                        {monarch.imageUrl ? (
                          <img
                              src={monarch.imageUrl}
                              alt={`Portrait of ${monarch.name}`}
                              className="w-full h-48 object-contain rounded-md mb-3 bg-slate-700"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-48 bg-slate-700 rounded-md mb-3 flex items-center justify-center text-slate-400">
                              {t("No Portrait")}
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white text-center">{t(monarch.name)}</h3>
                        <p className="text-sm font-mono text-amber-300/80 text-center">{monarch.reignStart} – {monarch.reignEnd ?? t('Present')}</p>
                        <p className="text-sm text-slate-300 mt-2 flex-grow overflow-hidden line-clamp-4">
                          {t(monarch.context)}
                        </p>
                        <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onShowFamilyTree(monarch);
                            }}
                            className="flex-1 py-1.5 px-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-1.5"
                          >
                            <span>👑 {t("Family Tree")}</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onLearnMore(monarch);
                            }}
                            className="py-1.5 px-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs rounded-lg transition-colors border border-slate-600"
                          >
                            {t("Learn More")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400 flex flex-col items-center animate-fade-in-up">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              <h2 className="text-2xl font-bold">{t("No Monarchs Found")}</h2>
              <p className="mt-1">{t("Try adjusting your search filters.")}</p>
            </div>
          )}
        </div>
      </div>
      <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onApply={handleApplyFilters}
          initialFilters={filters}
      />
    </>
  );
};

export default ReviewScreen;

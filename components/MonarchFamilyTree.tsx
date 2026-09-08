import React, { useMemo } from 'react';
import { Monarch } from '../types';
import { getMonarchFamily, PersonNode } from '../data/monarchFamilies';
import { useTranslation } from 'react-i18next';
import { Crown, ChevronLeft, ChevronRight, Heart, Users, Sparkles, Info, ArrowDown, User } from 'lucide-react';

interface MonarchFamilyTreeProps {
  monarchs: Monarch[];
  selectedMonarchId: number;
  onSelectMonarch: (id: number) => void;
  onBack?: () => void;
}

const getHouseBadgeColor = (house: string) => {
  switch (house) {
    case 'Normandy':
    case 'Blois':
      return 'bg-red-500/20 text-red-300 border-red-500/30';
    case 'Plantagenet':
    case 'Lancaster':
    case 'York':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'Tudor':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    case 'Stuart':
      return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    case 'Hanover':
      return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    case 'Saxe-Coburg and Gotha':
    case 'Windsor':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    default:
      return 'bg-slate-700 text-slate-300 border-slate-600';
  }
};

export const MonarchFamilyTree: React.FC<MonarchFamilyTreeProps> = ({
  monarchs,
  selectedMonarchId,
  onSelectMonarch,
  onBack,
}) => {
  const { t } = useTranslation();

  const currentMonarch = useMemo(() => {
    return monarchs.find((m) => m.id === selectedMonarchId) || monarchs[0];
  }, [monarchs, selectedMonarchId]);

  const family = useMemo(() => {
    return getMonarchFamily(currentMonarch.id);
  }, [currentMonarch]);

  const currentIndex = useMemo(() => {
    return monarchs.findIndex((m) => m.id === currentMonarch.id);
  }, [monarchs, currentMonarch]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectMonarch(monarchs[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < monarchs.length - 1) {
      onSelectMonarch(monarchs[currentIndex + 1].id);
    }
  };

  const renderPersonCard = (
    person: PersonNode,
    options: {
      roleLabel?: string;
      isChild?: boolean;
      isSpouse?: boolean;
      marriageDate?: string;
    } = {}
  ) => {
    const isTargetMonarch = person.monarchId !== undefined;
    const targetMonarchObj = isTargetMonarch
      ? monarchs.find((m) => m.id === person.monarchId)
      : undefined;

    return (
      <div
        key={`${person.name}-${person.relation || ''}`}
        onClick={() => {
          if (person.monarchId) {
            onSelectMonarch(person.monarchId);
          }
        }}
        className={`relative rounded-xl p-3.5 flex flex-col transition-all duration-200 border ${
          isTargetMonarch
            ? 'bg-gradient-to-b from-amber-950/40 via-slate-800 to-slate-800/90 border-amber-400/60 shadow-lg shadow-amber-950/30 hover:border-amber-300 hover:scale-[1.02] cursor-pointer'
            : 'bg-slate-800/70 border-slate-700/80 shadow-md'
        }`}
      >
        {isTargetMonarch && (
          <div className="absolute -top-2.5 right-2.5 bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
            <Crown className="w-3 h-3 text-slate-950" />
            <span>{t("Monarch")}</span>
          </div>
        )}

        <div className="flex items-start gap-2.5">
          {targetMonarchObj?.imageUrl ? (
            <img
              src={targetMonarchObj.imageUrl}
              alt={person.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-400/50 flex-shrink-0"
              loading="lazy"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                isTargetMonarch
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : options.isSpouse
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                  : 'bg-slate-700 text-slate-300 border border-slate-600'
              }`}
            >
              {options.isSpouse ? (
                <Heart className="w-4 h-4 text-pink-400" />
              ) : isTargetMonarch ? (
                <Crown className="w-4 h-4 text-amber-400" />
              ) : (
                <User className="w-4 h-4 text-slate-400" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="text-sm font-semibold text-white truncate max-w-full">
                {t(person.name)}
              </h4>
              {options.roleLabel && (
                <span className="text-[10px] font-medium text-slate-400 bg-slate-700/60 px-1.5 py-0.5 rounded">
                  {options.roleLabel}
                </span>
              )}
            </div>

            {person.dates && (
              <p className="text-xs text-amber-300/80 font-mono mt-0.5">{person.dates}</p>
            )}

            {options.marriageDate && (
              <p className="text-xs text-pink-300/90 italic mt-0.5">{options.marriageDate}</p>
            )}

            {person.notes && (
              <p className="text-xs text-slate-300 mt-1 leading-snug">{t(person.notes)}</p>
            )}

            {isTargetMonarch && (
              <p className="text-[11px] text-amber-400 font-medium mt-1 flex items-center gap-1">
                <span>{t("Click to view family tree")}</span> &rarr;
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const totalChildrenCount = useMemo(() => {
    if (!family) return 0;
    const fromSpouses = family.spouses.reduce((acc, s) => acc + s.children.length, 0);
    const others = family.otherChildren ? family.otherChildren.length : 0;
    return fromSpouses + others;
  }, [family]);

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6 animate-fade-in text-white">
      {/* Navigation & Selector Header */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="w-full md:w-auto px-4 py-2 bg-slate-700/70 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors border border-slate-600 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t("Back")}</span>
          </button>
        )}

        <div className="flex items-center gap-2 w-full md:w-auto justify-center">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="p-2 bg-slate-700/70 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-colors border border-slate-600"
            title={t("Previous Monarch")}
            aria-label="Previous Monarch"
          >
            <ChevronLeft className="w-5 h-5 text-slate-200" />
          </button>

          <div className="relative flex-1 md:w-72">
            <select
              value={currentMonarch.id}
              onChange={(e) => onSelectMonarch(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
              aria-label="Select monarch to view family tree"
            >
              {monarchs.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id}. {m.name} ({m.reignStart}–{m.reignEnd || t('Present')})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex >= monarchs.length - 1}
            className="p-2 bg-slate-700/70 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl transition-colors border border-slate-600"
            title={t("Next Monarch")}
            aria-label="Next Monarch"
          >
            <ChevronRight className="w-5 h-5 text-slate-200" />
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono hidden md:block">
          {currentIndex + 1} / {monarchs.length}
        </div>
      </div>

      {/* Hero Monarch Card */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl border-2 border-amber-500/40 p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative flex-shrink-0">
          <div className="p-1 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl">
            {currentMonarch.imageUrl ? (
              <img
                src={currentMonarch.imageUrl}
                alt={currentMonarch.name}
                className="w-32 h-40 sm:w-36 sm:h-44 object-cover rounded-xl bg-slate-900"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-xl bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
                {t("No Portrait")}
              </div>
            )}
          </div>
          {currentMonarch.coatOfArmsUrl && (
            <img
              src={currentMonarch.coatOfArmsUrl}
              alt="Coat of Arms"
              className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full p-1 bg-slate-900 border border-amber-400/50 shadow-md object-contain"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getHouseBadgeColor(
                currentMonarch.house
              )}`}
            >
              {t("House of {{house}}", { house: t(currentMonarch.house) })}
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-700/70 text-slate-300 border border-slate-600">
              {currentMonarch.reignStart} – {currentMonarch.reignEnd || t('Present')}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
            {t(currentMonarch.name)}
          </h2>

          <p className="text-sm font-medium text-amber-200/80 italic">{currentMonarch.title}</p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {t(currentMonarch.context)}
          </p>

          {family?.notes && (
            <div className="mt-2 text-xs text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2 text-left">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{t(family.notes)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="space-y-6">
        {/* Tier 1: Parents */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-5">
          <div className="flex items-center gap-2 mb-4 text-slate-300">
            <Users className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold uppercase tracking-wider text-amber-400">
              {t("Parents")}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {family?.parents.father ? (
              renderPersonCard(family.parents.father, { roleLabel: t("Father") })
            ) : (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center text-xs text-slate-500 italic">
                {t("Father not recorded")}
              </div>
            )}

            {family?.parents.mother ? (
              renderPersonCard(family.parents.mother, { roleLabel: t("Mother") })
            ) : (
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40 text-center text-xs text-slate-500 italic">
                {t("Mother not recorded")}
              </div>
            )}
          </div>
        </div>

        {/* Tree Connector down to Spouses/Monarch */}
        <div className="flex justify-center -my-3">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500/60 to-pink-500/60"></div>
            <ArrowDown className="w-4 h-4 text-pink-400 -mt-1 animate-bounce" />
          </div>
        </div>

        {/* Tier 2: Spouses */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Heart className="w-4 h-4 text-pink-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-pink-400">
                {t("Spouses")} ({family?.spouses.length || 0})
              </h3>
            </div>
            {family && family.spouses.length === 0 && (
              <span className="text-xs text-slate-400 italic">
                {t("Never married / No spouses")}
              </span>
            )}
          </div>

          {family && family.spouses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {family.spouses.map((group, index) => (
                <div key={index} className="flex flex-col">
                  {renderPersonCard(group.spouse, {
                    isSpouse: true,
                    marriageDate: group.marriageDate,
                    roleLabel:
                      family.spouses.length > 1
                        ? t("Wife {{num}}", { num: index + 1 })
                        : t("Spouse"),
                  })}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-800/40 border border-dashed border-slate-700 text-center">
              <p className="text-sm text-slate-400 font-medium">
                {t("This monarch never married and had no spouse.")}
              </p>
            </div>
          )}
        </div>

        {/* Tree Connector down to Children */}
        <div className="flex justify-center -my-3">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-gradient-to-b from-pink-500/60 to-amber-500/60"></div>
            <ArrowDown className="w-4 h-4 text-amber-400 -mt-1" />
          </div>
        </div>

        {/* Tier 3: Known Children */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/60 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold uppercase tracking-wider text-amber-400">
                {t("Known Children")} ({totalChildrenCount})
              </h3>
            </div>
            {totalChildrenCount > 0 && (
              <span className="text-xs text-amber-300/80 font-medium">
                {t("Gold cards indicate monarchs who succeeded to the throne")}
              </span>
            )}
          </div>

          {totalChildrenCount > 0 ? (
            <div className="space-y-6">
              {/* If multiple spouses with children, group by spouse */}
              {family?.spouses.map((group, sIdx) => {
                if (group.children.length === 0) return null;
                return (
                  <div key={sIdx} className="space-y-3">
                    {family.spouses.length > 1 && (
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-700/60">
                        <Heart className="w-3.5 h-3.5 text-pink-400" />
                        <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wide">
                          {t("Children with {{name}}", { name: group.spouse.name })}
                        </h4>
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {group.children.map((child) =>
                        renderPersonCard(child, {
                          isChild: true,
                          roleLabel: child.relation || t("Child"),
                        })
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Other known children (e.g., illegitimate / other partners) */}
              {family?.otherChildren && family.otherChildren.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 pb-1 border-b border-slate-700/60">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                      {t("Other Notable Known Children")}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {family.otherChildren.map((child) =>
                      renderPersonCard(child, {
                        isChild: true,
                        roleLabel: child.relation || t("Child"),
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-800/40 border border-dashed border-slate-700 text-center space-y-1">
              <p className="text-sm font-semibold text-slate-300">
                {t("No known children")}
              </p>
              <p className="text-xs text-slate-400">
                {family?.notes ||
                  t(
                    "This monarch had no known surviving legitimate children to inherit the crown."
                  )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonarchFamilyTree;

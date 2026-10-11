import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TenureHighlightsData, LeaderEntry } from '../data/tenureHighlights';
import {
  Award,
  Landmark,
  Building2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Globe,
  Info
} from 'lucide-react';

interface TenureHighlightsSectionProps {
  tenure: TenureHighlightsData;
}

export const TenureHighlightsSection: React.FC<TenureHighlightsSectionProps> = ({ tenure }) => {
  const { t } = useTranslation();
  const [activeLeaderTab, setActiveLeaderTab] = useState<'all' | 'pm' | 'us' | 'fr'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const hasPms = tenure.ukPrimeMinisters.length > 0;
  const hasUsPresidents = tenure.usPresidents.length > 0;
  const hasFrenchRulers = tenure.frenchRulers.length > 0;

  const renderLeaderCard = (
    leader: LeaderEntry,
    category: 'pm' | 'us' | 'fr'
  ) => {
    const badgeColor =
      category === 'pm'
        ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        : category === 'us'
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

    const categoryTitle =
      category === 'pm'
        ? t('UK Prime Minister', 'UK Prime Minister')
        : category === 'us'
        ? t('US President', 'US President')
        : t('French Ruler', 'French Ruler');

    const flagEmoji = category === 'pm' ? '🇬🇧' : category === 'us' ? '🇺🇸' : '🇫🇷';

    return (
      <div
        key={`${category}-${leader.name}-${leader.years}`}
        className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-xl p-3.5 transition-all shadow-md flex flex-col justify-between gap-2"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeColor}`}
            >
              <span>{flagEmoji}</span>
              <span>{categoryTitle}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
              {leader.years}
            </span>
          </div>

          <h5 className="text-sm font-bold text-white tracking-tight">
            {t(leader.name, leader.name)}
          </h5>

          {(leader.title || leader.partyOrDynasty) && (
            <p className="text-xs text-amber-300/80 font-medium">
              {leader.title ? t(leader.title, leader.title) : ''}
              {leader.title && leader.partyOrDynasty ? ' • ' : ''}
              {leader.partyOrDynasty ? t(leader.partyOrDynasty, leader.partyOrDynasty) : ''}
            </p>
          )}
        </div>

        {leader.note && (
          <p className="text-xs text-slate-300/90 bg-slate-900/40 p-2 rounded-lg border border-slate-800/80 leading-relaxed">
            {t(leader.note, leader.note)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 pt-8 border-t-2 border-amber-500/30">
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-800 to-amber-950/40 p-4 sm:p-5 border-b border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-inner">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-400">
                  {t('Tenure Highlights', 'Tenure Highlights')}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                  {tenure.reignPeriod}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {t(
                  'Key historical events during this reign and contemporary leaders across the UK, US, and France',
                  'Key historical events during this reign and contemporary leaders across the UK, US, and France'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <span>{isExpanded ? t('Collapse', 'Collapse') : t('Expand', 'Expand')}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {isExpanded && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Subsection 1: Key Highlights during reign */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-200">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                  {t('Key Highlights During Reign', 'Key Highlights During Reign')}
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tenure.keyHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/40 transition-all flex items-start gap-3 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 border border-amber-500/40">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {t(highlight, highlight)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subsection 2: Who was in power at that time */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 text-slate-200">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300">
                    {t('Who Was in Power at That Time', 'Who Was in Power at That Time')}
                  </h4>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-700 text-xs overflow-x-auto">
                  <button
                    onClick={() => setActiveLeaderTab('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                      activeLeaderTab === 'all'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {t('All Leaders', 'All Leaders')}
                  </button>
                  <button
                    onClick={() => setActiveLeaderTab('pm')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                      activeLeaderTab === 'pm'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>{t('UK PMs', 'UK PMs')}</span>
                    <span className="text-[10px] opacity-75">({tenure.ukPrimeMinisters.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveLeaderTab('us')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                      activeLeaderTab === 'us'
                        ? 'bg-amber-600 text-white font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>{t('US Presidents', 'US Presidents')}</span>
                    <span className="text-[10px] opacity-75">({tenure.usPresidents.length})</span>
                  </button>
                  <button
                    onClick={() => setActiveLeaderTab('fr')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                      activeLeaderTab === 'fr'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span>🇫🇷</span>
                    <span>{t('French Rulers', 'French Rulers')}</span>
                    <span className="text-[10px] opacity-75">({tenure.frenchRulers.length})</span>
                  </button>
                </div>
              </div>

              {tenure.contemporaryContext && (
                <div className="mb-4 text-xs text-sky-200/90 bg-sky-950/40 border border-sky-800/50 rounded-xl p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>{t(tenure.contemporaryContext, tenure.contemporaryContext)}</span>
                </div>
              )}

              {/* Leader Grid Display */}
              <div className="space-y-4">
                {/* UK Prime Ministers */}
                {(activeLeaderTab === 'all' || activeLeaderTab === 'pm') && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-blue-500/20">
                      <span className="text-base">🇬🇧</span>
                      <h5 className="text-xs font-bold uppercase tracking-wide text-blue-300">
                        {t('UK Prime Ministers', 'UK Prime Ministers')} ({tenure.ukPrimeMinisters.length})
                      </h5>
                    </div>

                    {hasPms ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tenure.ukPrimeMinisters.map((leader) => renderLeaderCard(leader, 'pm'))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700/60 text-xs text-slate-400 italic">
                        {t(
                          'The office of UK Prime Minister had not yet been created (established in 1721 with Sir Robert Walpole).',
                          'The office of UK Prime Minister had not yet been created (established in 1721 with Sir Robert Walpole).'
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* US Presidents */}
                {(activeLeaderTab === 'all' || activeLeaderTab === 'us') && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-amber-500/20">
                      <span className="text-base">🇺🇸</span>
                      <h5 className="text-xs font-bold uppercase tracking-wide text-amber-300">
                        {t('US Presidents', 'US Presidents')} ({tenure.usPresidents.length})
                      </h5>
                    </div>

                    {hasUsPresidents ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tenure.usPresidents.map((leader) => renderLeaderCard(leader, 'us'))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700/60 text-xs text-slate-400 italic">
                        {t(
                          'The United States had not yet been established as an independent nation (US Presidency established in 1789 with George Washington).',
                          'The United States had not yet been established as an independent nation (US Presidency established in 1789 with George Washington).'
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* French Rulers */}
                {(activeLeaderTab === 'all' || activeLeaderTab === 'fr') && (
                  <div>
                    <div className="flex items-center gap-2 mb-2 pb-1 border-b border-emerald-500/20">
                      <span className="text-base">🇫🇷</span>
                      <h5 className="text-xs font-bold uppercase tracking-wide text-emerald-300">
                        {t('French Rulers', 'French Rulers')} ({tenure.frenchRulers.length})
                      </h5>
                    </div>

                    {hasFrenchRulers ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {tenure.frenchRulers.map((leader) => renderLeaderCard(leader, 'fr'))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700/60 text-xs text-slate-400 italic">
                        {t('No contemporary French rulers recorded for this period.')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cross-App Recommendation Card */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-purple-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-indigo-300">
                  {t('Explore the Full Timelines in Dedicated Apps', 'Explore the Full Timelines in Dedicated Apps')}
                </p>
                <p className="text-[11px] text-slate-300">
                  {t(
                    'Dive deeper into UK PMs, French Rulers, and US Presidents on the Apple App Store & Google Play.',
                    'Dive deeper into UK PMs, French Rulers, and US Presidents on the Apple App Store & Google Play.'
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-500/40">
                  UK Monarchs
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-200 border border-blue-500/40">
                  UK PMs
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/40">
                  French Rulers
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/40">
                  US Presidents
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenureHighlightsSection;

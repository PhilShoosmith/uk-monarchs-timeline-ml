
import React, { useRef } from 'react';
import { Monarch } from '../types';
import HouseIcon from './HouseIcon';
import CoatOfArms from './CoatOfArms';
import { useTranslation } from 'react-i18next';

interface MonarchCardProps {
  monarch: Monarch;
  showReign: boolean;
  isAdmin?: boolean;
  compact?: boolean;
  maskedName?: boolean;
  onPortraitUpload?: (monarchId: number, newImageUrl: string) => void;
  stagedPortraitUrl?: string;
  onCoatOfArmsUpload?: (monarchId: number, newImageUrl: string) => void;
  stagedCoatOfArmsUrl?: string;
}

const getHouseStyles = (house: string): { badge: string; cardHover: string; } => {
  const housePeriodMap: { [key: string]: string } = {
    'Normandy': 'Norman & Plantagenet',
    'Blois': 'Norman & Plantagenet',
    'Plantagenet': 'Norman & Plantagenet',
    'Lancaster': 'Norman & Plantagenet',
    'York': 'Norman & Plantagenet',
    'Tudor': 'Tudor',
    'Stuart': 'Stuart',
    'Hanover': 'Hanover & Windsor',
    'Saxe-Coburg and Gotha': 'Hanover & Windsor',
    'Windsor': 'Hanover & Windsor',
  };

  const period = housePeriodMap[house];

  switch (period) {
    case 'Norman & Plantagenet': return { badge: 'bg-red-500/10 text-red-300', cardHover: 'hover:border-red-500/50' };
    case 'Tudor':      return { badge: 'bg-green-500/10 text-green-300', cardHover: 'hover:border-green-500/50' };
    case 'Stuart':     return { badge: 'bg-sky-500/10 text-sky-300', cardHover: 'hover:border-sky-500/50' };
    case 'Hanover & Windsor': return { badge: 'bg-purple-500/10 text-purple-300', cardHover: 'hover:border-purple-500/50' };
    default:            return { badge: 'bg-slate-700 text-slate-300', cardHover: 'hover:border-slate-600' };
  }
};

const MonarchCard: React.FC<MonarchCardProps> = ({ monarch, showReign, isAdmin, compact, maskedName, onPortraitUpload, stagedPortraitUrl, onCoatOfArmsUpload, stagedCoatOfArmsUrl }) => {
  const { t } = useTranslation();
  // Guard against missing monarch data
  if (!monarch) {
    return null;
  }

  const portraitFileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    portraitFileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPortraitUpload && monarch) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          onPortraitUpload(monarch.id, result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoatOfArmsUpload = (imageUrl: string) => {
    if (onCoatOfArmsUpload) {
      onCoatOfArmsUpload(monarch.id, imageUrl);
    }
  };

  const { name, title, house, reignStart, reignEnd } = monarch;
  const styles = getHouseStyles(house);
  const displayImageUrl = stagedPortraitUrl || monarch.imageUrl;
  
  const reignEndDisplay = reignEnd ?? t('Present');
  let durationDisplay: string;

  if (reignEnd) {
    if (reignEnd === reignStart) {
      durationDisplay = t('(less than a year)');
    } else {
      const duration = reignEnd - reignStart;
      durationDisplay = duration === 1 ? t("({{duration}} year)", { duration }) : t("({{duration}} years)", { duration });
    }
  } else {
    const currentYear = new Date().getFullYear();
    const duration = currentYear - reignStart;
    durationDisplay = duration === 1 ? t("({{duration}} year and counting)", { duration }) : t("({{duration}} years and counting)", { duration });
  }

  const displayName = maskedName ? "???" : t(name);
  const displayTitle = maskedName ? t("Mystery Monarch") : t(title);
  const showDates = showReign && !maskedName;
  
  return (
    <div
      className={`bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 flex flex-col items-center transform transition-all duration-300 ${styles.cardHover} ${
        compact
          ? 'p-1 xs:p-1.5 sm:p-2.5 w-[110px] xs:w-[125px] sm:w-[160px] md:w-[175px]'
          : 'p-6 max-w-sm hover:scale-105 w-full'
      }`}
    >
      {/* Ornate Frame for the Portrait */}
      <div
        className={`bg-gradient-to-br from-gray-700 via-gray-800 to-black rounded-lg shadow-lg w-full ${
          compact ? 'p-0.5 sm:p-1 mb-1' : 'p-2 mb-4'
        }`}
      >
        <div 
          className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-slate-900 flex items-center justify-center group shadow-inner"
        >
          {displayImageUrl ? (
            <img 
              src={displayImageUrl} 
              alt={maskedName ? t("Mystery monarch portrait") : `Portrait of ${name}`} 
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              key={displayImageUrl}
            />
          ) : (
            <span className="text-slate-400 text-xs sm:text-sm">{t("Portrait not available")}</span>
          )}
          {stagedPortraitUrl && (
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-400 text-yellow-900 text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg pointer-events-none">
              {t("PENDING")}
            </div>
          )}
          {isAdmin && (
            <>
              <div
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={(e) => { e.stopPropagation(); handleUploadClick(); }}
                role="button"
                aria-label={t("Change Portrait")}
              >
                <div className="text-center text-white p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-10 sm:w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <p className="mt-1 text-xs font-semibold">{t("Change Portrait")}</p>
                </div>
              </div>
              <input
                type="file"
                ref={portraitFileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>
      <div 
        className="text-center w-full px-0.5"
      >
        <h2
          className={`font-bold text-center text-white pointer-events-none ${
            compact ? 'text-xs xs:text-sm sm:text-base truncate leading-tight' : 'text-3xl sm:text-4xl'
          }`}
        >
          {displayName}
        </h2>
        <p
          className={`text-slate-400 pointer-events-none truncate ${
            compact ? 'text-[8px] xs:text-[9px] sm:text-xs mt-0.5' : 'text-lg sm:text-xl mt-2'
          }`}
        >
          {displayTitle}
        </p>
        {maskedName ? (
          <div
            className={`font-semibold rounded-full inline-flex items-center justify-center gap-1 bg-slate-700/80 text-slate-300 pointer-events-none ${
              compact ? 'text-[8px] xs:text-[9px] sm:text-[10px] mt-0.5 px-1.5 py-0.5 max-w-full' : 'text-md mt-2 px-3 py-1 gap-2'
            }`}
          >
            <span>{t("House of ???")}</span>
          </div>
        ) : (
          <div
            className={`font-semibold rounded-full inline-flex items-center justify-center gap-1 ${styles.badge} pointer-events-none ${
              compact ? 'text-[8px] xs:text-[9px] sm:text-[10px] mt-0.5 px-1.5 py-0.5 max-w-full' : 'text-md mt-2 px-3 py-1 gap-2'
            }`}
          >
            <HouseIcon house={house} className={compact ? 'h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 shrink-0' : 'h-5 w-5'} />
            <span className="truncate">{t(`House of {{house}}`, { house: t(house) })}</span>
          </div>
        )}
      </div>
      
      {showDates && (
        <p className={`text-amber-300/80 font-mono ${compact ? 'text-[8px] xs:text-[9px] sm:text-[10px] mt-0.5 truncate' : 'text-md mt-2'}`}>
          {reignStart} – {reignEndDisplay}
        </p>
      )}

      {!maskedName && (
        <div
          className={`w-full border-t border-slate-700/50 flex justify-center ${
            compact ? 'mt-0.5 pt-0.5' : 'mt-6 pt-6'
          }`}
        >
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {!compact && (
              <div className="text-slate-400 animate-rise-up w-8 h-8" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
              </div>
            )}
            <CoatOfArms
                className={compact ? 'w-4 h-4 xs:w-5 xs:h-5 sm:w-7 sm:h-7' : 'w-28 h-28'}
                isAdmin={isAdmin}
                imageUrl={stagedCoatOfArmsUrl || monarch.coatOfArmsUrl}
                onImageUpload={handleCoatOfArmsUpload}
            />
            {!compact && (
              <div className="text-slate-400 animate-rise-up w-8 h-8" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonarchCard;

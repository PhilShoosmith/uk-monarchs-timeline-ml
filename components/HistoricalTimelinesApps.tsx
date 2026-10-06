import React from 'react';
import { useTranslation } from 'react-i18next';

export const AppStoreIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 512 512" fill="none">
    <rect width="512" height="512" rx="115" fill="#0D84FE" />
    {/* Stylized App Store A */}
    <path
      d="M198 335L174 376C168 387 154 394 141 391C128 387 121 373 126 361L188 253"
      stroke="white"
      strokeWidth="32"
      strokeLinecap="round"
    />
    <path
      d="M304 316L324 351C331 363 346 368 359 362C372 355 377 340 371 328L297 200C282 174 246 174 231 200L222 216"
      stroke="white"
      strokeWidth="32"
      strokeLinecap="round"
    />
    <path
      d="M125 316H387C400 316 411 305 411 292C411 279 400 268 387 268H165"
      stroke="white"
      strokeWidth="32"
      strokeLinecap="round"
    />
    <path
      d="M239 173L256 144C264 130 284 130 292 144L309 173"
      stroke="white"
      strokeWidth="32"
      strokeLinecap="round"
    />
  </svg>
);

export const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 512 512">
    <path
      d="M32.5 13.5C27.8 18.5 25 26.2 25 36.2v439.6c0 10 2.8 17.7 7.5 22.7l1.3 1.3L280.2 253.4v-6.8L33.8 12.2l-1.3 1.3z"
      fill="#00C1A6"
    />
    <path
      d="M362.4 335.6l-82.2-82.2v-6.8l82.2-82.2 1.8 1 97.4 55.4c27.8 15.8 27.8 41.7 0 57.6l-97.4 55.3-1.8 1.9z"
      fill="#FFD400"
    />
    <path
      d="M364.2 333.7L280.2 249.8 32.5 497.5c9.2 9.8 24.3 10.9 41.4 1.3l290.3-165.1z"
      fill="#FF3333"
    />
    <path
      d="M364.2 166.3L73.9 1.2C56.8-8.4 41.7-7.3 32.5 2.5l247.7 247.3 84-83.5z"
      fill="#00A0FF"
    />
  </svg>
);

export interface TimelineApp {
  id: string;
  title: string;
  image: string;
  appleUrl: string;
  googleUrl: string;
}

export const TIMELINE_APPS: TimelineApp[] = [
  {
    id: 'uk-monarchs',
    title: 'UK Monarchs',
    image: '/apps/uk-monarchs.png',
    appleUrl: 'https://apps.apple.com/us/app/uk-monarchs-timeline/id6760196085',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.ukmonarchtimeline',
  },
  {
    id: 'uk-pms',
    title: 'UK PMs',
    image: '/apps/uk-pms.png',
    appleUrl: 'https://apps.apple.com/us/app/uk-prime-ministers-timeline/id6761317024',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.ukpms',
  },
  {
    id: 'french-rulers',
    title: 'French Rulers',
    image: '/apps/french-rulers.png',
    appleUrl: 'https://apps.apple.com/us/app/french-rulers-timeline/id6761076227',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.frrulers',
  },
  {
    id: 'us-presidents',
    title: 'US Presidents',
    image: '/apps/us-presidents.png',
    appleUrl: 'https://apps.apple.com/us/app/us-presidents-timeline/id6761148914',
    googleUrl: 'https://play.google.com/store/apps/details?id=app.uspresidents',
  },
];

const HistoricalTimelinesApps: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-6 border-t border-slate-700/80">
      <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-xl text-center">
        {/* Main Title matching PDF */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 tracking-tight mb-2">
          {t("Historical Timelines Apps", "Historical Timelines Apps")}
        </h3>

        {/* Subtitle with icons */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-sm sm:text-base text-slate-300 font-medium mb-6">
          <span>{t("Download from Apple Store", "Download from Apple Store")}</span>
          <AppStoreIcon className="w-5 h-5 inline-block shadow-sm" />
          <span className="text-slate-400">{t("or", "or")}</span>
          <span>{t("Google Store", "Google Store")}</span>
          <GooglePlayIcon className="w-5 h-5 inline-block shadow-sm" />
        </div>

        {/* 2x2 Grid of Apps */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
          {TIMELINE_APPS.map((app) => (
            <div
              key={app.id}
              className="flex flex-col items-center p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 transition-all duration-300 group shadow-md"
            >
              {/* Medallion Badge */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-3 transform transition-transform duration-300 group-hover:scale-105">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                />
              </div>

              {/* Store Links: App Store <- Click -> Google Play */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 shadow-inner">
                {/* Apple Store Button */}
                <a
                  href={app.appleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md hover:bg-blue-600/30 text-blue-400 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                  title={`${t("Download", "Download")} ${app.title} ${t("on Apple App Store", "on Apple App Store")}`}
                  aria-label={`${app.title} on Apple App Store`}
                >
                  <AppStoreIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>

                {/* Arrow Text */}
                <span className="text-[11px] sm:text-xs font-bold text-slate-300 select-none px-0.5">
                  ← {t("Click", "Click")} →
                </span>

                {/* Google Play Button */}
                <a
                  href={app.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-md hover:bg-emerald-600/30 transition-all transform hover:scale-110 active:scale-95"
                  title={`${t("Download", "Download")} ${app.title} ${t("on Google Play", "on Google Play")}`}
                  aria-label={`${app.title} on Google Play`}
                >
                  <GooglePlayIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricalTimelinesApps;

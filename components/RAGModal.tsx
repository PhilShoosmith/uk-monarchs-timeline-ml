import React from 'react';
import { useTranslation } from 'react-i18next';

interface RAGModalProps {
  isOpen: boolean;
  isLoading: boolean;
  isTranslating?: boolean;
  content: { title: string; text: string; imageUrl?: string; } | null;
  sources: { uri: string; title: string }[];
  onClose: () => void;
  onTranslate?: () => void;
}

const RAGModal: React.FC<RAGModalProps> = ({ isOpen, isLoading, isTranslating, content, sources, onClose, onTranslate }) => {
  const { t, i18n } = useTranslation();
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rag-modal-title"
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in" 
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
            {content?.imageUrl && (
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-16 h-20 object-cover object-top rounded-md shadow-md border border-slate-600"
              />
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <h2 id="rag-modal-title" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {content?.title ? t('About {{title}}', { title: t(content.title) }) : t('Loading...')}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold"
            aria-label={t("Close")}
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-48 text-center p-4">
                <p className="text-lg text-slate-300">{t("Finding some brilliant information on")}</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 my-2">{content?.title ? t(content.title) : ''}</p>
                <p className="text-slate-400 animate-pulse">{t("for you... please wait.")}</p>
            </div>
          ) : (
            <>
              <div className="text-slate-300 leading-relaxed space-y-4">
                {content?.text?.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
              </div>
              {sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">{t("Sources")}</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {sources.map((source, index) => (
                      <li key={index} className="truncate">
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-400 hover:underline"
                          title={source.title}
                        >
                          {source.title || new URL(source.uri).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RAGModal;

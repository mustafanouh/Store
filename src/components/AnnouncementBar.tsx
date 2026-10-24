import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AnnouncementBarProps {
  lang: Language;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ lang }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const t = translations[lang];

  if (isDismissed) return null;

  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800 transition-all">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-medium truncate px-2">
          <span>{t.announcement}</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href="tel:+963985690091"
            className="hidden sm:inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition"
          >
            <i className="fa-solid fa-phone text-[10px]"></i>
            <span className="tabular-nums">+963 985 690 091</span>
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white transition p-0.5 rounded cursor-pointer"
            title="Dismiss announcement"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

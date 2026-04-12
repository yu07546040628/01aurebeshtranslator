'use client';

import { LANGUAGES } from '@/lib/languages';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onChange(lang.id)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
              value === lang.id
                ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/30'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50 hover:text-yellow-300'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

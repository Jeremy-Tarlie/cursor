'use client';

import { useState } from 'react';
import { languages } from '../utils/languages';

interface TranslationFormProps {
  onTranslate: (text: string, fromLang: string, toLang: string) => Promise<void>;
}

export default function TranslationForm({ onTranslate }: TranslationFormProps) {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('fr');
  const [toLang, setToLang] = useState('en');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onTranslate(text, fromLang, toLang);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromLang" className="block text-sm font-medium text-gray-700">
            Langue source
          </label>
          <select
            id="fromLang"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="toLang" className="block text-sm font-medium text-gray-700">
            Langue cible
          </label>
          <select
            id="toLang"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          Texte à traduire
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Entrez votre texte ici..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Traduire
      </button>
    </form>
  );
} 
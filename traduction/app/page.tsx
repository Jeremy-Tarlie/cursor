'use client';

import { useState } from 'react';
import TranslationForm from '../components/TranslationForm';
import { translateText } from '../services/translationService';

export default function Home() {
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (text: string, fromLang: string, toLang: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await translateText(text, fromLang, toLang);
      setTranslation(result.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Traducteur Multilingue
        </h1>
        
        <TranslationForm onTranslate={handleTranslate} />
        
        {loading && (
          <div className="text-center mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {translation && !error && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Traduction
            </h2>
            <p className="text-gray-800 whitespace-pre-wrap">{translation}</p>
          </div>
        )}
      </div>
    </main>
  );
}

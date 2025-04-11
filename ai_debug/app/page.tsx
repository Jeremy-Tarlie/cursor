'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else if (data.response) {
        setResponse(data.response);
      } else {
        setError('Format de réponse inattendu');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Une erreur est survenue lors de la communication avec le serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Chat avec Fireworks AI</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Posez votre question ici..."
            className="w-full p-4 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Chargement...' : 'Envoyer'}
        </button>
      </form>

      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <h2 className="font-semibold mb-2">Erreur :</h2>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Réponse :</h2>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </main>
  );
}

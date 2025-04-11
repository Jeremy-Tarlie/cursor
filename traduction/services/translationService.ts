interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

export async function translateText(
  text: string,
  fromLang: string,
  toLang: string
): Promise<TranslationResponse> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [{ text, translatable: true }],
      target: toLang,
      source: fromLang || undefined,
      context: "Translation web application",
      instructions: ["Use a formal tone"]
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur de traduction: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
} 
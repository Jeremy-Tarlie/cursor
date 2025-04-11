import { NextRequest, NextResponse } from 'next/server';

declare global {
  var mcp_lara_translate_translate: (params: {
    text: Array<{ text: string; translatable: boolean }>;
    target: string;
    source?: string;
    context?: string;
    instructions?: string[];
  }) => Promise<{
    translations: string[];
    detectedLanguage?: string;
  }>;
}

interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
}

declare function mcp_lara_translate_translate(params: {
  text: Array<{ text: string; translatable: boolean }>;
  target: string;
  source?: string;
  context?: string;
  instructions?: string[];
}): Promise<{
  translations: string[];
  detectedLanguage?: string;
}>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, target, source } = body;

    // Appel à l'API de traduction
    const response = await fetch('http://localhost:3000/api/mcp/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [{ text, translatable: true }],
        target,
        source,
        context: "Translation web application",
        instructions: ["Use formal tone"]
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur de traduction: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json({
      translatedText: result.translations[0],
      detectedLanguage: result.detectedLanguage
    });

  } catch (error) {
    console.error('Erreur de traduction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la traduction' },
      { status: 500 }
    );
  }
}

export async function translateText(
  text: string,
  fromLang: string,
  toLang: string
): Promise<TranslationResponse> {
  // Appel à l'API
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
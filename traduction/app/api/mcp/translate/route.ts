import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Utiliser l'outil de traduction MCP avec les bonnes clés
    const translationResponse = await fetch('https://api.laratranslate.com/v1/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Lara-Auth': `${process.env.NEXT_PUBLIC_LARA_TRANSLATE_API_KEY}:${process.env.LARA_ACCESS_KEY_SECRET}`
      },
      body: JSON.stringify(body)
    });

    if (!translationResponse.ok) {
      throw new Error(`Erreur de traduction: ${translationResponse.statusText}`);
    }

    const result = await translationResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Erreur de traduction:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la traduction' },
      { status: 500 }
    );
  }
} 
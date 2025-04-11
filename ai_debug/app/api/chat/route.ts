import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const FIREWORKS_API_KEY = process.env.API_KEY_FIREWORK;

    const response = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FIREWORKS_API_KEY}`,
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p3-70b-instruct",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 1000,
          temperature: 0.7,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response not OK:", errorText);
      return NextResponse.json(
        { error: `Erreur de communication avec Fireworks AI: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.choices || !data.choices.length || !data.choices[0].message) {
      console.error("Unexpected API response structure:", data);
      return NextResponse.json(
        { error: "Format de réponse inattendu de Fireworks AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de la requête" },
      { status: 500 }
    );
  }
}

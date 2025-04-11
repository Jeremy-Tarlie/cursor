import { POST } from '../chat/route';

// Mock fetch globally
global.fetch = jest.fn();

describe('Chat API Route', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    process.env.API_KEY_FIREWORK = 'test-api-key';
  });

  it('handles successful API response', async () => {
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: 'Test response',
          },
        },
      ],
    };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      })
    );

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Test message' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data).toEqual({ response: 'Test response' });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.fireworks.ai/inference/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-api-key',
        },
      })
    );
  });

  it('handles API error response', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('API Error'),
      })
    );

    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Test message' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Erreur de communication avec Fireworks AI: API Error',
    });
    expect(response.status).toBe(404);
  });

  it('handles invalid request body', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: 'invalid json',
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data).toEqual({
      error: 'Une erreur est survenue lors du traitement de la requête',
    });
    expect(response.status).toBe(500);
  });
}); 
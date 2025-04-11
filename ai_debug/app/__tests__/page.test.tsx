import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';

// Mock fetch globally
global.fetch = jest.fn();

describe('Home Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the chat interface', () => {
    render(<Home />);
    
    expect(screen.getByText('Chat avec Fireworks AI')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Posez votre question ici...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Envoyer' })).toBeInTheDocument();
  });

  it('handles successful message submission', async () => {
    const mockResponse = {
      choices: [{ message: { content: 'Test response' } }]
    };

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<Home />);
    
    const textarea = screen.getByPlaceholderText('Posez votre question ici...');
    const submitButton = screen.getByRole('button', { name: 'Envoyer' });

    fireEvent.change(textarea, { target: { value: 'Test question' } });
    fireEvent.click(submitButton);

    expect(submitButton).toHaveTextContent('Chargement...');
    
    await waitFor(() => {
      expect(screen.getByText('Test response')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'Test question' }),
    });
  });

  it('handles API error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve('API Error'),
      })
    );

    render(<Home />);
    
    const textarea = screen.getByPlaceholderText('Posez votre question ici...');
    const submitButton = screen.getByRole('button', { name: 'Envoyer' });

    fireEvent.change(textarea, { target: { value: 'Test question' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Erreur de communication avec Fireworks AI/)).toBeInTheDocument();
    });
  });

  it('disables submit button when textarea is empty', () => {
    render(<Home />);
    
    const submitButton = screen.getByRole('button', { name: 'Envoyer' });
    expect(submitButton).toBeDisabled();

    const textarea = screen.getByPlaceholderText('Posez votre question ici...');
    fireEvent.change(textarea, { target: { value: 'Test' } });
    expect(submitButton).not.toBeDisabled();
  });
}); 
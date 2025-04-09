import { NextRequest } from 'next/server';
import { GET, POST } from '../../app/api/users/route';
import { GET as GET_USER, PUT, DELETE } from '../../app/api/users/[id]/route';

// Mock de NextRequest
const createMockRequest = (body?: any): NextRequest => {
  return {
    json: async () => body || {},
  } as unknown as NextRequest;
};

describe('API Users', () => {
  let userId: string;

  it('devrait créer un nouvel utilisateur', async () => {
    // Arrange
    const request = createMockRequest({
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    });

    // Act
    const response = await POST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(201);
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email', 'test@example.com');
    expect(data).toHaveProperty('name', 'Test User');
    expect(data).not.toHaveProperty('password');

    // Sauvegarder l'ID pour les tests suivants
    userId = data.id;
  });

  it('devrait récupérer tous les utilisateurs', async () => {
    // Act
    const response = await GET();
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('devrait récupérer un utilisateur par ID', async () => {
    // Arrange
    const request = createMockRequest();
    const params = { id: userId };

    // Act
    const response = await GET_USER(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', userId);
    expect(data).toHaveProperty('email', 'test@example.com');
    expect(data).toHaveProperty('name', 'Test User');
  });

  it('devrait mettre à jour un utilisateur', async () => {
    // Arrange
    const request = createMockRequest({
      name: 'Updated User',
    });
    const params = { id: userId };

    // Act
    const response = await PUT(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', userId);
    expect(data).toHaveProperty('name', 'Updated User');
  });

  it('devrait supprimer un utilisateur', async () => {
    // Arrange
    const request = createMockRequest();
    const params = { id: userId };

    // Act
    const response = await DELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('message', 'Utilisateur supprimé');
  });
}); 
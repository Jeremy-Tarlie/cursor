import { GetUsersUseCase } from '../../../../src/core/useCases/GetUsersUseCase';
import { IUserRepository } from '../../../../src/core/domain/repositories/IUserRepository';
import { User, UserDTO } from '../../../../src/core/domain/entities/User';

// Mock du repository
class MockUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'test1@example.com',
      name: 'Test User 1',
      password: 'password123',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: '2',
      email: 'test2@example.com',
      name: 'Test User 2',
      password: 'password456',
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02'),
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(): Promise<User | null> {
    return null;
  }

  async create(): Promise<User> {
    return this.users[0];
  }

  async update(): Promise<User> {
    return this.users[0];
  }

  async delete(): Promise<void> {
    // Ne fait rien
  }
}

describe('GetUsersUseCase', () => {
  let useCase: GetUsersUseCase;
  let repository: IUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
    useCase = new GetUsersUseCase(repository);
  });

  it('devrait retourner tous les utilisateurs sous forme de DTO', async () => {
    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('id', '1');
    expect(result[0]).toHaveProperty('email', 'test1@example.com');
    expect(result[0]).toHaveProperty('name', 'Test User 1');
    expect(result[0]).toHaveProperty('createdAt');
    expect(result[0]).not.toHaveProperty('password');
    expect(result[0]).not.toHaveProperty('updatedAt');
  });
}); 
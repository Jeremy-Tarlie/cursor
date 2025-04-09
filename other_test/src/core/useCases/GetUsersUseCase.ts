import { IUserRepository } from '../domain/repositories/IUserRepository';
import { User, UserDTO } from '../domain/entities/User';

export class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll();
    
    // Transformer les utilisateurs en DTO pour ne pas exposer les données sensibles
    return users.map(user => this.mapToDTO(user));
  }

  private mapToDTO(user: User): UserDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
} 
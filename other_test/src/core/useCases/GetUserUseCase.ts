import { IUserRepository } from '../domain/repositories/IUserRepository';
import { User, UserDTO } from '../domain/entities/User';

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserDTO | null> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      return null;
    }
    
    return this.mapToDTO(user);
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
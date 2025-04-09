import { IUserRepository } from '../domain/repositories/IUserRepository';
import { CreateUserDTO, User, UserDTO } from '../domain/entities/User';
import { createUserSchema } from '../../infrastructure/validation/UserValidationSchema';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<UserDTO> {
    // Valider les données d'entrée
    const validatedData = createUserSchema.parse(data);
    
    // Créer l'utilisateur
    const user = await this.userRepository.create(validatedData);
    
    // Retourner le DTO
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
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { UpdateUserDTO, User, UserDTO } from '../domain/entities/User';
import { updateUserSchema } from '../../infrastructure/validation/UserValidationSchema';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<UserDTO | null> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return null;
    }
    
    // Valider les données d'entrée
    const validatedData = updateUserSchema.parse(data);
    
    // Mettre à jour l'utilisateur
    const updatedUser = await this.userRepository.update(id, validatedData);
    
    // Retourner le DTO
    return this.mapToDTO(updatedUser);
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
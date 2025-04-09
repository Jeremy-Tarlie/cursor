import { IUserRepository } from '../domain/repositories/IUserRepository';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      return false;
    }
    
    // Supprimer l'utilisateur
    await this.userRepository.delete(id);
    
    return true;
  }
} 
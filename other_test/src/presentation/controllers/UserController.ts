import { NextResponse } from 'next/server';
import { GetUsersUseCase } from '../../core/useCases/GetUsersUseCase';
import { GetUserUseCase } from '../../core/useCases/GetUserUseCase';
import { CreateUserUseCase } from '../../core/useCases/CreateUserUseCase';
import { UpdateUserUseCase } from '../../core/useCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../core/useCases/DeleteUserUseCase';
import { PrismaUserRepository } from '../../infrastructure/database/PrismaUserRepository';
import { CreateUserDTO, UpdateUserDTO } from '../../core/domain/entities/User';

export class UserController {
  private userRepository = new PrismaUserRepository();
  
  private getUsersUseCase = new GetUsersUseCase(this.userRepository);
  private getUserUseCase = new GetUserUseCase(this.userRepository);
  private createUserUseCase = new CreateUserUseCase(this.userRepository);
  private updateUserUseCase = new UpdateUserUseCase(this.userRepository);
  private deleteUserUseCase = new DeleteUserUseCase(this.userRepository);

  async getAllUsers() {
    try {
      const users = await this.getUsersUseCase.execute();
      return NextResponse.json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.getUserUseCase.execute(id);
      
      if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }
      
      return NextResponse.json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
  }

  async createUser(data: CreateUserDTO) {
    try {
      const user = await this.createUserUseCase.execute(data);
      return NextResponse.json(user, { status: 201 });
    } catch (error: any) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      
      if (error.name === 'ZodError') {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    try {
      const user = await this.updateUserUseCase.execute(id, data);
      
      if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }
      
      return NextResponse.json(user);
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      
      if (error.name === 'ZodError') {
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
      
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
  }

  async deleteUser(id: string) {
    try {
      const success = await this.deleteUserUseCase.execute(id);
      
      if (!success) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }
      
      return NextResponse.json({ message: 'Utilisateur supprimé' }, { status: 200 });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
  }
} 
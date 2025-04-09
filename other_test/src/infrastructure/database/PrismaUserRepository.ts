import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../core/domain/repositories/IUserRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '../../core/domain/entities/User';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'file:./dev.db',
        },
      },
    });
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  }

  async create(data: CreateUserDTO): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
  }
} 
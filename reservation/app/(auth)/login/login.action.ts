'use server';

import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { loginSchema } from '@/lib/validations/auth.schema';

export type LoginState = {
  error?: string;
  success?: boolean;
};

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    // Valider les données
    const validatedData = loginSchema.parse(data);

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return { error: 'Email ou mot de passe incorrect' };
    }

    // Vérifier le mot de passe
    const isValid = await compare(validatedData.password, user.password);
    if (!isValid) {
      return { error: 'Email ou mot de passe incorrect' };
    }

    // Retourner un succès au lieu de rediriger directement
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return { error: 'Une erreur est survenue lors de la connexion' };
  }
} 
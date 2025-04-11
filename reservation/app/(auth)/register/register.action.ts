'use server';

import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validations/auth.schema';
import { redirect } from 'next/navigation';

export async function registerAction(prevState: { error: string; success?: boolean }, formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    // Valider les données
    const validatedData = registerSchema.parse(data);

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { error: 'Cet email est déjà utilisé' };
    }

    // Créer l'utilisateur
    const hashedPassword = await hash(validatedData.password, 10);
    await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    // Retourner un succès au lieu de rediriger directement
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return { error: 'Une erreur est survenue lors de l\'inscription' };
  }
} 
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email invalide'),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export const updateUserSchema = z.object({
  email: z.string().email('Email invalide').optional(),
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>; 
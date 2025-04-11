"use client"
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { registerAction } from './register.action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
  error: '',
  success: false,
};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(registerAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/login');
    }
  }, [state.success, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Inscription</h1>
          <p className="mt-2 text-gray-600">Créez votre compte</p>
        </div>
        
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {state.error}
          </div>
        )}
        
        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <Button className="w-full">S'inscrire</Button>
        </form>

        <p className="text-center text-sm">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-primary-500 hover:text-primary-600">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
} 
"use client"
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { loginAction, LoginState } from './login.action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const initialState: LoginState = {
  error: '',
  success: false,
};

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/dashboard');
    }
  }, [state.success, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Connexion</h1>
          <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
        </div>
        
        {state.error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {state.error}
          </div>
        )}
        
        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
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

          <Button className="w-full">Se connecter</Button>
        </form>

        <p className="text-center text-sm">
          Pas encore de compte ?{' '}
          <Link href="/register" className="text-primary-500 hover:text-primary-600">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  );
} 
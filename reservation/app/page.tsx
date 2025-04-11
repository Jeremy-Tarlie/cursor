import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur notre plateforme</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Se connecter</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">S'inscrire</Button>
        </Link>
      </div>
    </main>
  );
}

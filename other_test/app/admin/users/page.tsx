import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import UserList from './UserList';

export default async function AdminUsersPage() {
  const session = await getServerSession();

  // Vérifier si l'utilisateur est admin
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }

  const adminUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!adminUser?.isAdmin) {
    redirect('/');
  }

  // Récupérer tous les utilisateurs
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des utilisateurs</h1>
      <UserList users={users} />
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedElement from '../components/AnimatedElement';
import AnimatedList from '../components/AnimatedList';
import AnimatedButton from '../components/AnimatedButton';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    setDeleteId(id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }

      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement animation="fadeIn" duration={1000}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">Liste des Utilisateurs</h1>
            <AnimatedButton 
              variant="primary" 
              size="md"
              onClick={() => {}}
            >
              <Link href="/users/new">Nouvel Utilisateur</Link>
            </AnimatedButton>
          </div>
        </AnimatedElement>

        {error && (
          <AnimatedElement animation="bounce" duration={500}>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Erreur :</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </AnimatedElement>
        )}

        {users.length === 0 ? (
          <AnimatedElement animation="fadeIn" delay={200} duration={800}>
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Aucun utilisateur trouvé</p>
            </div>
          </AnimatedElement>
        ) : (
          <AnimatedElement animation="slideIn" delay={300} duration={800}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de création</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <AnimatedList animation="fadeIn" staggerDelay={100} className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <AnimatedButton 
                          variant="secondary" 
                          size="sm"
                          className="mr-2"
                          onClick={() => {}}
                        >
                          <Link href={`/users/${user.id}/edit`}>Modifier</Link>
                        </AnimatedButton>
                        <AnimatedButton 
                          variant="danger" 
                          size="sm"
                          loading={deleteId === user.id}
                          disabled={deleteId === user.id}
                          onClick={() => handleDelete(user.id)}
                        >
                          {deleteId === user.id ? 'Suppression...' : 'Supprimer'}
                        </AnimatedButton>
                      </td>
                    </tr>
                  ))}
                </AnimatedList>
              </table>
            </div>
          </AnimatedElement>
        )}
      </div>
    </div>
  );
} 
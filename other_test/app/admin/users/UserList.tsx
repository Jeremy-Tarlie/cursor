import { useState } from 'react';
import { User } from '@prisma/client';

interface UserListProps {
  users: User[];
}

export default function UserList({ users: initialUsers }: UserListProps) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState<string | null>(null);

  const handleTogglePremium = async (userId: string, currentStatus: boolean) => {
    try {
      setLoading(userId);
      const response = await fetch(`/api/admin/users/${userId}/toggle-premium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPremium: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la modification du statut');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isPremium: updatedUser.isPremium } : user
      ));
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la modification du statut');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Utilisateur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date d'inscription
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.isPremium
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.isPremium ? 'Premium' : 'Standard'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleTogglePremium(user.id, user.isPremium)}
                  disabled={loading === user.id}
                  className={`${
                    user.isPremium
                      ? 'text-red-600 hover:text-red-900'
                      : 'text-green-600 hover:text-green-900'
                  } disabled:opacity-50`}
                >
                  {loading === user.id
                    ? 'Chargement...'
                    : user.isPremium
                    ? 'Retirer Premium'
                    : 'Ajouter Premium'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
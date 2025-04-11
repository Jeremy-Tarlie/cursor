import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <Button variant="outline">Nouvelle réservation</Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
          <div className="space-y-4">
            {/* Exemple de réservation */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Réservation #1</p>
                  <p className="text-sm text-gray-500">Date: 01/01/2024</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  Confirmée
                </span>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Réservation #2</p>
                  <p className="text-sm text-gray-500">Date: 02/01/2024</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  En attente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
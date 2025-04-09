import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Paiement réussi !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Votre abonnement a été activé avec succès.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            href="/dashboard"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retour au tableau de bord
          </Link>
          <Link
            href="/invoices"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voir mes factures
          </Link>
        </div>
      </div>
    </div>
  );
} 
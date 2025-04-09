import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Invoice {
  id: string;
  amount: number;
  status: string;
  date: string;
  invoicePdf: string;
}

interface InvoiceListProps {
  userId: string;
}

export default function InvoiceList({ userId }: InvoiceListProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`/api/invoices?userId=${userId}`);
        const data = await response.json();
        setInvoices(data.invoices);
      } catch (error) {
        console.error('Erreur lors de la récupération des factures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userId]);

  const handleDownloadInvoice = async (invoicePdf: string) => {
    window.open(invoicePdf, '_blank');
  };

  if (loading) {
    return <div>Chargement des factures...</div>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Historique des factures</h2>
      {invoices.length === 0 ? (
        <p>Aucune facture disponible</p>
      ) : (
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">Facture #{invoice.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(invoice.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Montant: {(invoice.amount / 100).toFixed(2)}€
                </p>
                <p className="text-sm">
                  Statut: {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                </p>
              </div>
              <button
                onClick={() => handleDownloadInvoice(invoice.invoicePdf)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Télécharger
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 
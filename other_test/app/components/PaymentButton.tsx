import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentButtonProps {
  userId: string;
  priceId: string;
}

export default function PaymentButton({ userId, priceId }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Créer la session de paiement
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          priceId,
        }),
      });

      const { sessionId } = await response.json();

      // Rediriger vers Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Erreur de paiement:', error);
        alert('Une erreur est survenue lors du paiement.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? 'Chargement...' : 'Souscrire maintenant'}
    </button>
  );
} 
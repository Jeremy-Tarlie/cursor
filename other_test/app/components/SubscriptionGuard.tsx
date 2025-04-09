import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentButton from './PaymentButton';

interface SubscriptionGuardProps {
  userId: string;
  children: React.ReactNode;
}

export default function SubscriptionGuard({ userId, children }: SubscriptionGuardProps) {
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch(`/api/subscription/status?userId=${userId}`);
        const data = await response.json();
        setHasSubscription(data.hasActiveSubscription);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'abonnement:', error);
        setHasSubscription(false);
      }
    };

    checkSubscription();
  }, [userId]);

  if (hasSubscription === null) {
    return <div>Chargement...</div>;
  }

  if (!hasSubscription) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">
          Abonnement requis
        </h2>
        <p className="mb-6">
          Pour accéder à cette fonctionnalité, vous devez avoir un abonnement actif.
        </p>
        <PaymentButton
          userId={userId}
          priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!}
        />
      </div>
    );
  }

  return <>{children}</>;
} 
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as const,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'ID utilisateur requis' },
        { status: 400 }
      );
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json({ hasActiveSubscription: false });
    }

    // Récupérer les abonnements actifs
    const subscriptions = await stripe.subscriptions.list({
      customer: user.stripeCustomerId,
      status: 'active',
    });

    const hasActiveSubscription = subscriptions.data.length > 0;

    // Mettre à jour le statut de l'utilisateur
    await prisma.user.update({
      where: { id: userId },
      data: {
        isPremium: hasActiveSubscription,
        subscriptionStatus: hasActiveSubscription ? 'active' : 'inactive',
      },
    });

    return NextResponse.json({ hasActiveSubscription });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'abonnement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification de l\'abonnement' },
      { status: 500 }
    );
  }
} 
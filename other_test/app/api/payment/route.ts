import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as const,
});

export async function POST(req: Request) {
  try {
    const { userId, priceId } = await req.json();

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // Créer ou récupérer le client Stripe
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      stripeCustomerId = customer.id;
      
      // Mettre à jour l'utilisateur avec l'ID du client Stripe
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Créer la session de paiement
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erreur de paiement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
} 
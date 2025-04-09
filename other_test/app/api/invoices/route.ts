import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';

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
      return NextResponse.json({ invoices: [] });
    }

    // Récupérer les factures depuis Stripe
    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
      limit: 10,
    });

    // Formater les factures
    const formattedInvoices = invoices.data.map((invoice) => ({
      id: invoice.number || invoice.id,
      amount: invoice.amount_paid,
      status: invoice.status,
      date: new Date(invoice.created * 1000).toISOString(),
      invoicePdf: invoice.invoice_pdf,
    }));

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (error) {
    console.error('Erreur lors de la récupération des factures:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des factures' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../../../../lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession();

    // Vérifier si l'utilisateur est admin
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!adminUser?.isAdmin) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { isPremium } = await request.json();

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { isPremium },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Erreur lors de la modification du statut:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la modification du statut' },
      { status: 500 }
    );
  }
} 
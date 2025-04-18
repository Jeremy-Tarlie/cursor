import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageTransition from './components/PageTransition';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gestion des Utilisateurs',
  description: 'Application de gestion des utilisateurs avec animations',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}

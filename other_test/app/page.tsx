'use client';

import Link from 'next/link';
import AnimatedElement from './components/AnimatedElement';
import AnimatedButton from './components/AnimatedButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedElement animation="fadeIn" duration={1000}>
            <h1 className="text-5xl font-bold text-blue-800 mb-6">
              Bienvenue dans l'Application de Gestion
            </h1>
          </AnimatedElement>

          <AnimatedElement animation="slideIn" delay={300} duration={800}>
            <p className="text-xl text-gray-600 mb-12">
              Une application moderne pour gérer vos utilisateurs avec des animations fluides
            </p>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedElement animation="bounce" delay={500} duration={800}>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Gestion des Utilisateurs</h2>
                <p className="text-gray-600 mb-6">
                  Gérez facilement vos utilisateurs : ajoutez, modifiez et supprimez des comptes en quelques clics.
                </p>
                <AnimatedButton variant="primary" size="lg">
                  <Link href="/users">Accéder aux Utilisateurs</Link>
                </AnimatedButton>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="bounce" delay={700} duration={800}>
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">Documentation API</h2>
                <p className="text-gray-600 mb-6">
                  Explorez notre documentation API complète pour intégrer nos services dans vos applications.
                </p>
                <AnimatedButton variant="secondary" size="lg">
                  <Link href="/api-docs">Voir la Documentation</Link>
                </AnimatedButton>
              </div>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="fadeIn" delay={900} duration={800}>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Fonctionnalités Principales
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li>✨ Interface utilisateur moderne et responsive</li>
                <li>🎨 Animations fluides et élégantes</li>
                <li>🔒 Gestion sécurisée des utilisateurs</li>
                <li>📱 Compatible mobile et desktop</li>
              </ul>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </div>
  );
} 
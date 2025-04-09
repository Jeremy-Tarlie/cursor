import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">UserManager</h3>
            <p className="text-gray-400">
              Une application moderne pour gérer vos utilisateurs avec une API REST puissante.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/users" className="text-gray-400 hover:text-white transition-colors">
                  Utilisateurs
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation API
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              Pour toute question ou suggestion, n'hésitez pas à nous contacter.
            </p>
            <p className="text-gray-400 mt-2">
              Email: contact@usermanager.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} UserManager. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
} 
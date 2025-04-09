import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-700">
              UserManager
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Accueil
            </Link>
            <Link 
              href="/users" 
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Utilisateurs
            </Link>
            <Link 
              href="/api-docs" 
              className="text-gray-600 hover:text-blue-700 transition-colors"
            >
              Documentation API
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 
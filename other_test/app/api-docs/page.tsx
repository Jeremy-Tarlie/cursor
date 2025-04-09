'use client';

import { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';

interface Endpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: string;
  responseExample?: string;
}

const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/users',
    description: 'Récupère la liste de tous les utilisateurs',
    responseExample: `[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-20T10:00:00Z"
  }
]`
  },
  {
    method: 'POST',
    path: '/api/users',
    description: 'Crée un nouvel utilisateur',
    requestBody: `{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123"
}`,
    responseExample: `{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-20T10:00:00Z"
}`
  },
  {
    method: 'GET',
    path: '/api/users/[id]',
    description: 'Récupère les détails d\'un utilisateur spécifique',
    responseExample: `{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-03-20T10:00:00Z"
}`
  },
  {
    method: 'PUT',
    path: '/api/users/[id]',
    description: 'Met à jour un utilisateur existant',
    requestBody: `{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "nouveaumotdepasse123"
}`,
    responseExample: `{
  "id": "1",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "createdAt": "2024-03-20T10:00:00Z"
}`
  },
  {
    method: 'DELETE',
    path: '/api/users/[id]',
    description: 'Supprime un utilisateur',
    responseExample: `{
  "message": "Utilisateur supprimé avec succès"
}`
  }
];

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement animation="fadeIn" duration={1000}>
          <h1 className="text-4xl font-bold text-blue-800 mb-8">Documentation API</h1>
        </AnimatedElement>
        
        <AnimatedElement animation="slideIn" delay={200} duration={800}>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-6">
                Cette API REST permet de gérer les utilisateurs de l'application. Tous les endpoints retournent des réponses au format JSON.
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Base URL</h3>
                <code className="bg-gray-100 px-3 py-2 rounded text-sm">
                  https://votre-domaine.com/api
                </code>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Codes de réponse</h3>
                <ul className="list-disc list-inside text-gray-600">
                  <li>200 : Succès</li>
                  <li>201 : Création réussie</li>
                  <li>400 : Requête invalide</li>
                  <li>404 : Ressource non trouvée</li>
                  <li>500 : Erreur serveur</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 p-6">Endpoints</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-1">
                  <div className="space-y-2">
                    {endpoints.map((endpoint, index) => (
                      <AnimatedElement 
                        key={index} 
                        animation="fadeIn" 
                        delay={300 + index * 100}
                        duration={600}
                      >
                        <button
                          onClick={() => setSelectedEndpoint(endpoint)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedEndpoint === endpoint
                              ? 'bg-blue-50 text-blue-700'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {endpoint.method}
                            </span>
                            <span className="font-mono text-sm">{endpoint.path}</span>
                          </div>
                        </button>
                      </AnimatedElement>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  {selectedEndpoint ? (
                    <AnimatedElement animation="bounce" duration={500}>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-2 mb-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            selectedEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedEndpoint.method}
                          </span>
                          <code className="font-mono text-sm">{selectedEndpoint.path}</code>
                        </div>

                        <p className="text-gray-600 mb-4">{selectedEndpoint.description}</p>

                        {selectedEndpoint.requestBody && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Corps de la requête</h4>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                              <code>{selectedEndpoint.requestBody}</code>
                            </pre>
                          </div>
                        )}

                        {selectedEndpoint.responseExample && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Exemple de réponse</h4>
                            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                              <code>{selectedEndpoint.responseExample}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </AnimatedElement>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Sélectionnez un endpoint pour voir sa documentation
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  );
} 
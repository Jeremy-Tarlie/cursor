// Configuration globale pour les tests
jest.setTimeout(120000);

// Mock fetch globalement
global.fetch = jest.fn();

// Configuration pour les tests E2E avec Puppeteer
beforeAll(async () => {
    // Configuration globale pour tous les tests
});

afterAll(async () => {
    // Nettoyage global après tous les tests
});

// Réinitialiser les mocks après chaque test
afterEach(() => {
    jest.clearAllMocks();
});

// Supprimer les avertissements de console non pertinents pour les tests
const originalConsoleError = console.error;
console.error = (...args) => {
    if (
        args[0]?.includes('Error: Protocol error') ||
        args[0]?.includes('net::ERR_FAILED') ||
        args[0]?.includes('net::ERR_ABORTED')
    ) {
        return;
    }
    originalConsoleError.apply(console, args);
};

// Configuration globale pour Puppeteer
process.env.PUPPETEER_SKIP_DOWNLOAD = 'true';
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true'; 
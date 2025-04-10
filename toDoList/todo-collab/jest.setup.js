import '@testing-library/jest-dom'

// Mock de fetch pour les tests
global.fetch = jest.fn()

// Réinitialisation des mocks après chaque test
afterEach(() => {
  jest.clearAllMocks()
}) 
import { PrismaClient } from '@prisma/client'

async function globalSetup() {
  const prisma = new PrismaClient()
  
  try {
    // Nettoyer la base de données avant les tests
    await prisma.todo.deleteMany()
  } catch (error) {
    console.error('Erreur lors du nettoyage de la base de données:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default globalSetup 
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type DeleteTodoResult = {
  success: boolean
  error?: string
}

export async function createTodo(content: string) {
  const todo = await prisma.todo.create({
    data: { content }
  })
  revalidatePath('/')
  return todo
}

export async function toggleTodo(id: string) {
  const todo = await prisma.todo.findUnique({ where: { id } })
  if (!todo) return null

  const updated = await prisma.todo.update({
    where: { id },
    data: { done: !todo.done }
  })
  revalidatePath('/')
  return updated
}

export async function getTodos() {
  return prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function deleteTodo(id: string): Promise<DeleteTodoResult> {
  try {
    await prisma.todo.delete({
      where: { id }
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error)
    return { success: false, error: 'Erreur lors de la suppression de la tâche' }
  }
} 
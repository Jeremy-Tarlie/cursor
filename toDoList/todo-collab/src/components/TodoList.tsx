"use client"
import { useState, useTransition } from 'react'
import { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'
import { TodoItemSkeleton } from './TodoItemSkeleton'
import { Toast } from './Toast'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const [error, setError] = useState<string | null>(null)
  const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos)
  const [isPending, startTransition] = useTransition()
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  const handleDelete = async (id: string) => {
    setDeletingIds(prev => new Set([...prev, id]))
    
    // Mise à jour optimiste
    setOptimisticTodos((current) => current.filter(todo => todo.id !== id))

    try {
      startTransition(async () => {
        const result = await onDelete(id)
        if (!result.success) {
          // Restaure l'état en cas d'erreur
          setOptimisticTodos(todos)
          setError(result.error || 'Erreur lors de la suppression de la tâche')
        }
      })
    } catch {
      // Restaure l'état en cas d'erreur
      setOptimisticTodos(todos)
      setError('Erreur lors de la suppression de la tâche')
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  if (optimisticTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucune tâche pour le moment. Ajoutez-en une !
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {optimisticTodos.map((todo) => (
          <div key={todo.id} className="relative">
            {deletingIds.has(todo.id) && (
              <div className="absolute inset-0 bg-white/50 z-10">
                <TodoItemSkeleton />
              </div>
            )}
            <TodoItem 
              todo={todo} 
              onToggle={onToggle}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
      {error && (
        <Toast 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}
      {isPending && (
        <div className="fixed bottom-4 left-4">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
            Mise à jour en cours...
          </div>
        </div>
      )}
    </>
  )
} 
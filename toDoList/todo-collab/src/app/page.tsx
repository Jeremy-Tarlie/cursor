import { Suspense } from 'react'
import { TodoForm } from '@/components/TodoForm'
import { TodoList } from '@/components/TodoList'
import { TodoItemSkeleton } from '@/components/TodoItemSkeleton'
import { createTodo, getTodos, toggleTodo, deleteTodo } from './actions'

function LoadingTodos() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <TodoItemSkeleton key={i} />
      ))}
    </div>
  )
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes tâches</h1>
            <p className="mt-1 text-gray-500">
              Gérez vos tâches quotidiennes simplement et efficacement.
            </p>
          </div>

          <TodoForm onSubmit={createTodo} />
          
          <div className="border-t border-gray-200 pt-6">
            <Suspense fallback={<LoadingTodos />}>
              <TodoList 
                todos={todos} 
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

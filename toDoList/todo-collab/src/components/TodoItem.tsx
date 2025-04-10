import { Todo } from '@/types/todo'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow group">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <div className="flex-1">
        <p className={`text-gray-800 ${todo.done ? 'line-through' : ''}`}>
          {todo.content}
        </p>
        <p className="text-sm text-gray-500">
          Créée {formatDistanceToNow(todo.createdAt, { locale: fr, addSuffix: true })}
        </p>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Supprimer la tâche"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  )
} 
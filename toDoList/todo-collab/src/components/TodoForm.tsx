"use client"
import { useState } from 'react'
import { Todo } from '@/types/todo'

type TodoFormProps = {
  onSubmit: (content: string) => Promise<Todo>
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content)
      setContent('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Nouvelle tâche
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Que souhaitez-vous faire ?"
            disabled={isSubmitting}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={!content.trim() || isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
      </button>
    </form>
  )
} 
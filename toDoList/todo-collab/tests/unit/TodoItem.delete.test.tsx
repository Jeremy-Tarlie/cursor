import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from '@/components/TodoItem'
import { Todo } from '@/types/todo'

describe('TodoItem - Suppression', () => {
  const mockTodo: Todo = {
    id: '1',
    content: 'Tâche test',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('affiche le bouton de suppression au survol', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByLabelText('Supprimer la tâche')
    expect(deleteButton).toBeInTheDocument()
    // Vérifie que le bouton est initialement invisible (opacity: 0)
    expect(deleteButton).toHaveClass('opacity-0')
  })

  it('appelle onDelete avec l\'id correct lors du clic', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByLabelText('Supprimer la tâche')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id)
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('est accessible au clavier', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByLabelText('Supprimer la tâche')
    
    // Vérifie que le bouton est focusable
    deleteButton.focus()
    expect(deleteButton).toHaveFocus()

    // Vérifie que le bouton est visible au focus
    expect(deleteButton).toHaveClass('focus:opacity-100')

    // Simule l'appui sur Entrée
    fireEvent.keyDown(deleteButton, { key: 'Enter' })
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id)
  })
}) 
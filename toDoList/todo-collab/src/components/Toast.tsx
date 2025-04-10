import { useEffect } from 'react'
import { X } from 'lucide-react'

type ToastProps = {
  message: string
  type?: 'error' | 'success'
  onClose: () => void
}

export function Toast({ message, type = 'error', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50'
  const textColor = type === 'error' ? 'text-red-800' : 'text-green-800'
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200'

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg border ${bgColor} ${textColor} ${borderColor}`}
      role="alert"
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded-full"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
} 
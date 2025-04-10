export function TodoItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow animate-pulse">
      <div className="h-5 w-5 rounded bg-gray-200" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="h-8 w-8 rounded bg-gray-200" />
    </div>
  )
} 
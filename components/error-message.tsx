"use client"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
      <p className="text-destructive mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 transition-colors text-sm"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

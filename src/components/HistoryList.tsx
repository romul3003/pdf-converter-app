'use client'

import { HistoryEntry } from '@/hooks/usePdfHistory'

type HistoryListProps = {
  history: HistoryEntry[]
  onSelectAction: (entry: HistoryEntry) => void
}

export const HistoryList = ({ history, onSelectAction }: HistoryListProps) => {
  return (
    <div className="space-y-2">
      <h2 className="mb-2 text-lg font-semibold">History</h2>
      {history.length === 0 && <p className="text-sm text-gray-500">No history yet.</p>}

      {history.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelectAction(entry)}
          className="block w-full rounded bg-gray-100 px-4 py-2 text-left hover:bg-gray-200"
        >
          {new Date(entry.createdAt).toLocaleString()} —{' '}
          <span className="line-clamp-1 text-gray-700 italic">{entry.text.slice(0, 50)}</span>
        </button>
      ))}
    </div>
  )
}

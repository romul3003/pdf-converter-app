'use client'

import clsx from 'clsx'
import { HistoryEntry } from '@/types/types'

type HistoryListProps = {
  history: HistoryEntry[]
  onSelectAction: (entry: HistoryEntry) => void
  selectedId: string | null
}

export const HistoryList = ({ history, onSelectAction, selectedId }: HistoryListProps) => {
  return (
    <div className="space-y-2">
      <h2 className="mb-2 text-lg font-semibold">History</h2>
      {history.length === 0 && <p className="text-sm text-gray-500">No history yet.</p>}

      {history.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelectAction(entry)}
          className={clsx(
            'block w-full rounded bg-gray-100 px-4 py-2 text-left hover:cursor-pointer hover:bg-gray-200',
            entry.id === selectedId ? 'bg-gray-300 font-semibold' : 'bg-gray-100',
          )}
        >
          {new Date(entry.createdAt).toLocaleString()} —{' '}
          <span className="line-clamp-1 text-gray-700 italic">{entry.text.slice(0, 50)}</span>
        </button>
      ))}
    </div>
  )
}

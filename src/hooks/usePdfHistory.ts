'use client'

import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

export type HistoryEntry = {
  id: string
  text: string
  base64: string
  createdAt: number
}

const LOCAL_STORAGE_KEY = 'pdf_history'

export function usePdfHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
    }
  }, [])

  const addEntry = (entry: Omit<HistoryEntry, 'id' | 'createdAt'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: nanoid(),
      createdAt: Date.now(),
    }

    const updated = [newEntry, ...history].slice(0, 10)
    setHistory(updated)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  }

  return { history, addEntry }
}

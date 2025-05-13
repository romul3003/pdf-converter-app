'use client'

import { useState } from 'react'

import { ConvertToPdfForm } from '@/components/ConvertToPdfForm'
import { usePdfHistory } from '@/hooks/usePdfHistory'
import { PdfPreview } from '@/components/PdfPreview'
import { HistoryList } from '@/components/HistoryList'

export default function Home() {
  const { history, addEntry } = usePdfHistory()
  const [selectedBase64, setSelectedBase64] = useState<string | null>(null)

  const handleConvert = (text: string, base64: string) => {
    addEntry({ text, base64 })
    setSelectedBase64(base64)
  }

  return (
    <main className="container mx-auto mt-12 max-w-2xl p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">PDF Converter</h1>
        <p className="text-center text-lg sm:text-left">
          Convert your text to PDF format easily and quickly.
        </p>

        <ConvertToPdfForm onSuccess={handleConvert} />

        {selectedBase64 && (
          <div className="my-6">
            <h3 className="mb-2 font-semibold">Preview:</h3>
            <PdfPreview base64={selectedBase64} />
          </div>
        )}

        <HistoryList
          history={history}
          onSelectAction={(entry) => setSelectedBase64(entry.base64)}
        />
      </div>
    </main>
  )
}

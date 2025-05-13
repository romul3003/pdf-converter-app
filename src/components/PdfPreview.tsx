'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

type PdfPreviewProps = {
  base64: string
}

const buttonStyles =
  'cursor-pointer rounded bg-gray-200 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50'

export const PdfPreview = ({ base64 }: PdfPreviewProps) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [containerWidth, setContainerWidth] = useState<number>(600)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setContainerWidth(entry.contentRect.width)
        }
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
      setContainerWidth(containerRef.current.offsetWidth)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const file = useMemo(() => {
    const raw = atob(base64)
    const uint8Array = new Uint8Array(raw.length)
    for (let i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i)
    }
    return { data: uint8Array }
  }, [base64])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () =>
    setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev))

  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = `data:application/pdf;base64,${base64}`
    link.download = 'converted.pdf'
    link.click()
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative aspect-[1/1.414] w-full border shadow-sm"
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="absolute inset-0 z-10 animate-pulse rounded bg-gray-200" />}
          error={<p className="p-4 text-red-600">Failed to load PDF.</p>}
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
          />
        </Document>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className={buttonStyles}
        >
          Previous
        </button>

        <p className="text-sm">
          Page <strong>{pageNumber}</strong> of <strong>{numPages ?? '--'}</strong>
        </p>

        <button
          type="button"
          onClick={goToNextPage}
          disabled={numPages !== null && pageNumber >= numPages}
          className={buttonStyles}
        >
          Next
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={downloadPDF}
          className="mt-2 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed"
        >
          Download PDF
        </button>
      </div>
    </div>
  )
}

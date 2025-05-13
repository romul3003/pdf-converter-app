import { ConvertToPdfForm } from '@/components/ConvertToPdfForm'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="container mx-auto mt-12 max-w-2xl p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">PDF Converter</h1>
        <p className="text-center text-lg sm:text-left">
          Convert your text to PDF format easily and quickly.
        </p>

        <ConvertToPdfForm />
      </div>
    </main>
  )
}

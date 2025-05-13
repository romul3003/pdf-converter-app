'use client'

import { useActionState } from 'react'
import clsx from 'clsx'

import * as actions from '@/actions'
import type { ConvertFormState } from '@/actions/convert-to-pdf'
import { PdfPreview } from './PdfPreview'

const initialState: ConvertFormState = {
  errors: {},
  text: '',
  base64: undefined,
}

export const ConvertToPdfForm = () => {
  const [state, formAction, pending] = useActionState<ConvertFormState, FormData>(
    actions.convertToPdf,
    initialState,
  )

  const hasFormError = !!state.errors?._form?.length

  return (
    <form
      action={formAction}
      className="flex w-full flex-col gap-4"
    >
      <div>
        <label
          htmlFor="text"
          className="mb-1 block w-fit"
        >
          Type your text to convert:
        </label>
        <textarea
          name="text"
          id="text"
          placeholder="Enter your text here..."
          defaultValue={state.text}
          disabled={pending}
          className={clsx(
            'block h-40 w-full resize-none rounded-md border p-3 focus:ring-2 focus:outline-none',
            state.errors?.text
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
          )}
          aria-invalid={!!state.errors?.text}
        />

        {state.errors?.text && <p className="mt-1 text-sm text-red-600">{state.errors.text[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={pending || hasFormError}
        className={clsx(
          'cursor-pointer self-start rounded px-6 py-2 text-white transition-colors',
          pending || hasFormError
            ? 'cursor-not-allowed bg-blue-400'
            : 'bg-blue-600 hover:bg-blue-700',
        )}
      >
        {pending ? 'Converting...' : 'Convert to PDF'}
      </button>

      {hasFormError && <p className="mt-1 font-medium text-red-600">{state.errors._form?.[0]}</p>}

      {state.base64 && !hasFormError && (
        <div className="my-6">
          <h3 className="mb-2 font-semibold">Preview:</h3>
          <PdfPreview base64={state.base64} />
        </div>
      )}
    </form>
  )
}

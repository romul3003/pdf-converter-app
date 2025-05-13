'use client'

import { useActionState, useEffect, useState } from 'react'
import clsx from 'clsx'

import * as actions from '@/actions'
import type { ConvertToPdfFormState } from '@/actions/convert-to-pdf'

const initialState: ConvertToPdfFormState = {
  errors: {},
  text: '',
  base64: undefined,
}

type ConvertToPdfFormProps = {
  onSuccess?: (text: string, base64: string) => void
}

export const ConvertToPdfForm = ({ onSuccess }: ConvertToPdfFormProps) => {
  const [text, setText] = useState('')
  const [state, formAction, pending] = useActionState<ConvertToPdfFormState, FormData>(
    actions.convertToPdf,
    initialState,
  )

  const hasFormError = !!state.errors?._form?.length

  useEffect(() => {
    if (state.base64 && !hasFormError) {
      onSuccess?.(state.text ?? '', state.base64)
      setText('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.base64])

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
          value={text}
          onChange={(event) => setText(event.target.value)}
          disabled={pending}
          className={clsx(
            'block min-h-[10rem] w-full resize-y rounded-md border p-3 focus:ring-2 focus:outline-none',
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
    </form>
  )
}

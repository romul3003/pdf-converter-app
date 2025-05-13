'use server'

import { z } from 'zod'

export type ConvertFormState = {
  errors: {
    text?: string[]
    _form?: string[]
  }
  base64?: string
  text?: string
}

const createToPdfSchema = z.object({
  text: z.string().min(1, 'Text is required').max(25000, 'Too long'),
})

export const convertToPdf = async (
  prevState: ConvertFormState,
  formData: FormData,
): Promise<ConvertFormState> => {
  const parsedData = createToPdfSchema.safeParse({
    text: formData.get('text'),
  })

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
    }
  }

  const { text } = parsedData.data

  try {
    const response = await fetch(
      'http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      },
    )

    const blob = await response.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    const base64 = buffer.toString('base64')

    return {
      errors: {},
      text,
      base64,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Failed to convert to PDF'],
        },
      }
    }
  }
}

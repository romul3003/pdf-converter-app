'use server'

import { z } from 'zod'

// test api key
const API_KEY = '78684310-850d-427a-8432-4a6487f6dbc4'
const PDF_API_URL = `http://95.217.134.12:4010/create-pdf?apiKey=${API_KEY}`

export type ConvertToPdfFormState = {
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
  prevState: ConvertToPdfFormState,
  formData: FormData,
): Promise<ConvertToPdfFormState> => {
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
    const response = await fetch(PDF_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      return {
        errors: {
          _form: [`Server error: ${response.status} ${response.statusText}`],
        },
      }
    }

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

import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { ConvertToPdfForm } from '@/components/ConvertToPdfForm'
import * as actions from '@/actions/convert-to-pdf'

jest.mock('@/actions/convert-to-pdf')

describe('ConvertToPdfForm', () => {
  it('calls onSuccess when conversion succeeds', async () => {
    const mockOnSuccess = jest.fn()
    const mockConvert = jest.fn().mockResolvedValue({
      errors: {},
      base64: 'dGVzdA==',
      text: 'Hello PDF',
    })

    // підставляємо фейкову функцію
    ;(actions.convertToPdf as jest.Mock).mockImplementation(mockConvert)

    render(<ConvertToPdfForm onSuccess={mockOnSuccess} />)

    fireEvent.change(screen.getByPlaceholderText(/enter your text/i), {
      target: { value: 'Hello PDF' },
    })

    fireEvent.click(screen.getByRole('button', { name: /convert to pdf/i }))

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith('Hello PDF', 'dGVzdA==')
    })
  })

  it('shows validation error from API', async () => {
    const mockConvert = jest.fn().mockResolvedValue({
      errors: { text: ['Text is required'] },
    })

    ;(actions.convertToPdf as jest.Mock).mockImplementation(mockConvert)

    render(<ConvertToPdfForm />)

    fireEvent.change(screen.getByPlaceholderText(/enter your text/i), {
      target: { value: '' },
    })

    fireEvent.click(screen.getByRole('button', { name: /convert to pdf/i }))

    await waitFor(() => {
      expect(screen.getByText('Text is required')).toBeInTheDocument()
    })
  })
})

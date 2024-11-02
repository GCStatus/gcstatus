import { Button } from '@mui/material'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'

import ActionDialog, { ActionDialogProps } from './ActionDialog'

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

const renderActionDialog = (props: Partial<ActionDialogProps> = {}) => {
  const defaultProps: ActionDialogProps = {
    title: 'Test Dialog',
    confirmAction: jest.fn(),
    trigger: <Button>Open</Button>,
    ...props,
  }

  return render(<ActionDialog {...defaultProps} />)
}

describe('ActionDialog', () => {
  it('should render the trigger button and not show the dialog initially', () => {
    renderActionDialog()

    expect(screen.getByText('Open')).toBeInTheDocument()

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should open the dialog when the trigger button is clicked', () => {
    renderActionDialog()

    fireEvent.click(screen.getByText('Open'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
  })

  it('should close the dialog when the cancel button is clicked', async () => {
    renderActionDialog()

    fireEvent.click(screen.getByText('Open'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Cancelar'))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should call the confirm action when the confirm button is clicked', async () => {
    const mockConfirmAction = jest.fn().mockResolvedValueOnce(null)
    renderActionDialog({ confirmAction: mockConfirmAction })

    fireEvent.click(screen.getByText('Open'))

    fireEvent.click(screen.getByText('Confirm'))

    await waitFor(() => {
      expect(mockConfirmAction).toHaveBeenCalledTimes(1)
    })
  })

  it('should show an error toast if confirmation fails', async () => {
    const mockConfirmAction = jest
      .fn()
      .mockRejectedValueOnce(new Error('Error'))
    renderActionDialog({ confirmAction: mockConfirmAction })

    fireEvent.click(screen.getByText('Open'))

    fireEvent.click(screen.getByText('Confirm'))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Ops! Algo deu errado')
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})

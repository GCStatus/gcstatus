import { fireEvent, render } from '@testing-library/react'

import CustomBackdrop, { CustomBackdropProps } from './Backdrop'

const toggleBackdrop = jest.fn()

const renderBackdrop = (
  props: CustomBackdropProps = { open: false, toggleBackdrop },
) => {
  return render(<CustomBackdrop {...props} />)
}

jest.mock('@mui/material', () => ({
  Box: (props: any) => <div {...props} />,
  Backdrop: ({ open, onClick, ...rest }: any) => (
    <div
      data-qa="backdrop"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e)
        }
      }}
      role="button"
      tabIndex={0}
      {...rest}>
      {open ? 'Backdrop Open' : 'Backdrop Closed'}
    </div>
  ),
}))

describe('CustomBackdrop Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    const { queryByTestId } = renderBackdrop()

    const backdrop = queryByTestId('backdrop')

    expect(backdrop).toBeInTheDocument()
  })

  it('applies the correct styles to the body when open', () => {
    renderBackdrop({ open: true, toggleBackdrop })

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores the body style when closed', () => {
    renderBackdrop()

    expect(document.body.style.overflow).toBe('')
  })

  it('calls toggleBackdrop when clicked', () => {
    const { getByTestId } = renderBackdrop({ open: true, toggleBackdrop })

    const backdrop = getByTestId('backdrop')
    fireEvent.click(backdrop)

    expect(toggleBackdrop).toHaveBeenCalledTimes(1)
  })

  it('cleans up body style on unmount', () => {
    const { unmount } = renderBackdrop({ open: true, toggleBackdrop })

    unmount()

    expect(document.body.style.overflow).toBe('')
  })
})

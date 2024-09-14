import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

import { useTheme } from '@/hooks'
import { toggle } from '@/store/themeSlice'

import SwitchTheme from './SwitchTheme'

jest.mock('@/hooks', () => ({
  useTheme: jest.fn(),
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

const renderSwitchTheme = () => {
  return render(<SwitchTheme />)
}

describe('SwitchTheme Component', () => {
  const mockDispatch = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    mockDispatch.mockClear()
    // @ts-expect-error useDispatch should be converted as unknown first
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)

    document.documentElement.classList.remove('dark')
  })

  it('renders correctly with initial light theme', () => {
    ;(useTheme as jest.Mock).mockReturnValue('light')

    const { getByText } = renderSwitchTheme()

    expect(getByText('Light')).toBeInTheDocument()
    expect(getByText('Dark')).toBeInTheDocument()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('renders correctly with initial dark theme', () => {
    ;(useTheme as jest.Mock).mockReturnValue('dark')

    const { getByText } = renderSwitchTheme()

    expect(getByText('Light')).toBeInTheDocument()
    expect(getByText('Dark')).toBeInTheDocument()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('toggles to dark theme when "Dark" button is clicked', async () => {
    ;(useTheme as jest.Mock).mockReturnValue('light')

    const { getByText } = renderSwitchTheme()

    const darkButton = getByText('Dark')

    await user.click(darkButton)

    expect(mockDispatch).toHaveBeenCalledWith(toggle('dark'))
  })

  it('toggles to light theme when "Light" button is clicked', async () => {
    ;(useTheme as jest.Mock).mockReturnValue('dark')

    const { getByText } = renderSwitchTheme()

    const lightButton = getByText('Light')

    await user.click(lightButton)

    expect(mockDispatch).toHaveBeenCalledWith(toggle('light'))
  })

  it('adds the "dark" class to the HTML element when the mode is dark', () => {
    ;(useTheme as jest.Mock).mockReturnValue('dark')

    renderSwitchTheme()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes the "dark" class from the HTML element when the mode is light', () => {
    ;(useTheme as jest.Mock).mockReturnValue('light')

    renderSwitchTheme()

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})

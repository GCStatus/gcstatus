import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

import { useSidebar } from '@/hooks'
import { toggle } from '@/store/sidebarSlice'

import SwitchSidebar from './SwitchSidebar'

jest.mock('@/hooks', () => ({
  useSidebar: jest.fn(),
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

const renderSwitchSidebar = () => {
  return render(<SwitchSidebar />)
}

describe('SwitchSidebar Component', () => {
  const mockDispatch = jest.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    mockDispatch.mockClear()
    // @ts-expect-error useDispatch should be converted as unknown
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('renders the switch with correct initial state', () => {
    ;(useSidebar as jest.Mock).mockReturnValue('yes')

    const { getByRole } = renderSwitchSidebar()

    const switchElement = getByRole('checkbox')

    expect(switchElement).toBeChecked()
  })

  it('dispatches toggle action with "no" when switch is turned off', async () => {
    ;(useSidebar as jest.Mock).mockReturnValue('yes')

    const { getByRole } = renderSwitchSidebar()

    const switchElement = getByRole('checkbox')

    await user.click(switchElement)

    expect(mockDispatch).toHaveBeenCalledWith(toggle('no'))
  })

  it('dispatches toggle action with "yes" when switch is turned on', async () => {
    ;(useSidebar as jest.Mock).mockReturnValue('no')

    const { getByRole } = renderSwitchSidebar()

    const switchElement = getByRole('checkbox')

    await user.click(switchElement)

    expect(mockDispatch).toHaveBeenCalledWith(toggle('yes'))
  })

  it('updates the checked state when sidebar state changes', () => {
    ;(useSidebar as jest.Mock).mockReturnValue('no')

    const { getByRole } = renderSwitchSidebar()

    const switchElement = getByRole('checkbox')

    expect(switchElement).not.toBeChecked()
  })
})

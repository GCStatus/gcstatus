import { faker } from '@faker-js/faker'
import { act, cleanup, render } from '@testing-library/react'

import HeartsUp, { HeartsUpProps } from './HeartsUp'

const setHeartPopsMock = jest.fn()

const renderHeartsUp = (
  props: HeartsUpProps = {
    delay: faker.number.int(),
    setHeartPops: setHeartPopsMock,
  },
) => {
  return render(<HeartsUp {...props} />)
}

describe('HeartsUp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('renders the heart icon with correct styles', () => {
    const { getByRole } = renderHeartsUp()

    const heartIcon = getByRole('img')

    expect(heartIcon).toBeInTheDocument()
    expect(heartIcon).toHaveClass(
      'text-red-500 w-6 h-6 animate-heart-scale',
    )
  })

  it('removes heart pops after 10 seconds', () => {
    jest.useFakeTimers()

    renderHeartsUp()

    act(() => {
      jest.advanceTimersByTime(10000)
    })

    expect(setHeartPopsMock).toHaveBeenCalled()
    expect(setHeartPopsMock).toHaveBeenCalledWith(expect.any(Function))
  })

  it('cleans up the interval on unmount', () => {
    jest.useFakeTimers()

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')

    const { unmount } = renderHeartsUp()

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1)

    clearIntervalSpy.mockRestore()
  })
})

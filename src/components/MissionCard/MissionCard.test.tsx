import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { subDays } from 'date-fns'
import { Toaster } from 'react-hot-toast'

import { MOCK_MISSIONS } from '@/mocks'
import { useCompleteMissionMutation } from '@/services/api'
import { Mission } from '@/types'
import { calculateOverallProgress as c } from '@/utils'

import MissionCard from './MissionCard'

jest.mock('@/services/api', () => ({
  useCompleteMissionMutation: jest.fn(),
}))

const mockMission: Mission = MOCK_MISSIONS.pop() as Mission

describe('MissionCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCompleteMissionMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: null, isLoading: false, isSuccess: false },
    ])
  })

  const renderWithToaster = (ui: React.ReactElement) => {
    return render(
      <>
        <Toaster />
        {ui}
      </>,
    )
  }

  it('renders the MissionCard with correct mission props', () => {
    renderWithToaster(<MissionCard mission={mockMission} />)

    expect(screen.getByText(mockMission.mission)).toBeInTheDocument()
    expect(screen.getByText(/Coins:/i)).toHaveTextContent(
      `Coins: ${mockMission.coins}`,
    )
    expect(screen.getByText(/XP:/i)).toHaveTextContent(
      `XP: ${mockMission.experience}`,
    )
  })

  it('displays the progress bar correctly', () => {
    renderWithToaster(<MissionCard mission={mockMission} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute(
      'aria-valuenow',
      `${c(mockMission.requirements)}`,
    )
    expect(
      screen.getByText(`${c(mockMission.requirements)}%`),
    ).toBeInTheDocument()
  })

  it('renders the "Redeem Rewards" button when redeemable', async () => {
    const redeemableMission: Mission = {
      ...mockMission,
      user_mission: {
        completed: false,
        last_completed_at: new Date().toISOString(),
      },
    }

    renderWithToaster(<MissionCard mission={redeemableMission} />)

    const redeemButton = screen.getByRole('button', {
      name: /Redeem Rewards/i,
    })
    expect(redeemButton).toBeInTheDocument()
  })

  it('calls complete mission mutation when "Redeem Rewards" is clicked', async () => {
    const completeMock = jest.fn().mockResolvedValue({
      message: 'Mission completed!',
    })
    ;(useCompleteMissionMutation as jest.Mock).mockReturnValue([
      completeMock,
      {
        data: { message: 'Mission completed!' },
        isLoading: false,
        isSuccess: true,
      },
    ])

    const redeemableMission: Mission = {
      ...mockMission,
      user_mission: {
        completed: false,
        last_completed_at: subDays(new Date(), 1).toISOString(),
      },
    }

    renderWithToaster(<MissionCard mission={redeemableMission} />)

    const redeemButton = screen.getByRole('button', {
      name: /Redeem Rewards/i,
    })
    fireEvent.click(redeemButton)

    await waitFor(() => {
      expect(completeMock).toHaveBeenCalledWith(mockMission.id)
      expect(screen.getByText(/Mission completed!/i)).toBeInTheDocument()
    })
  })

  it('displays reset information for recurring missions', () => {
    const recurringMission: Mission = {
      ...mockMission,
      frequency: 'weekly',
      reset_time: new Date().toISOString(),
    }

    renderWithToaster(<MissionCard mission={recurringMission} />)

    expect(screen.getByText(/Frequency: Weekly/i)).toBeInTheDocument()
    expect(screen.getByText(/Resets at:/i)).toBeInTheDocument()
  })

  it('displays "New" tag for missions created within the last week', () => {
    const recentMission: Mission = {
      ...(MOCK_MISSIONS.shift() as Mission),
      status: 'available',
      created_at: new Date().toISOString(),
    }

    renderWithToaster(<MissionCard mission={recentMission} />)

    expect(screen.getByText(/New/i)).toBeInTheDocument()
  })

  it('renders the correct status chip based on mission status', () => {
    const inProgressMission: Mission = {
      ...(MOCK_MISSIONS.shift() as Mission),
      status: 'available',
    }

    renderWithToaster(<MissionCard mission={inProgressMission} />)

    expect(screen.getByText(/In Progress/i)).toBeInTheDocument()

    const completedMission: Mission = {
      ...mockMission,
      user_mission: {
        completed: true,
        last_completed_at: new Date().toISOString(),
      },
    }

    renderWithToaster(<MissionCard mission={completedMission} />)
    screen
      .queryAllByText(/mission completed!/i)
      .forEach((el) => expect(el).toBeInTheDocument())
  })
})

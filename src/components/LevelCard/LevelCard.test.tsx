import { render, screen } from '@testing-library/react'

import { MOCK_USER } from '@/mocks'
import { Level, TitleReward, User } from '@/types'

import LevelCard from './LevelCard'

const mockUser: User = MOCK_USER
const mockLevel: Level = {
  id: 1,
  coins: 50,
  experience: 100,
  level: 1,
  rewards: [],
}

const rewards: TitleReward[] = [
  {
    id: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    sourceable_type: 'game',
    rewardable_type: 'titles',
    title: {
      id: 101,
      title: 'Achievement Badge',
      description: 'Awarded for outstanding performance',
      purchasable: false,
      status: 'active',
      created_at: '2024-01-01',
      requirements: null,
    },
  },
]

describe('LevelCard', () => {
  it('renders the LevelCard with correct props', () => {
    render(
      <LevelCard user={mockUser} level={mockLevel} label="Level Up!" />,
    )

    expect(screen.getByText('Level Up!')).toBeInTheDocument()
    expect(screen.getByText(mockLevel.level)).toBeInTheDocument()
    expect(screen.getByText(/Experience Reward/i)).toBeInTheDocument()
    expect(
      screen.getByText(`${mockLevel.experience} XP`),
    ).toBeInTheDocument()
    expect(screen.getByText(/Coins Reward/i)).toBeInTheDocument()
    expect(
      screen.getByText(`${mockLevel.coins} Coins`),
    ).toBeInTheDocument()
  })

  it('applies opacity when user level matches the card level', () => {
    const sameLevelUser = { ...mockUser, level: mockLevel.level }
    render(
      <LevelCard
        user={sameLevelUser}
        level={mockLevel}
        label="Current Level"
      />,
    )

    const card = screen.getByRole('article')
    expect(card).toHaveClass('opacity-60')
  })

  it('does not apply opacity when user level is different from card level', () => {
    const differentLevelUser = { ...mockUser, level: mockLevel.level + 1 }
    render(
      <LevelCard
        user={differentLevelUser}
        level={mockLevel}
        label="Next Level"
      />,
    )

    const card = screen.getByRole('article')
    expect(card).not.toHaveClass('opacity-60')
  })

  it('renders reward list when rewards are available', () => {
    const levelWithRewards = {
      ...mockLevel,
      rewards,
    }

    render(
      <LevelCard
        user={mockUser}
        level={levelWithRewards}
        label="Reward Level"
      />,
    )

    expect(screen.getByText(/achievement badge/i)).toBeInTheDocument()
  })

  it('does not render reward list when rewards are empty', () => {
    const levelWithoutRewards = { ...mockLevel, rewards: [] }

    render(
      <LevelCard
        user={mockUser}
        level={levelWithoutRewards}
        label="Basic Level"
      />,
    )

    expect(
      screen.queryByText(/Achievement Badge/i),
    ).not.toBeInTheDocument()
  })
})

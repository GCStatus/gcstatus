import { render } from '@testing-library/react'

import { BaseReward, TitleReward } from '@/types'

import RewardList from './RewardList'

describe('RewardList Component', () => {
  it('renders TitleReward correctly', () => {
    const rewards: TitleReward[] = [
      {
        id: 1,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        sourceable_type: 'game',
        rewardable_type: 'titles',
        title: {
          id: 101,
          title: 'Champion',
          description: 'Awarded for outstanding performance',
          purchasable: false,
          status: 'active',
          created_at: '2024-01-01',
          requirements: null,
        },
      },
    ]

    const { getByText } = render(<RewardList rewards={rewards} />)

    expect(getByText(/Title Reward/i)).toBeInTheDocument()
    expect(getByText(/Champion/i)).toBeInTheDocument()
  })

  it('renders nothing for unsupported reward types', () => {
    const rewards: BaseReward[] = [
      {
        id: 2,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
        sourceable_type: 'game',
        rewardable_type: 'unsupported_type',
      },
    ]

    const { queryByText } = render(<RewardList rewards={rewards} />)

    expect(queryByText(/Title Reward/i)).not.toBeInTheDocument()
    expect(queryByText(/Champion/i)).not.toBeInTheDocument()
  })
})

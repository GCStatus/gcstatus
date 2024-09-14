import { Title } from '@/types'

export const MOCK_TITLES: Title[] = [
  {
    id: 1,
    title: 'Gaming Senior',
    description: 'You are the master of games!',
    requirements: [
      {
        id: 1,
        task: 'Reach level 10',
        goal: 10,
        progress: {
          id: 1,
          progress: 8,
          completed: false,
        },
      },
      {
        id: 2,
        task: 'Obtain a fire sword',
        goal: 1,
        progress: {
          id: 2,
          progress: 0,
          completed: false,
        },
      },
    ],
    cost: 1000,
    purchasable: true,
    status: 'progress',
  },
  {
    id: 2,
    title: 'Update your profile picture',
    description: 'Go to your profile and add a custom profile pic!',
    requirements: [
      {
        id: 3,
        task: 'Update your profile picture.',
        goal: 1,
        progress: {
          id: 3,
          progress: 0,
          completed: false,
        },
      },
    ],
    purchasable: false,
    status: 'available',
  },
  {
    id: 3,
    title: 'Make a new transaction',
    description:
      'Go to the coins section and make a new transaction to spend your coins!',
    requirements: [
      {
        id: 4,
        task: 'Make a new transaction.',
        goal: 1,
        progress: {
          id: 4,
          progress: 1,
          completed: true,
        },
      },
    ],
    purchasable: true,
    cost: 90000,
    status: 'completed',
  },
]

import { Mission } from '@/types'

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 1,
    title: 'Defeat the Dragon',
    description:
      'Slay the dragon in the Dark Forest to earn rare rewards.',
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
    rewards: [
      { id: 1, type: 'coin', amount: 1000 },
      { id: 2, type: 'exp', amount: 500 },
    ],
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
    rewards: [
      { id: 3, type: 'coin', amount: 100 },
      { id: 4, type: 'exp', amount: 50 },
    ],
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
    rewards: [
      {
        id: 5,
        type: 'title',
        amount: 1,
        rewardable: {
          id: 1,
          title: 'Gaming Senior',
        },
      },
    ],
    status: 'completed',
  },
]

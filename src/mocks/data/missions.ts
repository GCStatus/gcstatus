import { faker } from '@faker-js/faker'

import { Mission } from '@/types'

export const MOCK_MISSIONS: Mission[] = [
  {
    id: 1,
    mission: 'Defeat the Dragon',
    coins: 10,
    experience: 50,
    created_at: faker.date.anytime().toISOString(),
    frequency: 'one_time',
    reset_time: faker.date.anytime().toISOString(),
    progress: null,
    description:
      'Slay the dragon in the Dark Forest to earn rare rewards.',
    requirements: [
      {
        id: 1,
        task: 'Reach level 10',
        goal: 10,
        description: 'You just need to reach level 10...',
        progress: {
          id: 1,
          progress: 8,
          completed: false,
        },
      },
      {
        id: 2,
        task: 'Obtain a fire sword',
        description: 'Just obtain the fire sword.',
        goal: 1,
        progress: {
          id: 2,
          progress: 0,
          completed: false,
        },
      },
    ],
    rewards: [],
    status: {
      id: 1,
      name: 'available',
    },
  },
  {
    id: 2,
    mission: 'Update your profile picture',
    coins: 10,
    experience: 50,
    created_at: faker.date.anytime().toISOString(),
    frequency: 'daily',
    reset_time: faker.date.anytime().toISOString(),
    progress: null,
    description: 'Go to your profile and add a custom profile pic!',
    requirements: [
      {
        id: 3,
        task: 'Update your profile picture.',
        description: 'Just update your profile picture...',
        goal: 1,
        progress: {
          id: 3,
          progress: 0,
          completed: false,
        },
      },
    ],
    rewards: [],
    status: {
      id: 1,
      name: 'available',
    },
  },
  {
    id: 3,
    mission: 'Make a new transaction',
    coins: 10,
    experience: 50,
    created_at: faker.date.anytime().toISOString(),
    frequency: 'monthly',
    reset_time: faker.date.anytime().toISOString(),
    progress: {
      completed: true,
      last_completed_at: faker.date.anytime().toISOString(),
    },
    description:
      'Go to the coins section and make a new transaction to spend your coins!',
    requirements: [
      {
        id: 4,
        task: 'Make a new transaction.',
        description: 'Just make a new transaction...',
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
        rewardable_type: 'titles',
        sourceable_type: 'missions',
        created_at: faker.date.anytime().toISOString(),
        updated_at: faker.date.anytime().toISOString(),
        title: {
          id: 1,
          own: false,
          title: 'Gaming Senior',
          description: 'You are the gaming senior!',
          created_at: faker.date.anytime().toISOString(),
          updated_at: faker.date.anytime().toISOString(),
          purchasable: false,
          status: {
            id: 1,
            name: 'available',
          },
        },
      },
    ],
    status: {
      id: 1,
      name: 'available',
    },
  },
  {
    id: 4,
    mission: 'Make a new transaction',
    coins: 10,
    experience: 50,
    created_at: '2024-10-01T00:00:00.000Z',
    frequency: 'monthly',
    reset_time: faker.date.anytime().toISOString(),
    progress: null,
    description:
      'Go to the coins section and make a new transaction to spend your coins!',
    requirements: [
      {
        id: 4,
        task: 'Make a new transaction.',
        description: 'Just make a new transaction...',
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
        rewardable_type: 'titles',
        sourceable_type: 'missions',
        created_at: faker.date.anytime().toISOString(),
        updated_at: faker.date.anytime().toISOString(),
        title: {
          id: 1,
          own: false,
          title: 'Gaming Senior',
          description: 'You are the gaming senior!',
          created_at: faker.date.anytime().toISOString(),
          updated_at: faker.date.anytime().toISOString(),
          purchasable: false,
          status: {
            id: 1,
            name: 'available',
          },
        },
      },
    ],
    status: {
      id: 1,
      name: 'available',
    },
  },
]

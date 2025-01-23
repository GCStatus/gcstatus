import { faker } from '@faker-js/faker'

import { Title } from '@/types'

export const MOCK_TITLES: Title[] = [
  {
    id: 1,
    title: 'Gaming Senior',
    description: 'You are the master of games!',
    own: false,
    cost: 1000,
    purchasable: true,
    status: {
      id: 1,
      name: 'available',
    },
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    rewardable: {
      id: 1,
      rewardable_type: 'App\\\\Models\\\\Title',
      sourceable_type: 'App\\\\Models\\\\Mission',
      sourceable: {
        id: 1,
        coins: 10,
        progress: null,
        experience: 10,
        frequency: 'one_time',
        mission: faker.lorem.words(),
        description: faker.lorem.text(),
        reset_time: faker.date.anytime().toISOString(),
        created_at: faker.date.anytime().toISOString(),
        status: {
          id: 1,
          name: 'available',
        },
        rewards: [],
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
      },
    },
  },
  {
    id: 2,
    own: false,
    title: 'Update your profile picture',
    description: 'Go to your profile and add a custom profile pic!',
    purchasable: false,
    status: {
      id: 1,
      name: 'available',
    },
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    rewardable: {
      id: 2,
      rewardable_type: 'App\\\\Models\\\\Title',
      sourceable_type: 'App\\\\Models\\\\Mission',
      sourceable: {
        id: 2,
        coins: 10,
        progress: null,
        experience: 10,
        frequency: 'one_time',
        mission: faker.lorem.words(),
        description: faker.lorem.text(),
        reset_time: faker.date.anytime().toISOString(),
        created_at: faker.date.anytime().toISOString(),
        status: {
          id: 1,
          name: 'available',
        },
        rewards: [],
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
      },
    },
  },
  {
    id: 3,
    own: true,
    title: 'Make a new transaction',
    description:
      'Go to the coins section and make a new transaction to spend your coins!',
    purchasable: true,
    cost: 90000,
    status: {
      id: 1,
      name: 'available',
    },
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    rewardable: {
      id: 3,
      rewardable_type: 'App\\\\Models\\\\Title',
      sourceable_type: 'App\\\\Models\\\\Mission',
      sourceable: {
        id: 3,
        coins: 10,
        progress: null,
        experience: 10,
        frequency: 'one_time',
        mission: faker.lorem.words(),
        description: faker.lorem.text(),
        reset_time: faker.date.anytime().toISOString(),
        created_at: faker.date.anytime().toISOString(),
        status: {
          id: 1,
          name: 'available',
        },
        rewards: [],
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
      },
    },
  },
]

import { faker } from '@faker-js/faker'

import { Notification } from '@/types'

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    read_at: faker.date.anytime().toISOString(),
    created_at: '2024-08-30T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title:
        'The game that you was following was finally released! Check it out.',
      actionUrl: '/games/2913423',
      icon: 'IoGameControllerOutline',
    },
  },
  {
    id: 2,
    read_at: null,
    created_at: '2024-08-30T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title: 'The game you saved on your wishlist is now on sale!',
      actionUrl: '/games/2913423',
      icon: 'CiBadgeDollar',
    },
  },
  {
    id: 3,
    read_at: null,
    created_at: '2024-08-30T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title: 'A new game with the tag Fantasy was released.',
      actionUrl: '/games/2913423',
      icon: 'MdOutlineNewReleases',
    },
  },
  {
    id: 4,
    read_at: faker.date.anytime().toISOString(),
    created_at: '2024-08-29T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title: 'John Doe liked your comment.',
      actionUrl: '/games/2913423',
      icon: 'IoHeartOutline',
    },
  },
  {
    id: 5,
    read_at: faker.date.anytime().toISOString(),
    created_at: '2024-08-22T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title: 'John Doe liked your comment.',
      actionUrl: '/games/2913423',
      icon: 'IoHeartOutline',
    },
  },
  {
    id: 6,
    read_at: faker.date.anytime().toISOString(),
    created_at: '2024-08-26T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title: 'John Doe liked your comment.',
      actionUrl: '/games/2913423',
      icon: 'IoHeartOutline',
    },
  },
  {
    id: 7,
    read_at: null,
    created_at: '2024-08-26T19:52:00.000Z',
    updated_at: '2024-08-30T19:52:00.000Z',
    data: {
      title:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos quam optio porro pariatur excepturi quis corrupti blanditiis consectetur at quasi eum veniam mollitia quo dolores quia, repellendus dignissimos necessitatibus libero?',
      actionUrl: '/games/2913423',
      icon: 'IoHeartOutline',
    },
  },
]

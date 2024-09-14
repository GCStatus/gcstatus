import { faker } from '@faker-js/faker'

import { Order } from '@/types'

export const MOCK_ORDERS: Order[] = []

for (let i = 0; i < 20; i++) {
  const base: Order = {
    id: 1,
    total: faker.number.int(),
    subtotal: faker.number.int(),
    number: faker.number.int().toString(),
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    status: faker.helpers.arrayElement([
      'Pending',
      'Canceled',
      'Completed',
    ]),
  }

  const newOrder: Order = {
    ...base,
    id: i + 1,
  }

  MOCK_ORDERS.push(newOrder)
}

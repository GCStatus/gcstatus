import { faker } from '@faker-js/faker'

import { Transaction } from '@/types'

export const MOCK_TRANSACTIONS: Transaction[] = []

for (let i = 0; i < 20; i++) {
  const base: Transaction = {
    id: 1,
    amount: faker.number.int(),
    description: faker.lorem.sentence(),
    created_at: faker.date.anytime().toISOString(),
    type: {
      id: 1,
      type: faker.helpers.arrayElement(['addition', 'subtraction']),
    },
  }

  const newTransaction: Transaction = {
    ...base,
    id: i + 1,
  }

  MOCK_TRANSACTIONS.push(newTransaction)
}

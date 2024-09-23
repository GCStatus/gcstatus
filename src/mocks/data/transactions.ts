import { faker } from '@faker-js/faker'

import { Transaction } from '@/types'

export const MOCK_TRANSACTIONS: Transaction[] = []

for (let i = 0; i < 20; i++) {
  const base: Transaction = {
    id: 1,
    amount: faker.number.int(),
    description: faker.lorem.sentence(),
    date: faker.date.anytime().toISOString(),
    type: faker.helpers.arrayElement(['Addition', 'Subtraction']),
    user: {
      id: 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      nickname: faker.internet.userName(),
      coins: faker.number.int(),
      experience: faker.number.int(),
      level: faker.number.int(),
      birthdate: faker.date.anytime().toDateString(),
      created_at: faker.date.anytime().toISOString(),
      updated_at: faker.date.anytime().toISOString(),
      profile: {
        photo: faker.image.url(),
        share: faker.datatype.boolean(),
      },
    },
  }

  const newTransaction: Transaction = {
    ...base,
    id: i + 1,
  }

  MOCK_TRANSACTIONS.push(newTransaction)
}

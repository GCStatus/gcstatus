import { faker } from '@faker-js/faker'

import { Blog, BlogDetails } from '@/types'

import { MOCK_CATEGORIES, MOCK_TAGS } from '.'

export const MOCK_BLOG_LIST: Blog[] = []

for (let i = 0; i < 100; i++) {
  const base: Blog = {
    id: 1,
    cover: faker.image.urlPicsumPhotos(),
    title: faker.lorem.words({ min: 1, max: 3 }),
    body: faker.lorem.text(),
    slug: faker.lorem.slug(),
    is_hearted: faker.datatype.boolean(),
    categories: faker.helpers.arrayElements(MOCK_CATEGORIES),
    tags: faker.helpers.arrayElements(MOCK_TAGS),
    views_count: faker.number.int({ min: 1, max: 99999 }),
    hearts_count: faker.number.int({ min: 1, max: 99999 }),
    comments_count: faker.number.int({ min: 1, max: 99999 }),
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    user: {
      id: 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      nickname: faker.internet.userName(),
      experience: faker.number.int(),
      level: faker.number.int(),
      birthdate: faker.date.past().toDateString(),
      created_at: faker.date.anytime().toISOString(),
      updated_at: faker.date.anytime().toISOString(),
      profile: {
        photo: faker.image.avatar(),
        share: faker.datatype.boolean(),
      },
      wallet: {
        id: 1,
        amount: faker.number.int(),
      },
    },
  }

  const newBlogPost: Blog = {
    ...base,
    id: i + 1,
  }

  MOCK_BLOG_LIST.push(newBlogPost)
}

export const MOCK_BLOG_DETAILS: BlogDetails = {
  id: 1,
  cover: faker.image.urlPicsumPhotos(),
  title: faker.lorem.words({ min: 1, max: 3 }),
  body: faker.lorem.text(),
  slug: faker.lorem.slug(),
  categories: faker.helpers.arrayElements(MOCK_CATEGORIES),
  tags: faker.helpers.arrayElements(MOCK_TAGS),
  is_hearted: faker.datatype.boolean(),
  views_count: faker.number.int({ min: 1, max: 99999 }),
  hearts_count: faker.number.int({ min: 1, max: 99999 }),
  comments_count: faker.number.int({ min: 1, max: 99999 }),
  created_at: faker.date.anytime().toISOString(),
  updated_at: faker.date.anytime().toISOString(),
  user: {
    id: 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    nickname: faker.internet.userName(),
    experience: faker.number.int(),
    level: faker.number.int(),
    birthdate: faker.date.past().toDateString(),
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    profile: {
      photo: faker.image.avatar(),
      share: faker.datatype.boolean(),
    },
    wallet: {
      id: 1,
      amount: faker.number.int(),
    },
  },
  comments: [
    {
      id: 1,
      comment: faker.lorem.text(),
      hearts_count: faker.number.int(),
      is_hearted: faker.datatype.boolean(),
      created_at: faker.date.anytime().toISOString(),
      updated_at: faker.date.anytime().toISOString(),
      by: {
        id: 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        nickname: faker.internet.userName(),
        created_at: faker.date.anytime().toISOString(),
        photo: faker.image.avatar(),
      },
      replies: [],
    },
  ],
}

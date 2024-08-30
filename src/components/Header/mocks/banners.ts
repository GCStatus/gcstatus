import { Banner } from '@/types'

export const MOCK_BANNERS: Banner[] = [
  {
    id: 1,
    banner: 'https://images5.alphacoders.com/112/thumb-1920-1129255.jpg',
    title: 'Black Myth: Wukong',
    description: `Black Myth: Wukong is an action RPG that draws on Chinese
        mythology. Fight through a richly detailed world inspired
        by ancient Chinese literature.`,
    platforms: [
      {
        id: 1,
        name: 'PC',
      },
      {
        id: 2,
        name: 'PS5',
      },
      {
        id: 3,
        name: 'Xbox Series X',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'Single-player',
      },
      {
        id: 2,
        name: 'Fantasy',
      },
      {
        id: 3,
        name: 'Mythology',
      },
      {
        id: 4,
        name: 'Cracked',
      },
      {
        id: 5,
        name: 'Denuvo',
      },
    ],
  },
  {
    id: 2,
    banner: 'https://images2.alphacoders.com/137/thumb-1920-1370582.jpeg',
    title: 'God of War: Ragnarok',
    description: `God of War: Ragnarok follows Kratos and Atreus as they
        face the apocalyptic events of Ragnarok. Experience an
        epic journey with intense combat and rich storytelling.`,
    platforms: [
      {
        id: 2,
        name: 'PS5',
      },
      {
        id: 4,
        name: 'PS4',
      },
    ],
    tags: [
      {
        id: 1,
        name: 'Single-player',
      },
      {
        id: 3,
        name: 'Mythology',
      },
      {
        id: 6,
        name: 'Action-Adventure',
      },
    ],
  },
]

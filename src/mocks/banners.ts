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
      { id: 1, slug: 'pc', name: 'PC' },
      { id: 2, slug: 'ps5', name: 'PS5' },
      { id: 3, slug: 'xbox-series-x', name: 'Xbox Series X' },
    ],
    tags: [
      { id: 3, slug: 'single-player', name: 'Single-player' },
      { id: 4, slug: 'fantasy', name: 'Fantasy' },
      { id: 5, slug: 'mythologic', name: 'Mythologic' },
      { id: 12, slug: 'uncracked', name: 'Uncracked' },
      { id: 9, slug: 'denuvo', name: 'Denuvo' },
      { id: 13, slug: 'souls', name: 'Souls' },
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
      { id: 2, slug: 'ps5', name: 'PS5' },
      { id: 4, slug: 'ps4', name: 'PS4' },
    ],
    tags: [
      { id: 3, slug: 'single-player', name: 'Single-player' },
      { id: 5, slug: 'mythologic', name: 'Mythologic' },
      { id: 10, slug: 'action-adventure', name: 'Action-Adventure' },
    ],
  },
  {
    id: 3,
    banner: 'https://images7.alphacoders.com/124/thumb-1920-1244875.jpg',
    title: 'The Last of Us: Part II - Remastered',
    description: `The Last of Us Part II is an action-adventure game with survival horror elements released as an exclusive for PlayStation 4 in 2020
      as the sequel to the Last of Us released in 2013. The action of the game is set in the post-apocalyptic United States around five years after the
      events presented in the first game where the world has been devastated by a mysterious pandemic.`,
    platforms: [{ id: 2, slug: 'ps5', name: 'PS5' }],
    tags: [
      { id: 7, slug: 'tps', name: 'TPS' },
      { id: 6, slug: 'thriller', name: 'Thriller' },
      { id: 3, slug: 'single-player', name: 'Single-player' },
      { id: 10, slug: 'action-adventure', name: 'Action-Adventure' },
    ],
  },
  {
    id: 4,
    banner: 'https://images7.alphacoders.com/133/thumb-1920-1335668.jpeg',
    title: 'Alan Wake 2',
    description: `Alan Wake 2 is a survival horror game developed by Remedy Entertainment.
      This is a sequel to Alan Wake, released in 2010 - a game that set the bar quite high.
      This time, the developers are aiming even higher. The question is, will they succeed?`,
    platforms: [
      { id: 2, slug: 'ps5', name: 'PS5' },
      { id: 4, slug: 'xbox-series-s', name: 'Xbox Series S' },
      { id: 5, slug: 'xbox-series-x', name: 'Xbox Series X' },
      { id: 3, slug: 'pc', name: 'PC' },
      { id: 6, slug: 'geforce-now', name: 'GeForce Now' },
    ],
    tags: [
      { id: 14, slug: 'survival', name: 'Survival' },
      { id: 15, slug: 'horror', name: 'Horror' },
      { id: 6, slug: 'thriller', name: 'Thriller' },
      { id: 16, slug: 'puzzle', name: 'Puzzle' },
      { id: 7, slug: 'tps', name: 'TPS' },
      { id: 2, slug: 'adventure', name: 'Adventure' },
      { id: 3, slug: 'single-player', name: 'Single-player' },
    ],
  },
  {
    id: 5,
    banner: 'https://images8.alphacoders.com/129/thumb-1920-1293291.png',
    title: 'Hades II',
    description: `Hades II is the sequel from the Supergiant Games studio, consisting of the most enjoyable aspects of the original indie game and developing them.
      Like its predecessor, Hades 2, action-packed, roguelike RPG continues the story in the world of Greek mythology, presenting a whole new, infinitely playable
      adventure where myths about the underworld twist with tales of witchcraft and magic.`,
    platforms: [
      { id: 1, slug: 'ps5', name: 'PS5' },
      { id: 2, slug: 'ps4', name: 'PS4' },
      { id: 4, slug: 'xbox-series-s', name: 'Xbox Series S' },
      { id: 5, slug: 'xbox-series-x', name: 'Xbox Series X' },
      { id: 3, slug: 'pc', name: 'PC' },
      { id: 7, slug: 'xbox-one', name: 'Xbox One' },
    ],
    tags: [
      { id: 17, slug: 'rogue', name: 'Rogue' },
      { id: 8, slug: 'rpg', name: 'RPG' },
      { id: 2, slug: 'adventure', name: 'Adventure' },
      { id: 1, slug: 'action', name: 'Action' },
      { id: 3, slug: 'single-player', name: 'Single-player' },
    ],
  },
  {
    id: 6,
    banner: 'https://images7.alphacoders.com/132/thumb-1920-1323282.jpeg',
    title: 'Star Wars: Outlaws',
    description: `Star Wars: Outlaws is an action-adventure game developed by Massive Entertainment with cooperation from other Ubisoft divisions.
      This highly anticipated official video game of the Star Wars franchise was published by Ubisoft under licence by Lucasfilm Games in August of 2024.`,
    platforms: [
      { id: 1, slug: 'ps5', name: 'PS5' },
      { id: 4, slug: 'xbox-series-s', name: 'Xbox Series S' },
      { id: 5, slug: 'xbox-series-x', name: 'Xbox Series X' },
      { id: 3, slug: 'pc', name: 'PC' },
      { id: 6, slug: 'geforce-now', name: 'GeForce Now' },
    ],
    tags: [
      { id: 2, slug: 'adventure', name: 'Adventure' },
      { id: 1, slug: 'action', name: 'Action' },
      { id: 3, slug: 'single-player', name: 'Single-player' },
      { id: 18, slug: 'shooting', name: 'Shooting' },
    ],
  },
]

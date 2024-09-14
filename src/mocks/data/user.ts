import { faker } from '@faker-js/faker'
import { format } from 'date-fns'

import { TeamMember, User } from '@/types'

export const MOCK_USER: User = {
  id: 1,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  nickname: faker.internet.userName(),
  birthdate: format(faker.date.past(), 'yyyy-MM-dd'),
  created_at: faker.date.past().toISOString(),
  updated_at: faker.date.past().toISOString(),
  profile: {
    phone: faker.phone.number(),
    photo: faker.image.avatar(),
    facebook: 'https://facebook.com/fake',
    linkedin: 'https://linkedin.com/in/fake',
    share: true,
  },
}

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Felipe Oliveira',
    bio: `Hello! Nice to meet you. I'm a Fullstack Developer with more than 5 years of experience, and my specialty is backend, but I'm also
      passionate on frontend. My main skills are Laravel, React/TypeScript and NextJs. I've solid skills in software design architecture,
      API Rest, relational databases and some DevOps stuffs, such as CI/CD.`,
    role: 'Fullstack Developer',
    skills: [
      {
        name: 'Laravel',
        proficiency: 100,
      },
      {
        name: 'ReactJS',
        proficiency: 80,
      },
      {
        name: 'TypeScript',
        proficiency: 80,
      },
      {
        name: 'NextJS',
        proficiency: 70,
      },
      {
        name: 'CI/CD',
        proficiency: 85,
      },
      {
        name: 'Docker',
        proficiency: 75,
      },
      {
        name: 'MySQL',
        proficiency: 85,
      },
      {
        name: 'SQL Server',
        proficiency: 85,
      },
      {
        name: 'Postgres',
        proficiency: 65,
      },
      {
        name: 'AWS',
        proficiency: 85,
      },
      {
        name: 'Redis',
        proficiency: 80,
      },
      {
        name: 'TDD',
        proficiency: 90,
      },
      {
        name: 'Tailwind CSS',
        proficiency: 75,
      },
      {
        name: 'API Rest',
        proficiency: 100,
      },
      {
        name: 'Git',
        proficiency: 90,
      },
      {
        name: 'Redux',
        proficiency: 70,
      },
      {
        name: 'Laravel Blade',
        proficiency: 75,
      },
      {
        name: 'Livewire',
        proficiency: 60,
      },
      {
        name: 'WebSocket',
        proficiency: 70,
      },
      {
        name: 'Clean Code',
        proficiency: 90,
      },
      {
        name: 'Clean Architecture',
        proficiency: 75,
      },
      {
        name: 'Hexagonal Architecture',
        proficiency: 80,
      },
      {
        name: 'Kibana',
        proficiency: 70,
      },
      {
        name: 'Scrum',
        proficiency: 85,
      },
      {
        name: 'Grafana',
        proficiency: 65,
      },
      {
        name: 'VueJS',
        proficiency: 60,
      },
      {
        name: 'RabbitMQ',
        proficiency: 65,
      },
      {
        name: 'Python',
        proficiency: 60,
      },
      {
        name: 'Elixir',
        proficiency: 50,
      },
      {
        name: 'GoLang',
        proficiency: 40,
      },
    ],
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQEWxmd_PO-GQw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726190852644?e=1731542400&v=beta&t=sjM1wZFhdC_9XENTKpxO2MYNjLGAnC118zFKsosq470',
    socials: {
      github: 'https://github.com/felipebrsk/',
      linkedin: 'https://linkedin.com/in/felipe-luz-oliveira/',
      whatsapp: 'https://wa.me/5579998677272/',
    },
  },
  {
    id: 2,
    bio: "Hello! Nice to meet you. I'm a Backend Developer with more than 2 years of experience.",
    name: 'Pedro Bittencourt',
    role: 'Backend Developer',
    skills: [
      {
        name: 'Java',
        proficiency: 90,
      },
      {
        name: 'SpringBoot',
        proficiency: 90,
      },
    ],
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQEOwNMGD0PmoA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685578233090?e=1731542400&v=beta&t=ZOXQZGGWCF1UaKJ8AcCYyipOH3AsJyEThVR9--x_AB0',
    socials: {
      github: 'https://github.com/PedroBitencourt/',
      linkedin: 'https://linkedin.com/in/pedrobitencourt/',
      instagram: 'https://instagram.com/pedro.bitencourt/',
    },
  },
]

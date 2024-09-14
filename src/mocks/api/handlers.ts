import { http, HttpResponse } from 'msw'

import { baseUrl } from '@/constants'

import { MOCK_USER } from '../data'

const url = (path: string) => new URL(path, baseUrl).toString()

export const handlers = [
  http.post(url('/login'), () => {
    return HttpResponse.json({
      token: 'fakeToken',
      user: MOCK_USER,
    })
  }),
]

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
  http.post(url('/auth/password/email/send'), async ({ request }) => {
    const { email } = (await request.json()) as { email: string }

    if (!email) {
      return HttpResponse.json(
        { message: 'Email is required' },
        { status: 400 },
      )
    }

    return HttpResponse.json(
      { message: 'Password reset email sent successfully to ' + email },
      { status: 200 },
    )
  }),
]

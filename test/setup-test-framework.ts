import 'whatwg-fetch'
import '@testing-library/jest-dom'

import { configure } from '@testing-library/react'
import { toHaveNoViolations } from 'jest-axe'

import { server } from '@/mocks/api/server'
import api from '@/services/api'
import store from '@/store'

class ResizeObserver {
  observe() {
    return null
  }

  unobserve() {
    return null
  }

  disconnect() {
    return null
  }
}

window.ResizeObserver = ResizeObserver

expect.extend(toHaveNoViolations)

configure({ testIdAttribute: 'data-qa' })

beforeAll(() => {
  server.listen()
  document.documentElement.scrollTo = jest.fn()
  HTMLDialogElement.prototype.showModal = jest.fn()
  HTMLDialogElement.prototype.close = jest.fn()

  // Mock matchMedia
  Object.defineProperty(global, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

afterEach(() => {
  server.resetHandlers()
  store.dispatch(api.util.resetApiState())
})

afterAll(() => {
  server.close()
})

jest.mock('@/constants', () => ({
  baseUrl: 'http://localhost:8000/',
}))

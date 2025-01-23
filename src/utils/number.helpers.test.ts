import { MissionRequirement } from '@/types'

import { calculateOverallProgress, formatPrice } from './number.helpers'

describe('Utility Functions', () => {
  describe('formatPrice()', () => {
    it('returns "$ 0.00" when value is undefined', () => {
      expect(formatPrice(undefined)).toBe('$ 0.00')
    })

    it('returns formatted price when value is a number', () => {
      expect(formatPrice(10000)).toBe('$100.00')
      expect(formatPrice(500)).toBe('$5.00')
      expect(formatPrice(1234567)).toBe('$12,345.67')
    })

    it('handles zero value correctly', () => {
      expect(formatPrice(0)).toBe('$ 0.00')
    })
  })

  describe('calculateOverallProgress()', () => {
    it('calculates overall progress correctly with multiple requirements', () => {
      const requirements: MissionRequirement[] = [
        {
          id: 1,
          task: 'Fake task',
          goal: 100,
          progress: { id: 1, completed: false, progress: 50 },
        },
        {
          id: 2,
          task: 'Fake task 2',
          goal: 200,
          progress: { id: 2, completed: false, progress: 100 },
        },
        {
          id: 3,
          task: 'Fake task 3',
          goal: 300,
          progress: { id: 3, completed: false, progress: 150 },
        },
      ]

      expect(calculateOverallProgress(requirements)).toBe(50)
    })

    it('returns 100% if total progress meets or exceeds total goals', () => {
      const requirements: MissionRequirement[] = [
        {
          id: 1,
          task: 'Fake task',
          goal: 100,
          progress: { id: 1, completed: false, progress: 100 },
        },
        {
          id: 2,
          task: 'Fake task 2',
          goal: 200,
          progress: { id: 2, completed: false, progress: 200 },
        },
        {
          id: 3,
          task: 'Fake task 3',
          goal: 300,
          progress: { id: 3, completed: false, progress: 300 },
        },
      ]

      expect(calculateOverallProgress(requirements)).toBe(100)
    })

    it('returns 0% if no requirements are provided', () => {
      const requirements: MissionRequirement[] = []

      expect(calculateOverallProgress(requirements)).toBe(0)
    })

    it('calculates progress correctly with different goals and progress', () => {
      const requirements: MissionRequirement[] = [
        {
          id: 1,
          task: 'Fake task',
          goal: 50,
          progress: { id: 1, completed: false, progress: 25 },
        },
        {
          id: 2,
          task: 'Fake task 2',
          goal: 150,
          progress: { id: 2, completed: false, progress: 75 },
        },
        {
          id: 3,
          task: 'Fake task 3',
          goal: 100,
          progress: { id: 3, completed: false, progress: 25 },
        },
      ]

      expect(calculateOverallProgress(requirements)).toBe(42)
    })
  })
})

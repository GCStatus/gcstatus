// import { formatRelativeDateOnly } from './date.helpers'

// describe('formatRelativeDateOnly()', () => {
//   it('formats past dates correctly', () => {
//     const pastDate = new Date('2023-01-02')
//     const baseDate = new Date('2023-01-10')

//     const result = formatRelativeDateOnly(pastDate, baseDate)

//     expect(result).toBe('01/02/2023')
//   })

//   it('formats future dates correctly', () => {
//     const futureDate = new Date('2023-01-20')
//     const baseDate = new Date('2023-01-10')

//     const result = formatRelativeDateOnly(futureDate, baseDate)

//     expect(result).toBe('01/20/2023')
//   })

//   it('returns x weekday if dates are close', () => {
//     const pastDate = new Date('2023-01-08')
//     const baseDate = new Date('2023-01-10')

//     const result = formatRelativeDateOnly(pastDate, baseDate)

//     expect(result).toBe('last Sunday')
//   })

//   it('returns today for the current date', () => {
//     const today = new Date()
//     const result = formatRelativeDateOnly(today)

//     expect(result).toBe('today')
//   })

//   it('handles invalid date inputs', () => {
//     const invalidDate = 'invalid date string'
//     const baseDate = new Date()

//     expect(() =>
//       formatRelativeDateOnly(invalidDate as any, baseDate),
//     ).toThrow()
//   })
// })

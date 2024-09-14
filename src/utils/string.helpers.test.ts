import {
  calculatePasswordStrength,
  passwordRequirements,
  removeDiacritics,
  shortenString,
} from './string.helpers'

describe('shortenString()', () => {
  it('can shorten a string longer than 45 characters', () => {
    const sentence =
      'test if the string shorten function can shorten a string longer than 45 characters.'

    expect(shortenString(sentence)).toBe(
      'test if the string shorten function can shor...',
    )
  })

  it('can return the same string if its less than 45 characters', () => {
    const sentence = 'less than 45 characters.'

    expect(shortenString(sentence)).toBe(sentence)
  })
})

describe('removeDiacritics()', () => {
  it('removes diacritics from a string', () => {
    const input = 'Café résumé'
    const expected = 'Cafe resume'

    expect(removeDiacritics(input)).toBe(expected)
  })

  it('returns the same string if there are no diacritics', () => {
    const input = 'Hello World'
    const expected = 'Hello World'

    expect(removeDiacritics(input)).toBe(expected)
  })

  it('handles empty strings', () => {
    const input = ''
    const expected = ''

    expect(removeDiacritics(input)).toBe(expected)
  })
})

describe('calculatePasswordStrength()', () => {
  it('returns strength of 0 for empty password', () => {
    const password = ''
    expect(calculatePasswordStrength(password)).toBe(0)
  })

  it('returns strength of 1 for weak password', () => {
    const password = 'abcdefg'
    expect(calculatePasswordStrength(password)).toBe(1)
  })

  it('returns strength of 2 for medium password', () => {
    const password = 'Abcdefg'
    expect(calculatePasswordStrength(password)).toBe(2)
  })

  it('returns strength of 3 for strong password', () => {
    const password = 'Abcdef1'
    expect(calculatePasswordStrength(password)).toBe(3)
  })

  it('returns strength of 4 for very strong password', () => {
    const password = 'Abcde1!'
    expect(calculatePasswordStrength(password)).toBe(4)
  })

  it('returns strength of 5 for a fully strong password', () => {
    const password = 'A1b2c3d4!'
    expect(calculatePasswordStrength(password)).toBe(5)
  })
})

describe('passwordRequirements', () => {
  it('checks password requirements correctly', () => {
    const password = 'A1b2c3d4!'

    passwordRequirements.forEach((requirement) => {
      expect(requirement.test(password)).toBe(true)
    })
  })

  it('fails password requirements correctly', () => {
    const password = ''

    expect(passwordRequirements[0].test(password)).toBe(false)
    expect(passwordRequirements[1].test(password)).toBe(false)
    expect(passwordRequirements[2].test(password)).toBe(false)
    expect(passwordRequirements[3].test(password)).toBe(false)
    expect(passwordRequirements[4].test(password)).toBe(false)
  })
})

export const shortenString = (str: string, len = 45) => {
  if (str.length > len) {
    return str.slice(0, len - 1) + '...'
  }

  return str
}

export const removeDiacritics = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const calculatePasswordStrength = (password: string) => {
  let strength = 0

  if (password.length >= 8) strength += 1
  if (/[A-Z]/.test(password)) strength += 1
  if (/[a-z]/.test(password)) strength += 1
  if (/\d/.test(password)) strength += 1
  if (/[@$!%*?&]/.test(password)) strength += 1

  return strength
}

export const passwordRequirements = [
  {
    label: 'At least 8 characters',
    test: (password: string) => password.length >= 8,
  },
  {
    label: 'At least 1 uppercase letter',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: 'At least 1 lowercase letter',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: 'At least 1 number',
    test: (password: string) => /\d/.test(password),
  },
  {
    label: 'At least 1 special character',
    test: (password: string) => /[@$!%*?&]/.test(password),
  },
]

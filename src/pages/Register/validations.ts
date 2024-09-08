import { differenceInYears, parseISO } from 'date-fns'

const isOlderThan14Years = (dateString: string) => {
  const date = parseISO(dateString)
  const today = new Date()

  return differenceInYears(today, date) >= 14
}

export const validations = {
  name: {
    required: 'Please, provide us your name.',
  },
  birthdate: {
    required: 'Please, provide us your birthdate.',
    validate: (value: string) =>
      isOlderThan14Years(value) || 'You must be at least 14 years old.',
  },
  nickname: {
    required: 'A nickname is required.',
    pattern: {
      value: /^\S+$/,
      message:
        'Please, write a valid nickname. No blank spaces are allowed.',
    },
  },
  email: {
    required: 'An email is required to register!',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please, enter a valid email address.',
    },
  },
  password: {
    required: 'A password is required.',
    minLength: {
      value: 8,
      message: 'The new password must have at least 8 characters.',
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
    },
  },
  password_confirmation: {
    required: 'You need to confirm your password.',
    minLength: {
      value: 8,
      message: 'The confirm password must have at least 8 characters.',
    },
  },
}

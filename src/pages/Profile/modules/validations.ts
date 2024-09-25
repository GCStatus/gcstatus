import { isOlderThan14Years } from '@/utils'

export const updateUserNickAndEmailValidations = {
  email: {
    required: 'Please, write an email. Your email can not be empty',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please, enter a valid email address.',
    },
  },
  nickname: {
    required: 'Please, write a nickname. Your nickname can not be empty',
  },
  password: {
    required: 'Your password is required to change these informations.',
    minLength: {
      value: 8,
      message: 'The password must have 8 characters.',
    },
  },
}

export const updateUserBasicsValidations = {
  name: {
    required: 'Please, write a name. Your name can not be empty.',
  },
  birthdate: {
    required: 'Please, provide us your birthdate.',
    validate: (value: string) =>
      isOlderThan14Years(value) || 'You must be at least 14 years old.',
  },
}

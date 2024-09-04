export const updateUserValidations = {
  email: {
    required: 'Please, write an email.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please, enter a valid email address.',
    },
  },
  nickname: {
    required: 'Please, write a nickname.',
  },
  password: {
    required: 'Your password is required to change these informations.',
    minLength: {
      value: 8,
      message: 'The password must have 8 characters.',
    },
  },
}

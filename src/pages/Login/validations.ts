export const validations = {
  identifier: {
    required: 'Your email or nickname is required to login.',
  },
  password: {
    required: 'Your password is required!',
    minLength: {
      value: 8,
      message: 'Your password must have 8 characters.',
    },
  },
}
